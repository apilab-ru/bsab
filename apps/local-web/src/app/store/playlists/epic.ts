import { catchError, filter, from, map, Observable, of, switchMap, tap } from "rxjs";
import { RootState } from "../store";
import { completeLoading, setPlaylist } from './store';
import { Playlist } from "@bsab/api/local/playlist";
import { playlistApiService } from "../../services/playlist-api";

export function playlistsEpics(action$: Observable<{ type: string }>, store$: Observable<RootState>) {
  return action$.pipe(
    filter(({ type }) => type === 'playlist/load'),
    switchMap(() => from(playlistApiService.loadPlaylists())),
    map(({ list }) => completeLoading(list)),
    catchError(() => of(completeLoading([]))),
  );
}

export function updatePlaylist(action$: Observable<{ type: string, payload:{ playlist: Playlist, id: string }  }>, store$: Observable<RootState>) {
  return action$.pipe(
    filter(({ type }) => type === 'playlist/updatePlaylist'),
    switchMap(({ payload }) => from(playlistApiService.updatePlaylist(payload.id, payload.playlist)).pipe(
      map(() => setPlaylist(payload))
    )),
  )
}
