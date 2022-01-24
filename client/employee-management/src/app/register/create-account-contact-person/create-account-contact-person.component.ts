import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewAccount } from '../newAccount';
import { Reference } from './reference';
import { Emergency } from './emergency';

import { RegisterService } from '../register.service';

import { UploaderService } from '../../service/uploader.service';

@Component({
  selector: 'app-create-account-contact-person',
  templateUrl: './create-account-contact-person.component.html',
  styleUrls: ['./create-account-contact-person.component.css'],
})
export class CreateAccountContactPersonComponent implements OnInit {
  referenceForm: FormGroup;
  emergencyForm: FormGroup;

  submitted = false;
  temp = new NewAccount();
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private uploaderService: UploaderService,
    private router: Router
  ) {
    this.referenceForm = this.formBuilder.group({});
    this.emergencyForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.referenceForm = this.formBuilder.group({
      re_firstname: [''],
      re_lastname: [''],
      re_middlename: [''],
      re_cellphone: [''],
      re_email: [''],
      re_address1: [''],
      re_address2: [''],
      re_city: [''],
      re_zipcode: [''],
      re_state: [''],
      re_relationship: [''],
    });

    this.emergencyForm = this.formBuilder.group({
      em_firstname: ['', Validators.required],
      em_lastname: ['', Validators.required],
      em_middlename: [''],
      em_cellphone: ['', Validators.required],
      em_email: ['', Validators.required],
      em_zipcode: ['', Validators.required],
      em_relationship: ['', Validators.required],
    });

    this.registerService.accountHolder.subscribe((acc) => {
      this.temp = acc;
    });
  }

  get rf() {
    return this.referenceForm.controls;
  }

  get ef() {
    return this.emergencyForm.controls;
  }

  checkValid(): boolean {
    if (
      this.ef['em_firstname'].errors ||
      this.ef['em_lastname'].errors ||
      this.ef['em_cellphone'].errors ||
      this.ef['em_email'].errors ||
      this.ef['em_zipcode'].errors ||
      this.ef['em_relationship'].errors
    ) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkValid()) {
      //create reference object for info
      var reference = new Reference();
      reference.re_firstname = this.rf['re_firstname'].value;
      reference.re_lastname = this.rf['re_lastname'].value;
      reference.re_middlename = this.rf['re_middlename'].value;
      reference.re_cellphone = this.rf['re_cellphone'].value;
      reference.re_email = this.rf['re_email'].value;
      reference.re_address1 = this.rf['re_address1'].value;
      reference.re_address2 = this.rf['re_address2'].value;
      reference.re_city = this.rf['re_city'].value;
      reference.re_zipcode = this.rf['re_zipcode'].value;
      reference.re_state = this.rf['re_state'].value;
      reference.re_relationship = this.rf['re_relationship'].value;

      //create emergency obejct for info
      var emergency = new Emergency();
      emergency.em_firstname = this.ef['em_firstname'].value;
      emergency.em_lastname = this.ef['em_lastname'].value;
      emergency.em_middlename = this.ef['em_middlename'].value;
      emergency.em_cellphone = this.ef['em_cellphone'].value;
      emergency.em_email = this.ef['em_email'].value;
      emergency.em_zipcode = this.ef['em_zipcode'].value;
      emergency.em_relationship = this.ef['em_relationship'].value;

      //save the reference and emergency into account
      this.temp.setReference(reference);
      this.temp.setEmergency(emergency);
      console.log(this.temp);
      //upload to back-end
      this.registerService.requestRegister(this.temp).subscribe();

      //goback to login
      this.router.navigateByUrl('/login');
    }
  }
}
