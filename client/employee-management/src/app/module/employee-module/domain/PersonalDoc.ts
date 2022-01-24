export class PersonalDoc {
  path: string;
  name: string;

  constructor(path: string, docType: string) {
    this.path = path;
    this.name = docType;
  }
}
