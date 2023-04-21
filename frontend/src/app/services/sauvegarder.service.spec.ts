import { TestBed } from '@angular/core/testing';

import { SauvegarderService } from './sauvegarder.service';

describe('SauvegarderService', () => {
  let service: SauvegarderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SauvegarderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
