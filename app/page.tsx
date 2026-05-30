import Button from "@/components/Button";
import Link from "next/link";

const features = [
  {
    emoji: "🎬",
    title: "60 Second Sports Lore",
    desc: "Binge sports stories like TikTok reels — narrated, cinematic, zero jargon.",
    href: "/reels",
    primary: true,
  },
  {
    emoji: "💬",
    title: "Prep Me for the Group Chat",
    desc: "Get caught up before the watch party — drama, stars, and a safe opinion to drop.",
    href: "/prep",
  },
  {
    emoji: "📖",
    title: "Sports Lore Mode",
    desc: "Learn through stories, rivalries, and gossip — not rulebooks.",
    href: "/lore",
  },
  {
    emoji: "🤔",
    title: "Why Should I Care?",
    desc: "Every sport has a vibe. Find the one that clicks with you.",
    href: "/why-care",
  },
  {
    emoji: "✨",
    title: "Sports Personality Quiz",
    desc: "Discover your starter pack — player, storyline, doc, and lore pick.",
    href: "/quiz",
  },
];

const socialProof = [
  '"I didn\'t know where to start."',
  '"Everyone already knew more than me."',
  '"Googling doesn\'t help."',
  '"I wanted someone to explain why people care."',
];

export default function LandingPage() {
  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 animate-fade-in opacity-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            <span className="text-base">🫶</span>
            Built for people who feel left out of sports convos
          </span>
        </div>

        <h1 className="animate-fade-in-up mb-6 text-4xl font-bold leading-tight tracking-tight opacity-0 sm:text-5xl md:text-6xl">
          Never feel lost in a sports conversation{" "}
          <span className="text-gradient">again.</span>
        </h1>

        <p className="animate-fade-in-up animate-delay-200 mx-auto mb-10 max-w-xl text-lg text-white/70 opacity-0 sm:text-xl">
          Get caught up on the stories, rivalries, players, and drama that make sports worth caring
          about.
        </p>

        <div className="animate-fade-in-up animate-delay-300 mb-6 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row">
          <Button href="/reels" className="w-full sm:w-auto text-lg">
            Watch 60s Lore 🎬
          </Button>
          <Button href="/prep" variant="secondary" className="w-full sm:w-auto">
            Catch Me Up 🎯
          </Button>
        </div>

        <div className="animate-fade-in-up animate-delay-350 mb-6 opacity-0">
          <Button href="/quiz" variant="ghost" className="text-sm text-white/60">
            Find My Sports Personality ✨
          </Button>
        </div>

        <div className="animate-fade-in-up animate-delay-400 mb-16 flex flex-wrap justify-center gap-2 opacity-0">
          {socialProof.map((quote) => (
            <span
              key={quote}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50"
            >
              {quote}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {features.map((feature, i) => (
          <Link
            key={feature.title}
            href={feature.href}
            className={`animate-fade-in-up animate-delay-${(i + 5) * 100} group rounded-2xl border p-5 opacity-0 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
              feature.primary
                ? "border-bestie-purple/40 bg-gradient-to-br from-bestie-purple/20 to-bestie-pink/10 hover:border-bestie-purple/60"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <span className="mb-3 block text-3xl transition-transform group-hover:scale-110">
              {feature.emoji}
            </span>
            <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
            <p className="text-sm text-white/60">{feature.desc}</p>
            <p className="mt-3 text-xs font-medium text-bestie-pink opacity-0 transition-opacity group-hover:opacity-100">
              Explore →
            </p>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-2xl text-center">
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 transition-all hover:border-white/20 hover:text-white"
        >
          <span>💬</span>
          Or just ask Sports Bestie anything
        </Link>
      </div>
    </div>
  );
}
