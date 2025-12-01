import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexAccess } from './pokedex-access';

describe('PokedexAccess', () => {
  let component: PokedexAccess;
  let fixture: ComponentFixture<PokedexAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
