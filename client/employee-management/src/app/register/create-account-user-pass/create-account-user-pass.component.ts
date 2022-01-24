import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewAccount } from '../newAccount';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { JwtToken } from '../jwtToken';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-create-account-user-pass',
  templateUrl: './create-account-user-pass.component.html',
  styleUrls: ['./create-account-user-pass.component.css'],
})
export class CreateAccountUserPassComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  tk: any;
  registeredEmail: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.registerForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.activatedRoute.paramMap.subscribe(
      (param) => (this.tk = param.get('token'))
    );
    let jwt = this.tk == null ? new JwtToken('') : new JwtToken(this.tk);

    this.registerService
      .validateToken(jwt)
      .subscribe((res) => (this.registeredEmail = res.jwt));
  }

  get f() {
    return this.registerForm.controls;
  }

  checkValid(): boolean {
    if (this.f['username'].errors || this.f['password'].errors) {
      return false;
    }
    return true;
  }

  onSubmit() {
    //something submitted
    this.submitted = true;

    //check the input validation. if Pass, generate object of Account
    if (this.checkValid()) {
      var newAcc = new NewAccount(
        this.f['username'].value,
        this.f['password'].value
      );
      //pass new account to next component
      this.registerService.accountHolder.next(newAcc);
      this.registerService.setRegisterEmail(this.registeredEmail);
      this.router.navigateByUrl('/register/step2');
    }
  }
}
