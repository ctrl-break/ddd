import { Category } from '../../domain/models/category.model';
import { QuizQuestion } from '../../domain/models/quiz-question.model';
import { QuizSettings } from '../../domain/models/settings.models';

export interface TriviaApiResponseToken {
    response_code: number;
    token: string;
}

export interface TriviaApiResponseQuestions {
    response_code: number;
    results: QuizQuestion[];
}

export class TriviaApi {
    async requestToken(): Promise<TriviaApiResponseToken> {
        const response = await fetch('https://opentdb.com/api_token.php?command=request');
        const data = await response.json();
        return data;
    }

    async getQuestions(token: string, settings: QuizSettings): Promise<QuizQuestion[]> {
        let url = `https://opentdb.com/api.php?amount=10&token=${token}`;
        if (settings.category) {
            url += `&category=${settings.category}`;
        }
        if (settings.difficulty) {
            url += `&difficulty=${settings.difficulty}`;
        }
        if (settings.type) {
            url += `&type=${settings.type}`;
        }
        const response = await fetch(url);
        const data: TriviaApiResponseQuestions = await response.json();
        return data.results;
    }

    async getCategories(): Promise<Category[]> {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data: { trivia_categories: Category[] } = await response.json();
        return data.trivia_categories;
    }
}
