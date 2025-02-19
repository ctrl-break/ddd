import { QuizQuestion } from '../../../domain/models/quiz-question.model';
import { SessionToken } from '../../../domain/models/session-token.model';
import { QuizSettings } from '../../../domain/models/settings.models';
import { QuizDomainService } from '../../../domain/services/quiz-domain.service';
import { TriviaApi } from '../../../infrastructure/api/trivia-api.service';

export class LoadQuestionsUseCase {
    private quizDomainService = new QuizDomainService();

    constructor(private triviaApi: TriviaApi) {}

    async execute(token: SessionToken, settings: QuizSettings): Promise<QuizQuestion[]> {
        const questions = await this.triviaApi.getQuestions(token.token, settings);
        return questions.map((q) => ({
            ...q,
            allAnswers: this.quizDomainService.shuffleAnswers(q.correct_answer, q.incorrect_answers),
        }));
    }
}
