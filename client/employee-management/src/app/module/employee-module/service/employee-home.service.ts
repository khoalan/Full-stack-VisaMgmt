import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../../../constant/constant';
import { UserApplication } from 'app/module/hr-module/domain/userapplication';

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
export class EmployeeHomeService {
  url = Constant.EMPLOYEE_HOME_URL;
  GET_WORK_FLOW_URL = 'http://localhost:8081/userVisa';

  constructor(private http: HttpClient) {}

  getPerson(): Observable<any> {
    console.log('get person');

    return this.http.get<any>(this.url, {
      headers: {
        'Allow-Cross-Origin-Origina0': '*',
      },
      withCredentials: true,
    });
  }

  getUserStatus(): Observable<any> {
    return this.http.get<any>(this.GET_WORK_FLOW_URL, httpOptions);
  }
}
