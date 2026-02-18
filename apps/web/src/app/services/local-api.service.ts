import axios from 'axios';

const url = 'https://localhost:3333/';

class LocalApiService {
   addSongToPlaylist(songId: string, playlistId = 'gen-playlist.bplist'): Promise<void> {
      return axios.post(url + `playlists/${playlistId}/add-song/${songId}`).then(res => res.data);
   }
}

export const localApiService = new LocalApiService();
