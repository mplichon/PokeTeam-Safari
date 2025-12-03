import { inject } from "@angular/core";
import { JwtService } from "../service/jwt-service";
import { CanActivateFn, Router } from "@angular/router";


export const joueurGuard: CanActivateFn = () => {
  const jwt = inject(JwtService);
  const router = inject(Router);

  // Pas connecté → login
  if (!jwt.hasToken) {
    return router.createUrlTree(['/login']);
  }

  // Si admin → interdit
  if (jwt.isAdmin) {
    return router.createUrlTree(['/admin']); // ou une page 403
  }

  // OK pour un joueur
  return true;
};