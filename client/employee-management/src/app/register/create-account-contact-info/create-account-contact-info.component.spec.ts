import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountContactInfoComponent } from './create-account-contact-info.component';

describe('CreateAccountContactInfoComponent', () => {
  let component: CreateAccountContactInfoComponent;
  let fixture: ComponentFixture<CreateAccountContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountContactInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
