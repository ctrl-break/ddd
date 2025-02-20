import { Difficulty } from './difficulty.model';

export interface Winner {
    playerName: string;
    score: number;
    difficulty: Difficulty;
    date: Date;
}

export interface WinnerStore {
    id: WinnerStoreKeys;
    value: Winner[];
}

export type WinnerStoreKeys = 'winners_easy' | 'winners_medium' | 'winners_hard';

export type WinnersObject = Record<WinnerStore['id'], Winner[]>;
