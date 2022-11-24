import { createSlice } from "@reduxjs/toolkit";
import { FilterState } from "../filter/store";
import { Tag } from "../../api";
import { IMap } from '@bsab/api/map/map';
import { mapsApiService } from '../../services/maps-api-service';

const initialState = {
  list: [] as IMap[],
  isLoading: false,
  tags: [] as Tag[],
  showed: [] as string[],
  openedId: null as string | null,
};

export type MapsState = typeof initialState;

interface SetPayload {
  isMerge: boolean;
  list: IMap[];
}

export const mapsSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    load: (state, { payload }: { payload: FilterState }) => {
      state.isLoading = true;
    },

    setList: (state, { payload }: { payload: SetPayload }) => {
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

    setOpened: (state, { payload }: { payload: string | null }) => {
      state.openedId = payload;
    },

    addToShowed: (state, { payload }: { payload: string }) => {
      state.showed.push(payload);
      mapsApiService.markAsShowed(payload);
    },
  }
});

export const { load, setList, setOpened, addToShowed } = mapsSlice.actions;
export const mapsReducer = mapsSlice.reducer;
