import { Category } from '../../../domain/models/category.model';
import { TriviaApi } from '../../../infrastructure/api/trivia-api.service';

export class LoadCategoriesUseCase {
    constructor(private triviaApi: TriviaApi) {}

    async execute(): Promise<Category[]> {
        const categories = await this.triviaApi.getCategories();
        return categories;
    }
}
