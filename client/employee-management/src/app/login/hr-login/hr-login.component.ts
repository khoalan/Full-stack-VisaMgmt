import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'app/register/register.service';
import { UploaderService } from 'app/service/uploader.service';
import { TestAcc } from '../../register/testAcc';

import { Account } from '../account';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-hr-login',
  templateUrl: './hr-login.component.html',
  styleUrls: ['./hr-login.component.css'],
})
export class HrLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  constructor(
    private _resigerService: RegisterService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private uploadService: UploaderService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({});
  }
  //init

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      isHr: [false],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  //validation check of inputs
  checkValid(): boolean {
    if (this.f['username'].errors || this.f['password'].errors) {
      return false;
    }
    return true;
  }

  onClick() {
    let acc = new TestAcc('aa', 'bb');
    console.log('clicked');
    this._resigerService.postRegister(acc).subscribe();
  }

  onSubmit() {
    //something submitted
    this.submitted = true;

    // var acc = new Account(
    //   this.f['username'].value,
    //   this.f['password'].value,
    //   this.f['isHr'].value
    // );
    // this.loginService.newLogin(acc).subscribe();
    // check the input validation. if Pass, generate object of Account

    if (this.checkValid()) {
      var acc = new Account(
        this.f['username'].value,
        this.f['password'].value,
        this.f['isHr'].value
      );
      console.log(acc);
      this.loginService.requestLogin(acc).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this),
      });
      console.log(this.loginService.requestLogin(acc));
    }
  }

  handleResponse(res: any) {
    console.log('JWT=====', res.redirectUrl);
    console.log(res);

    if (res.isHr == 'true') {
      this.loginService.setHrJwt(res.redirectUrl);
      this.router.navigateByUrl('hr');
    } else {
      this.loginService.setUserJwt(res.redirectUrl);
      this.router.navigateByUrl('employee');
    }
  }

  handleError(err: any) {
    console.log(err.error.error);
    this.errorMessage = err.error.error;
    alert(this.errorMessage);
  }

  //function to upload
  onUpload(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file, file.name);
    }
    this.uploadService.upload(formData).subscribe(
      (event) => {
        console.log('e: ', event);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //function to download
  onDownload(filename: string): void {
    this.uploadService.download(filename).subscribe(
      (event) => {
        console.log(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
