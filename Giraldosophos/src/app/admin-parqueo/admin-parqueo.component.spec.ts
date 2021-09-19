import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParqueoComponent } from './admin-parqueo.component';

describe('AdminParqueoComponent', () => {
  let component: AdminParqueoComponent;
  let fixture: ComponentFixture<AdminParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
