export class QuizDomainService {
    calculateScore(isCorrect: boolean): number {
        return isCorrect ? 3 : -5;
    }

    qualifiesForTop(score: number, topScores: number[]): boolean {
        if (topScores.length < 5) return true;
        const minTopScore = Math.min(...topScores);
        return score > minTopScore;
    }

    shuffleAnswers(correct: string, incorrect: string[]): string[] {
        const answers = [correct, ...incorrect];
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }
}
