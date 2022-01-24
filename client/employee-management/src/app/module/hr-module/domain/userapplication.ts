import { MyDoc } from './mydoc';

export interface UserApplication {
  firstname: string;
  lastname: string;
  middlename: string;
  ssn: string;
  dob: string;
  gender: string;
  avatar: string;

  cellphone: string;
  workphone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;

  licensenum: string;
  expirationdate: string;
  carnum: string;

  visa: string;
  startdate: string;
  visaExpirationdate: string;
  visaDoc: string;
  driverLicense: string;

  status: string;
  type: string;
  visaTypeDoc: MyDoc[];
  comment: string;
  dayLeft: number;
}
