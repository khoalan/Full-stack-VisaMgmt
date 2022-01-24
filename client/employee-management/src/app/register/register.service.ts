import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { NewAccount } from './newAccount';
import { Constant } from '../constant/constant';
import { JwtToken } from './jwtToken';
import { map } from 'rxjs/operators';
import { TestAcc } from './testAcc';

const httpOptions = {
  headers: new HttpHeaders({
    'Allow-Cross-Origin-Origina0': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

//upload register info to back-end
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  url = Constant.REQUEST_REGISTER_URL;
  urlToken = Constant.VALIDATE_TOKEN;

  registerEmail: string = '';

  accountHolder: BehaviorSubject<NewAccount>;

  constructor(private http: HttpClient) {
    this.accountHolder = new BehaviorSubject<NewAccount>(new NewAccount());
  }

  postRegister(register: TestAcc): Observable<TestAcc> {
    const body = {
      username: register.username,
      password: register.password,
    };
    console.log(body);
    console.log(this.url);
    // posting the new account registration to the back-end
    return this.http.post<TestAcc>(this.url, body, httpOptions);
  }

  //sending register object to localhost:8080/ ... (back-end)
  requestRegister(register: NewAccount): Observable<NewAccount> {
    // posting the new account registration to the back-end
    return this.http.post<NewAccount>(this.url, register, httpOptions);
  }

  // requestRegister(register: any): Observable<any> {
  //   const body = {
  //     register: register,
  //   };
  //   console.log(body);
  //   // posting the new account registration to the back-end
  //   return this.http.post<any>(this.url, body, httpOptions);
  // }

  passingNewAccount(newAccount: NewAccount) {
    this.accountHolder.next(newAccount);
  }

  validateToken(jwt: JwtToken): Observable<JwtToken> {
    const body = {
      jwt: jwt.jwt,
    };
    console.log(jwt.jwt);
    return this.http.post<JwtToken>(this.urlToken, body, httpOptions);
  }

  setRegisterEmail(email: string) {
    this.registerEmail = email;
  }

  getRegisterEmail() {
    return this.registerEmail;
  }
}
