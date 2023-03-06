import { FilterState } from "../store/filter/store";
import { prepareFilterRequest } from "../models/filter-items";
import { environment } from "../../environments/environment";
import { MapDetail, MapDetailRaw } from '@bsab/api/map/map-detail';
import { MAPS_LIMIT } from './const';
import axios from 'axios';

class MapsApiService {
   constructor(
      private api: string,
   ) {
   }

   loadList(filter: FilterState, userToken?: string, localApi?: string): Promise<MapDetail[]> {
      const request = prepareFilterRequest(filter.values);

      const params = this.convertParams({
         limit: MAPS_LIMIT,
         offset: filter.offset || 0,
         ...request,
         orderField: filter.orderField,
         orderDirection: filter.orderDirection,
      });
      return fetch(this.api + '/maps/list?' + params, {
         headers: {
            ...(userToken ? {'Authorization': 'Bearer ' + userToken} : {}),
         }
      })
         .then(res => res.json())
         .then((list: MapDetailRaw[]) => list.map(item => ({
            ...item,
            downloadURL: this.buildFileUrl(item.id, item.downloadURL, localApi),
            coverURL: this.buildFileUrl(item.originalCoverURL, item.coverURL, localApi),
            soundURL: this.buildFileUrl(item.originalSoundURL, item.soundURL, localApi),
         })))
   }

   markAsShowed(id: string, userToken: string): Promise<void> {
      return fetch(this.api + '/maps/showed', {
         method: 'POST',
         body: JSON.stringify({ id }),
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
         }
      }).then(res => res.json());
   }

   markAsNotWorking(id: string): Promise<void> {
      return axios.post(this.api + '/maps/not-work', { id }).then(res => res.data);
   }

   markAsShowedList(ids: string[], userToken: string): Promise<void> {
      return fetch(this.api + '/maps/showed-list', {
         method: 'POST',
         body: JSON.stringify({ ids }),
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
         }
      }).then(res => res.json());
   }

   private buildFileUrl(originalUrl: string, localUrl: string, localApi?: string): string {
      if (localApi) {
         return this.fileProxy(localUrl, localApi);
      }

      return originalUrl;
   }

   private fileProxy(file: string, localApi: string): string {
      return localApi + '/proxy/file?file=' + file
   }

   private convertParams(params: Record<string, any>): string {
      const preparedObject = Object.entries(params)
         .filter(([_key, value]) => !!value)
         .reduce((req, [key, value]) => ({
            ...req,
            [key]: typeof value === 'object' ? JSON.stringify(value) : value,
         }), {})
      return new URLSearchParams(preparedObject).toString();
   }
}

export const mapsApiService = new MapsApiService(environment.api);
