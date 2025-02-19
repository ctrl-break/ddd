import { QuizDomainService } from '../../domain/services/quiz-domain.service';

export class SubmitAnswerUseCase {
    private quizDomainService = new QuizDomainService();

    execute(currentScore: number, isCorrect: boolean): number {
        const points = this.quizDomainService.calculateScore(isCorrect);
        return currentScore + points;
    }
}
