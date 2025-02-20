import { Injectable, inject } from '@angular/core';
import { InitAppUseCase } from '../../../application/use-cases/init-app.usecase';
import { Observable, delay, from } from 'rxjs';
import { COOKIE_STORAGE_TOKEN, TRIVIA_API_TOKEN } from '../../../app.tokens';
import { WinnersRepositoryService } from '../../../infrastructure/storage/winners-repository.service';
import { liveQuery } from 'dexie';
import { WinnerStore, WinnersObject } from '../../../domain/models/winner.model';

@Injectable({
    providedIn: 'root',
})
export class QuizFacadeService {
    triviaApi = inject(TRIVIA_API_TOKEN);
    cookieStorage = inject(COOKIE_STORAGE_TOKEN);
    initializeAppUseCase: InitAppUseCase = new InitAppUseCase(this.triviaApi, this.cookieStorage);

    initializeApp() {
        return from(this.initializeAppUseCase.execute()).pipe(delay(300));
    }

    getWinners(): Observable<WinnersObject> {
        const winnersRepository = new WinnersRepositoryService();
        return from(liveQuery(() => winnersRepository.getAllWinners()));
    }
}
