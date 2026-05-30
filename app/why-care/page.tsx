import { WHY_CARE_ENTRIES } from "@/lib/why-care";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function WhyCarePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-10 text-center animate-fade-in">
        <p className="mb-2 text-sm font-medium text-bestie-purple">Why Should I Care?</p>
        <h1 className="heading-serif mb-4 text-3xl sm:text-4xl">
          Sports aren&apos;t boring.{" "}
          <span className="text-bestie-purple">You just haven&apos;t met the right story yet.</span>
        </h1>
        <p className="mx-auto max-w-lg text-bestie-muted">
          Every sport has a vibe — a reason people get obsessed that has nothing to do with rules.
        </p>
      </div>

      <div className="space-y-4">
        {WHY_CARE_ENTRIES.map((entry, index) => (
          <Card
            key={entry.sport}
            className={`animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 500)} overflow-hidden p-0 opacity-0`}
          >
            <div className="border-b border-bestie-border bg-bestie-purple-light px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{entry.emoji}</span>
                <div>
                  <h2 className="heading-serif text-xl">{entry.sport}</h2>
                  <p className="text-sm text-bestie-purple">{entry.tagline}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-bestie-text">{entry.hook}</p>
              <div className="rounded-xl bg-bestie-purple-light/50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-bestie-purple">The vibe</p>
                <p className="text-bestie-text">{entry.vibe}</p>
              </div>
              <div className="rounded-xl bg-bestie-purple-light/50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-bestie-purple">
                  How to care without learning rules
                </p>
                <p className="text-bestie-text">{entry.storyAngle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/prep">Catch Me Up on a Sport</Button>
        <Button href="/quiz" variant="secondary">Find My Sports Personality</Button>
      </div>
    </div>
  );
}
