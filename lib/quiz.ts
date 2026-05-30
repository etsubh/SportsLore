import { QuizAnswers } from "@/types";

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How do you feel about heated rivalries?",
    subtitle: "Two sides, one grudge, endless drama",
    options: ["Love them — the beef IS the story", "They're fun when I know the context", "Not really my thing"],
  },
  {
    id: 2,
    question: "How do you feel about underdog stories?",
    subtitle: "Nobody believed in them… until they won",
    options: ["Obsessed — give me the comeback", "Nice when they happen", "I prefer the favorites"],
  },
  {
    id: 3,
    question: "How do you feel about celebrity culture?",
    subtitle: "Athletes as icons, influencers, main characters",
    options: ["That's the whole appeal", "I like some personality", "I just want the action"],
  },
  {
    id: 4,
    question: "How do you feel about strategy?",
    subtitle: "Chess moves, game plans, mind games",
    options: ["Love the mental side", "Cool in small doses", "Boring — just show me chaos"],
  },
  {
    id: 5,
    question: "How do you feel about fast-paced action?",
    subtitle: "Nonstop energy, quick twists, no downtime",
    options: ["Give me chaos", "A mix is perfect", "I prefer slow-burn tension"],
  },
  {
    id: 6,
    question: "How do you feel about documentary-style storytelling?",
    subtitle: "Deep dives, behind-the-scenes, human stories",
    options: ["That's how I learn everything", "I'll watch a good one", "I'd rather just talk about it"],
  },
] as const;

type ScoreMap = Record<string, number>;

function addScore(scores: ScoreMap, sport: string, points: number) {
  scores[sport] = (scores[sport] || 0) + points;
}

export function calculateSportRecommendation(answers: QuizAnswers): string {
  const scores: ScoreMap = {
    NFL: 0,
    NBA: 0,
    Soccer: 0,
    "Formula 1": 0,
    Tennis: 0,
    Golf: 0,
    "Women's Sports": 0,
  };

  const q1 = answers[1];
  if (q1?.includes("Love them")) {
    addScore(scores, "Soccer", 3);
    addScore(scores, "NBA", 2);
    addScore(scores, "Formula 1", 2);
  } else if (q1?.includes("fun when")) {
    addScore(scores, "NFL", 2);
    addScore(scores, "NBA", 1);
  }

  const q2 = answers[2];
  if (q2?.includes("Obsessed")) {
    addScore(scores, "Tennis", 2);
    addScore(scores, "Soccer", 2);
    addScore(scores, "Women's Sports", 2);
  } else if (q2?.includes("Nice when")) {
    addScore(scores, "NFL", 2);
    addScore(scores, "NBA", 1);
  }

  const q3 = answers[3];
  if (q3?.includes("whole appeal")) {
    addScore(scores, "NBA", 3);
    addScore(scores, "NFL", 2);
    addScore(scores, "Women's Sports", 2);
  } else if (q3?.includes("some personality")) {
    addScore(scores, "Soccer", 2);
    addScore(scores, "Formula 1", 1);
  }

  const q4 = answers[4];
  if (q4?.includes("Love the mental")) {
    addScore(scores, "Formula 1", 3);
    addScore(scores, "Golf", 3);
    addScore(scores, "NFL", 1);
  } else if (q4?.includes("Cool in small")) {
    addScore(scores, "Tennis", 2);
    addScore(scores, "Soccer", 1);
  } else if (q4?.includes("chaos")) {
    addScore(scores, "NBA", 2);
    addScore(scores, "NFL", 2);
  }

  const q5 = answers[5];
  if (q5?.includes("chaos")) {
    addScore(scores, "NBA", 3);
    addScore(scores, "NFL", 2);
  } else if (q5?.includes("mix is perfect")) {
    addScore(scores, "Soccer", 2);
    addScore(scores, "Women's Sports", 2);
  } else if (q5?.includes("slow-burn")) {
    addScore(scores, "Golf", 3);
    addScore(scores, "Tennis", 2);
  }

  const q6 = answers[6];
  if (q6?.includes("how I learn")) {
    addScore(scores, "Formula 1", 3);
    addScore(scores, "Tennis", 2);
    addScore(scores, "Women's Sports", 2);
  } else if (q6?.includes("watch a good one")) {
    addScore(scores, "NFL", 2);
    addScore(scores, "Soccer", 1);
  } else if (q6?.includes("rather just talk")) {
    addScore(scores, "NBA", 2);
    addScore(scores, "Soccer", 2);
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}
