import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrEmployeeComponent } from './component/hr-employee/hr-employee.component';
import { HrHireComponent } from './component/hr-hire/hr-hire.component';
import { HrHomeComponent } from './component/hr-home/hr-home.component';
import { HrUploadComponent } from './component/hr-upload/hr-upload.component';
import { HrVisaComponent } from './component/hr-visa/hr-visa.component';
import { HrEmployeeDetailComponent } from './component/hr-employee/hr-employee-detail/hr-employee-detail.component';

const routes: Routes = [
  { path: 'hr', component: HrUploadComponent },
  { path: 'hr/hire/user', component: HrEmployeeComponent },
  { path: 'hr/visa', component: HrVisaComponent },
	{ path: 'hr/hire', component: HrHireComponent },
	{ path: 'hr/hire/user/:userId', component: HrEmployeeDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}
