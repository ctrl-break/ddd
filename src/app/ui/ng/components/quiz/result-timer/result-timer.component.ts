import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-result-timer',
    imports: [],
    templateUrl: './result-timer.component.html',
    styleUrl: './result-timer.component.scss',
})
export class ResultTimerComponent {
    @Input() score: number = 0;
    @Input() timeLeft: number = 60;
}
