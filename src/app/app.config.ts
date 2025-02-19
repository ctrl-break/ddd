import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TriviaApi } from './infrastructure/api/trivia-api.service';
import { CookieStorage } from './infrastructure/storage/cookie-storage.service';
import { COOKIE_STORAGE_TOKEN, TRIVIA_API_TOKEN } from './app.tokens';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        { provide: TRIVIA_API_TOKEN, useClass: TriviaApi },
        { provide: COOKIE_STORAGE_TOKEN, useClass: CookieStorage },
    ],
};
