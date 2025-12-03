import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bouton } from './bouton';

describe('Bouton', () => {
  let component: Bouton;
  let fixture: ComponentFixture<Bouton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bouton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bouton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
