import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Constant } from '../../../constant/constant';
import { Email } from '../domain/email';
import { AppWorkFlow } from '../domain/appworkflow';
import { UserApplication } from '../domain/userapplication';

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
export class HireService {
  url = Constant.GENERATE_TOKEN_URL;
  GET_WORK_FLOW_URL = 'http://localhost:8081/hr';
  LOGIN_URL = 'http://localhost:8080';
  ONBOARDING_URL = 'http://localhost:8081';
  constructor(private http: HttpClient) {}

  generateToken(email: Email): Observable<Email> {
    console.log('post generateToken', email);
    const body = {
      email: email.myEmail,
    };
    return this.http.post<Email>(this.url, body, {
      headers: {
        'Allow-Cross-Origin-Origina0': '*',
      },
      withCredentials: true,
    });
  }
  CURRENT;
  getAppWorkFlow(): Observable<AppWorkFlow[]> {
    return this.http.get<AppWorkFlow[]>(
      this.GET_WORK_FLOW_URL + '/hire',
      httpOptions
    );
  }

  //test
  getAppWorkFlowJ(jwt: string): Observable<AppWorkFlow[]> {
    let header = new HttpHeaders({
      Authorization: 'Bearer' + jwt,
      'Allow-Cross-Origin-Origina0': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<AppWorkFlow[]>(this.GET_WORK_FLOW_URL + '/hire', {
      headers: header,
      withCredentials: true,
    });
  }

  getUserApplication(userId: number): Observable<UserApplication> {
    return this.http.get<UserApplication>(
      `${this.GET_WORK_FLOW_URL}/user/${userId}`,
      httpOptions
    );
  }

  approveLogin(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.LOGIN_URL}/approveLogin/${userId}`,
      httpOptions
    );
  }

  rejectLogin(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.LOGIN_URL}/rejectLogin/${userId}`,
      httpOptions
    );
  }

  setCompleteOnboarding(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/approveOnboard/${userId}`,
      httpOptions
    );
  }

  setPendingOnboarding(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/rejectOnboard/${userId}`,
      httpOptions
    );
  }

  approveVisa(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/approveVisa/${userId}`,
      httpOptions
    );
  }

  rejectVisa(userId: number, wrongDoc: string): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/rejectVisa/${userId}/${wrongDoc}`,
      httpOptions
    );
  }

  updateStatus(
    userId: number,
    nextStatus: string,
    nextStep: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/updateStatus/${userId}/${nextStatus}/${nextStep}`,
      httpOptions
    );
  }

  updateStep(userId: number, nextStep: string): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/updateStep/${userId}/${nextStep}`,
      httpOptions
    );
  }

  sendComment(cmt: any, userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/comment/${userId}`,
      cmt,
      httpOptions
    );
  }

  updateSignedForm(userId: number, form: string): Observable<any> {
    return this.http.post<any>(
      `${this.ONBOARDING_URL}/updateSignedForm/${userId}`,
      form,
      httpOptions
    );
  }
}
