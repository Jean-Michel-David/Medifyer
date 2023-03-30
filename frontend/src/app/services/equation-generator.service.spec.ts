import { TestBed } from '@angular/core/testing';

import { EquationGeneratorService } from './equation-generator.service';

describe('EquationGeneratorService', () => {
  let service: EquationGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquationGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
