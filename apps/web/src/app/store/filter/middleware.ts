import { load } from '../maps/store';
import { FILER_INIT_STATE } from './store';
import { prepareUrlParams } from '../../helpers/url';
import { RootState } from '../store';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { LOAD_NEXT_OFFSET } from '../../services/const';

interface QueryParams {
  filter?: string;
  page?: string;
  orderField?: string;
  orderDirection?: string;
}

export const filterQueryUpdater: Middleware<RootState> = (store: MiddlewareAPI<Dispatch, RootState>) => next => action => {
  const result = next(action);

  if (action.type.includes('filter/') && action.type !== 'filter/setOffset') {
    const { values, offset, orderField, orderDirection } = store.getState().filter;
    const params: QueryParams = {};
    if (values.length) {
      params.filter = JSON.stringify(values)
    }
    if (orderField !== FILER_INIT_STATE.orderField) {
      params.orderField = orderField;
    }
    if (orderDirection !== FILER_INIT_STATE.orderDirection) {
      params.orderDirection = orderDirection;
    }

    const stringValues = prepareUrlParams(params);
    window.history.pushState(
      { page: "main" },
      '',
      "/?" + stringValues
    );

    location.hash = offset ? ('#' + offset) : '';

    store.dispatch(load({ values, offset, orderField, orderDirection, strategy: 'future' }))
  }

  if (action.type === 'filter/setOffset') {
     const offset = store.getState().filter.offset || 0;
     const { values, orderField, orderDirection } = store.getState().filter;
     const { list, isLoading, hasMore } = store.getState().maps;
     location.hash = offset ? ('#' + offset) : '';

     if (!isLoading && hasMore && offset + LOAD_NEXT_OFFSET > list.length) {
        store.dispatch(load({ values, offset: list.length + 1, orderField, orderDirection, strategy: 'future' }))
     }
  }

  return result
}
