import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }



  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),

    remember: new FormControl(false)
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const users = this.userService.getUsers();
    const isFound = users.find((user) => user.email === this.loginForm.value.email);
    if (isFound) {
      const indexOfUser = users.findIndex((e) => e.email == this.loginForm.value.email);
      const currentUser = users[indexOfUser];
      const isHim = (currentUser.password === this.loginForm.value.password);

      if (isHim) {
        this.router.navigate(['/home']);

        if (this.loginForm.value.remember) {
          localStorage.setItem('user', JSON.stringify({ id: currentUser.id, name: currentUser.name, email: currentUser.email }));
        } else {
          sessionStorage.setItem('user', JSON.stringify({ id: currentUser.id, name: currentUser.name, email: currentUser.email }));
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed Cardentials!',
          text: 'Email or password are wrong !',
        });
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed Cardentials!',
        text: 'Email or password are wrong !',
      });
    }
    console.log(this.loginForm.value);
  }

}