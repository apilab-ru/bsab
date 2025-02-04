import { CurrencyType, GameStore, gameStore, ICountry, IResource } from "./game-store";
import { makeAutoObservable, runInAction } from "mobx";
import { Message } from "../conts/message";
import { City, Trade } from "../conts/city.model";
import { Countries } from "./countries";
import { Resources } from "../conts/res-list";
import { TileType } from "../conts/resources";

export enum ConnectStatus {
  disconnect = 'disconnect',
  connected = 'connected',
  delay = 'delay'
}

export class ConnectionService {
  status: ConnectStatus = ConnectStatus.disconnect;

  private socket?: WebSocket;
  private closed = false;

  constructor(private readonly gameStore: GameStore) {
    makeAutoObservable(this);
  }

  disconnect(): void {
    this.socket?.close();
    this.socket = undefined;
    this.closed = true;

    runInAction(() => {
      this.status = ConnectStatus.disconnect;
    });
  }

  connect(): void {
    this.socket = new WebSocket('ws://localhost:3000');
    this.closed = false;

    // Обработка успешного подключения
    this.socket.onopen = () => {
      runInAction(() => {
        this.status = ConnectStatus.connected;
      });
      console.log('Соединение установлено');
    };

    // Обработка сообщений от сервера
    this.socket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);

      this.messageHandler(message);

      console.log(`Сообщение от сервера test`, message);
    };

    // Обработка закрытия соединения
    this.socket.onclose = () => {
      runInAction(() => this.status = ConnectStatus.disconnect);
      console.log('Соединение закрыто');

      if (!this.closed) {
        runInAction(() => this.status = ConnectStatus.delay);

        setTimeout(() => {
          this.connect();
        }, 2000);
      }
    };

    // Обработка ошибок
    this.socket.onerror = (error) => {
      runInAction(() => this.status = ConnectStatus.disconnect);
      console.error(`Ошибка`, error);
    };
  }

  message(data: object) {
     this.socket?.send(JSON.stringify(data));
  }

  private messageHandler(message: Message): void {
    if (message.event === "currency") {
      this.gameStore.setCurrency(Math.round(message.payload * 100));
    }

    if (message.event === "trades") {
      const list = this.parseTradeData(message.payload);

      this.gameStore.setCountries(list);
    }
  }

  private parseTradeData(list: City[]): ICountry[] {
    const currency = (this.gameStore.store.currency || 0) / 100;

    return list.map(item => ({
      // @ts-ignore
      country: Countries[item.key],
      type: item.currency === 'gold' ? CurrencyType.gold : CurrencyType.dar,
      export: item.export.map(it => this.parseTrade(it, this.exportCalc(item.relations, it), item.currency !== 'gold' ? currency : 1)),
      import: item.import.map(it => this.parseTrade(it, this.importCalc(item.relations, it), item.currency !== 'gold' ? currency : 1))
    }))
  }

  private parseTrade(item: Trade, cost: number, currency: number): IResource {
    return {
      count: item.resource,
      resource: TileType[item.resource] as Resources,
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

export const connectionService = new ConnectionService(gameStore);
