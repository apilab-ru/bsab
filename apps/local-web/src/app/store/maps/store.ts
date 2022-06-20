import { createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "../../models/status";
import { IMap } from "@bsab/api/map/map";

const MAPS_INIT_STATE = {
  list: [] as IMap[],
  stats: DataStatus.empty as DataStatus,
};

export type MapsState = typeof MAPS_INIT_STATE;

const mapsSlice = createSlice({
  name: 'maps',
  initialState: MAPS_INIT_STATE,
  reducers: {
    load: (state) => {
      state.stats = DataStatus.loading;
    },
    set: (state, { payload }: { payload: Partial<MapsState> }) => {
      for(const key in payload) {
        // @ts-ignore
        state[key] = payload[key];
      }
    },
    completeLoading(state, { payload }): void {
      state.list = payload;
      state.stats = DataStatus.done;
    }
  },
})

export const { load, set, completeLoading } = mapsSlice.actions;
export const mapsReducer = mapsSlice.reducer;
