import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HrLoginComponent } from './login/hr-login/hr-login.component';

import { HrModule } from './module/hr-module/hr.module';
import { EmployeeComponent } from './module/employee-module/component/employee/employee.component';

import { CreateAccountUserPassComponent } from './register/create-account-user-pass/create-account-user-pass.component';
import { CreateAccountBasicInfoComponent } from './register/create-account-basic-info/create-account-basic-info.component';
import { CreateAccountContactInfoComponent } from './register/create-account-contact-info/create-account-contact-info.component';
import { CreateAccountCarInfoComponent } from './register/create-account-car-info/create-account-car-info.component';
import { CreateAccountResidentialStatusComponent } from './register/create-account-residential-status/create-account-residential-status.component';
import { CreateAccountContactPersonComponent } from './register/create-account-contact-person/create-account-contact-person.component';
import { RegisterRoutingModule } from './register/register-routing/register-routing.module';
import { EditComponent } from './module/employee-module/component/edit/edit.component';

import { MatTabsModule } from '@angular/material/tabs';

import { VisaComponent } from './module/employee-module/component/visa/visa.component';
import { EmployeeHomeComponent } from './module/employee-module/component/employee-home/employee-home.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HrLoginComponent,
    CreateAccountUserPassComponent,
    CreateAccountBasicInfoComponent,
    CreateAccountContactInfoComponent,
    CreateAccountCarInfoComponent,
    CreateAccountResidentialStatusComponent,
    CreateAccountContactPersonComponent,
    EmployeeComponent,
    EditComponent,
    VisaComponent,
    EmployeeHomeComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HrModule,
    RegisterRoutingModule,
    AppRoutingModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
