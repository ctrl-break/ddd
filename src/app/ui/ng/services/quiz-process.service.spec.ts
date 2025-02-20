import { TestBed } from '@angular/core/testing';

import { QuizProcessService } from './quiz-process.service';

describe('QuizProcessService', () => {
  let service: QuizProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
