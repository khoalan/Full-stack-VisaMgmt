import { Component, OnInit } from '@angular/core';

import { AppWorkFlow } from '../../domain/appworkflow';
import { MyDoc } from '../../domain/mydoc';
import { UserApplication } from '../../domain/userapplication';
import { HireService } from '../../service/hire.service';

@Component({
  selector: 'app-hr-visa',
  templateUrl: './hr-visa.component.html',
  styleUrls: ['./hr-visa.component.css'],
})
export class HrVisaComponent implements OnInit {
  appWorkFlows: AppWorkFlow[];
  expanded: boolean = false;
  userApp: UserApplication;
  s3Url = 'https://team-project-beacon.s3.amazonaws.com/';
  noVisaDoc = true;
  rowIndex: number;
  currentStatus: string;
  nextStep: string;
  visaDocument: MyDoc[];
  wrongDoc: string;
  hrComment: string;

  constructor(private hireService: HireService) {}

  ngOnInit(): void {
    this.getAppWorkFlow();
  }

  getAppWorkFlow() {
    this.hireService.getAppWorkFlow().subscribe(
      (data: AppWorkFlow[]) => {
        this.appWorkFlows = data;
        console.log('app:', this.appWorkFlows);
      },
      (err) => console.log(err)
    );
  }

  onClick(i: number) {
    console.log(i);
    this.rowIndex = i;
    if (this.expanded == false) {
      console.log('Showing!');
      this.hireService.getUserApplication(i).subscribe(
        (data: UserApplication) => {
          this.userApp = data;
          console.log('userapp:', this.userApp);
          this.nextStep = data.type;
          this.visaDocument = data.visaTypeDoc;
          console.log(data.visaTypeDoc);
          this.wrongDoc =
            this.visaDocument[this.visaDocument.length - 1].docName;
          //CHECK LASTED DOC TO SET NEXT STEP
          this.setNextStep(this.visaDocument);
        },
        (err) => console.log(err)
      );
    }
    this.expanded = !this.expanded;
  }

  onApprove(userId: number) {
    this.hireService.approveVisa(userId).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.log('Approve visa!'),
    });
    console.log('userid', userId);

    // window.location.reload();
  }

  onReject(userId: number, wrongDoc: string) {
    this.hireService.rejectVisa(userId, wrongDoc).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.log('Approve visa!'),
    });
    console.log('userid', userId);

    // window.location.reload();
  }
  setNextStep(currentDoc: MyDoc[]) {
    console.log('inside:', currentDoc);
    for (let i = 0; i < currentDoc.length; i++) {
      if (currentDoc[i].docName == 'OPT-receipt') {
        this.nextStep = 'OPT-ead';
      } else if (currentDoc[i].docName == 'OPT-ead') {
        this.nextStep = 'I-983';
      } else if (currentDoc[i].docName == 'I-983') {
        this.nextStep = 'I-20';
      } else if (currentDoc[i].docName == 'I-20') {
        this.nextStep = 'OPT-stem-receipt';
      } else if (currentDoc[i].docName == 'OPT-stem-receipt') {
        this.nextStep = 'OPT-stem-ead';
      } else this.nextStep = 'All set!';
    }
  }

  onComment(data, userId: number) {
    console.log(userId);

    console.log(data.form.value);
    this.hireService.sendComment(data.form.value.comment, userId).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onSendNoti(userId: number) {
    let comment = 'Reminder notification!';
    this.hireService.sendComment(comment, userId).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
