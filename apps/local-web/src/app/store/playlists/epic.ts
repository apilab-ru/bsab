import { catchError, filter, from, map, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { RootState } from "../store";
import { completeLoading, set, setPlaylist } from './store';
import { Playlist } from "@bsab/api/local/playlist";
import { playlistApiService } from "../../services/playlist-api";
import { Payload } from "../../models/payload";

export function playlistsEpics(action$: Observable<{ type: string }>, store$: Observable<RootState>) {
   return action$.pipe(
      filter(({ type }) => type === 'playlist/load'),
      switchMap(() => from(playlistApiService.loadPlaylists())),
      map(({ list }) => completeLoading(list)),
      catchError(() => of(completeLoading([]))),
   );
}

export function updatePlaylist(action$: Observable<{ type: string, payload: { playlist: Playlist, id: string } }>, store$: Observable<RootState>) {
   return action$.pipe(
      filter(({ type }) => type === 'playlist/updatePlaylist'),
      switchMap(({ payload }) => from(playlistApiService.updatePlaylist(payload.id, payload.playlist)).pipe(
         map(() => setPlaylist(payload))
      )),
   )
}

export function removePlaylist(action$: Observable<{ type: string, payload: string }>, store$: Observable<RootState>) {
   return action$.pipe(
      filter(({ type }) => type === 'playlist/removePlaylist'),
      switchMap(({ payload }: Payload<string>) => from(playlistApiService.removePlaylist(payload)).pipe(
         withLatestFrom(store$),
         map(([_, store]) => set({
            list: store.playlists.list.filter(item => item.id !== payload)
         })),
      )),
   )
}
