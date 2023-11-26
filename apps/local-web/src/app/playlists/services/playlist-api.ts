import { environment } from "../../../environments/environment";
import { Playlist, PlaylistData } from "@bsab/api/local/playlist";
import axios from 'axios';

export class PlaylistApiService {

  loadPlaylists(): Promise<{ list: any[] }> {
    return axios.get(environment.api + 'playlists').then(res => res.data);
  }

  updatePlaylist(id: string, playlist: Playlist): Promise<void> {
     return axios.patch(environment.api + 'playlists/' + id, playlist);
  }

  removePlaylist(id: string): Promise<void> {
     return axios.delete(environment.api + 'playlists/' + id);
  }

  createPlaylist(data: PlaylistData): Promise<Playlist> {
      return axios.post(environment.api + 'playlists', data).then(res => res.data);
  }
}

export const playlistApiService = new PlaylistApiService();
