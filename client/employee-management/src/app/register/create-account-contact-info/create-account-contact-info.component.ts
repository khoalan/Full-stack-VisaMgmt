import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewAccount } from '../newAccount';
import { Address } from './address';

import { RegisterService } from '../register.service';
import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';

@Component({
  selector: 'app-create-account-contact-info',
  templateUrl: './create-account-contact-info.component.html',
  styleUrls: ['./create-account-contact-info.component.css'],
})
export class CreateAccountContactInfoComponent implements OnInit {
  contactInfoForm: FormGroup;

  submitted: boolean = false;
  email: string = '';
  addresslist: Address[] = [];
  temp = new NewAccount();

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.contactInfoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.contactInfoForm = this.formBuilder.group({
      cellphone: ['', Validators.required],
      workphone: [''],

      email: [this.registerService.getRegisterEmail(), Validators.required],
      addresses: [this.addresslist, Validators.required],
    });

    this.registerService.accountHolder.subscribe((acc) => {
      this.temp = acc;
    });

    this.addresslist.push(new Address());
  }

  get f() {
    return this.contactInfoForm.controls;
  }

  checkValid(): boolean {
    if (this.f['cellphone'].errors || this.f['email'].errors) {
      return false;
    }
    return true;
  }

  checkAddressValid(): boolean {
    for (const add of this.addresslist) {
      if (
        add.address1 == '' ||
        add.city == '' ||
        add.state == '' ||
        add.zipcode == ''
      )
        return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.checkValid());

    if (this.checkValid() && this.checkAddressValid()) {
      this.temp.cellphone = this.f['cellphone'].value;
      this.temp.workphone = this.f['workphone'].value;
      this.temp.email = this.f['email'].value;

      //address need to push
      this.temp.addresslist = this.f['addresses'].value;
      console.log(this.f['addresses'].value);

      this.registerService.accountHolder.next(this.temp);
      this.router.navigateByUrl('/register/step4');
    }
  }

  addAddress() {
    console.log('add address');
    var newAddress = new Address();
    this.addresslist.push(newAddress);

    console.log(this.f['addresses'].value);
  }

  removeAddress() {
    if (this.addresslist.length > 1) {
      console.log('remove address');
      this.addresslist.pop();
      console.log(this.addresslist);

      console.log(this.f['addresses'].value);
    }
  }
}
