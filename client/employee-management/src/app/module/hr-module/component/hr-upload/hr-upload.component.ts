import { Component, OnInit } from '@angular/core';
import { UploaderService } from 'app/service/uploader.service';
import { AppWorkFlow } from '../../domain/appworkflow';
import { MyDoc } from '../../domain/mydoc';
import { UserApplication } from '../../domain/userapplication';
import { HireService } from '../../service/hire.service';
import { MatDialog } from '@angular/material/dialog';
import { HrDialogComponent } from '../hr-dialog/hr-dialog.component';
import { LoginService } from 'app/login/login.service';
@Component({
  selector: 'app-hr-upload',
  templateUrl: './hr-upload.component.html',
  styleUrls: ['./hr-upload.component.css'],
})
export class HrUploadComponent implements OnInit {
  appWorkFlows: AppWorkFlow[];
  rowIndex: number;
  expanded: boolean = false;
  userApp: UserApplication;
  my983Form: string;
  upload938Form: string;
  visaDocument: MyDoc[];
  popup: boolean = false;
  jwt: string = '';
  constructor(
    private hireService: HireService,
    private uploaderService: UploaderService,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.jwt = this.loginService.getHrJwt();
    console.log('HR jwt: ', this.loginService.getHrJwt());
    this.getAppWorkFlow();
  }
  // Current appworkflow()
  getAppWorkFlow() {
    this.hireService.getAppWorkFlow().subscribe(
      (data: AppWorkFlow[]) => {
        this.appWorkFlows = data;
        console.log('app:', this.appWorkFlows);
      },
      (err) => console.log(err)
    );
  }

  //Test new way
  // getAppWorkFlow(jwt: string) {
  //   this.hireService.getAppWorkFlowJ(jwt).subscribe(
  //     (data: AppWorkFlow[]) => {
  //       this.appWorkFlows = data;
  //       console.log('app:', this.appWorkFlows);
  //     },
  //     (err) => console.log(err)
  //   );
  // }

  onClick(i: number) {
    console.log(i);
    this.rowIndex = i;
    if (this.expanded == false) {
      console.log('Showing!');
      this.hireService.getUserApplication(i).subscribe(
        (data: UserApplication) => {
          this.userApp = data;
          console.log('userapp:', this.userApp);
          this.visaDocument = this.userApp.visaTypeDoc;

          for (let i = 0; i < this.visaDocument.length; i++) {
            this.my983Form = '';
            if (this.visaDocument[i].docName == 'I-983') {
              this.my983Form = this.visaDocument[i].docUrl;

              break;
            }
          }
          console.log(this.my983Form);
        },
        (err) => console.log(err)
      );
    }
    this.expanded = !this.expanded;
  }

  onSendNoti(userId: number) {
    let comment = 'Reminder notification!';
    this.hireService.sendComment(comment, userId).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onUp983() {
    console.log('up');
  }
  get983(myDoc: string) {
    confirm('Are you sure to download?');
    console.log(myDoc.slice(45));

    this.uploaderService.download(myDoc.slice(45)).subscribe();
  }

  openDialog(i: number) {
    console.log('Openned');
    const dialogRef = this.dialog.open(HrDialogComponent, {
      data: { userId: i },
    });
  }
}
