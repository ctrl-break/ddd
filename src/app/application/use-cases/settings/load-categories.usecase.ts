import { Category } from '../../../domain/models/category.model';
import { TriviaApi } from '../../../infrastructure/api/trivia-api.service';

export class LoadCategoriesUseCase {
    constructor(private triviaApi: TriviaApi) {}

    async execute(): Promise<Category[]> {
        return await this.triviaApi.getCategories();
    }
}
