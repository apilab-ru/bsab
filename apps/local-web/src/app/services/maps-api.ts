import { environment } from "../../environments/environment";
import { IMap } from "@bsab/api/map/map";

class MapsApiService {
  loadMaps(): Promise<{ maps: IMap[] }> {
    return fetch(environment.api + 'maps').then(res => res.json());
  }
}

export const mapsApiService = new MapsApiService();
