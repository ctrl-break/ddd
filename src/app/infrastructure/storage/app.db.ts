import Dexie, { Table } from 'dexie';
import { QuizSettings } from '../../domain/models/settings.models';
import { WinnerStore } from '../../domain/models/winner.model';
import { Category } from '../../domain/models/category.model';
import { DefaultSettings } from './settings-repository.service';

class AppDB extends Dexie {
    settings!: Table<QuizSettings, string>;
    categories!: Table<Category, number>;
    winners!: Table<WinnerStore, string>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(1).stores({
            settings: 'id',
            categories: 'id',
            winners: 'id',
        });
        this.on('populate', () => this.populate());
    }

    async populate() {
        await db.settings.add({
            ...DefaultSettings,
        });
        await db.winners.bulkAdd([
            {
                id: 'winners_easy',
                value: [{ playerName: 'Player', score: 10, difficulty: 'easy', date: new Date(2025, 0, 1) }],
            },
            {
                id: 'winners_medium',
                value: [
                    { playerName: 'fox', score: 30, difficulty: 'medium', date: new Date(2025, 0, 1) },
                    { playerName: 'Player', score: 15, difficulty: 'medium', date: new Date(2025, 0, 1) },
                ],
            },
            {
                id: 'winners_hard',
                value: [{ playerName: 'fox', score: 40, difficulty: 'hard', date: new Date(2025, 0, 1) }],
            },
        ]);
    }

    async resetDatabase() {
        await db.transaction('rw', 'settings', 'winners', () => {
            this.settings.clear();
            this.categories.clear();
            this.winners.clear();
            this.populate();
        });
    }
}

export const db = new AppDB();
