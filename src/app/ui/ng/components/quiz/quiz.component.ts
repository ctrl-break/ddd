import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FinishQuizUseCase } from '../../../../application/use-cases/quiz/finish-quiz.usecase';
import { SubmitAnswerUseCase } from '../../../../application/use-cases/quiz/submit-answer.usecase';
import { QuizQuestion } from '../../../../domain/models/quiz-question.model';
import { QuizSettings } from '../../../../domain/models/settings.models';
import { TriviaApi } from '../../../../infrastructure/api/trivia-api.service';
import { CookieStorage } from '../../../../infrastructure/storage/cookie-storage.service';
import { InitSessionUseCase } from '../../../../application/use-cases/init-session.usecase';

@Component({
    selector: 'app-quiz',
    imports: [CommonModule],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
})
export class QuizComponent {
    // @Input() settings: QuizSettings = {
    //     playerName: 'Player',
    //     difficulty: 'medium',
    //     type: 'multiple',
    //     category: null,
    // };
    // quizStarted = false;
    // quizEnded = false;
    // questions: QuizQuestion[] = [];
    // currentIndex = 0;
    // currentQuestion: QuizQuestion | null = null;
    // score = 0;
    // timeLeft = 60;
    // timer: any;
    // private triviaApi = new TriviaApi();
    // private cookieStorage = new CookieStorage();
    // private winnersRepository = new WinnersRepository();
    // private initializeSessionUseCase = new InitSessionUseCase(this.triviaApi, this.cookieStorage);
    // private startQuizUseCase = new StartQuizUseCase(this.triviaApi);
    // private submitAnswerUseCase = new SubmitAnswerUseCase();
    // private finishQuizUseCase = new FinishQuizUseCase(this.winnersRepository);
    // async ngOnInit() {
    //     await this.initializeSessionUseCase.execute();
    // }
    // async startQuiz() {
    //     this.quizStarted = true;
    //     this.score = 0;
    //     this.currentIndex = 0;
    //     const token = this.cookieStorage.get('session_token');
    //     if (!token) {
    //         console.error('Нет токена сессии!');
    //         return;
    //     }
    //     this.questions = await this.startQuizUseCase.execute({ token }, this.settings);
    //     this.currentQuestion = this.questions[this.currentIndex];
    //     this.startTimer();
    // }
    // startTimer() {
    //     this.timer = setInterval(() => {
    //         this.timeLeft--;
    //         if (this.timeLeft <= 0) {
    //             this.endQuiz();
    //         }
    //     }, 1000);
    // }
    // async submitAnswer(selectedAnswer: string) {
    //     if (!this.currentQuestion) {
    //         return;
    //     }
    //     const isCorrect = selectedAnswer === this.currentQuestion.correct_answer;
    //     this.score = this.submitAnswerUseCase.execute(this.score, isCorrect);
    //     this.currentIndex++;
    //     if (this.currentIndex < this.questions.length) {
    //         this.currentQuestion = this.questions[this.currentIndex];
    //     } else {
    //         const token = this.cookieStorage.get('session_token');
    //         this.questions = await this.startQuizUseCase.execute({ token }, this.settings);
    //         this.currentIndex = 0;
    //         this.currentQuestion = this.questions[this.currentIndex];
    //     }
    // }
    // async endQuiz() {
    //     clearInterval(this.timer);
    //     this.quizEnded = true;
    //     this.quizStarted = false;
    //     await this.finishQuizUseCase.execute(this.settings, this.score);
    //     this.timeLeft = 60;
    // }
}
