import { createSlice } from '@reduxjs/toolkit';
import { SearchValue } from '../../interfaces/filter';
import { OrderDirection, OrderField } from '@bsab/api/request/request';
import { StorePayload } from '../../../../../../libs/shared/src/store/payload';

// https://redux-toolkit.js.org/usage/usage-guide

export const FILER_INIT_STATE = {
   values: [] as SearchValue[],
   orderField: OrderField.createdAt,
   orderDirection: OrderDirection.desc,
   offset: undefined as number | undefined
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

      set: (state, { payload }: StorePayload<Partial<FilterState>>) => {
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

export const { add, remove, set, setOffset } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
