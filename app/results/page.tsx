"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SPORT_RECOMMENDATIONS } from "@/lib/sports";
import { QUIZ_QUESTIONS } from "@/lib/quiz";
import Button from "@/components/Button";
import Card from "@/components/Card";

const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;

export default function ResultsPage() {
  const router = useRouter();
  const { recommendedSport, calculateRecommendation, quizAnswers } = useApp();

  useEffect(() => {
    if (!recommendedSport && Object.keys(quizAnswers).length === TOTAL_QUESTIONS) {
      calculateRecommendation();
    } else if (Object.keys(quizAnswers).length < TOTAL_QUESTIONS) {
      router.push("/quiz");
    }
  }, [recommendedSport, calculateRecommendation, quizAnswers, router]);

  if (!recommendedSport) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-pulse text-bestie-muted">Building your starter pack...</div>
      </div>
    );
  }

  const sport = SPORT_RECOMMENDATIONS[recommendedSport];
  if (!sport) return null;

  const infoCards = [
    { icon: "⭐", title: "Player to Follow", name: sport.playerToFollow.name, desc: sport.playerToFollow.reason },
    { icon: "📺", title: "Storyline to Follow", name: sport.storylineToFollow.name, desc: sport.storylineToFollow.reason },
    { icon: "🎬", title: "Documentary to Watch", name: sport.documentary.title, desc: sport.documentary.reason },
    { icon: "📖", title: "Lore Story to Read", name: sport.loreRecommendation.title, desc: sport.loreRecommendation.reason, href: `/lore?tab=reels&story=${sport.loreRecommendation.id}` },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-8 text-center animate-fade-in">
        <p className="mb-2 text-sm font-medium text-bestie-purple">Your Sports Starter Pack</p>
        <h1 className="heading-serif text-3xl sm:text-4xl">
          Here&apos;s your way in <span className="inline-block animate-float">{sport.emoji}</span>
        </h1>
        <p className="mt-2 text-bestie-muted">Not homework — just enough to feel included.</p>
      </div>

      <Card className="animate-fade-in-up mb-8 border-bestie-purple/20 bg-bestie-purple-light">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{sport.emoji}</span>
          <div>
            <p className="text-sm font-medium text-bestie-purple">Your sport match</p>
            <h2 className="heading-serif text-4xl">{sport.sport}</h2>
          </div>
        </div>
        <p className="text-lg leading-relaxed text-bestie-text">{sport.whyMatch}</p>
      </Card>

      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {infoCards.map((card, index) => {
          const content = (
            <>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-sm font-medium text-bestie-purple">{card.title}</span>
              </div>
              <h3 className="heading-serif mb-2 text-lg">{card.name}</h3>
              <p className="text-sm leading-relaxed text-bestie-muted">{card.desc}</p>
              {"href" in card && card.href && (
                <p className="mt-2 text-xs font-medium text-bestie-purple">Watch the story →</p>
              )}
            </>
          );

          if ("href" in card && card.href) {
            return (
              <Link key={card.title} href={card.href}>
                <Card hover className={`animate-fade-in-up animate-delay-${(index + 1) * 100} h-full opacity-0`}>
                  {content}
                </Card>
              </Link>
            );
          }

          return (
            <Card key={card.title} className={`animate-fade-in-up animate-delay-${(index + 1) * 100} opacity-0`}>
              {content}
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/prep">Catch Me Up Before the Group Chat</Button>
        <Button href="/chat" variant="secondary">Ask Sports Bestie</Button>
      </div>
    </div>
  );
}
