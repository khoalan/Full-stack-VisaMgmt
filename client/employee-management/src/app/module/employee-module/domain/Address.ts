export class Address {
  id: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  stateName: string;
  stateAbbr: string;
  personId: number;


  constructor(id: number, addressLine1: string, addressLine2: string, city: string, zipCode: string, stateName: string, stateAbbr: string, personId: number) {
    this.id = id;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.city = city;
    this.zipCode = zipCode;
    this.stateName = stateName;
    this.stateAbbr = stateAbbr;
    this.personId = personId;
  }
}
