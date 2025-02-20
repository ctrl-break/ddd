import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTimerComponent } from './result-timer.component';

describe('ResultTimerComponent', () => {
  let component: ResultTimerComponent;
  let fixture: ComponentFixture<ResultTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
