import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurPage } from './joueur-page';

describe('JoueurPage', () => {
  let component: JoueurPage;
  let fixture: ComponentFixture<JoueurPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoueurPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoueurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
