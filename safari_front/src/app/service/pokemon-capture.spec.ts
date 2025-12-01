import { TestBed } from '@angular/core/testing';

import { PokemonCapture } from './pokemon-capture';

describe('PokemonCapture', () => {
  let service: PokemonCapture;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCapture);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
