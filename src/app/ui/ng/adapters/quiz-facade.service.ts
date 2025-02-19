import { Injectable, inject } from '@angular/core';
import { InitAppUseCase } from '../../../application/use-cases/init-app.usecase';
import { from } from 'rxjs';
import { COOKIE_STORAGE_TOKEN, TRIVIA_API_TOKEN } from '../../../app.tokens';

@Injectable({
    providedIn: 'root',
})
export class QuizFacadeService {
    triviaApi = inject(TRIVIA_API_TOKEN);
    cookieStorage = inject(COOKIE_STORAGE_TOKEN);
    initializeAppUseCase: InitAppUseCase = new InitAppUseCase(this.triviaApi, this.cookieStorage);

    initializeApp() {
        return from(this.initializeAppUseCase.execute());
    }
}
