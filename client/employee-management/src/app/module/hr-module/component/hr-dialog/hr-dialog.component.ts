import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploaderService } from 'app/service/uploader.service';
import { HireService } from '../../service/hire.service';

@Component({
  selector: 'app-hr-dialog',
  templateUrl: './hr-dialog.component.html',
  styleUrls: ['./hr-dialog.component.css'],
})
export class HrDialogComponent implements OnInit {
  filename: string;
  constructor(
    private hireService: HireService,
    private uploaderService: UploaderService,
    public dialogRef: MatDialogRef<HrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onUpload(files: File[]): void {
    const formData = new FormData();
    console.log('id', this.data);

    for (const file of files) {
      formData.append('file', file, file.name);
    }
    this.uploaderService.upload(formData).subscribe(
      (event) => {
        console.log('e: ', event);
      },
      (error) => {
        this.filename = error.error.text;
        // console.log('Filename:', this.filename);
      }
    );
  }

  onSubmit() {
    console.log(this.data.userId);
    console.log(this.filename);
    this.hireService
      .updateSignedForm(this.data.userId, this.filename)
      .subscribe();
    this.dialogRef.close();
  }
}
