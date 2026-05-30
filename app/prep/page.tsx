"use client";

import { useState } from "react";
import { PREP_SPORTS, SPORT_BRIEFINGS, PrepSport } from "@/lib/prep";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ConfidenceMeter from "@/components/ConfidenceMeter";

export default function PrepPage() {
  const [selectedSport, setSelectedSport] = useState<PrepSport | null>(null);

  if (selectedSport) {
    const briefing = SPORT_BRIEFINGS[selectedSport];

    return (
      <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
        <button
          onClick={() => setSelectedSport(null)}
          className="mb-6 flex items-center gap-2 text-sm text-bestie-muted transition-colors hover:text-bestie-purple"
        >
          ← Pick a different sport
        </button>

        <div className="mb-6 animate-fade-in text-center">
          <p className="mb-1 text-sm font-medium text-bestie-purple">Your group chat briefing</p>
          <h1 className="heading-serif text-2xl sm:text-3xl">
            You&apos;re prepped for {briefing.label} {briefing.emoji}
          </h1>
        </div>

        <Card className="animate-fade-in-up mb-6 border-bestie-purple/20 bg-bestie-purple-light">
          <p className="mb-1 text-sm font-medium text-bestie-purple">Main Character</p>
          <h2 className="heading-serif mb-2 text-2xl">{briefing.mainCharacter.name}</h2>
          <p className="leading-relaxed text-bestie-text">{briefing.mainCharacter.context}</p>
        </Card>

        <div className="space-y-4">
          {[
            { label: "Current Drama", emoji: "🍿", content: briefing.currentDrama },
            { label: "Why People Care", emoji: "❤️", content: briefing.whyPeopleCare },
            { label: "One Safe Opinion", emoji: "💬", content: briefing.safeOpinion, highlight: true },
          ].map((section, index) => (
            <Card
              key={section.label}
              className={`animate-fade-in-up animate-delay-${(index + 1) * 100} opacity-0 ${
                section.highlight ? "border-bestie-purple/30 bg-bestie-purple-light/60" : ""
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span>{section.emoji}</span>
                <span className="text-sm font-semibold text-bestie-purple">{section.label}</span>
              </div>
              <p className="leading-relaxed text-bestie-text">{section.content}</p>
            </Card>
          ))}

          <Card className="animate-fade-in-up animate-delay-400 opacity-0">
            <ConfidenceMeter score={briefing.confidenceScore} />
          </Card>

          <Card className="animate-fade-in-up animate-delay-500 opacity-0">
            <div className="mb-2 flex items-center gap-2">
              <span>📺</span>
              <span className="text-sm font-semibold text-bestie-purple">What to Watch Next</span>
            </div>
            <h3 className="heading-serif mb-2 text-lg">{briefing.whatToWatch.name}</h3>
            <p className="text-sm leading-relaxed text-bestie-muted">{briefing.whatToWatch.context}</p>
          </Card>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/lore" variant="secondary">Go deeper — Lore Mode</Button>
          <Button href="/chat">Ask Sports Bestie</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-10 text-center animate-fade-in">
        <p className="mb-2 text-sm font-medium text-bestie-purple">Prep Me for the Group Chat</p>
        <h1 className="heading-serif mb-4 text-3xl sm:text-4xl">
          What sport is everyone talking about?
        </h1>
        <p className="mx-auto max-w-md text-bestie-muted">
          Pick one and we&apos;ll catch you up — like a friend prepping you before the watch party.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PREP_SPORTS.map((sport, index) => (
          <button
            key={sport.id}
            onClick={() => setSelectedSport(sport.id)}
            className={`animate-fade-in-up animate-delay-${(index + 1) * 100} group flex items-center gap-4 rounded-2xl border border-bestie-border bg-white p-5 text-left opacity-0 shadow-card transition-all hover:border-bestie-purple/20 hover:shadow-soft active:scale-[0.98]`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-bestie-purple-light text-2xl transition-transform group-hover:scale-110">
              {sport.emoji}
            </span>
            <div>
              <p className="font-medium text-bestie-text">{sport.label}</p>
              <p className="text-sm text-bestie-muted group-hover:text-bestie-purple">Catch me up →</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
