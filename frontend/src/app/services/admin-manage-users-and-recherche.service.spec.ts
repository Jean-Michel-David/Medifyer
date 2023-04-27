import { TestBed } from '@angular/core/testing';

import { AdminGetRechercheService } from './admin-manage-users-and-recherche.service';

describe('AdminGetRechercheService', () => {
  let service: AdminGetRechercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGetRechercheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
