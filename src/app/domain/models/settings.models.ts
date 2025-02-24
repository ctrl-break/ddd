import { Difficulty } from './difficulty.model';
import { QuestionType } from './quiz-question.model';

export interface QuizSettings {
    id: 'settings';
    playerName: string;
    difficulty: Difficulty;
    type: QuestionType | null;
    category: number | null;
}
