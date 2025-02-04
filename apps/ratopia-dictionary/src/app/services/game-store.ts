import { action, makeAutoObservable, observable, reaction, runInAction, toJS } from "mobx";
import { Countries } from "./countries";
import { Resources } from "../conts/res-list";

interface IGameData {
  currency?: number;
  countries: ICountry[];
}

export interface IResource {
  count?: number;
  resource: Resources;
  cost: number;
}

export enum CurrencyType {
  gold = 'gold',
  dar = 'dar'
}

export interface ICountry {
  country: Countries;
  type: CurrencyType;
  export: IResource[];
  import: IResource[];
}

export enum TradeDirection {
  export = 'export',
  import = 'import'
}

export interface ITradeResource extends IResource {
  country: Countries;
  type: CurrencyType;
  direction: TradeDirection;
  costGold: number;
}

export class GameStore {
  store: IGameData = {
    currency: 1000,
    countries: []
  }

  constructor(baseData?: IGameData) {
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

  setCountries = action((list: ICountry[]) => {
    this.store.countries = list;
  })

  setCurrency = action((currency: number) => {
      this.store.currency = currency;
  });

  addCountry = action((country: Countries) => {
    this.store.countries.push({
      country: country,
      type: CurrencyType.gold,
      import: [],
      export: []
    })
  })

  updateCountry = action((country: ICountry, key: Countries) => {
    const index = this.store.countries.findIndex(it => it.country === key);
    this.store.countries[index] = country;
  })

  deleteCountry = action((key: Countries) => {
    const index = this.store.countries.findIndex(it => it.country === key);
    this.store.countries.splice(index, 1);
  })

  get traderResources(): ITradeResource[] {
    const currency = this.store.currency;

    return this.store.countries.flatMap(country => {
      return [
        ...country.import.map(res => ({
          ...this.mapTradeItem(country, res, currency || 0),
          direction: TradeDirection.import,
        })),
        ...country.export.map(res => ({
          ...this.mapTradeItem(country, res, currency || 0),
          direction: TradeDirection.export,
        })),
      ]
    })
  }

  private mapTradeItem(country: ICountry, item: IResource, currency: number): Omit<ITradeResource, 'direction'> {
    return {
      ...item,
      country: country.country,
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

export const gameStore = new GameStore(data);
