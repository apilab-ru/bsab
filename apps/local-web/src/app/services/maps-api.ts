import { environment } from "../../environments/environment";
import { LocalMap } from "@bsab/api/map/map";

export class MapsApiService {
  loadMaps(): Promise<{ maps: LocalMap[] }> {
    return fetch(environment.api + 'maps').then(res => res.json());
  }
}

export const mapsApiService = new MapsApiService();
