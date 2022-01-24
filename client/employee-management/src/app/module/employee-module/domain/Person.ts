export class Person {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  cellPhone: string;
  alternatePhone: string;
  gender: string;
  ssn: string;
  dob: string;
  userId: number;

  constructor(id: number, firstName: string, lastName: string, middleName: string, email: string, cellPhone: string, alternatePhone: string, gender: string, ssn: string, dob: string, userId: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.email = email;
    this.cellPhone = cellPhone;
    this.alternatePhone = alternatePhone;
    this.gender = gender;
    this.ssn = ssn;
    this.dob = dob;
    this.userId = userId;
  }
}
