
import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { Footer } from './components/shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('my-medicare-app');
  private route = inject(Router);


  //  Checks if the path equals to
  // /login or /register to hide nav and footer Component
  hideNavFootLocations = ['/auth/login', '/auth/register', '/auth/reset-password',
    '/dashboard/medicines', '/dashboard/create-medicine',
    '/dashboard', '/dashboard/profile',
    '/dashboard/history', '/dashboard/categories',
    '/dashboard/main', '/dashboard/emergency',
    '/dashboard/notification', '/dashboard/settings'];


  get getRoute() {
    return this.route.url;
  }
}
