import { TestBed } from '@angular/core/testing';

import { UserRechercheService } from './user-recherche.service';

describe('SauvegarderService', () => {
  let service: UserRechercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRechercheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
