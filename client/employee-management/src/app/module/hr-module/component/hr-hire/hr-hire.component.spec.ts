import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHireComponent } from './hr-hire.component';

describe('HrHireComponent', () => {
  let component: HrHireComponent;
  let fixture: ComponentFixture<HrHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrHireComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
