export class NotificationService {
  error(message: string): void {
    console.error(message);
  }

  info(message: string): void {
    console.info(message);
  }
}

export const notificationService = new NotificationService();