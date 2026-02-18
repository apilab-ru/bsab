import { CurrencyType, GameStore, gameStore, ICountry, IResource } from "./game-store";
import { makeAutoObservable, runInAction } from "mobx";
import { City, Trade } from "../models/city.model";
import { apiService, ApiService } from "./api-service";
import { notificationService, NotificationService } from "./notification-service";

export enum ConnectStatus {
  disconnect = 'disconnect',
  connected = 'connected',
  delay = 'delay'
}

export class ConnectionService {
  status: ConnectStatus = ConnectStatus.disconnect;

  constructor(
    private readonly gameStore: GameStore,
    private readonly apiService: ApiService,
    private readonly notificationService: NotificationService,
  ) {
    makeAutoObservable(this);

    if (this.gameStore.store.connected) {
      this.connect().then(isConnected => {
        if (isConnected) {
          this.refresh();
        } else {
          this.disconnect();
        }
      })
    }
  }

  disconnect(): void {
    this.gameStore.setConnected(false);

    runInAction(() => {
      this.status = ConnectStatus.disconnect;
    });
  }

  async refresh(): Promise<void> {
    if (this.gameStore.store.connected) {
      await this.loadTrades();
    }
  }

  async connect(): Promise<boolean> {
    runInAction(() => {
      this.status = ConnectStatus.delay;
    });

    const connected = await this.apiService.ping();

    if (!connected) {
      runInAction(() => {
        this.status = ConnectStatus.disconnect;
      });

      this.notificationService.error('Не удалось подключится к игре');

      return false;
    }

    this.gameStore.setConnected(true);

    runInAction(() => {
      this.status = ConnectStatus.connected;
    });

    return true;
  }

  private async loadTrades(): Promise<void> {
    try {
      const { resList, currency } = await this.apiService.loadDiplomaticData();

      this.gameStore.setCurrency(Math.round(currency * 100));

      const list = this.parseTradeData(resList);

      this.gameStore.setCountries(list);
    } catch (error) {
      this.disconnect();
    }
  }

  private parseTradeData(list: City[]): ICountry[] {
    const currency = (this.gameStore.store.currency || 0) / 100;

    return list.map(item => ({
      country: item.key,
      countryName: item.name,
      type: item.currency === 'gold' ? CurrencyType.gold : CurrencyType.dar,
      export: item.export.map(it => this.parseTrade(it, this.exportCalc(item.relations, it), item.currency !== 'gold' ? currency : 1)),
      import: item.import.map(it => this.parseTrade(it, this.importCalc(item.relations, it), item.currency !== 'gold' ? currency : 1))
    }))
  }

  private parseTrade(item: Trade, cost: number, currency: number): IResource {
    return {
      count: item.package,
      resource: item.resource,
      cost: Math.round(cost / currency)
    }
  }

  private importCalc(relation: number, item: Trade): number {
    return Math.ceil(item.price * (1.2 - (relation - 70) / 200) * item.package);
  }

  private exportCalc(relation: number, item: Trade): number {
    return Math.round(item.price * (0.8 + (relation - 70) / 200) * item.package);
  }
}

export const connectionService = new ConnectionService(gameStore, apiService, notificationService);
