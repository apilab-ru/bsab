import { User, UserAuthParams } from "@bsab/api/user/user";
import { UserConfig } from "../models/user-config";
import { Notification } from "../models/notification";
import { UsersApiService, usersApiService } from "../services/users-api.service";
import { hashCodeNumber } from "@shared/string/hash-code";
import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved, runInAction } from 'mobx';
import { Observable, Subscription } from "rxjs";


export class UserService {
   private store = {
      user: undefined as undefined | null | User,
      config: undefined as undefined | UserConfig,
      notifications: [] as Notification[],
   }

   constructor(
      private userApi: UsersApiService
   ) {
      makeAutoObservable(this.store);
      this.initUser();
   }

   get config() {
      return this.store.config;
   }

   get user() {
      return this.store.user;
   }

   login(params: UserAuthParams) {
      return this.userApi.login(params).then(user => {
         this.addNotification({
            message: 'Login successful',
            type: 'success',
         });

         this.store.user = user;
      })
   }

   addNotification(item: Omit<Notification, 'id'>): void {
      this.store.notifications.push({
         ...item,
         id: hashCodeNumber(item.message + item.type + new Date().getTime()),
      });
   }

   private initUser() {
      // to helper
      let userSub: Subscription | undefined;
      onBecomeObserved(this.store, 'user', () => {
         userSub = this.loadUser().subscribe(user => {
            runInAction(() => {
               this.store.user = user;
            })
         })
      })

      onBecomeUnobserved(this.store, 'user', () => {
         if (userSub) {
            userSub.unsubscribe()
         }
      })
   }

   loadUser(): Observable<User> {
      console.log('xxx load user');

      return new Observable<User>(subject => {
         let index = 0;
         setInterval(() => {
            subject.next({
               id: ++index,
               token: '',
               name: 'test',
               email: 'test'
            })
         }, 3000)

         return () => {
            console.log('xxx cancel user request');
         }
      })
   }
}

export const userService = new UserService(usersApiService);
