import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToShowed } from "./store";
import { RootState } from "../store";
import { mapsApiService } from "../../services/maps-api-service";

export const mapMarkShowed = createAsyncThunk<void, string>(
   'maps/markAsShowed',
   async (id: string, api) => {
      const token = (api.getState() as RootState).user?.user?.token;

      api.dispatch(addToShowed(id));

      if (token) {
         return mapsApiService.markAsShowed(id, token);
      }
   }
);
