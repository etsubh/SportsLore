"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { QUIZ_QUESTIONS } from "@/lib/quiz";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";

export default function QuizPage() {
  const router = useRouter();
  const { quizAnswers, setQuizAnswer, calculateRecommendation } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const selectedAnswer = quizAnswers[question.id];
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;

  const handleSelect = (option: string) => {
    setQuizAnswer(question.id, option);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateRecommendation();
      router.push("/results");
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-6 text-center animate-fade-in">
        <p className="mb-1 text-sm font-medium text-bestie-purple">Sports Personality Quiz</p>
        <h1 className="heading-serif text-2xl sm:text-3xl">What&apos;s your sports vibe?</h1>
      </div>

      <div className="mb-8 animate-fade-in">
        <ProgressBar current={currentQuestion + 1} total={QUIZ_QUESTIONS.length} />
      </div>

      <Card className="animate-fade-in-up mb-8">
        <p className="mb-1 text-sm font-medium text-bestie-purple">Question {question.id}</p>
        <h2 className="heading-serif text-xl sm:text-2xl">{question.question}</h2>
        {"subtitle" in question && (
          <p className="mt-2 text-sm text-bestie-muted">{question.subtitle}</p>
        )}
      </Card>

      <div className="mb-8 space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`animate-slide-in w-full rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
                isSelected
                  ? "border-bestie-purple bg-bestie-purple-light shadow-soft"
                  : "border-bestie-border bg-white shadow-card hover:border-bestie-purple/20"
              }`}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs transition-all ${
                    isSelected
                      ? "border-bestie-purple bg-bestie-purple text-white"
                      : "border-bestie-border"
                  }`}
                >
                  {isSelected && "✓"}
                </span>
                <span className="font-medium text-bestie-text">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={handleBack} disabled={currentQuestion === 0} className={currentQuestion === 0 ? "invisible" : ""}>
          ← Back
        </Button>
        <Button onClick={handleNext} disabled={!selectedAnswer}>
          {isLastQuestion ? "Get My Starter Pack" : "Next →"}
        </Button>
      </div>
    </div>
  );
}
