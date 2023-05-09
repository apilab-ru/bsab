import { createSlice } from '@reduxjs/toolkit';

import { OrderDirection, OrderField } from '@bsab/api/request/request';
import { StorePayload } from '@shared/store/payload';
import { SearchValue } from "@bsab/ui-kit/filter";

// https://redux-toolkit.js.org/usage/usage-guide

export const FILER_INIT_STATE = {
   values: [] as SearchValue[],
   orderField: OrderField.createdAt,
   orderDirection: OrderDirection.desc,
   offset: undefined as number | undefined,
   baseOffset: 0,
};

export type FilterState = typeof FILER_INIT_STATE;

export const filterSlice = createSlice({
   name: 'filter',
   initialState: FILER_INIT_STATE,
   reducers: {
      add: (state, { payload }: StorePayload<SearchValue>) => {
         state.values.push(payload);
         state.offset = 0;
      },

      remove: (state, { payload }: StorePayload<number>) => {
         state.values.splice(payload, 1);
         state.offset = 0;
      },

      filterSetFromLocation: (state, { payload }: StorePayload<Partial<FilterState>>) => {
         state.baseOffset = payload.offset || 0;

         Object.entries(payload).forEach(([key, value]) => {
            // @ts-ignore
            state[key] = value;
         });
      },

      filterSet: (state, { payload }: StorePayload<Partial<FilterState>>) => {
         Object.entries(payload).forEach(([key, value]) => {
            // @ts-ignore
            state[key] = value;
         });
      },

      setOffset: (state, { payload }: StorePayload<number>) => {
         state.offset = payload;
      }
   }
});

export const { add, remove, filterSet, setOffset, filterSetFromLocation } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
