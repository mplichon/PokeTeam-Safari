import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsCaptures } from './pokemons-captures';

describe('PokemonsCaptures', () => {
  let component: PokemonsCaptures;
  let fixture: ComponentFixture<PokemonsCaptures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsCaptures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsCaptures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
