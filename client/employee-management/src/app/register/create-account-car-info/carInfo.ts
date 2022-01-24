export class CarInfo {
  licensenum: string;
  expirationdate: string;
  driverlicensefile: string = '';
  carnum: string;

  constructor(
    licensenum: string = '',
    expirationdate: string = '',
    driverlicensefile: string = '',
    carnum: string = ''
  ) {
    this.licensenum = licensenum;
    this.driverlicensefile = driverlicensefile;
    this.expirationdate = expirationdate;
    this.carnum = carnum;
  }
}
