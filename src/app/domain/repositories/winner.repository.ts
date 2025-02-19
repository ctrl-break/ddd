import { Winner } from '../models/winner.model';

export abstract class WinnerRepository {
    abstract getWinners(difficulty: string | null): Promise<Winner[]>;
    abstract addWinner(winner: Winner): Promise<void>;
}
