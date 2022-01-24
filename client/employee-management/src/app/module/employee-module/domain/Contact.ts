export class Contact {
  id: number;
  personId: number;
  relationship: string;
  title: string;
  isEmergency: string;
  isReference: string;

  constructor(id: number, personId: number, relationship: string, title: string,  isEmergency: string, isReference: string) {
    this.id = id;
    this.personId = personId;
    this.relationship = relationship;
    this.title = title;
    this.isReference = isReference;
    this.isEmergency = isEmergency;
  }
}
