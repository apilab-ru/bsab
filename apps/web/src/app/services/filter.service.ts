import { FILER_INIT_STATE, FilterState } from "../store/filter/store";
import { prepareUrlParams } from "../helpers/url";
interface QueryParams {
   filter?: string;
   page?: string;
   orderField?: string;
   orderDirection?: string;
}

class FilterService {

   buildQuery(state: FilterState) {
      const { values, orderField, orderDirection } = state;

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

      return "/?" + stringValues;
   }

}

export const filterService = new FilterService();
