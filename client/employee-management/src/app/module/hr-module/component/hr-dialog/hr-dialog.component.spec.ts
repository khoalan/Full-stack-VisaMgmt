import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDialogComponent } from './hr-dialog.component';

describe('HrDialogComponent', () => {
  let component: HrDialogComponent;
  let fixture: ComponentFixture<HrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
