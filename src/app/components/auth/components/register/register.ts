import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user';
import Swal from 'sweetalert2';

// ReactiveFormsModule make app read reactive form 
// form group track the value and validity of the form input 
// help creating formGroup faster => less code 
// validator check the user input if it correct 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeTerms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const users = this.userService.getUsers();
      const user = this.registerForm.value;
      const isFound = users.find((u) => u?.email === user?.email);
      if (isFound) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Registration Failed Email Taken.',
        });
      } else {
        // TO CONFIRM THE ID IS UNIQUE
        let idGen = 123456;
        let isFoundID = users.find((u) => u?.id === idGen);
        while (isFoundID) {
          idGen = Math.round((Math.random() * 1000000));
          isFoundID = users.find((u) => u?.id === idGen)
        }
        // 8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=8=
        this.router.navigate(['/auth/login']);
        this.userService.setUser({ id: idGen, name: `${user?.firstName} ${user?.lastName}`, email: user?.email, password: user?.password });
        this.userService.saveUsers();
        // console.log(this.userService.getUsers());
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Registration Failed.',
      });
      this.registerForm.markAllAsTouched();
    }
  }
}
