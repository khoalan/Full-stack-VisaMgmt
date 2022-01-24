import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  employeeId: number;

  constructor() {}

  getEmployeeId() {
    return this.employeeId;
  }

  setEmployeeId(id: number) {
    this.employeeId = id;
  }
}
