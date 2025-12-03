import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../service/jwt-service';


export const adminGuard: CanActivateFn = () => {
  const jwt = inject(JwtService);
  const router = inject(Router);

  // Pas connecté → login
  if (!jwt.hasToken) {
    return router.createUrlTree(['/login']);
  }

  // Si joueur → accès refusé
  if (jwt.isJoueur) {
    return router.createUrlTree(['/game']); // ou une page 403
  }

  // OK si admin
  if (jwt.isAdmin) {
    return true;
  }

  return router.createUrlTree(['/login']);
};