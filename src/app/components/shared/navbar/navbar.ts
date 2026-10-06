import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User, UserService } from '../../../services/user';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  constructor(private userService: UserService) {

  }
  user!: User | { name: string };

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser() ?? { name: 'Guest' };
  }

  isThereAUser(): boolean {
    return (this.userService.getCurrentUser() ? true : false);
  }
}
