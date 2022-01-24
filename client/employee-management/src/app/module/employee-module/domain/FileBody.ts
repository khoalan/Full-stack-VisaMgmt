export class FileBody {
  docType:string;
  fileName:string;

  constructor(docType:string, fileName:string) {
    this.docType=docType;
    this.fileName=fileName;
  }
}
