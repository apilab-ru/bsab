import { useDispatch } from "react-redux";
import { OrderDirection, OrderField } from "@bsab/api/request/request";
import { FilterState, set } from "../../../store/filter/store";
import { Maps } from "../maps/maps";

export function MapsRoot() {
   const dispatch = useDispatch();
   const urlSearchParams = new URLSearchParams(window.location.search);
   const params = Object.fromEntries(urlSearchParams.entries()) as {
      orderField: OrderField;
      orderDirection: OrderDirection;
      filter: string;
   };

   const baseFilterValues = params.filter ? JSON.parse(params.filter) : [];
   const { orderField, orderDirection } = params;
   const offset = parseInt(location.hash.substr(1));

   const setParams: Partial<FilterState> = {};
   setParams.values = baseFilterValues;
   if (!isNaN(offset)) {
      setParams.offset = offset;
   }
   if (orderField) {
      setParams.orderField = orderField;
   }
   if (orderDirection) {
      setParams.orderDirection = orderDirection;
   }

   dispatch(set(setParams));

   return (
      <Maps/>
   );
}

export default MapsRoot;
