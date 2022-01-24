import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeDetailComponent } from './hr-employee-detail.component';

describe('HrEmployeeDetailComponent', () => {
  let component: HrEmployeeDetailComponent;
  let fixture: ComponentFixture<HrEmployeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEmployeeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
