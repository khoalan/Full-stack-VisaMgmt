import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountBasicInfoComponent } from '../create-account-basic-info/create-account-basic-info.component';
import { CreateAccountCarInfoComponent } from '../create-account-car-info/create-account-car-info.component';
import { CreateAccountContactInfoComponent } from '../create-account-contact-info/create-account-contact-info.component';
import { CreateAccountContactPersonComponent } from '../create-account-contact-person/create-account-contact-person.component';
import { CreateAccountResidentialStatusComponent } from '../create-account-residential-status/create-account-residential-status.component';
import { CreateAccountUserPassComponent } from '../create-account-user-pass/create-account-user-pass.component';
import { RegisterGuard } from '../../guard/register-guard.guard';
import { HrLoginComponent } from 'app/login/hr-login/hr-login.component';

const register_routes: Routes = [
  {
    path: 'register/step1/:token',
    component: CreateAccountUserPassComponent,
    canActivate: [RegisterGuard],
  },

  // {path:'register/step1/temptoken', component: CreateAccountUserPassComponent},
  { path: 'register/step2', component: CreateAccountBasicInfoComponent },
  { path: 'register/step3', component: CreateAccountContactInfoComponent },
  { path: 'register/step4', component: CreateAccountCarInfoComponent },
  {
    path: 'register/step5',
    component: CreateAccountResidentialStatusComponent,
  },
  { path: 'register/step6', component: CreateAccountContactPersonComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(register_routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
