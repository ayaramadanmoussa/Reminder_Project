import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User, UserService } from '../../../../services/user';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  constructor(private userService: UserService) { }
  user!: User | null;
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser() ?? null;
  }

  
}
