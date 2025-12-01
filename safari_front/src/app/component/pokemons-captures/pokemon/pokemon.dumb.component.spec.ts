import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDumbComponent } from './pokemon.dumb.component';

describe('PokemonDumbComponent', () => {
  let component: PokemonDumbComponent;
  let fixture: ComponentFixture<PokemonDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
