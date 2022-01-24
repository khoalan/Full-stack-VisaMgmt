import { TestBed } from '@angular/core/testing';

import { EmployeeHomeService } from './employee-home.service';

describe('EmployeeHomeService', () => {
  let service: EmployeeHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
