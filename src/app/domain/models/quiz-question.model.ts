import { Difficulty } from './difficulty.model';

export type QuestionType = 'multiple' | 'boolean';

export interface QuizQuestion {
    type: QuestionType;
    difficulty: Difficulty;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    allAnswers?: string[];
}
