import { catchError, debounceTime, filter, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { MapsLoadPayload, setList, SetMapsPayload } from './store';
import { mapsApiService } from '../../services/maps-api-service';
import { MAPS_LIMIT } from '../../services/const';
import { StateObservable } from "redux-observable";
import { RootState } from "../store";

export function mapsLoadEpic(action$: Observable<{ type: string, payload: MapsLoadPayload }>, state: StateObservable<RootState>) {

   const userData$ = state.pipe(
      // @ts-ignore
      map(data => data.user),
      filter(user => user.user !== undefined),
   )

   return action$.pipe(
      filter(({ type }) => type === 'maps/load'),
      debounceTime(100),
      map(({ payload }) => payload),
      // @ts-ignore
      withLatestFrom(userData$),
      switchMap(([payload, userData]) => {
         return mapsApiService.loadList(
            payload,
            userData.user?.token,
            userData.config?.localApi
         ).then(list => {
            return { list, payload };
         })
      }),
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
