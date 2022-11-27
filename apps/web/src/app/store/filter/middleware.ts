import { load } from '../maps/store';
import { FILER_INIT_STATE } from "./store";
import { prepareUrlParams } from '../../helpers/url';

interface QueryParams {
  filter?: string;
  page?: string;
  orderField?: string;
  orderDirection?: string;
}

// @ts-ignore
export const filterQueryUpdater = store => next => action => {
  const result = next(action);
  if (action.type.includes('filter/')) {
    const { values, page, orderField, orderDirection } = store.getState().filter;
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
    if (page && page !== 1) {
      params.page = page;
    }
    const stringValues = prepareUrlParams(params);
    window.history.pushState(
      { page: "main" },
      '',
      "/?" + stringValues
    );

    store.dispatch(load({ values, page, orderField, orderDirection }))
  }
  return result
}
