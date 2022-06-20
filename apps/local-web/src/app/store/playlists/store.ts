import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "../../models/status";
import { Playlist } from "@bsab/api/local/playlist";
import { Payload } from "../../models/payload";

const PLAYLISTS_INIT_STATE = {
  list: [] as Playlist[],
  openedId: null as string | null,
  stats: DataStatus.empty as DataStatus,
};

export type PlaylistsState = typeof PLAYLISTS_INIT_STATE;

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: PLAYLISTS_INIT_STATE,
  reducers: {
    load: (state) => {
      state.stats = DataStatus.loading;
    },
    set: (state, { payload }: Payload<Partial<PlaylistsState>>) => {
      for(const key in payload) {
        // @ts-ignore
        state[key] = payload[key];
      }
    },
    completeLoading(state, { payload }): void {
      state.list = payload;
      state.stats = DataStatus.done;
    },
    open: (state, { payload }: Payload<string | null>) => {
      state.openedId = payload;
    },
    updatePlaylist: (state, { payload }: Payload<{ playlist: Playlist, id: string }>) => {
      state.stats = DataStatus.loading;
    },
    setPlaylist: (state, { payload }: Payload<{ playlist: Playlist, id: string }>) => {
      state.stats = DataStatus.done;
      const list = state.list;
      const index = list.findIndex(it => it.id === payload.id);

      if (index !== -1) {
        list[index] = payload.playlist;
        state.list = list;
      }
    }
  },
})

export const { load, set, completeLoading, open, updatePlaylist, setPlaylist } = playlistSlice.actions;
export const playlistsReducer = playlistSlice.reducer;
