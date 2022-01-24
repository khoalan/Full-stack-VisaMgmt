import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewAccount } from '../newAccount';

import { RegisterService } from '../register.service';

// import { Constant } from 'src/app/constant/constant';

import { UploaderService } from '../../service/uploader.service';

@Component({
  selector: 'app-create-account-basic-info',
  templateUrl: './create-account-basic-info.component.html',
  styleUrls: ['./create-account-basic-info.component.css'],
})
export class CreateAccountBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  submitted = false;
  temp = new NewAccount();
  message = '';
  // url = Constant.REQUEST_AVATAR_URL;
  avatarFilename: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private uploadService: UploaderService,
    private router: Router
  ) {
    this.basicInfoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.basicInfoForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      middlename: [''],
      ssn: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['Prefer not to answer', Validators.required],
      avatar: [''],
    });
    //bring the new account data from register/step1
    this.registerService.accountHolder.subscribe((acc) => {
      this.temp = acc;
    });
    //ask for the email address info with token from back-end
  }

  get f() {
    return this.basicInfoForm.controls;
  }

  checkValid(): boolean {
    if (
      this.f['firstname'].errors ||
      this.f['lastname'].errors ||
      this.f['ssn'].errors ||
      this.f['dob'].errors ||
      this.f['gender'].errors
    ) {
      return false;
    }
    return true;
  }

  // onPicked(input: HTMLInputElement) {
  //   const file = input.files?.[0];
  //   if (file) {
  //     this.f['avatar'].setValue(file);
  //     // this.uploaderService.upload(file,this.url).subscribe(
  //     //   msg => {
  //     //     input.value = '';
  //     //     this.message = msg;
  //     //   }
  //     // );
  //   }
  // }

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
        this.avatarFilename = error.error.text;
        console.log('Ava filename:', this.avatarFilename);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkValid()) {
      this.temp.firstname = this.f['firstname'].value;
      this.temp.lastname = this.f['lastname'].value;
      this.temp.middlename = this.f['middlename'].value;
      this.temp.ssn = this.f['ssn'].value;
      this.temp.dob = this.f['dob'].value;
      this.temp.gender = this.f['gender'].value;
      console.log('ava:', this.avatarFilename);
      this.temp.avatar = this.avatarFilename;
      console.log(this.temp);
      //pass new account to next component
      this.registerService.accountHolder.next(this.temp);
      this.router.navigateByUrl('/register/step3');
    }
  }
}
