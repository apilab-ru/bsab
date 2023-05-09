import { environment } from "../../../environments/environment";
import { Playlist } from "@bsab/api/local/playlist";

export class PlaylistApiService {

  loadPlaylists(): Promise<{ list: any[] }> {
    return fetch(environment.api + 'playlists').then(res => res.json());
  }

  updatePlaylist(id: string, playlist: Playlist): Promise<void> {
    return fetch(environment.api + 'playlist/' + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(playlist)
    }).then(res => res.json());
  }

  removePlaylist(id: string): Promise<void> {
     return fetch(environment.api + 'playlist/' + id, {
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: 'DELETE',
     }).then(res => res.json());
  }
}

export const playlistApiService = new PlaylistApiService();
