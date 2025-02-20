import { Injectable, inject } from '@angular/core';
import { InitAppUseCase } from '../../../application/use-cases/init-app.usecase';
import { Observable, delay, from } from 'rxjs';
import { COOKIE_STORAGE_TOKEN, TRIVIA_API_TOKEN } from '../../../app.tokens';
import { WinnersRepositoryService } from '../../../infrastructure/storage/winners-repository.service';
import { liveQuery } from 'dexie';
import { WinnersObject } from '../../../domain/models/winner.model';
import { SettingsRepositoryService } from '../../../infrastructure/storage/settings-repository.service';
import { QuizSettings } from '../../../domain/models/settings.models';
import { Category } from '../../../domain/models/category.model';
import { UpdateSettingsUseCase } from '../../../application/use-cases/settings/update-settings.usecase';

@Injectable({
    providedIn: 'root',
})
export class QuizFacadeService {
    triviaApi = inject(TRIVIA_API_TOKEN);
    cookieStorage = inject(COOKIE_STORAGE_TOKEN);
    winnersRepository = new WinnersRepositoryService();
    settingsRepository = new SettingsRepositoryService();

    private initializeAppUseCase: InitAppUseCase = new InitAppUseCase(this.triviaApi, this.cookieStorage);
    private updateSettingsUseCase = new UpdateSettingsUseCase(this.settingsRepository);

    initializeApp() {
        return from(this.initializeAppUseCase.execute()).pipe(delay(500));
    }

    getCategories(): Observable<Category[]> {
        return from(this.settingsRepository.getCategories());
    }

    getWinners(): Observable<WinnersObject> {
        return from(liveQuery(() => this.winnersRepository.getAllWinners()));
    }

    getSettings() {
        return from(liveQuery(() => this.settingsRepository.getSettings()));
    }

    updateSettings(newSettings: QuizSettings) {
        this.updateSettingsUseCase.execute(newSettings);
    }
}
