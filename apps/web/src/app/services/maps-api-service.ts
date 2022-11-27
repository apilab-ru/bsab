import { FilterState } from "../store/filter/store";

import { prepareFilterRequest } from "../models/filter-items";
import { environment } from "../../environments/environment";
import { MapDetail } from '@bsab/api/map/map-detail';


const MAPS_LIMIT = 30;

class MapsApiService {
  loadList(filter: FilterState): Promise<MapDetail[]> {
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
      .then((list: MapDetail[]) => list.map(item => ({
        ...item,
        coverURL: this.fileProxy(item.coverURL),
        soundURL: this.fileProxy(item.soundURL!),
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

  markAsShowedList(ids: string[]): Promise<void> {
    return fetch(environment.api + '/maps/showed-list', {
      method: 'POST',
      body: JSON.stringify({ ids }),
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
