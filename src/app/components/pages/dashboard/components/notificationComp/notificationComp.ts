import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationService,
  AppNotification
} from '../../../../../services/notification';

@Component({
  selector: 'app-notification-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificationComp.html',
  styleUrls: ['./notificationComp.css']
})

export class NotificationComp implements OnInit {

  private notificationService = inject(NotificationService);
   notifications: AppNotification[] = [];

  selectedFilter: 'All' | 'Unread' | 'Reminders' | 'Appointments' = 'All';
  
  ngOnInit(): void {
    this.loadNotifications();

      //Generating demo notification every 15 second
      setInterval(() => {
      console.log("Generating");
      this.notificationService.generateDemoNotification();
      this.loadNotifications();
      }, 60000); 

  }

  loadNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  get filteredNotifications(): AppNotification[] {

    switch (this.selectedFilter) {

      case 'Unread':
        return this.notifications.filter(n => !n.read);

      case 'Reminders':
        return this.notifications.filter(n => n.type === 'reminder');

      case 'Appointments':
        return this.notifications.filter(n => n.type === 'appointment');

      default:
        return this.notifications;
    }
  }

  selectFilter(filter: 'All' | 'Unread' | 'Reminders' | 'Appointments'): void {
    this.selectedFilter = filter;
  }

  markAsRead(notification: AppNotification): void {
    this.notificationService.markAsRead(notification.id);
    this.loadNotifications();
  }


  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
    this.loadNotifications();
  }

  dismissAll(): void {
  this.notificationService.dismissAll();
  this.loadNotifications();
}

  

}