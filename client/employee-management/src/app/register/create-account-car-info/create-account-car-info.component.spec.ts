import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountCarInfoComponent } from './create-account-car-info.component';

describe('CreateAccountCarInfoComponent', () => {
  let component: CreateAccountCarInfoComponent;
  let fixture: ComponentFixture<CreateAccountCarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountCarInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountCarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
