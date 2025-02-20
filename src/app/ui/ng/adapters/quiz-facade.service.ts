import { Injectable, inject } from '@angular/core';
import { InitAppUseCase } from '../../../application/use-cases/init-app.usecase';
import { Observable, delay, from } from 'rxjs';
import { COOKIE_STORAGE_TOKEN, TRIVIA_API_TOKEN } from '../../../app.tokens';
import { WinnersRepositoryService } from '../../../infrastructure/storage/winners-repository.service';
import { liveQuery } from 'dexie';
import { WinnersObject } from '../../../domain/models/winner.model';
import { SettingsRepositoryService } from '../../../infrastructure/storage/settings-repository.service';
import { QuizSettings } from '../../../domain/models/settings.models';
import { Category } from '../../../domain/models/category.model';
import { UpdateSettingsUseCase } from '../../../application/use-cases/settings/update-settings.usecase';
import { LoadQuestionsUseCase } from '../../../application/use-cases/quiz/load-questions.usecase';
import { SubmitAnswerUseCase } from '../../../application/use-cases/quiz/submit-answer.usecase';
import { FinishQuizUseCase } from '../../../application/use-cases/quiz/finish-quiz.usecase';
import { QuizProcess, QuizProcessService } from '../services/quiz-process.service';

@Injectable({
    providedIn: 'root',
})
export class QuizFacadeService {
    triviaApi = inject(TRIVIA_API_TOKEN);
    cookieStorage = inject(COOKIE_STORAGE_TOKEN);
    quizProcess = inject(QuizProcessService);
    winnersRepository = new WinnersRepositoryService();
    settingsRepository = new SettingsRepositoryService();

    private initializeAppUseCase: InitAppUseCase = new InitAppUseCase(this.triviaApi, this.cookieStorage);
    private updateSettingsUseCase = new UpdateSettingsUseCase(this.settingsRepository);
    private loadQuestionsUseCase = new LoadQuestionsUseCase(this.triviaApi);
    private submitAnswerUseCase = new SubmitAnswerUseCase();
    private finishQuizUseCase = new FinishQuizUseCase(this.winnersRepository);

    initializeApp() {
        return from(this.initializeAppUseCase.execute()).pipe(delay(500));
    }

    getCategories(): Observable<Category[]> {
        return from(this.settingsRepository.getCategories());
    }

    getWinners(): Observable<WinnersObject> {
        return from(liveQuery(() => this.winnersRepository.getAllWinners()));
    }

    getSettings() {
        return from(liveQuery(() => this.settingsRepository.getSettings()));
    }

    updateSettings(newSettings: QuizSettings) {
        this.updateSettingsUseCase.execute(newSettings);
    }

    async startQuiz() {
        this.quizProcess.resetQuiz();
        await this.loadNextQuestions();
        this.quizProcess.nextQuizRound(0);
    }

    async loadNextQuestions() {
        if (this.quizProcess.questionLoading) {
            return;
        }
        this.quizProcess.questionLoading = true;
        const token = this.cookieStorage.get('session_token');
        if (!token) {
            return;
        }
        const settings = await this.settingsRepository.getSettings();
        const questions = await this.loadQuestionsUseCase.execute({ token }, settings);
        this.quizProcess.updateQuestions(questions);
        this.quizProcess.questionLoading = false;
    }

    nextQuestion(quiz: QuizProcess, answer: string) {
        const isCorrect = answer === quiz.currentQuestion.correct_answer;
        const score = this.submitAnswerUseCase.execute(quiz.score, isCorrect);
        this.quizProcess.nextQuizRound(score);
    }

    async finishQuiz(currentScore: number) {
        const settings = await this.settingsRepository.getSettings();
        await this.finishQuizUseCase.execute(settings, currentScore);
    }
}
