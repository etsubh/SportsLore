"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { QuizAnswers } from "@/types";
import { calculateSportRecommendation } from "@/lib/quiz";

interface AppContextType {
  quizAnswers: QuizAnswers;
  setQuizAnswer: (questionId: number, answer: string) => void;
  recommendedSport: string | null;
  calculateRecommendation: () => string;
  resetQuiz: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [recommendedSport, setRecommendedSport] = useState<string | null>(null);

  const setQuizAnswer = useCallback((questionId: number, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const calculateRecommendation = useCallback(() => {
    const sport = calculateSportRecommendation(quizAnswers);
    setRecommendedSport(sport);
    return sport;
  }, [quizAnswers]);

  const resetQuiz = useCallback(() => {
    setQuizAnswers({});
    setRecommendedSport(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        quizAnswers,
        setQuizAnswer,
        recommendedSport,
        calculateRecommendation,
        resetQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
