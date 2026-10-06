import { Injectable } from '@angular/core';

export type NotificationType = 'reminder' | 'appointment' | 'alert' | 'missed';

export interface AppNotification {
  id: number;
  title: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private storageKey = 'notifications';

  private notifications: AppNotification[] = [];

  //For demo
  private demoNotifications = [
    {
      title: 'Time to take your Aspirin',
      type: 'reminder' as NotificationType
    },
    {
      title: 'Vitamin D is due now',
      type: 'reminder' as NotificationType
    },
    // {
    //   title: 'Doctor appointment tomorrow',
    //   type: 'appointment' as NotificationType
    // },
    // {
    //   title: 'Upcoming clinic visit in 30 minutes',
    //   type: 'appointment' as NotificationType
    // },
    {
      title: 'You missed your morning dose',
      type: 'missed' as NotificationType
    },
    {
      title: 'Stay hydrated today',
      type: 'alert' as NotificationType
    },
    {
      title: 'Blood pressure check reminder',
      type: 'alert' as NotificationType
    }
  ];

  constructor() {
    const savedNotifications = localStorage.getItem(this.storageKey);

    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
    } else {
      this.notifications = [
        {
          id: 1,
          title: 'Medicine Reminder',
          time: '10 minutes ago',
          type: 'reminder',
          read: false
        }
      ];

      this.saveNotifications();
    }

  }

  private saveNotifications(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notifications));
  }

  getNotifications(): AppNotification[] {
    return this.notifications;
  }

  addNotification(notification: AppNotification): void {
    this.notifications.unshift(notification);
    this.saveNotifications();
  }

  markAsRead(id: number): void {
    const notification = this.notifications.find(item => item.id === id);

    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });

    this.saveNotifications();
  }


  getUnreadCount(): number {
    return this.notifications.filter(
      notification => !notification.read
    ).length;
  }

  generateDemoNotification(): void {

    const random =
      this.demoNotifications[
      Math.floor(Math.random() * this.demoNotifications.length)
      ];

    this.addNotification({
      id: Date.now(),
      title: random.title,
      time: 'Just now',
      type: random.type,
      read: false
    });

}

dismissAll(): void {
  this.notifications = [];
  localStorage.setItem('notifications', JSON.stringify(this.notifications));
}
  
}