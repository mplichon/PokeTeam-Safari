import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCrud } from './navbar-crud';

describe('NavbarCrud', () => {
  let component: NavbarCrud;
  let fixture: ComponentFixture<NavbarCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
