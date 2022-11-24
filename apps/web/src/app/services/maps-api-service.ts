import { FilterState } from "../store/filter/store";

import { prepareFilterRequest } from "../models/filter-items";
import { environment } from "../../environments/environment";
import { IMap } from '@bsab/api/map/map';


const MAPS_LIMIT = 30;

class MapsApiService {
  loadList(filter: FilterState): Promise<IMap[]> {
    const request = prepareFilterRequest(filter.values);

    const params = this.convertParams({
      limit: MAPS_LIMIT,
      offset: ((filter.page - 1) * MAPS_LIMIT),
      ...request,
      orderField: filter.orderField,
      orderDirection: filter.orderDirection,
    });
    return fetch(environment.api + '/maps/list?' + params)
      .then(res => res.json())
      .then((list: IMap[]) => list.map(item => ({
        ...item,
        author: item.author + '', // todo fix
        coverURL: this.fileProxy(item.coverURL),
        soundURL: this.fileProxy(item.soundURL!),
        downloadURL: this.fileProxy(item.downloadURL!),
      })))
  }

  markAsShowed(id: string): Promise<void> {
    return fetch(environment.api + '/maps/showed', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
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
