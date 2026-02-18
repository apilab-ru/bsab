import {CurrencyType, GameStore, ITradeResource, TradeDirection} from "../../../services/game-store";
import { action, makeAutoObservable } from "mobx";

export interface ITradersFilter {
  type: CurrencyType | 'all';
  direction: TradeDirection | 'all';
  resource: string;
}

export class TradersStore {
  filter: ITradersFilter = {
    type: 'all',
    resource: '',
    direction: 'all'
  };

  constructor(
    private gameStore: GameStore
  ) {
    makeAutoObservable(this, {}, {
      deep: true
    });
  }

  updateFilter = action((data: Partial<ITradersFilter>) => {
    this.filter = {
      ...this.filter,
      ...data
    }
  })

  get filteredTradeResources(): ITradeResource[] {
    return this.filterTraders(this.gameStore.traderResources, this.filter);
  }

  private filterTraders(list: ITradeResource[], filter: ITradersFilter): ITradeResource[] {
    return list.filter(item => {
      let pass = true;

      if (filter.type !== 'all') {
        pass = item.type === filter.type;
      }

      if (pass && !!filter.resource) {
        pass = item.resourceTag.includes( filter.resource.toLowerCase() );
      }

      if (pass && filter.direction !== 'all') {
         pass = item.direction === filter.direction;
      }

      return pass;
    })
  }
}
