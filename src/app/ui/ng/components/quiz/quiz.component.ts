import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { QuizSettings } from '../../../../domain/models/settings.models';
import { ResultTimerComponent } from './result-timer/result-timer.component';
import { QuestionComponent } from './question/question.component';
import { QuizProcess, QuizProcessService } from '../../services/quiz-process.service';
import { QuizFacadeService } from '../../adapters/quiz-facade.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-quiz',
    imports: [CommonModule, ResultTimerComponent, QuestionComponent],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
})
export class QuizComponent {
    quizProcess = inject(QuizProcessService);
    quizFacade = inject(QuizFacadeService);

    @Input() settings!: QuizSettings;
    quizStarted = false;
    quizEnded = false;
    finalScore: number = 0;
    timeLeft = 60;
    timer: ReturnType<typeof setInterval> | undefined;

    quiz$: Observable<QuizProcess | null> = this.quizProcess.getQuizProcess();

    async startQuiz() {
        this.finalScore = 0;
        this.quizStarted = true;
        this.quizEnded = false;
        await this.quizFacade.startQuiz();
        this.startTimer();
    }

    submitAnswer(quizState: QuizProcess, selectedAnswer: string) {
        this.quizFacade.nextQuestion(quizState, selectedAnswer);
        if (quizState.questionsLeft < 4) {
            this.quizFacade.loadNextQuestions();
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    }

    async endQuiz() {
        clearInterval(this.timer);
        this.quizEnded = true;
        this.quizStarted = false;
        this.timeLeft = 60;
        this.finalScore = this.quizProcess.getCurrentScore();
        this.quizFacade.finishQuiz(this.finalScore);
    }
}
