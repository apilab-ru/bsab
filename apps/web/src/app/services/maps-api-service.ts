import { FilterState } from "../store/filter/store";
import { Map } from "../api";
import { prepareFilterRequest } from "../models/filter-items";
import { environment } from "../../environments/environment";

const MAPS_LIMIT = 30;

class MapsApiService {
  loadList(filter: FilterState): Promise<Map[]> {
    const request = prepareFilterRequest(filter.values);

    const params = this.convertParams({
      limit: MAPS_LIMIT,
      offset: ((filter.page - 1) * MAPS_LIMIT),
      ...request,
    });
    return fetch(environment.api + '/maps/list?' + params)
      .then(res => res.json())
      .then((list: Map[]) => list.map(item => ({
        ...item,
        coverURL: this.fileProxy(item.coverURL),
        soundURL: this.fileProxy(item.soundURL),
        downloadURL: this.fileProxy(item.downloadURL),
      })))
  }

  loadTags() {
    return fetch(environment.api + '/maps/tags').then(res => res.json())
  }

  private fileProxy(file: string): string {
    return environment.api + '/parser/proxy-file?file=' + file
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

export const mapsApiService = new MapsApiService();
