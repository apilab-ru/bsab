import { apiService, ApiService } from "./api-service";
import { DataStatus } from "../models/data-status";
import { makeAutoObservable, onBecomeObserved, runInAction } from "mobx";
import { TileTitles } from "../models/tiles";

export class DictionaryService {
  private store = makeAutoObservable({
    tiles: {} as TileTitles,
    status: DataStatus.empty,
  })

  get status(): DataStatus {
    return this.store.status;
  }

  get tiles(): TileTitles {
    return this.store.tiles;
  }

  constructor(private api: ApiService) {
    this.initDictionary();
  }

  private initDictionary(): void {
    onBecomeObserved(this.store, 'tiles', () => {
      if (this.store.status !== DataStatus.empty) {
        return;
      }

      runInAction(() => {
        this.store.status = DataStatus.loading;
      })

      this.api.loadDictionary().then(result => {
        runInAction(() => {
          this.store.status = DataStatus.done;
          this.store.tiles = result.tiles;
        })
      }).catch(err => {
        console.error(err);

        runInAction(() => {
          this.store.status = DataStatus.error;
        })
      })
    })
  }
}

export const dictionaryService = new DictionaryService(apiService);