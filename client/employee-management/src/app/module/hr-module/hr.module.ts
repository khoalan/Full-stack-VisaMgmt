import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HrRoutingModule } from './hr-routing.module';
import { HrHireComponent } from './component/hr-hire/hr-hire.component';
import { HrHomeComponent } from './component/hr-home/hr-home.component';
import { HrEmployeeComponent } from './component/hr-employee/hr-employee.component';
import { HrVisaComponent } from './component/hr-visa/hr-visa.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HrUploadComponent } from './component/hr-upload/hr-upload.component';
import { HrDialogComponent } from './component/hr-dialog/hr-dialog.component';
import { HrEmployeeDetailComponent } from './component/hr-employee/hr-employee-detail/hr-employee-detail.component';
@NgModule({
  declarations: [
    HrHomeComponent,
    HrHireComponent,
    HrEmployeeComponent,
    HrVisaComponent,
    HrUploadComponent,
    HrDialogComponent,
    HrEmployeeDetailComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    HrRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
  ],
})
export class HrModule {}
