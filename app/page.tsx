import Button from "@/components/Button";
import Link from "next/link";
import Mascot from "@/components/Mascot";

const testimonials = [
  {
    quote: "I finally understood why everyone was talking about Caitlin Clark.",
    name: "Soliana, 24",
    bg: "bg-purple-100/60",
    accent: "border-l-purple-400",
  },
  {
    quote: "Used this before a first date who loves F1. It worked.",
    name: "Heidy, 28",
    bg: "bg-amber-100/60",
    accent: "border-l-amber-400",
  },
  {
    quote: "I watched the Super Bowl and actually knew what was happening.",
    name: "Kasey, 31",
    bg: "bg-emerald-100/60",
    accent: "border-l-emerald-400",
  },
];

const features = [
  {
    label: "Catch Me Up",
    buttonLabel: "Prep Me Now →",
    href: "/prep",
    description:
      "Get a quick briefing before the watch party — who's hot, what's the drama, and what opinions are safe to share.",
  },
  {
    label: "Why Care?",
    buttonLabel: "Find My Sport →",
    href: "/why-care",
    description:
      "Every sport explained through culture and emotion, not stats. Find out why people actually get obsessed.",
  },
  {
    label: "Find My Sport",
    buttonLabel: "Get My Pack →",
    href: "/quiz",
    description:
      "Answer a few fun questions and get your sports personality — plus a starter pack of players, storylines, and lore picks.",
  },
];

export default function LandingPage() {
  return (
    <div className="px-5 pb-20 pt-8 sm:px-8">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 animate-fade-in opacity-0">
          <Mascot size={72} className="mx-auto mb-4" />
        </div>

        <h1 className="heading-serif animate-fade-in-up mb-6 text-4xl leading-tight opacity-0 sm:text-5xl md:text-6xl">
          Never feel lost in a sports conversation{" "}
          <span className="text-bestie-purple">again.</span>
        </h1>

        <p className="animate-fade-in-up animate-delay-200 mx-auto mb-10 max-w-md text-base leading-relaxed text-bestie-muted opacity-0 sm:text-lg">
          Catch up fast. Sound like you&apos;ve always known.
        </p>

        <div className="animate-fade-in-up animate-delay-300 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row">
          <Button href="/lore?tab=reels" className="w-full sm:w-auto text-base">
            60s Lore
          </Button>
          <Button href="/quiz" variant="secondary" className="w-full sm:w-auto">
            Find My Sport
          </Button>
        </div>
      </div>

      {/* Social proof */}
      <div className="mx-auto mt-16 max-w-4xl animate-fade-in-up animate-delay-400 opacity-0">
        <div className="grid gap-3 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`rounded-xl border-l-[3px] ${t.accent} ${t.bg} px-4 py-3 text-left`}
            >
              <p className="text-sm italic leading-relaxed text-bestie-text">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-2 text-xs font-medium text-bestie-muted">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-4xl pt-[80px]">
        <h2 className="heading-serif mb-2 text-center text-2xl sm:text-3xl">
          How do you want to start?
        </h2>
        <p className="mb-10 text-center text-sm text-bestie-muted">
          Every feature gets you conversation-ready — choose what fits your vibe.
        </p>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Row 1 — Flagship */}
          <div className="relative col-span-full flex flex-col rounded-2xl border border-bestie-purple/20 bg-white p-6 shadow-card sm:p-8">
            <span className="absolute right-4 top-4 rounded-full bg-bestie-purple-light px-3 py-1 text-xs font-semibold text-bestie-purple">
              ⭐ Flagship
            </span>

            <h3 className="heading-serif mb-2 pr-24 text-xl text-bestie-text sm:text-2xl">
              Sports Lore
            </h3>
            <p className="mb-6 max-w-2xl flex-1 text-sm leading-relaxed text-bestie-muted sm:text-base">
              Binge narrated story reels — Messi vs Ronaldo, Brady, Tiger, and more. Lean back
              and get caught up in about a minute, or read full stories like gossip — the hook,
              the characters, the drama. No rulebooks required.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/reels"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-bestie-purple px-6 py-3 text-sm font-medium text-white shadow-button transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-bestie-purple-dark hover:shadow-lg active:translate-y-0 active:scale-[0.97]"
              >
                <span className="text-xs transition-transform duration-300 group-hover:scale-125">▶</span>
                60s Reels
              </Link>
              <Link
                href="/lore"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-bestie-purple bg-transparent px-6 py-3 text-sm font-medium text-bestie-purple transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-bestie-purple-light hover:shadow-soft active:translate-y-0 active:scale-[0.97]"
              >
                <span className="text-xs">📖</span>
                Read the Story
              </Link>
            </div>
          </div>

          {/* Row 2 — 3 equal columns */}
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col rounded-2xl border border-bestie-border bg-white p-5 shadow-card"
            >
              <h3 className="heading-serif mb-2 text-lg text-bestie-text">{feature.label}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-bestie-muted">
                {feature.description}
              </p>
              <Button href={feature.href} variant="secondary" className="w-full !py-2.5 text-sm">
                {feature.buttonLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
