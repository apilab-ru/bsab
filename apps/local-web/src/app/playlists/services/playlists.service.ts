import { playlistApiService, PlaylistApiService } from "./playlist-api";
import { Playlist, PlaylistData } from "@bsab/api/local/playlist";
import { DataStatus } from "../../models/status";
import { action, makeAutoObservable, onBecomeObserved, runInAction, toJS } from "mobx";

export class PlaylistsService {
   private store = {
      list: [] as Playlist[],
      openedId: null as string | null,
      stats: DataStatus.empty as DataStatus,
   }

   constructor(private playlistsApi: PlaylistApiService) {
      makeAutoObservable(this.store);

      this.initPlaylists();
   }

   get list(): Playlist[] {
      return this.store.list;
   }

   get openedId(): string | null {
      return this.store.openedId;
   }

   setOpenedId = action((openedId: string | null) => {
      this.store.openedId = openedId;
   })

   updatePlayList(playlist: Playlist): Promise<void> {
      runInAction(() => this.store.stats = DataStatus.loading);

      return this.playlistsApi.updatePlaylist(playlist.id, playlist)
         .then(() => runInAction(() => {
            this.store.stats = DataStatus.done;

            const index = this.store.list.findIndex(it => it.id === playlist.id);

            if (index !== -1) {
               this.store.list[index] = playlist;
            }
         }))
   }

   removePlayList(id: string): Promise<void> {
      return this.playlistsApi.removePlaylist(id).then(() => runInAction(() => {
         this.store.list = this.store.list.filter(item => item.id !== id);
      }));
   }

   createPlaylist(playlist: PlaylistData): Promise<Playlist> {
      return this.playlistsApi.createPlaylist(playlist).then(response => runInAction(() => {
         this.store.list.push(response);

         return response;
      }));
   }

   deleteSongFromPlaylist(playlistId: string, songHash: string): Promise<void> {
      return runInAction( () => {
         const playlist = toJS(this.list).find(item => item.id === playlistId);

         if (!playlist) {
            return Promise.reject('Playlist not found')
         }

         return this.updatePlayList({
            ...playlist,
            songs: playlist.songs.filter(item => item.hash !== songHash)
         });
      })
   }

   private initPlaylists() {
      onBecomeObserved(this.store, 'list', () => {
         console.log('xxx start loading', this.store.stats);

         if (this.store.stats !== DataStatus.empty) {
            return;
         }

         runInAction(() => {
            this.store.stats = DataStatus.loading;
         })

         this.playlistsApi.loadPlaylists().then(result => {
            runInAction(() => {
               this.store.stats = DataStatus.done;
               this.store.list = result.list;
            })
         })
      })
   }
}

export const playlistsService = new PlaylistsService(playlistApiService);
