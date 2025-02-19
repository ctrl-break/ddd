import { TestBed } from '@angular/core/testing';

import { QuizFacadeService } from './quiz-facade.service';

describe('QuizFacadeService', () => {
  let service: QuizFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
