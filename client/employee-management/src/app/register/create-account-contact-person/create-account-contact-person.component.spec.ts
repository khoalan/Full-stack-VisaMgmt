import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountContactPersonComponent } from './create-account-contact-person.component';

describe('CreateAccountContactPersonComponent', () => {
  let component: CreateAccountContactPersonComponent;
  let fixture: ComponentFixture<CreateAccountContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountContactPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
