import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'app/login/login.service';
import { switchMap } from 'rxjs';
import { AppWorkFlow } from '../../domain/appworkflow';
import { Email } from '../../domain/email';
import { UserApplication } from '../../domain/userapplication';
import { HireService } from '../../service/hire.service';

@Component({
  selector: 'app-hr-hire',
  templateUrl: './hr-hire.component.html',
  styleUrls: ['./hr-hire.component.css'],
})
export class HrHireComponent implements OnInit {
  tokenForm: FormGroup;
  submitted = false;
  email: Email = new Email('');
  appWorkFlows: AppWorkFlow[];
  onboardStatus: string = 'Pending';
  userApp: UserApplication;
  expanded: boolean = false;
  rowIndex: number;
  noVisaDoc = true;
  noDriverDoc = true;
  jwt: string;

  defaultAvatarUrl =
    'https://team-project-beacon.s3.amazonaws.com/1642868456438_avatar.jpg';
  s3Url = 'https://team-project-beacon.s3.amazonaws.com/';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private hireService: HireService
  ) {
    this.tokenForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.tokenForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.jwt = this.loginService.getHrJwt();
    this.getAppWorkFlow(this.jwt);
  }

  get f() {
    return this.tokenForm.controls;
  }

  onGenerateToken() {
    this.submitted = true;
    var emailValue = this.f['email'].value;
    this.email = new Email(emailValue);
    this.hireService
      .generateToken(this.email)
      .subscribe((email) => (this.email = email));
    console.log(emailValue);
  }
  // CURRENT WORKING CODE
  // getAppWorkFlow() {
  //   this.hireService.getAppWorkFlow().subscribe(
  //     (data: AppWorkFlow[]) => {
  //       this.appWorkFlows = data;
  //       console.log('app:', this.appWorkFlows);
  //     },
  //     (err) => console.log(err)
  //   );
  // }

  getAppWorkFlow(jwt: string) {
    this.hireService.getAppWorkFlowJ(jwt).subscribe(
      (data: AppWorkFlow[]) => {
        this.appWorkFlows = data;
        console.log('app:', this.appWorkFlows);
      },
      (err) => console.log(err)
    );
  }

  onClick(i: number) {
    console.log(i);
    this.rowIndex = i;
    if (this.expanded == false) {
      console.log('Showing!');
      this.hireService.getUserApplication(i).subscribe(
        (data: UserApplication) => {
          this.userApp = data;
          console.log('userapp:', this.userApp);
          console.log('avatar', this.userApp.avatar);
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
          console.log('vs', this.userApp.visaDoc);
          console.log('dv', this.userApp.driverLicense);

          if (
            this.userApp.driverLicense == '' ||
            this.userApp.driverLicense == null
          ) {
            this.noDriverDoc = true;
          } else {
            this.noDriverDoc = false;
            this.userApp.driverLicense =
              this.s3Url + this.userApp.driverLicense;
          }
        },
        (err) => console.log(err)
      );
    }
    this.expanded = !this.expanded;
  }

  onApprove(userId: number) {
    this.hireService.approveLogin(userId).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.log('Approve login'),
    });
    console.log(userId);

    this.hireService.setCompleteOnboarding(userId).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.log('Complete'),
    });
    window.location.reload();
  }

  onReject(userId: number) {
    this.hireService.rejectLogin(userId).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.log('Reject login'),
    });
    console.log(userId);

    this.hireService.setPendingOnboarding(userId).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.log('Pending'),
    });
    window.location.reload();
  }
}
