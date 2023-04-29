import { load } from '../maps/store';
import { RootState } from '../store';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { LOAD_NEXT_OFFSET } from '../../services/const';
import { filterService } from "../../services/filter.service";

export const filterQueryUpdater: Middleware<RootState> = (store: MiddlewareAPI<Dispatch, RootState>) => next => action => {
  const result = next(action);

  if (action.type === 'filter/filterSetFromLocation') {
     const state = store.getState().filter;
     const { values, orderField, orderDirection, offset } = state;

     store.dispatch(load({ values, offset, orderField, orderDirection, strategy: 'future' }))
  }

  if ((action.type.includes('filter/')
     && !['filter/filterSetFromLocation', 'filter/setOffset'].includes(action.type)
  ) || (action.type === 'user/set')) {

    const state = store.getState().filter;

    const url = filterService.buildQuery(state);

    window.history.pushState(
      { page: "main" },
      '',
       url
    );

    const offset = 0;
    const { values, orderField, orderDirection } = state;

    location.hash = '';

    store.dispatch(load({ values, offset, orderField, orderDirection, strategy: 'future' }))
  }

  if (action.type === 'filter/setOffset') {
     const offset = store.getState().filter.offset || 0;
     const baseOffset = store.getState().filter.baseOffset || 0;
     const { values, orderField, orderDirection } = store.getState().filter;
     const { list, isLoading, hasMore } = store.getState().maps;

     location.hash = offset ? ('#' + offset) : '';

     if (!isLoading && hasMore && offset + LOAD_NEXT_OFFSET > list.length) {
        store.dispatch(load({ values, offset: list.length + baseOffset, orderField, orderDirection, strategy: 'future' }))
     }
  }

  return result
}
