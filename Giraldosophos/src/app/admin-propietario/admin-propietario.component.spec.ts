import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropietarioComponent } from './admin-propietario.component';

describe('AdminPropietarioComponent', () => {
  let component: AdminPropietarioComponent;
  let fixture: ComponentFixture<AdminPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPropietarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
