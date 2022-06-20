import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import { mapsReducer, MapsState } from "./maps/store";
import { playlistsReducer, PlaylistsState } from "./playlists/store";
import { createEpicMiddleware } from "redux-observable";
import { mapsLoadEpic } from "./maps/epic";
import { playlistsEpics, updatePlaylist } from "./playlists/epic";

const epicMiddleware = createEpicMiddleware();

declare module 'react-redux' {
  interface DefaultRootState extends RootState {
  }
}

export interface RootState {
  playlists: PlaylistsState;
  maps: MapsState;
}

export const AppStore = createStore(
  combineReducers({
    playlists: playlistsReducer,
    maps: mapsReducer,
  }),
  applyMiddleware(epicMiddleware),
)

// @ts-ignore
epicMiddleware.run(mapsLoadEpic);
// @ts-ignore
epicMiddleware.run(playlistsEpics);
// @ts-ignore
epicMiddleware.run(updatePlaylist);

