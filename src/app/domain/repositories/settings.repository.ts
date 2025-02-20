import { Category } from '../models/category.model';
import { QuizSettings } from '../models/settings.models';

export abstract class SettingsRepository {
    abstract getSettings(): Promise<QuizSettings>;
    abstract getCategories(): Promise<Category[]>;
    abstract updateSettings(settings: QuizSettings): Promise<void>;
}
