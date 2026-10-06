import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService, User } from '../../../../services/user';

@Component({
  selector: 'app-cta',
  imports: [RouterLink],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class Cta implements OnInit {
  constructor(private userService: UserService) { }
  user!: User | null;
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser() ?? null;
  }

}
