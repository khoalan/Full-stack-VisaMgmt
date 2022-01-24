import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'app/module/hr-module/domain/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { EmployeeService } from '../../service/employee.service';
import { Enp } from '../../domain/enp';
import { Person } from '../../domain/person';
import { ShowEmployeeTable } from '../../domain/showEmployeeTable';
@Component({
  selector: 'app-hr-employee',
  templateUrl: './hr-employee.component.html',
  styleUrls: ['./hr-employee.component.css'],
})
export class HrEmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    'employeeId',
    'name',
    'ssn',
    'visaStartDate',
    'visaStatusId',
    'viewDetail',
  ];
  employees: Employee[];
  people: Person[];
  table: ShowEmployeeTable[] = [];
  total: number;

  dataSource: MatTableDataSource<ShowEmployeeTable>;
  dataLoading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private loadEmployees() {
    this.employeeService.getEnp().subscribe(
      (enp: Enp) => {
        this.people = enp['people'];
        this.employees = enp['employees'];

        for (var p of this.people) {
          for (var e of this.employees) {
            if (p.id === Number(e.personId)) {
              var table: ShowEmployeeTable = new ShowEmployeeTable();

              table.employeeId = p.userId;
              table.name = p.firstName + ' ' + p.middleName + ' ' + p.lastName;
              table.cellPhone = p.cellPhone;
              table.alternatePhone = p.alternatePhone;
              table.gender = p.gender;
              table.dob = p.dob;
              table.email = p.email;
              table.ssn = p.ssn;

              table.title = e.title;
              table.managerId = e.managerId;
              table.startDate = e.startDate;
              table.endDate = e.endDate;
              table.avatar = e.avatar;
              table.car = e.car;
              table.visaStartDate = e.visaStartDate;
              table.visaStatusId = e.visaStatusId;
              table.visaEndDate = e.visaEndDate;
              table.driverLicense = e.driverLicense;
              table.driverLicenseExpDate = e.driverLicenseExpDate;
              table.houseId = e.houseId;

              table.viewDetail = 'View Detail';

              this.table.push(table);
            }
          }
        }
        this.handleEmployee(this.table);
      },
      (err) => this.handleError(err)
    );
  }

  private handleEmployee(table: ShowEmployeeTable[]) {
    this.dataLoading = false;
    this.dataSource = new MatTableDataSource(table);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.total = this.table.length;
  }

  private handleError(err) {
    console.error(err);
  }
}
