import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { filterReducer, FilterState } from "./filter/store";
import { filterQueryUpdater } from "./filter/middleware";
import { createEpicMiddleware } from 'redux-observable';
import { mapsEpic } from "./maps/epics";
import { mapsReducer, MapsState } from "./maps/store";

const epicMiddleware = createEpicMiddleware();

declare module 'react-redux' {
  interface DefaultRootState extends RootState {
  }
}

export interface RootState {
  filter: FilterState
  maps: MapsState;
}

export const AppStore = createStore(
  combineReducers({
    filter: filterReducer,
    maps: mapsReducer,
  }),
  applyMiddleware(filterQueryUpdater, epicMiddleware)
)

// @ts-ignore
epicMiddleware.run(mapsEpic);
