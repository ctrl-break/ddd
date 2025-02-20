import { Difficulty } from '../../domain/models/difficulty.model';
import { Winner, WinnersObject } from '../../domain/models/winner.model';
import { WinnerRepository } from '../../domain/repositories/winner.repository';
import { db } from './app.db';

export class WinnersRepositoryService implements WinnerRepository {
    private storageKey(difficulty: Difficulty): 'winners_easy' | 'winners_medium' | 'winners_hard' {
        return `winners_${difficulty}`;
    }

    async getWinners(difficulty: Difficulty | null): Promise<Winner[]> {
        if (!difficulty) {
            return [];
        }
        const winners = await db.winners.get(this.storageKey(difficulty));
        return winners ? winners.value : [];
    }

    async getAllWinners(): Promise<WinnersObject> {
        const winners = await db.winners.toArray();
        return winners.reduce((acc, winner) => {
            const key = winner.id;
            acc[key] = winner.value;
            return acc;
        }, {} as WinnersObject);
    }

    async addWinner(winner: Winner): Promise<void> {
        const winners = await this.getWinners(winner.difficulty);
        winners.push(winner);
        winners.sort((a, b) => b.score - a.score);
        const topWinners = winners.slice(0, 5);
        await db.winners.put({ id: this.storageKey(winner.difficulty), value: topWinners });
    }
}
