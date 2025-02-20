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
        const currentDate = new Date();
        const datePlus = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000);

        if (token) {
            this.cookieStorage.set('session_token', token, datePlus);
            return { token };
        }
        const response = await this.triviaApi.requestToken();
        token = response.token;
        this.cookieStorage.set('session_token', token, datePlus);
        return { token };
    }
}
