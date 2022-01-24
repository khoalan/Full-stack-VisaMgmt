import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'app/constant/constant';
import { Employee } from '../domain/employee';
import { Observable } from 'rxjs';
import { Enp } from '../domain/enp';
import { Person } from 'app/module/employee-module/domain/Person';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllPeople(): Observable<Person[]> {
    var url = Constant.GET_EMPLOYEE_URL;
    return this.http.get<Person[]>(url);
  }

  getEnp(): Observable<Enp> {
    var url = Constant.GET_ENP_URL;
    return this.http.get<Enp>(url);
  }
}
