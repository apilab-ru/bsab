import { environment } from "../../environments/environment";
import { User, UserAuthParams, UserRegParams } from "@bsab/api/user/user";
import axios from 'axios';
import { UserConfig } from "../models/user-config";
import { NotificationParam } from "../models/notification";

const KEY_STORE_USER = 'bsabUser';
const KEY_STORE_CONFIG = 'bsabConfig';

export class UsersApiService {
   private api: string;

   constructor(
      apiUrl: string,
   ) {
      this.api = apiUrl + '/users/';
   }

   login(params: UserAuthParams): Promise<User> {
      return axios.post(this.api + 'login', params).then(res => res.data);
   }

   registration(params: UserRegParams): Promise<User> {
      return axios.post(this.api + 'registration', params).then(res => res.data);
   }

   load(): User | null {
      const user = localStorage.getItem(KEY_STORE_USER);

      if (!user) {
         return null;
      }

      return JSON.parse(user);
   }

   loadConfig(): UserConfig {
      const config = localStorage.getItem(KEY_STORE_CONFIG);

      if (!config) {
         return {}
      }

      return JSON.parse(config);
   }

   setUser(user: User): void {
      localStorage.setItem(KEY_STORE_USER, JSON.stringify(user));
   }

   setConfig(config: UserConfig): void {
      localStorage.setItem(KEY_STORE_CONFIG, JSON.stringify(config));
   }
}

export const usersApiService = new UsersApiService(environment.api);
