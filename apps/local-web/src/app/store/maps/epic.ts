import { catchError, filter, from, map, Observable, of, switchMap, tap, withLatestFrom } from "rxjs";
import { mapsApiService } from "../../services/maps-api";
import { RootState } from "../store";
import { completeLoading } from './store';

export function mapsLoadEpic(action$: Observable<{ type: string }>, store$: Observable<RootState>) {
  return action$.pipe(
    filter(({ type }) => type === 'maps/load'),
    switchMap(() => from(mapsApiService.loadMaps())),
    map(({ maps }) => completeLoading(maps)),
    catchError(() => of(completeLoading([]))),
  );
}
