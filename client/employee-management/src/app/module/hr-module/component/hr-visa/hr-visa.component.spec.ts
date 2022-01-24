import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVisaComponent } from './hr-visa.component';

describe('HrVisaComponent', () => {
  let component: HrVisaComponent;
  let fixture: ComponentFixture<HrVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrVisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
