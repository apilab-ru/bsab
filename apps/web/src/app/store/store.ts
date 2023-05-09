import { configureStore } from '@reduxjs/toolkit';
import { filterReducer, FilterState } from "./filter/store";
import { filterQueryUpdater } from "./filter/middleware";
import { createEpicMiddleware } from 'redux-observable';
import { mapsLoadEpic } from "./maps/epics";
import { mapsReducer, MapsState } from "./maps/store";
import { userReducer, UserState } from "./user/store";
import thunkMiddleware from 'redux-thunk'

const epicMiddleware = createEpicMiddleware();

declare module 'react-redux' {
   interface DefaultRootState extends RootState {
   }
}

export interface RootState {
   filter: FilterState
   maps: MapsState;
   user: UserState;
}

export const AppStore = configureStore({
   reducer: {
      filter: filterReducer,
      maps: mapsReducer,
      user: userReducer,
   },
   middleware: [
      thunkMiddleware,
      filterQueryUpdater,
      epicMiddleware
   ],
})


// @ts-ignore
epicMiddleware.run(mapsLoadEpic);
