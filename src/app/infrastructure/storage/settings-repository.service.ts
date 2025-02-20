import { QuizSettings } from '../../domain/models/settings.models';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { db } from './app.db';

export const DefaultSettings: QuizSettings = {
    id: 'settings',
    playerName: 'Player',
    difficulty: 'medium',
    type: null,
    category: null,
};

export class SettingsRepositoryService implements SettingsRepository {
    async getSettings(): Promise<QuizSettings> {
        const result = await db.settings.where({ id: 'settings' }).first();
        if (!result) {
            return DefaultSettings;
        }
        return result;
    }

    async getCategories() {
        return await db.categories.toArray();
    }

    async updateSettings(settings: QuizSettings): Promise<void> {
        await db.settings.put(settings, 'settings');
    }
}
