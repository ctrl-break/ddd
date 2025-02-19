import { Difficulty } from './difficulty.model';

export interface Winner {
    playerName: string;
    score: number;
    difficulty: Difficulty;
    date: Date;
}

export interface WinnerStore {
    id: 'winners_easy' | 'winners_medium' | 'winners_hard';
    value: Winner[];
}
