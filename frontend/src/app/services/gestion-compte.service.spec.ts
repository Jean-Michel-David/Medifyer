import { TestBed } from '@angular/core/testing';

import { GestionCompteService } from './gestion-compte.service';

describe('GestionCompteService', () => {
  let service: GestionCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
