import { Difficulty } from './difficulty.model';

export interface Winner {
    playerName: string;
    score: number;
    difficulty: Difficulty;
    date: Date;
}
