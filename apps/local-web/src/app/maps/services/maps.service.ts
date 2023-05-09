import { LocalMap, MapCinema } from "@bsab/api/map/map";
import { DataStatus } from "../../models/status";
import { action, computed, makeAutoObservable, onBecomeObserved, runInAction } from "mobx";
import { mapsApiService, MapsApiService } from "./maps-api";
import { SearchValue } from "@bsab/ui-kit/filter";

function parseBoolean(value: string): boolean {
   return value === 'true';
}

const PAGE_LIMIT = 100;

export class MapsService {
   private storeDeep = {
      filter: [] as SearchValue[],
   }
   private store = {
      list: [] as LocalMap[],
      openedId: null as null | string,
      cinemaId: null as null | string,
      stats: DataStatus.empty as DataStatus,

      offset: 0,
      hasMore: true,
   }

   constructor(
      private mapsApi: MapsApiService,
   ) {
      makeAutoObservable(this.store, {}, {
         deep: false
      });
      makeAutoObservable(this.storeDeep, {}, {
         deep: true
      });

      this.initList();
   }

   get cinemaId(): string | null {
      return this.store.cinemaId;
   }

   setCinemaId = action((id: string | null) => {
      this.store.cinemaId = id;
   })

   get openedId(): string | null {
      return this.store.openedId;
   }

   setOpenedId = action((openedId: string | null) => {
      this.store.openedId = openedId;
   })

   get list(): LocalMap[] {
      return this.store.list;
   }

   get listByFilter(): LocalMap[] {
      const filter = this.storeDeep.filter;

      return !filter.length ? this.store.list : this.listFiltration(this.store.list, filter);
   }

   updateMapCinema(id: string, cinema: Partial<MapCinema>): Promise<void> {
      return this.mapsApi.updateCinema(id, cinema as MapCinema).then(result => {
         this.localUpdateMapCinema(id, result);
      });
   }

   uploadCinemaVideo(id: string, file: File, details?: Partial<MapCinema>): Promise<void> {
      return this.mapsApi.uploadCinemaVideo(id, file, details).then(cinema => {
         this.localUpdateMapCinema(id, cinema);
      })
   }

   private localUpdateMapCinema = action((id: string, cinema: MapCinema) => {
      this.store.list = this.store.list.map(item => {
         return item.id === id ? { ...item, cinema: cinema } : item
      })
   })

   private listFiltration(list: LocalMap[], filters: SearchValue[]): LocalMap[] {
      return list.filter(item => {
         return filters.every(filter => {
            switch (filter.key) {
               case 'search':
                  return item.songName.toLocaleLowerCase().includes(filter.value)
                     || item.songSubName.toLocaleLowerCase().includes(filter.value);
               case 'cinema':
                  return !!item.cinema;
               case 'cinemaVideo':
                  return item.cinema && !!item.cinema.videoFile === parseBoolean(filter.value);
               default:
                  return true;
            }
         })
      })
   }

   get filter(): SearchValue[] {
      return this.storeDeep.filter;
   }

   addToFilter = action((item: SearchValue) => {
      this.storeDeep.filter.push(item);
   })

   removeFromFilter = action((index: number) => {
     this.storeDeep.filter = this.storeDeep.filter.filter((it, i) => i !== index);
   })

   private initList(): void {
      onBecomeObserved(this.store, 'list', () => {
         if (this.store.stats !== DataStatus.empty) {
            return;
         }

         runInAction(() => {
            this.store.stats = DataStatus.loading;
         })

         this.loadList(0);
      })
   }

   private loadList(offset: number): void {
      this.mapsApi.loadMaps({
         limit: PAGE_LIMIT,
         offset,
      }).then(result => {
         runInAction(() => {
            if (!result.hasMore) {
               this.store.stats = DataStatus.done;
            } else {
               this.loadList(result.offset);
            }

            if (!offset) {
               this.store.list = result.maps;
            } else {
               this.store.list.push(...result.maps);
            }
         })
      })
   }
}

export const mapsService = new MapsService(mapsApiService);
