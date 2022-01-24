import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrUploadComponent } from './hr-upload.component';

describe('HrUploadComponent', () => {
  let component: HrUploadComponent;
  let fixture: ComponentFixture<HrUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
