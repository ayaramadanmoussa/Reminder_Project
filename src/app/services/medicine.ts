import { Injectable, inject } from '@angular/core';
import { UserService } from './user';
import { NotificationService } from './notification';

// injectable root make this file available for the whole project can use it

export interface Category {
  name: string;
  count: number;
}

export interface HistoryRecord {
  medicine: string;
  category: string;
  scheduled: string;
  date: Date;
  status: 'Taken' | 'Missed' | 'Skipped';
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private userService = inject(UserService);

  private notificationService = inject(NotificationService);


  // -------- الأقسام (Categories) --------
  categories: Category[] = [];
  catogoryAddedLatest = 0;

  getCategories(): Category[] {
    const user = this.userService.getCurrentUser();
    if (!user) return [];

    const data = localStorage.getItem(`categories_${user.id}`);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  private saveCategories(categories: Category[]) {
    const user = this.userService.getCurrentUser();
    if (user) {
      localStorage.setItem(`categories_${user.id}`, JSON.stringify(categories));
    }
  }

  addCategory(name: string) {
    const categories = this.getCategories();
    categories.push({ name, count: 0 });
    this.catogoryAddedLatest++;
    this.saveCategories(categories);
  }

  editCategory(index: number, newName: string) {
    const categories = this.getCategories();
    if (categories[index]) {
      categories[index].name = newName;
      this.saveCategories(categories);
    }
  }

  deleteCategory(index: number) {
    const categories = this.getCategories();
    categories.splice(index, 1);
    this.saveCategories(categories);
  }

  // -------- الأدوية (Medicines) --------
  medicines: any[] = [];
  medicinesAddRecently = 0;

  saveMedicines(medicines: any[], userId: number) {
    this.medicinesAddRecently++;
    localStorage.setItem(`medicines_${userId}`, JSON.stringify(medicines));
  }

  getMedicines(): any[] {
    const user = this.userService.getCurrentUser();
    if (!user) return [];

    const data = localStorage.getItem(`medicines_${user.id}`);
    return data ? JSON.parse(data) : [];
  }

  addMedicine(newMed: any) {
    const user = this.userService.getCurrentUser();
    if (!user) return;
    const medicines = this.getMedicines();
    newMed.userId = user.id;
    medicines.unshift(newMed);
    this.saveMedicines(medicines, user.id);

    const categories = this.getCategories();
    const category = categories.find(c => c.name === newMed.category);
    if (category) {
      category.count = medicines.filter(m => m.category === newMed.category).length;
      this.saveCategories(categories);
    }

    const reminderTime = new Date(newMed.reminderTime).getTime();
    const delay = reminderTime - Date.now();

    if (delay > 0) {
      setTimeout(() => {
        this.notificationService.addNotification({
          id: Date.now(),
          title: 'Medicine Reminder',
          time: newMed.reminderTime,
          type: 'reminder',
          read: false
        });
      }, delay);
    }
  }

  markMedicine(med: any) {
    const user = this.userService.getCurrentUser();
    if (!user) return;

    const medicines = this.getMedicines();
    const medicine = medicines.find(m => m.id === med.id);

    if (medicine) {
      medicine.status = 'Completed';
      this.saveMedicines(medicines, user.id);

    }
  }

  logToHistory(med: any, status: 'Taken' | 'Missed' | 'Skipped') {
    const user = this.userService.getCurrentUser();
    if (!user) return;

    const now = new Date();
    const newRecord: HistoryRecord = {
      medicine: `${med.name} ${med.dose || ''}`.trim(),
      category: med.category,
      scheduled: this.formatDate(now),
      date: now,
      status: status
    };

    const history = this.getHistory();
    history.unshift(newRecord);
    this.saveHistory(history, user.id);
  }


  getHistory(): HistoryRecord[] {
    const user = this.userService.getCurrentUser();
    if (!user) return [];

    const data = localStorage.getItem(`history_${user.id}`);
    if (data) {
      const history = JSON.parse(data);

      return history.map((record: any) => ({
        ...record,
        date: new Date(record.date)
      }));
    }
    return [];
  }

  private saveHistory(history: HistoryRecord[], userId: number) {
    localStorage.setItem(`history_${userId}`, JSON.stringify(history));
  }

  private formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} · ${hour}:${m} ${ampm}`;
  }
}