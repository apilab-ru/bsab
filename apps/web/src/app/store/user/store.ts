import { User, UserAuthParams } from "@bsab/api/user/user";
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { StorePayload } from "@shared/store/payload";
import { makeCheckAction } from "@shared/store/test-action";
import { UserConfig } from "../../models/user-config";
import { usersApiService } from "../../services/users-api.service";

const initialState = {
   user: undefined as undefined | null | User,
   loading: false,
   error: null as string | null,
   config: undefined as undefined | UserConfig,
}

export type UserState = typeof initialState;

const isUserAction = makeCheckAction('user');

export const usersSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, { payload }: StorePayload<User | null>) => {
         state.loading = false;
         state.user = payload;
      },

      setError: (state, { payload }: StorePayload<string | null>) => {
         state.loading = false;
         state.error = payload;
      },

      logout: (state) => {
         state.user = null;
      },

      setConfig: (state, { payload }: StorePayload<UserConfig>) => {
         state.config = payload;
         usersApiService.setConfig(payload);
      },
   },
   extraReducers: (builder) => {
      /*builder.addMatcher(() => true, (state, action) => {
         console.log('xxx any action', action);
      })

      builder.addMatcher(isUserAction, (state, action) => {
         console.log('xxx user action', action);
      })*/

      builder.addMatcher(action => isPending(action) && isUserAction(action), (state) => {
         state.loading = true;
         state.error = null;
      })


      builder.addMatcher(action => !!(isUserAction(action) && isFulfilled(action)), (state, action) => {
         state.loading = false;
      })

      builder.addMatcher(action => !!(isUserAction(action) && isRejected(action)), (state, action) => {
         state.loading = false;
         state.error = action.error.message;
      })
   }
})

export const { setUser, logout, setError, setConfig } = usersSlice.actions;

export const userReducer = usersSlice.reducer;
