import { catchError, debounceTime, filter, map, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { set } from './store';
import { RootState } from "../store";
import { mapsApiService } from "../../services/maps-api-service";

export function mapsEpic(action$: Observable<{ type: string }>, store$: Observable<RootState>) {
  return action$.pipe(
    filter(({ type }) => type === 'maps/load'),
    debounceTime(100),
    withLatestFrom(store$),
    map(([_, { filter }]) => filter),
    switchMap(filter => mapsApiService.loadList(filter).then(list => {
      return { list, filter }
    })),
    map(response => {
      return set({
        list: response.list,
        isMerge: response.filter.page > 1
      });
    }),
    catchError(() => {
      const res = set({
        list: [],
        isMerge: false,
      })

      return of(res)
    })
  )
}
