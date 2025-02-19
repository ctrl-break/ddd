import { SessionToken } from '../../domain/models/session-token.model';
import { TriviaApi } from '../../infrastructure/api/trivia-api.service';
import { CookieStorage } from '../../infrastructure/storage/cookie-storage.service';

export class InitSessionUseCase {
    constructor(
        private triviaApi: TriviaApi,
        private cookieStorage: CookieStorage,
    ) {}

    async execute(): Promise<SessionToken> {
        let token = this.cookieStorage.get('session_token');
        if (token) {
            return { token };
        }
        const response = await this.triviaApi.requestToken();
        token = response.token;
        this.cookieStorage.set('session_token', token);
        return { token };
    }
}
