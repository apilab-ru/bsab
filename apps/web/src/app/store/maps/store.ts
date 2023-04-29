import { createSlice } from '@reduxjs/toolkit';
import { FilterState } from '../filter/store';
import { Tag } from '@bsab/api/request/request';
import { mapsApiService } from '../../services/maps-api-service';
import { MapDetail } from '@bsab/api/map/map-detail';
import { StorePayload } from '@shared/store/payload';

const initialState = {
   list: [] as MapDetail[],
   isLoading: false,
   tags: [] as Tag[],
   showed: [] as string[],
   openedId: null as string | null,
   total: null as number | null,
   offset: null as number | null,
   hasMore: true,
   hasPrevent: false,
};

export type MapsState = typeof initialState;

export interface SetMapsPayload {
   isMerge: boolean;
   list: MapDetail[];
   strategy: 'future' | 'past';
   hasMore?: boolean;
   hasPrevent?: boolean;
   total?: number;
}

export interface MapsLoadPayload extends FilterState {
   strategy: 'future' | 'past';
}

export const mapsSlice = createSlice({
   name: 'maps',
   initialState,
   reducers: {
      load: (state, { payload }: StorePayload<Partial<MapsLoadPayload>>) => {
         state.isLoading = true;
      },

      setList: (state: MapsState, { payload }: StorePayload<SetMapsPayload>) => {
         const { isMerge, list, ...params } = payload;
         if (isMerge) {
            state.list = [
               ...state.list,
               ...list
            ];
         } else {
            state.list = list;
         }
         state.isLoading = false;

         Object.entries(params).forEach(([key, value]) => {
            // @ts-ignore
            state[key] = value;
         })
      },

      setOpened: (state, { payload }: { payload: string | null }) => {
         state.openedId = payload;
      },

      addToShowed: (state, { payload }: { payload: string }) => {
         if (!state.showed.includes(payload)) {
            state.showed.push(payload);
         }
      },

      resetShowed: (state) => {
         state.showed = [];
      }
   },

});

export const { load, setList, setOpened, addToShowed, resetShowed } = mapsSlice.actions;
export const mapsReducer = mapsSlice.reducer;
