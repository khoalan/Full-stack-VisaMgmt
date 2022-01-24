import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Account } from './account';
import { Constant } from '../constant/constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Allow-Cross-Origin-Origina0': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //back-end url to pass the account object
  url = Constant.REQUEST_LOGIN_URL;

  hrJwt: string = '';
  userJwt: string = '';

  constructor(private http: HttpClient) {}

  setHrJwt(jwt: string) {
    this.hrJwt = jwt;
  }
  setUserJwt(jwt: string) {
    this.userJwt = jwt;
  }

  getHrJwt() {
    return this.hrJwt;
  }
  getUserJwt() {
    return this.userJwt;
  }
  //sending account object to localhost:8080/login (back-end)
  requestLogin(account: Account): Observable<Account> {
    const body = {
      username: account.username,
      password: account.password,
      isHr: account.isHr,
    };
    console.log(body);

    return this.http.post<Account>(this.url, body, httpOptions);
  }

  newLogin(account: Account): Observable<any> {
    const body = {
      username: account.username,
      password: account.password,
      isHr: account.isHr,
    };
    return this.http.post<any>(this.url, body, httpOptions);
  }
}
