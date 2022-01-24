import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewAccount } from '../newAccount';
import { CarInfo } from './carInfo';

import { RegisterService } from '../register.service';

import { Constant } from '../../constant/constant';

import { UploaderService } from '../../service/uploader.service';

@Component({
  selector: 'app-create-account-car-info',
  templateUrl: './create-account-car-info.component.html',
  styleUrls: ['./create-account-car-info.component.css'],
})
export class CreateAccountCarInfoComponent implements OnInit {
  carInfoForm: FormGroup;
  submitted = false;
  temp = new NewAccount();
  message = '';
  driverlicenseFilename = '';
  // url = Constant.REQUEST_DRIVER_LICENSE_URL;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private uploaderService: UploaderService,
    private router: Router
  ) {
    this.carInfoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.carInfoForm = this.formBuilder.group({
      option: [''],

      licensenum: ['', Validators.required],
      expirationdate: ['', Validators.required],
      driverlicense: ['', Validators.required],

      carnum1: [''],
      carnum2: [''],
      carnum3: [''],
    });

    this.registerService.accountHolder.subscribe((acc) => {
      this.temp = acc;
    });
  }

  get f() {
    return this.carInfoForm.controls;
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (file) {
      this.f['driverlicense'].setValue(file);
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
        this.f['driverlicense'].setValue(error.error.text);
        this.driverlicenseFilename = error.error.text;
        console.log('Driver filename:', this.driverlicenseFilename);
      }
    );
  }

  checkValid(): boolean {
    if (
      this.f['licensenum'].errors ||
      this.f['expirationdate'].errors ||
      this.f['driverlicense'].errors
    ) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.f['option'].value);
    if (this.f['option'].value == 'no' || this.f['option'].value == '') {
      var carnum =
        this.f['carnum1'].value +
        '-' +
        this.f['carnum2'].value +
        '-' +
        this.f['carnum3'].value;
      var car = new CarInfo('', '', '', carnum);
      this.temp.addCarInfo(car);
      console.log('next');
      console.log(this.temp);
      this.router.navigateByUrl('/register/step5');
    } else {
      //check valid
      console.log('else');
      if (this.checkValid()) {
        var lice = this.f['licensenum'].value;
        var expr = this.f['expirationdate'].value;
        var driverlice = this.driverlicenseFilename;
        var carnum =
          this.f['carnum1'].value +
          '-' +
          this.f['carnum2'].value +
          '-' +
          this.f['carnum3'].value;

        var car = new CarInfo(lice, expr, driverlice, carnum);
        this.temp.addCarInfo(car);
        this.registerService.accountHolder.next(this.temp);
        console.log(this.temp);
        this.router.navigateByUrl('/register/step5');
      }
    }
  }
}
