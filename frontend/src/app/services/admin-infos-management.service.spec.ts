import { TestBed } from '@angular/core/testing';

import { AdminInfobullesManagementService } from './admin-infos-management.service';

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
