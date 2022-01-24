import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountUserPassComponent } from './create-account-user-pass.component';

describe('CreateAccountUserPassComponent', () => {
  let component: CreateAccountUserPassComponent;
  let fixture: ComponentFixture<CreateAccountUserPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountUserPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountUserPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
