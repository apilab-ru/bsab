import { action, makeAutoObservable } from "mobx";

export interface NotificationParam {
   type: "success" | "info" | "warning" | "error";
   message: string;
   autoHideDuration?: number;
}

export interface Notification extends NotificationParam {
   id: number;
}

export class NotificationService {
   private store = {
      notifications: [] as Notification[]
   }

   constructor() {
      makeAutoObservable(this.store);
   }

   get list(): Notification[] {
      return this.store.notifications;
   }

   addNotification = action((param: NotificationParam) => {
      console.log(param)

      this.store.notifications.push({
         ...param,
         id: hashCodeNumber(param.message + param.type + new Date().getTime()),
      });
   })

   removeNotifications = action((ids: number[]) => {
      this.store.notifications = this.store.notifications.filter(item => !ids.includes(item.id))
   })
}

export function hashCodeNumber(s: string): number {
   return s.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a
   }, 0)
}

export const notificationService = new NotificationService();
