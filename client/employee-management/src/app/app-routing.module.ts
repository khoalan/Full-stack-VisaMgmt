import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HrLoginComponent } from './login/hr-login/hr-login.component';

import { RegisterRoutingModule } from './register/register-routing/register-routing.module';
import { EmployeeComponent } from './module/employee-module/component/employee/employee.component';
import { RegisterGuard } from './guard/register-guard.guard';
import {VisaComponent} from "./module/employee-module/component/visa/visa.component";

const routes: Routes = [
  { path: 'login', component: HrLoginComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee_visa', component: VisaComponent },
  {
    path: 'hr',
    loadChildren: () =>
      import('./module/hr-module/hr.module').then((m) => m.HrModule),
  },
  { path: '', component: HrLoginComponent },
];

@NgModule({
  imports: [RegisterRoutingModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {
  constructor(private router: Router) {}
}
