import { TriviaApi } from '../../infrastructure/api/trivia-api.service';
import { db } from '../../infrastructure/storage/app.db';
import { CookieStorage } from '../../infrastructure/storage/cookie-storage.service';
import { InitSessionUseCase } from './init-session.usecase';
import { LoadCategoriesUseCase } from './settings/load-categories.usecase';

export class InitAppUseCase {
    initSession: InitSessionUseCase;
    loadCategories: LoadCategoriesUseCase;

    constructor(
        private triviaApi: TriviaApi,
        private cookieStorage: CookieStorage,
    ) {
        this.initSession = new InitSessionUseCase(this.triviaApi, this.cookieStorage);
        this.loadCategories = new LoadCategoriesUseCase(this.triviaApi);
    }

    async execute(): Promise<boolean> {
        await this.initSession.execute();
        const cat = await db.categories.toArray();
        if (!cat?.length) {
            const categories = await this.loadCategories.execute();
            await db.categories.bulkAdd(categories);
        }
        return true;
    }
}
