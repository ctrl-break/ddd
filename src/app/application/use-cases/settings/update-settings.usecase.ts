import { QuizSettings } from '../../../domain/models/settings.models';
import { SettingsRepository } from '../../../domain/repositories/settings.repository';

export class UpdateSettingsUseCase {
    constructor(private settingsRepository: SettingsRepository) {}

    async execute(newSettings: QuizSettings): Promise<void> {
        return this.settingsRepository.updateSettings(newSettings);
    }
}
