export interface Playlist {
  "playlistTitle": string,
  "playlistAuthor": string,
  "customData": {
    "AllowDuplicates": boolean
  },
  songs: Song[];
  image: string;
  id: string;
}

export interface Song {
  "songName": string,
  "levelAuthorName": string,
  "hash": string,
  "levelid": string,
  "difficulties": SongDifficult[];
}

export interface SongDifficult {
  "characteristic": string,
  "name": string;
}
