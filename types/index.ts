export type QuizAnswers = Record<number, string>;

export interface AppState {
  quizAnswers: QuizAnswers;
  recommendedSport: string | null;
}
