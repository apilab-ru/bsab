import { createSlice } from '@reduxjs/toolkit'
import { SearchValue } from "../../interfaces/filter";
import { OrderDirection, OrderField } from "../../api";

// https://redux-toolkit.js.org/usage/usage-guide

export const FILER_INIT_STATE = {
  values: [] as SearchValue[],
  orderField: OrderField.createdAt,
  orderDirection: OrderDirection.desc,
  page: 1,
};

export type FilterState = typeof FILER_INIT_STATE;

export const filterSlice = createSlice({
  name: 'filter',
  initialState: FILER_INIT_STATE,
  reducers: {
    add: (state, { payload }) => {
      state.values.push(payload);
      state.page = 1;
    },
    remove: (state, { payload }) => {
      state.values.splice(payload, 1);
      state.page = 1;
    },
    set: (state, { payload }: { payload: Partial<FilterState> }) => {
      state = {
        ...state,
        ...payload,
      };
    },
    nextPage: (state) => {
      state.page = state.page + 1;
    }
  },
})

export const { add, remove, set, nextPage } = filterSlice.actions
export const filterReducer = filterSlice.reducer;
