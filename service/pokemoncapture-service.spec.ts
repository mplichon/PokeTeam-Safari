import { TestBed } from '@angular/core/testing';

import { PokemoncaptureService } from './pokemoncapture-service';

describe('PokemoncaptureService', () => {
  let service: PokemoncaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemoncaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
