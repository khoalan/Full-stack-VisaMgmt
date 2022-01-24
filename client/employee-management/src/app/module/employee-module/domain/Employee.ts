export class Employee {
  id: number;
  personId: number;
  title: string;
  managerId: string;
  startDate: string;
  endDate: string;
  avatar: string;
  car: string;
  visaStatusId: string;
  visaStartDate: string;
  visaEndDate: string;
  driverLicense: string;
  driverLicenseExpDate: string;
  houseId: number;

  // tslint:disable-next-line:max-line-length
  constructor(id: number, personId: number, title: string, managerId: string, startDate: string, endDate: string, avatar: string, car: string, visaStatusId: string, visaStartDate: string, visaEndDate: string, driverLicense: string, driverLicenseExpDate: string, houseId: number) {
    this.id = id;
    this.personId = personId;
    this.title = title;
    this.managerId = managerId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.avatar = avatar;
    this.car = car;
    this.visaStatusId = visaStatusId;
    this.visaStartDate = visaStartDate;
    this.visaEndDate = visaEndDate;
    this.driverLicense = driverLicense;
    this.driverLicenseExpDate = driverLicenseExpDate;
    this.houseId = houseId;
  }
}
