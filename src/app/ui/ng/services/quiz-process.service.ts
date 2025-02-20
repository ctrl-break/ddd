import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizQuestion } from '../../../domain/models/quiz-question.model';

export interface QuizProcess {
    currentQuestion: QuizQuestion;
    score: number;
    questionsLeft: number;
}

@Injectable({
    providedIn: 'root',
})
export class QuizProcessService {
    private quiz = new BehaviorSubject<QuizProcess | null>(null);

    questions: QuizQuestion[] = [];
    questionLoading = false;
    currentIndex = 0;

    constructor() {}

    getQuizProcess() {
        return this.quiz.asObservable();
    }

    getCurrentScore() {
        return this.quiz.getValue()?.score || 0;
    }

    getCurrentQuestion() {
        return this.quiz.getValue()?.currentQuestion;
    }

    resetQuiz() {
        this.quiz.next(null);
        this.currentIndex = 0;
        this.questions = [];
    }

    updateQuestions(newQuestions: QuizQuestion[]) {
        this.questions = [...this.questions, ...newQuestions];
        const currentState = this.quiz.getValue();
        this.quiz.next({
            ...currentState!,
            questionsLeft: this.questions.length - this.currentIndex,
        });
    }

    nextQuizRound(score: number) {
        this.quiz.next({
            currentQuestion: this.questions[this.currentIndex],
            score,
            questionsLeft: this.questions.length - this.currentIndex,
        });
        this.currentIndex++;
    }
}
