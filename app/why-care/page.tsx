import { WHY_CARE_ENTRIES } from "@/lib/why-care";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function WhyCarePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-10 text-center animate-fade-in">
        <p className="mb-2 text-sm font-medium text-bestie-pink">Why Should I Care?</p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Sports aren&apos;t boring.{" "}
          <span className="text-gradient">You just haven&apos;t met the right story yet.</span>
        </h1>
        <p className="mx-auto max-w-lg text-white/60">
          Every sport has a vibe — a reason people get obsessed that has nothing to do with rules.
          Find yours.
        </p>
      </div>

      <div className="space-y-6">
        {WHY_CARE_ENTRIES.map((entry, index) => (
          <Card
            key={entry.sport}
            className={`animate-fade-in-up animate-delay-${(index + 1) * 100} overflow-hidden p-0 opacity-0`}
          >
            <div className={`bg-gradient-to-r ${entry.gradient} px-6 py-4 sm:px-8`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{entry.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold text-white">{entry.sport}</h2>
                  <p className="text-sm text-white/90">{entry.tagline}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-white/90">{entry.hook}</p>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-bestie-pink">
                  The vibe
                </p>
                <p className="text-white/80">{entry.vibe}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-bestie-pink">
                  How to care without learning rules
                </p>
                <p className="text-white/80">{entry.storyAngle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/prep">Catch Me Up on a Sport 🎯</Button>
        <Button href="/quiz" variant="secondary">
          Find My Sports Personality ✨
        </Button>
      </div>
    </div>
  );
}
