import { InjectionToken } from '@angular/core';
import { TriviaApi } from './infrastructure/api/trivia-api.service';
import { CookieStorage } from './infrastructure/storage/cookie-storage.service';

export const TRIVIA_API_TOKEN = new InjectionToken<TriviaApi>('TRIVIA_API_TOKEN');
export const COOKIE_STORAGE_TOKEN = new InjectionToken<CookieStorage>('COOKIE_STORAGE_TOKEN');
