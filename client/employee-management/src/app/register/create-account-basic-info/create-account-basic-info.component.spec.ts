import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountBasicInfoComponent } from './create-account-basic-info.component';

describe('CreateAccountBasicInfoComponent', () => {
  let component: CreateAccountBasicInfoComponent;
  let fixture: ComponentFixture<CreateAccountBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
