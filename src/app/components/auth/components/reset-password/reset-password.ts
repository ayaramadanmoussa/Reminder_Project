import { Component } from '@angular/core';
import { EmailMethod } from './components/rightside/email-method.component';

@Component({
  selector: 'app-reset-password',
  imports: [EmailMethod],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword { }
