import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterEvent } from '@angular/router';
import { UserService } from '../services/user';

export const guestGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.getCurrentUser()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
