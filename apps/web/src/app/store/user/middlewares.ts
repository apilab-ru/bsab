import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersApiService } from "../../services/users-api.service";
import { setConfig, setUser } from "./store";
import { UserAuthParams, UserRegParams } from "@bsab/api/user/user";

export const userLoad = createAsyncThunk(
   'user/load',
   (_, thunkApi) => {
      const user = usersApiService.load();
      const config = usersApiService.loadConfig();

      thunkApi.dispatch(setConfig(config));
      thunkApi.dispatch(setUser(user));
   }
)

export const userRegistration = createAsyncThunk<void, UserRegParams>(
   'user/reg',
   async (param, thunkApi) => {
      const user = await usersApiService.registration(param);

      thunkApi.dispatch(setUser(user));
   }
)

export const userLogin = createAsyncThunk<void, UserAuthParams>(
   'user/login',
   async (params, thunkApi) => {
      return usersApiService.login(params).then(user => {
         usersApiService.setUser(user);
         thunkApi.dispatch(setUser(user));
      }).catch(() => {
         return Promise.reject('User not found');
      })
   }
);
