import { catchError, debounceTime, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { MapsLoadPayload, setList, SetMapsPayload } from './store';
import { mapsApiService } from '../../services/maps-api-service';
import { MAPS_LIMIT } from '../../services/const';

export function mapsEpic(action$: Observable<{ type: string, payload: MapsLoadPayload }>) {
   return action$.pipe(
      filter(({ type }) => type === 'maps/load'),
      debounceTime(100),
      map(({ payload }) => payload),
      switchMap(payload => mapsApiService.loadList(payload).then(list => {
         return { list, payload };
      })),
      map(({ payload, list }) => {
         let params: Partial<SetMapsPayload> = {};
         if (payload.strategy === 'future') {
            params.hasMore = list.length >= MAPS_LIMIT;
         }

         return setList({
            list: list,
            isMerge: payload.offset! > 1,
            strategy: payload.strategy,
            ...params,
         });
      }),
      catchError(() => {
         const res = setList({
            list: [],
            isMerge: false,
            strategy: 'future',
         });

         return of(res);
      })
   );
}
