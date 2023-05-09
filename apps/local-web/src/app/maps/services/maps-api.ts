import { environment } from "../../../environments/environment";
import { MapsResponse, PageRequest } from "@bsab/api/map/response";
import axios from 'axios';
import { MapCinema } from "@bsab/api/map/map";


export class MapsApiService {
   loadMaps(params: PageRequest): Promise<MapsResponse> {
      return axios.get(environment.api + 'maps', {
         params
      }).then(res => res.data);
   }

   uploadCinemaVideo(id: string, file: File, details?: Partial<MapCinema>): Promise<MapCinema> {
      const formData = new FormData();
      formData.append('video', file);

      if (details) {
         formData.append('details', JSON.stringify(details));
      }

      return axios.post(environment.api + 'maps/' + id + '/upload-video', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(res => res.data);
   }

   updateCinema(id: string, cinema: MapCinema): Promise<MapCinema> {
      return axios.patch(environment.api + 'maps/' + id + '/cinema', cinema).
      then(res => res.data);
   }
}

export const mapsApiService = new MapsApiService();
