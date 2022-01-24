import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

import { AppWorkFlow } from 'app/module/hr-module/domain/appworkflow';
import { Email } from 'app/module/hr-module/domain/email';
import { UserApplication } from 'app/module/hr-module/domain/userapplication';
import { HireService } from 'app/module/hr-module/service/hire.service';
import { Person } from 'app/module/employee-module/domain/Person';
import { Employee } from 'app/module/employee-module/domain/Employee';
import { Address } from 'app/module/employee-module/domain/Address';
import { Contact } from 'app/module/employee-module/domain/Contact';
import { PersonalDoc } from 'app/module/employee-module/domain/PersonalDoc';

@Component({
  selector: 'app-hr-employee-detail',
  templateUrl: './hr-employee-detail.component.html',
  styleUrls: ['./hr-employee-detail.component.css'],
})
export class HrEmployeeDetailComponent implements OnInit {
  selected: number;

  userApp: UserApplication;

  name: string;

  noVisaDoc = true;
  noDriverDoc = true;

  defaultAvatarUrl =
    'https://team-project-beacon.s3.amazonaws.com/1642868456438_avatar.jpg';
  s3Url = 'https://team-project-beacon.s3.amazonaws.com/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private hireService: HireService
  ) {}

  ngOnInit(): void {
    //get userId from url
    this.activatedRoute.paramMap.subscribe((params) => {
      this.selected = Number(params.get('userId'));
    });

    //bring info about the user
    this.hireService.getUserApplication(this.selected).subscribe(
      (data: UserApplication) => {
        this.userApp = data;
        if (this.userApp.avatar == '' || this.userApp.avatar == null) {
          this.userApp.avatar = this.defaultAvatarUrl;
        } else {
          this.userApp.avatar = this.s3Url + this.userApp.avatar;
        }

        if (this.userApp.visaDoc == '' || this.userApp.visaDoc == null) {
          this.noVisaDoc = true;
        } else {
          this.noVisaDoc = false;
          this.userApp.visaDoc = this.s3Url + this.userApp.visaDoc;
        }
        if (
          this.userApp.driverLicense == '' ||
          this.userApp.driverLicense == null
        ) {
          this.noDriverDoc = true;
        } else {
          this.noDriverDoc = false;
          this.userApp.driverLicense = this.s3Url + this.userApp.driverLicense;
        }

        var tempssn = '*****';
        tempssn = tempssn + this.userApp.ssn.toString().slice(6);
        console.log('here');
        console.log(tempssn);
        this.userApp.ssn = tempssn;
      },
      (err) => console.log(err)
    );
  }
}
