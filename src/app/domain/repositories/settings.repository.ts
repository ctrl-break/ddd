import { QuizSettings } from '../models/settings.models';

export abstract class SettingsRepository {
    abstract getSettings(): Promise<QuizSettings>;
    abstract updateSettings(settings: QuizSettings): Promise<QuizSettings>;
}
