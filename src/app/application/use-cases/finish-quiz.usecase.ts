import { QuizSettings } from '../../domain/models/settings.models';
import { Winner } from '../../domain/models/winner.model';
import { QuizDomainService } from '../../domain/services/quiz-domain.service';
import { WinnersRepository } from '../../infrastructure/storage/winners-repository.service';

export class FinishQuizUseCase {
    private quizDomainService = new QuizDomainService();

    constructor(private winnersRepository: WinnersRepository) {}

    async execute(settings: QuizSettings, finalScore: number): Promise<void> {
        const winners = await this.winnersRepository.getWinners(settings.difficulty);
        const topScores = winners.map((w) => w.score);
        if (this.quizDomainService.qualifiesForTop(finalScore, topScores)) {
            const winner: Winner = {
                playerName: settings.playerName,
                score: finalScore,
                difficulty: settings.difficulty,
                date: new Date(),
            };
            await this.winnersRepository.addWinner(winner);
        }
    }
}
