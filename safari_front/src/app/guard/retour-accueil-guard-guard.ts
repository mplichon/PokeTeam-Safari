import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../service/jwt-service';
import { inject } from '@angular/core';

export const retourAccueilGuardGuard: CanActivateFn = () => {
  const jwt = inject(JwtService);
  const router = inject(Router);

  // Pas connecté → login
  if (!jwt.hasToken) {
    return router.createUrlTree(['/login']);
  }

  // Si admin → accueil admin
  if (jwt.isAdmin) {
    return router.createUrlTree(['/gestion/admin']);
  }

  // Si joueur → accueil joueur
  if (jwt.isJoueur) {
    return router.createUrlTree(['/game']);
  }
  
  return router.createUrlTree(['/login']);
};
