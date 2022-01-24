import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountResidentialStatusComponent } from './create-account-residential-status.component';

describe('CreateAccountResidentialStatusComponent', () => {
  let component: CreateAccountResidentialStatusComponent;
  let fixture: ComponentFixture<CreateAccountResidentialStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountResidentialStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountResidentialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
