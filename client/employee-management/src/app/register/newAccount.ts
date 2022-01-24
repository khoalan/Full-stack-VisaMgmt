import { CarInfo } from './create-account-car-info/carInfo';
import { Address } from './create-account-contact-info/address';
import { Emergency } from './create-account-contact-person/emergency';
import { Reference } from './create-account-contact-person/reference';
import { WorkAuth } from './create-account-residential-status/workAuth';
export class NewAccount {
  //step1 - username / password
  username: string = '';
  password: string = '';

  //step2 - basic info
  firstname: string = '';
  lastname: string = '';
  middlename: string = '';
  ssn: string = '';
  dob: string = '';
  gender: string = '';
  avatar: string = '';

  //step3 contact info
  cellphone: string = '';
  workphone: string = '';
  addresslist: Address[] = [];
  // Address{
  // address1:string;
  // address2:string;
  // city:string;
  // state:string;
  // zipcode:string;
  //}
  //email to show (cannot modified)
  email: string = '';

  //step4 car info
  carInfo: CarInfo = new CarInfo();
  //CarInfo{
  // licensenum:string;
  // expriationdate:string;
  // driverlicensefile:File;
  // carnum:string;
  //}

  //step5 work authroizations
  workAuth: WorkAuth = new WorkAuth();

  //WorkAuth{
  // permanent:boolean = false;
  // //permanent is true --> yes on citizen or permanent resident
  // permanentStatus:string = '';

  // //ermanent is false --> no on citizen or permanent resident
  // visa:string = '';
  // startdate:string = '';
  // expirationdate:string = '';
  // workAuthFile:File | undefined;
  //}

  //ste6 emergency contact info
  reference: Reference = new Reference();
  //Reference{
  // re_firstname: string = '';
  // re_lastname: string = '';
  // re_middlename: string = '';
  // re_cellphone: string = '';
  // re_email: string = '';
  // re_address1: string = '';
  // re_address2: string = '';
  // re_city: string = '';
  // re_zipcode: string = '';
  // re_state: string = '';
  // re_relationship: string = '';
  //}

  emergency: Emergency = new Emergency();
  //Emergency{
  // em_firstname:string = '';
  // em_lastname:string = '';
  // em_middlename:string = '';
  // em_cellphone:string = '';
  // em_email:string = '';
  // em_zipcode:string = '';
  // em_relationship:string = '';
  //}

  constructor(
    username: string = '',
    password: string = '',
    firstname: string = '',
    lastname: string = '',
    middlename: string = '',
    ssn: string = '',
    dob: string = '',
    gender: string = '',
    //set the avatar to empty file
    avatar: string = '',
    cellphone: string = '',
    workphone: string = ''
  ) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.middlename = middlename;
    this.ssn = ssn;
    this.dob = dob;
    this.gender = gender;
    this.avatar = avatar;
    this.cellphone = cellphone;
    this.workphone = workphone;
  }

  setAddresses(addresslist: Address[]) {
    this.addresslist = addresslist;
  }
  setEmail(email: string) {
    this.email = email;
  }
  addCarInfo(car: CarInfo) {
    this.carInfo = car;
  }
  setWorkAuth(workAuth: WorkAuth) {
    this.workAuth = workAuth;
  }
  setReference(reference: Reference) {
    this.reference = reference;
  }
  setEmergency(emergency: Emergency) {
    this.emergency = emergency;
  }
}
