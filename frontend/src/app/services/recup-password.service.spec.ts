import { TestBed } from '@angular/core/testing';

import { RecupPasswordService } from './recup-password.service';

describe('RecupPasswordService', () => {
  let service: RecupPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
