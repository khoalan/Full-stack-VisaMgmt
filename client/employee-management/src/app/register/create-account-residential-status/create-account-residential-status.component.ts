import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewAccount } from '../newAccount';
import { WorkAuth } from './workAuth';

import { RegisterService } from '../register.service';

import { Constant } from '../../constant/constant';

import { UploaderService } from '../../service/uploader.service';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-create-account-residential-status',
  templateUrl: './create-account-residential-status.component.html',
  styleUrls: ['./create-account-residential-status.component.css'],
})
export class CreateAccountResidentialStatusComponent implements OnInit {
  residentialInfoForm: FormGroup;
  submitted = false;
  temp = new NewAccount();
  message = '';
  workAuthFilename = '';
  workAuth: WorkAuth;
  url = Constant.REQUEST_WORK_AUTH_URL;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private uploaderService: UploaderService,
    private router: Router
  ) {
    this.residentialInfoForm = this.formBuilder.group({});
    this.workAuth = new WorkAuth();
  }

  ngOnInit(): void {
    this.residentialInfoForm = this.formBuilder.group({
      option: ['', Validators.required],
      status: ['', Validators.required],
      workauth: ['H1-B', Validators.required],
      startdate: ['', Validators.required],
      expiredate: ['', Validators.required],
      workauthfile: ['', Validators.required],
    });

    this.registerService.accountHolder.subscribe((acc) => {
      this.temp = acc;
    });

    this.workAuth = new WorkAuth();
  }

  get f() {
    return this.residentialInfoForm.controls;
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (file) {
      this.f['workauthfile'].setValue(file);
      // this.uploaderService.upload(file,this.url).subscribe(
      //   msg => {
      //     input.value = '';
      //     this.message = msg;
      //   }
      // );
    }
  }

  onUpload(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file, file.name);
    }
    this.uploaderService.upload(formData).subscribe(
      (event) => {
        console.log('e: ', event);
      },
      (error) => {
        this.f['workauthfile'].setValue(error.error.text);
        this.workAuthFilename = error.error.text;
        console.log('Work filename: ', this.workAuthFilename);
      }
    );
  }

  checkValid(): boolean {
    if (
      this.f['startdate'].errors ||
      this.f['expiredate'].errors ||
      this.f['workauthfile'].errors
    ) {
      return false;
    }

    return true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.f['option'].value == 'yes') {
      if (!this.f['status'].errors) {
        this.workAuth.permanent = true;
        this.workAuth.permanentStatus = this.f['status'].value;
        console.log(this.workAuth);
        this.temp.setWorkAuth(this.workAuth);
        this.registerService.accountHolder.next(this.temp);
        this.router.navigateByUrl('/register/step6');
      }
    }
    if (this.f['option'].value == 'no') {
      if (this.checkValid()) {
        this.workAuth.permanent = false;
        this.workAuth.visa = this.f['workauth'].value;
        this.workAuth.startdate = this.f['startdate'].value;
        this.workAuth.expirationdate = this.f['expiredate'].value;
        this.workAuth.workAuthFile = this.workAuthFilename;

        console.log(this.workAuth);

        this.temp.setWorkAuth(this.workAuth);
        this.registerService.accountHolder.next(this.temp);
        this.router.navigateByUrl('/register/step6');
      }
    }
  }
}
