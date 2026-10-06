import { Injectable } from '@angular/core';

export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
    const data = localStorage.getItem('users');
    if (data) {
      this.users = JSON.parse(data);
    }
  }
  users: User[] = [];


  setUser(user: User) {
    this.users.push(user);
  }
  getUsers() {
    return this.users;
  }

  isThereUserLocalStorage() {
    return (localStorage.getItem('user') ? true : false);
  }
  isThereUserSessionStorage() {
    return (sessionStorage.getItem('user') ? true : false);
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }


getCurrentUser(): User | null {

  const localUser = localStorage.getItem('user');

  if (localUser) {
    return JSON.parse(localUser);
  }

  const sessionUser = sessionStorage.getItem('user');

  if (sessionUser) {
    return JSON.parse(sessionUser);
  }

  return null;
}

saveEmergencyContacts(contacts: any[]): void {
  const user = this.getCurrentUser();

  if (!user) return;

  localStorage.setItem(
    `emergencyContacts_${user.id}`,
    JSON.stringify(contacts)
  );
}

getEmergencyContacts(): any[] {
  const user = this.getCurrentUser();

  if (!user) return [];

  const data = localStorage.getItem(
    `emergencyContacts_${user.id}`
  );

  return data ? JSON.parse(data) : [];
}
}