import { TestBed } from '@angular/core/testing';

import { QuestionGeneratorService } from './question-generator.service';

describe('QuestionGeneratorService', () => {
  let service: QuestionGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
