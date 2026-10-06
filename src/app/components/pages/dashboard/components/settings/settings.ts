import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {

  activeTab: string = 'account';
  isNotificationMenuOpen: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }



  terminateSession() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);

      return 1;
    } else if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
      this.router.navigate(['/home']);

      return 1;
    } else {
      return 0;
    }
  }

  clearMemoryStorage(userId: number) {
    const deletedItems = [`categories_${userId}`, `emergencyContacts_${userId}`, `history_${userId}`, `medicines_${userId}`];
    for (let item of deletedItems) {
      if (localStorage.getItem(item)) {
        localStorage.removeItem(item)
      }
    }
  }

  confirmDeleteAccount() {
    const isConfirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (isConfirmed) {
      const user = this.userService.getCurrentUser();
      const users = this.userService.getUsers();
      if (user) {
        const userIndex = users.findIndex((u) => u.id === user.id);
        users.splice(userIndex, 1);
        this.clearMemoryStorage(user.id);
        this.terminateSession();
      }
    }
  }

}