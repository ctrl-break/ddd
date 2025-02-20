import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../../../../domain/models/quiz-question.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-question',
    imports: [CommonModule],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
})
export class QuestionComponent {
    @Input() question!: QuizQuestion;
    @Output() answerSelected = new EventEmitter<string>();

    onAnswerSelected(answer: string) {
        this.answerSelected.emit(answer);
    }
}
