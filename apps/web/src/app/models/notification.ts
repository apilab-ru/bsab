export interface NotificationParam {
   type: "success" | "info" | "warning" | "error";
   message: string;
   autoHideDuration?: number;
}

export interface Notification extends NotificationParam {
   id: number;
}
