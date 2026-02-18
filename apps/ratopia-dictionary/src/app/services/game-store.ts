import { action, makeAutoObservable, reaction, toJS } from "mobx";
import { dictionaryService, DictionaryService } from "./dictionary-service";

interface IGameData {
  currency?: number;
  countries: ICountry[];
  connected: boolean;
}

export interface IResource {
  count?: number;
  resource: string;
  cost: number;
}

export enum CurrencyType {
  gold = 'gold',
  dar = 'dar'
}

export interface ICountry {
  country: string;
  countryName: string;
  type: CurrencyType;
  export: IResource[];
  import: IResource[];
}

export enum TradeDirection {
  export = 'export',
  import = 'import'
}

export interface ITradeResource extends IResource {
  country: string;
  countryName: string;
  resourceName: string;
  resourceTag: string;
  type: CurrencyType;
  direction: TradeDirection;
  costGold: number;
}

export class GameStore {
  store: IGameData = {
    connected : false,
    currency: 1000,
    countries: []
  }

  constructor(
    private readonly dictionaryService: DictionaryService,
    baseData?: IGameData
  ) {
    if (baseData) {
      this.store = {
        ...this.store,
        ...baseData
      };
    }

    makeAutoObservable(this.store, {}, {
      deep: true
    });

    reaction(() => JSON.stringify(toJS(this.store)), (data) => this.persistState(data), {
      delay: 100
    })
  }

  setConnected = action((isConnected: boolean) => {
    this.store.connected = isConnected;
  })

  setCountries = action((list: ICountry[]) => {
    this.store.countries = list;
  })

  setCurrency = action((currency: number) => {
      this.store.currency = currency;
  });

  addCountry = action((country: string) => {
    this.store.countries.push({
      country: country,
      countryName: '',
      type: CurrencyType.gold,
      import: [],
      export: []
    })
  })

  updateCountry = action((country: ICountry, key: string) => {
    const index = this.store.countries.findIndex(it => it.country === key);
    this.store.countries[index] = country;
  })

  deleteCountry = action((key: string) => {
    const index = this.store.countries.findIndex(it => it.country === key);
    this.store.countries.splice(index, 1);
  })

  get traderResources(): ITradeResource[] {
    const currency = this.store.currency;
    const tiles = this.dictionaryService.tiles;

    return this.store.countries.flatMap(country => {
      return [
        ...country.import.map(res => ({
          ...this.mapTradeItem(country, res, currency || 0),
          resourceName: tiles[res.resource],
          resourceTag: (tiles[res.resource] || '').toLowerCase() + res.resource.toLowerCase(),
          direction: TradeDirection.import,
        })),
        ...country.export.map(res => ({
          ...this.mapTradeItem(country, res, currency || 0),
          resourceName: tiles[res.resource],
          resourceTag: (tiles[res.resource] || '').toLowerCase() + res.resource.toLowerCase(),
          direction: TradeDirection.export,
        })),
      ]
    })
  }

  private mapTradeItem(country: ICountry, item: IResource, currency: number)
    : Omit<ITradeResource, 'direction' | 'resourceName' | 'resourceTag'> {
    return {
      ...item,
      country: country.country,
      countryName: country.countryName,
      type: country.type,
      costGold: country.type === CurrencyType.gold ? item.cost : Math.ceil(item.cost * currency / 100)
    }
  }

  private persistState(state: string): void {
    localStorage.setItem('raDic', state);
  }
}

let data: IGameData | undefined;
try {
  const lastResult = localStorage.getItem('raDic');
  data = lastResult && JSON.parse(lastResult);
} catch (e) {
  console.log('Not found saved data');
}

export const gameStore = new GameStore(dictionaryService, data);
