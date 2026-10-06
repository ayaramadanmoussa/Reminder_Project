import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';

export const userGuard: CanActivateFn = (route, state) => {
  const userSerivce = inject(UserService);
  const router = inject(Router);
  if (userSerivce.getCurrentUser()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
