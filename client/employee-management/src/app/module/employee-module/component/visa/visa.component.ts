import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../../../../service/employee-service.service';
import { UploaderService } from '../../../../service/uploader.service';
import { HttpRequest, HttpEventType } from '@angular/common/http';
import { EmployeeHomeService } from '../../service/employee-home.service';
import { UserApplication } from 'app/module/hr-module/domain/userapplication';
import { HireService } from 'app/module/hr-module/service/hire.service';
import { Observable, switchMap } from 'rxjs';
import { MyDoc } from 'app/module/hr-module/domain/mydoc';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.css'],
})
export class VisaComponent implements OnInit {
  // todo: two steps, opt receipt and ead card.
  //  each step has booleans: approved or rejected, only move to next step when approved
  //  when uploading docs,

  filename: string;
  uploaded: boolean = false;
  uploadedAndWait: boolean = false;
  showI983Form: boolean = false;
  needRenew: boolean = false;
  docType: string = 'opt';
  progress: number = 0;
  step: string = 'get started';
  myId: number;
  currentStep: string;
  currentStatus: string;
  nextStatus: string;
  nextStep: string;
  hrComment: string;
  visaDocument: MyDoc[];

  s3FillableUrl =
    'https://team-project-beacon.s3.amazonaws.com/i983-fillable.pdf';
  s3InstructionUrl =
    'https://team-project-beacon.s3.amazonaws.com/i983-instructions.pdf';

  userApp: UserApplication;
  allSet: boolean = false;

  constructor(
    private emService: EmployeeServiceService,
    private employeeHomeService: EmployeeHomeService,
    private uploadService: UploaderService,
    private hireService: HireService
  ) {}

  ngOnInit(): void {
    this.getUserStatusDetail().subscribe(
      (data: UserApplication) => {
        this.userApp = data;
        console.log('app:', data);
        this.currentStep = data.type;
        this.currentStatus = data.status;
        this.visaDocument = data.visaTypeDoc;

        if (this.currentStatus == 'Rejected') {
          this.nextStatus = 'Pending';
          this.nextStep = this.currentStep;
        } else if (this.currentStatus == 'Approved') {
          this.nextStatus = 'Pending';
        } else if (this.currentStatus == 'Pending') {
          this.nextStatus = 'Pending';
          this.nextStep = this.currentStep;
        }

        if (
          this.currentStep == 'OPT-receipt' &&
          this.currentStatus == 'Approved'
        ) {
          this.nextStep = 'OPT-ead';
        } else if (
          this.currentStep == 'OPT-ead' &&
          this.currentStatus == 'Approved'
        ) {
          this.nextStep = 'I-983';
        } else if (
          this.currentStep == 'I-983' &&
          this.currentStatus == 'Approved'
        ) {
          this.nextStep = 'I-20';
        } else if (
          this.currentStep == 'I-20' &&
          this.currentStatus == 'Approved'
        ) {
          this.nextStep = 'OPT-stem-receipt';
        } else if (
          this.currentStep == 'OPT-stem-receipt' &&
          this.currentStatus == 'Approved'
        ) {
          this.nextStep = 'OPT-stem-ead';
        }

        if (
          this.currentStep == 'OPT-stem-ead' &&
          this.currentStatus == 'Approved'
        ) {
          this.allSet = true;
        }

        this.hrComment = this.userApp.comment;

        console.log('Curr step: ', this.currentStep);
        console.log('Curr status: ', this.currentStatus);
        console.log('Next step: ', this.nextStep);
        console.log('Next status: ', this.nextStatus);

        if (
          this.currentStep == this.nextStep &&
          this.currentStatus == this.nextStatus &&
          this.userApp.visaTypeDoc.length != 0
        ) {
          this.uploadedAndWait = true;
        }

        if (
          this.userApp.dayLeft > 100 &&
          this.currentStep == 'OPT-ead' &&
          this.currentStatus == 'Approved'
        ) {
          this.allSet = true;
        }

        if (
          this.userApp.dayLeft <= 100 &&
          this.currentStep == 'OPT-ead' &&
          this.currentStatus != 'Rejected'
        ) {
          this.allSet = false;
          this.needRenew = true;
          this.nextStep = 'I-983';
          this.currentStep = 'OPT-ead';
          this.currentStatus == 'Approved';
          this.nextStatus == 'Pending';
        }

        if (this.currentStep == 'OPT-ead' && this.nextStep == 'I-983') {
          this.showI983Form = true;
        }
      },
      (err) => console.log(err)
    );
  }

  onUpload(files: File[]): void {
    this.step = this.docType;

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
        console.log('Filename:', this.filename);
      }
    );
  }

  onSubmit() {
    this.uploaded = true;
    this.uploadService.uploadVisa(this.nextStep, this.filename).subscribe();
    this.hireService
      .updateStatus(this.myId, this.nextStatus, this.nextStep)
      .subscribe();
    // this.hireService.updateStep(this.myId, this.nextStep).subscribe();
    window.location.reload();
  }

  getUserStatusDetail(): Observable<UserApplication> {
    return this.employeeHomeService.getUserStatus().pipe(
      switchMap((data) => {
        this.myId = data;
        return this.hireService.getUserApplication(data);
      })
    );
  }
}
