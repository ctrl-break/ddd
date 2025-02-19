import { Winner } from '../../domain/models/winner.model';

export class WinnersRepository {
    private storageKey(difficulty: string): string {
        return `winners_${difficulty}`;
    }

    async getWinners(difficulty: string | null): Promise<Winner[]> {
        if (!difficulty) {
            return [];
        }
        const data = localStorage.getItem(this.storageKey(difficulty));
        return data ? JSON.parse(data) : [];
    }

    async addWinner(winner: Winner): Promise<void> {
        const winners = await this.getWinners(winner.difficulty);
        winners.push(winner);
        winners.sort((a, b) => b.score - a.score);
        const topWinners = winners.slice(0, 5);
        localStorage.setItem(this.storageKey(winner.difficulty), JSON.stringify(topWinners));
    }
}
