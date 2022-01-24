import { Component, OnInit } from '@angular/core';
import { Employee } from '../../domain/Employee';
import { HttpServiceService } from '../../service/http-service.service';
import { Person } from '../../domain/Person';
import { Address } from '../../domain/Address';
import { Contact } from '../../domain/Contact';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { contactRef } from '../../domain/ContactRef';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeServiceService } from '../../../../service/employee-service.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UploaderService } from '../../../../service/uploader.service';
import { PersonalDoc } from '../../domain/PersonalDoc';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  personForm: FormGroup;
  contactForm: FormGroup;
  addressForm: FormGroup;
  defaultAvatarUrl =
    'https://team-project-beacon.s3.amazonaws.com/1642868456438_avatar.jpg';
  s3Url = 'https://team-project-beacon.s3.amazonaws.com/';
  public persons: Person[] = [];
  public employee: Employee[] = [];
  public address: Address[] = [];
  public contact: Contact[] = [];
  public name: string[] = [];
  public pDoc: PersonalDoc[] = [];

  public addhidden: any;
  public conhidden: any;
  public perhidden: any;
  public aaa: Map<String, String>;
  public editAvt: boolean = false;
  public progress: number = 0;
  public filename: string;
  // @ts-ignore
  constructor(
    private httpService: HttpServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private employeeService: EmployeeServiceService,
    private uploadService: UploaderService,
    private loginService: LoginService
  ) {
    this.personForm = this.formBuilder.group({});
    this.contactForm = this.formBuilder.group({});
    this.addressForm = this.formBuilder.group({});
  }

  ngOnInit() {
    console.log('User jwt: ', this.loginService.getUserJwt());
    this.getPerson();
    this.getEmployee();
    this.getAddress();
    this.getContact();
    this.getDocuments();
    this.addhidden = false;
    this.contactForm = this.formBuilder.group({
      cf_id: [''],
      cf_personId: [''],
      cf_relationship: [''],
      cf_title: [''],
      cf_isEmer: [''],
      cf_isRef: [''],
    });

    this.addressForm = this.formBuilder.group({
      id: [''],
      addLine1: [''],
      addLine2: [''],
      city: [''],
      zipcode: [''],
      stateName: [''],
      stateAbbr: [''],
      personId: [''],
    });

    this.personForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      middleName: [''],
      email: [''],
      cellPhone: [''],
      alternatePhone: [''],
      gender: [''],
      ssn: [''],
      dob: [''],
      userId: [''],
    });
  }

  getPerson() {
    this.httpService.getPerson().subscribe(
      (data: any) => {
        const arr = [JSON.parse(data)];
        arr.forEach((e: Person) => {
          // @ts-ignore
          const temp = new Person(
            e.id,
            e.firstName,
            e.lastName,
            e.middleName,
            e.email,
            e.cellPhone,
            e.alternatePhone,
            e.gender,
            e.ssn,
            e.dob,
            e.userId
          );
          this.persons.push(temp);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEmployee() {
    this.httpService.getEmployee().subscribe(
      (data: any) => {
        console.log(data);
        const e = JSON.parse(data);
        // console.log('temp', arr.avatar);

        console.log(e);
        console.log('e.avartar:', e.avartar == '');
        if (e.avartar == '' || e.avartar == null) {
          e.avartar = this.defaultAvatarUrl;
        } else {
          e.avartar = this.s3Url + e.avartar;
        }

        const temp = new Employee(
          e.id,
          e.personId,
          e.title,
          e.managerId,
          e.startDate,
          e.endDate,
          e.avartar,
          e.car,
          e.visaStatusId,
          e.visaStartDate,
          e.visaEndDate,
          e.driverLicense,
          e.driverLicenseExpDate,
          e.houseId
        );

        this.employee.push(temp);
        console.log('Emp:', this.employee[0].avatar);
      },
      (err) => console.log('E:', err)
    );
  }

  getAddress() {
    this.httpService.getAddress().subscribe((data: any) => {
      const arr = [JSON.parse(data)];
      arr.forEach((e: Address[]) => {
        for (let i = 0; i < e.length; i++) {
          const temp = new Address(
            e[i].id,
            e[i].addressLine1,
            e[i].addressLine2,
            e[i].city,
            e[i].zipCode,
            e[i].stateName,
            e[i].stateAbbr,
            e[i].personId
          );
          this.address.push(temp);
        }
      });
    });
  }

  getContact() {
    this.httpService.getContacts().subscribe((data: any) => {
      const arr = [JSON.parse(data)];
      arr.forEach((e: Contact[]) => {
        for (let i = 0; i < e.length; i++) {
          const temp = new Contact(
            e[i].id,
            e[i].personId,
            e[i].relationship,
            e[i].title,
            e[i].isEmergency,
            e[i].isReference
          );
          this.contact.push(temp);
        }
      });
    });
  }

  get pf() {
    return this.personForm.controls;
  }

  get cf() {
    return this.contactForm.controls;
  }

  get af() {
    return this.addressForm.controls;
  }

  submitEditPerson() {
    var id = this.pf['id'].value;
    var firstName = this.pf['firstName'].value;
    var lastName = this.pf['lastName'].value;
    var middleName = this.pf['middleName'].value;
    var email = this.pf['email'].value;
    var cellPhone = this.pf['cellPhone'].value;
    var alternatePhone = this.pf['alternatePhone'].value;
    var gender = this.pf['gender'].value;
    var ssn = this.pf['ssn'].value;
    var dob = this.pf['dob'].value;
    var UserId = this.pf['userId'].value;
    var person = new Person(
      id,
      firstName,
      lastName,
      middleName,
      email,
      cellPhone,
      alternatePhone,
      gender,
      ssn,
      dob,
      UserId
    );
    console.log(person);
    this.httpService.putPerson(person).subscribe();
    window.location.reload();
  }

  submitEditAddress() {
    var id = this.af['id'].value;
    var addLine1 = this.af['addLine1'].value;
    var addLine2 = this.af['addLine2'].value;
    var city = this.af['city'].value;
    var zipcode = this.af['zipcode'].value;
    var stateName = this.af['stateName'].value;
    var stateAbbr = this.af['stateAbbr'].value;
    var personId = this.af['personId'].value;
    var address = new Address(
      id,
      addLine1,
      addLine2,
      city,
      zipcode,
      stateName,
      stateAbbr,
      personId
    );
    this.httpService.putAddress(address).subscribe();
    window.location.reload();
  }

  submitEditContact() {
    var ref = new contactRef();
    ref.cf_id = this.cf['cf_id'].value;
    ref.cf_personId = this.cf['cf_personId'].value;
    ref.cf_relationship = this.cf['cf_relationship'].value;
    ref.cf_title = this.cf['cf_title'].value;
    ref.cf_isEmer = this.cf['cf_isEmer'].value;
    ref.cf_isRef = this.cf['cf_isRef'].value;
    var c = new Contact(
      ref.cf_id,
      ref.cf_personId,
      ref.cf_relationship,
      ref.cf_title,
      ref.cf_isRef,
      ref.cf_isEmer
    );
    this.httpService.putContact(c).subscribe();
    window.location.reload();
  }

  cancelPerson() {
    alert('Are you sure to discard changes?');
    this.perhidden = false;
    this.personForm.reset();
    window.location.reload();
  }

  cancelAdd() {
    alert('Are you sure to discard changes?');
    this.addhidden = false;
    this.addressForm.reset();
    window.location.reload();
  }

  cancelCon() {
    alert('Are you sure to discard changes?');
    this.conhidden = false;
    this.contactForm.reset();
    window.location.reload();
  }

  showAddEdit() {
    this.addhidden = true;
  }

  showConEdit() {
    this.conhidden = true;
  }

  showPersonEdit() {
    this.perhidden = true;
  }

  getError() {
    this.httpService.getError().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
        console.log('Here is an Error');
      }
    );
  }
  getDocuments() {
    this.httpService.getDocName().subscribe((data: any) => {
      const arr = [JSON.parse(data)];
      arr.forEach((e: PersonalDoc[]) => {
        for (let i = 0; i < e.length; i++) {
          this.pDoc.push(e[i]);
        }
      });
    });
  }

  onUpload(files: File[]): void {
    this.editAvt = true;
    const formData = new FormData();

    for (const file of files) {
      formData.append('file', file, file.name);
    }
    this.uploadService.upload(formData).subscribe(
      (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        }
        console.log('e: ', event);
      },
      (error) => {
        this.filename = error.error.text;
        console.log('Ava filename:', this.filename);
      }
    );
  }

  onSubmit() {
    console.log(typeof this.filename);
    this.uploadService.uploadAvt(this.filename).subscribe();
    window.location.reload();
  }

  edit() {
    this.editAvt = true;
  }
  cancelUploadAvt() {
    alert('Are you sure to discard changes?');
    window.location.reload();
  }
}
