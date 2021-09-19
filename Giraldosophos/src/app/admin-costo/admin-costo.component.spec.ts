import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCostoComponent } from './admin-costo.component';

describe('AdminCostoComponent', () => {
  let component: AdminCostoComponent;
  let fixture: ComponentFixture<AdminCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCostoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
