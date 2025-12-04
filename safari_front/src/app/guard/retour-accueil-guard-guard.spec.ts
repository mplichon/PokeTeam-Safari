import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { retourAccueilGuardGuard } from './retour-accueil-guard-guard';

describe('retourAccueilGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => retourAccueilGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
