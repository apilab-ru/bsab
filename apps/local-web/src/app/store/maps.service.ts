import { LocalMap } from "@bsab/api/map/map";
import { DataStatus } from "../models/status";
import { action, makeAutoObservable, onBecomeObserved, runInAction } from "mobx";
import { mapsApiService, MapsApiService } from "../services/maps-api";

export class MapsService {
   private store = {
      list: [] as LocalMap[],
      openedId: null as null | string,
      stats: DataStatus.empty as DataStatus,
   }

   constructor(
      private mapsApi: MapsApiService,
   ) {
      makeAutoObservable(this.store);

      this.initList();
   }

   get openedId(): string | null {
      return this.store.openedId;
   }

   setOpenedId = action((openedId: string | null) => {
      this.store.openedId = openedId;
   })

   get list(): LocalMap[] {
      return this.store.list;
   }

   private initList(): void {
      onBecomeObserved(this.store, 'list', () => {
         if (this.store.stats !== DataStatus.empty) {
            return;
         }

         runInAction(() => {
            this.store.stats = DataStatus.loading;
         })

         this.mapsApi.loadMaps().then(result => {
            runInAction(() => {
               this.store.stats = DataStatus.done;
               this.store.list = result.maps;
            })
         })
      })
   }
}

export const mapsService = new MapsService(mapsApiService);
