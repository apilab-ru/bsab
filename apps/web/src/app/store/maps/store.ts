import { createSlice } from "@reduxjs/toolkit";
import { FilterState } from "../filter/store";
import { Map, Tag } from "../../api";

const initialState = {
  list: [] as Map[],
  isLoading: false,
  tags: [] as Tag[],
};

export type MapsState = typeof initialState;

interface SetPayload {
  isMerge: boolean;
  list: Map[];
}

export const mapsSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    load: (state, { payload }: { payload: FilterState }) => {
      state.isLoading = true;
    },
    set: (state, { payload }: { payload: SetPayload }) => {
      if (payload.isMerge) {
        state.list = [
          // @ts-ignore
          ...state.list,
          // @ts-ignore
          payload.list
        ];
      } else {
        state.list = payload.list;
      }
      state.isLoading = false;
    },
  }
});

export const { load, set } = mapsSlice.actions;
export const mapsReducer = mapsSlice.reducer;
