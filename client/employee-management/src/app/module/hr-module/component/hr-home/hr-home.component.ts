import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'app/module/employee-module/service/http-service.service';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css'],
})
export class HrHomeComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onLogOut() {
    this.httpService.getLogOut().subscribe();
    this.router.navigateByUrl('/');
  }
}
