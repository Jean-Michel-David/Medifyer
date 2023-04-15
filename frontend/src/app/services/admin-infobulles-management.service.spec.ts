import { TestBed } from '@angular/core/testing';

import { AdminInfobullesManagementService } from './admin-infobulles-management.service';

describe('AdminInfobullesManagementService', () => {
  let service: AdminInfobullesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminInfobullesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
