import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../token.service';
@Component({
  selector: 'app-send-token',
  templateUrl: './send-token.component.html',
  styleUrls: ['./send-token.component.css']
})
export class SendTokenComponent implements OnInit {

  tokenForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) { 
    this.tokenForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.tokenForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get f(){
    return this.tokenForm.controls;
  }

  onGenerateToken(){
    this.submitted = true;
    var email = this.f['email'].value;
    this.tokenService.requestEmail(email);
  }

}
