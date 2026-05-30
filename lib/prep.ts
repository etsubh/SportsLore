export type PrepSport =
  | "NFL"
  | "NBA"
  | "Soccer"
  | "F1"
  | "Tennis"
  | "Golf"
  | "Womens Sports";

export interface SportBriefing {
  sport: PrepSport;
  label: string;
  emoji: string;
  gradient: string;
  mainCharacter: { name: string; context: string };
  currentDrama: string;
  whyPeopleCare: string;
  safeOpinion: string;
  confidenceScore: number;
  whatToWatch: { name: string; context: string };
}

export const PREP_SPORTS: { id: PrepSport; label: string; emoji: string }[] = [
  { id: "NFL", label: "NFL", emoji: "🏈" },
  { id: "NBA", label: "NBA", emoji: "🏀" },
  { id: "Soccer", label: "Soccer", emoji: "⚽" },
  { id: "F1", label: "F1", emoji: "🏎️" },
  { id: "Tennis", label: "Tennis", emoji: "🎾" },
  { id: "Golf", label: "Golf", emoji: "⛳" },
  { id: "Womens Sports", label: "Women's Sports", emoji: "💪" },
];

export const SPORT_BRIEFINGS: Record<PrepSport, SportBriefing> = {
  NFL: {
    sport: "NFL",
    label: "NFL",
    emoji: "🏈",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    mainCharacter: {
      name: "Patrick Mahomes",
      context:
        "The face of the league right now — think Tom Brady energy but with more swagger. When the Chiefs are playing, he's the storyline.",
    },
    currentDrama:
      "Everyone's debating whether the Chiefs dynasty is finally slowing down, and which young quarterback is 'the next Mahomes.' Also: the Cowboys continue to be the most talked-about team that never quite wins the big one.",
    whyPeopleCare:
      "The Super Bowl is basically a national holiday. Even people who don't watch football all season show up for the party, the commercials, and the drama. It's less about X's and O's and more about storylines and characters.",
    safeOpinion:
      "Honestly? The Super Bowl is as much about the halftime show and commercials as the game — and that's totally valid. You're not wrong for caring about the vibes over the playbook.",
    confidenceScore: 78,
    whatToWatch: {
      name: "Any primetime Sunday night game",
      context:
        "NBC and ESPN save the best matchups for Sunday/Monday night. Grab snacks, pick a side based on vibes, and you'll get the drama without needing a rulebook.",
    },
  },
  NBA: {
    sport: "NBA",
    label: "NBA",
    emoji: "🏀",
    gradient: "from-orange-500 via-red-500 to-purple-600",
    mainCharacter: {
      name: "LeBron James (still) + the next gen",
      context:
        "LeBron is still playing at 40 — which is insane. But now everyone's also obsessed with young stars like Victor Wembanyama (7'4\" alien-athlete) and the ongoing 'who's the best player RIGHT NOW?' debate.",
    },
    currentDrama:
      "The Lakers are always in the conversation whether they're good or not. Everyone's arguing about whether the Nuggets, Celtics, or Thunder are the real team to beat. And the Jordan vs LeBron GOAT debate? Still raging in every group chat.",
    whyPeopleCare:
      "The NBA is where sports meets celebrity culture. Players are on Instagram, in fashion shows, and in every Twitter argument. You don't need to know pick-and-roll coverage — you just need to know who the main characters are.",
    safeOpinion:
      "The Jordan vs LeBron debate will never end, and that's kind of the point. You can just say 'they're both legends in different eras' and watch everyone nod like you said something deep.",
    confidenceScore: 82,
    whatToWatch: {
      name: "Christmas Day games or any Lakers game",
      context:
        "The NBA puts its best matchups on Christmas. If the Lakers are playing, you're guaranteed drama, celebrity courtside seats, and a storyline.",
    },
  },
  Soccer: {
    sport: "Soccer",
    label: "Soccer",
    emoji: "⚽",
    gradient: "from-blue-600 via-indigo-500 to-violet-600",
    mainCharacter: {
      name: "Kylian Mbappé / Erling Haaland",
      context:
        "The two biggest stars in club soccer right now. Mbappé is the French speed demon at Real Madrid. Haaland is the Norwegian goal machine at Manchester City. Pick one to casually mention.",
    },
    currentDrama:
      "The Messi vs Ronaldo era is winding down, but the debate lives forever. In club soccer, everyone's watching whether anyone can stop Manchester City, and the Champions League knockout rounds always deliver chaos.",
    whyPeopleCare:
      "Soccer is the world's language. World Cup years feel like a global party. Club rivalries like El Clásico (Barcelona vs Real Madrid) are centuries-old grudges that somehow still feel personal.",
    safeOpinion:
      "Messi or Ronaldo? Just say 'both changed the game' with a shrug. It's the soccer equivalent of saying 'I like all music' — safe, true, and nobody can argue with you.",
    confidenceScore: 75,
    whatToWatch: {
      name: "Champions League knockout round",
      context:
        "The biggest club tournament on earth. One bad night and your team is out. The drama is real, the stakes are high, and you only need to watch one game to get hooked.",
    },
  },
  F1: {
    sport: "F1",
    label: "F1",
    emoji: "🏎️",
    gradient: "from-red-600 via-rose-500 to-orange-500",
    mainCharacter: {
      name: "Max Verstappen",
      context:
        "The dominant driver of this era — wins so much that people are actually bored of it. Think of him as the villain/main character everyone loves to talk about.",
    },
    currentDrama:
      "Verstappen's Red Bull team is so dominant that the real story is whether anyone can catch them. Behind the scenes, team principals are throwing shade at each other like Real Housewives with race budgets.",
    whyPeopleCare:
      "Drive to Survive on Netflix made F1 explode. It's billion-dollar teams, glamorous locations, and personal beef — with cars going 200 mph. The drama is as much off-track as on-track.",
    safeOpinion:
      "F1 is basically a Netflix show that happens to have real racing. Drive to Survive got you 80% caught up — the rest is just enjoying the chaos.",
    confidenceScore: 70,
    whatToWatch: {
      name: "Monaco Grand Prix or any Sprint weekend",
      context:
        "Monaco is the glamorous one — yachts, celebrities, tight corners. Sprint weekends have extra racing on Saturday, so you get more action in less time.",
    },
  },
  Tennis: {
    sport: "Tennis",
    label: "Tennis",
    emoji: "🎾",
    gradient: "from-lime-500 via-green-500 to-emerald-600",
    mainCharacter: {
      name: "Coco Gauff / Jannik Sinner",
      context:
        "Coco is America's tennis sweetheart — young, charismatic, already a Grand Slam champion. Sinner is the Italian ice-cold champion who's taken over the men's game.",
    },
    currentDrama:
      "The 'Big Three' era (Federer, Nadal, Djokovic) is ending, and a new generation is taking over. Every Grand Slam feels like a changing of the guard. And the vibes? Always dramatic.",
    whyPeopleCare:
      "Tennis is individual drama at its finest — one person vs one person, no teammates to blame. Grand Slams feel like major cultural events, and the emotional moments are unmatched.",
    safeOpinion:
      "Grand Slams are the only ones that really matter — you can say that confidently. It's like saying 'I only watch the Oscars, not every movie premiere.' Totally valid.",
    confidenceScore: 72,
    whatToWatch: {
      name: "Any Grand Slam semifinal or final",
      context:
        "Wimbledon, US Open, French Open, or Australian Open — the last two rounds are when the stakes and emotions are highest. Perfect entry point.",
    },
  },
  Golf: {
    sport: "Golf",
    label: "Golf",
    emoji: "⛳",
    gradient: "from-teal-600 via-cyan-500 to-blue-500",
    mainCharacter: {
      name: "Scottie Scheffler",
      context:
        "The world's best golfer right now, and weirdly normal about it. Calm, dominant, married to a therapist — not your typical sports star drama, which is kind of refreshing.",
    },
    currentDrama:
      "LIV Golf (the Saudi-backed league) split the sport in half and created a whole loyalty vs money storyline. Tiger Woods is still around but in a mentor/legend role. The sport is figuring out its identity.",
    whyPeopleCare:
      "Golf is slow-burn drama — mental breakdowns on the 18th hole, comeback stories, and the Masters green jacket ceremony is genuinely iconic television.",
    safeOpinion:
      "Golf is more about the drama of the moment than the whole season. Just watching the final round of a major is the move — nobody watches all four days except diehards.",
    confidenceScore: 65,
    whatToWatch: {
      name: "The Masters — final round on Sunday",
      context:
        "The most iconic tournament in golf. Green jackets, azaleas, and usually a dramatic finish. You only need to watch the last day.",
    },
  },
  "Womens Sports": {
    sport: "Womens Sports",
    label: "Women's Sports",
    emoji: "💪",
    gradient: "from-pink-500 via-rose-500 to-purple-600",
    mainCharacter: {
      name: "Caitlin Clark",
      context:
        "The player who broke viewership records and made women's basketball must-watch TV. Think Taylor Swift effect but for sports — she brought millions of new fans overnight.",
    },
    currentDrama:
      "Women's sports are having a moment. Caitlin Clark vs Angel Reese rivalry, record-breaking NWSL and WNBA viewership, and the US Women's National Team continuing to be cultural icons. The 'why don't people watch women's sports?' era is ending.",
    whyPeopleCare:
      "This is one of the fastest-growing movements in all of sports. The stories are fresher, the stakes feel higher, and you're getting in at the ground floor of something huge. Also: the skill level is incredible — the narrative that women's sports are 'less exciting' is dead.",
    safeOpinion:
      "Women's sports are having a cultural moment right now — Caitlin Clark, the USWNT, WNBA growth. Saying 'it's about time people paid attention' is always a crowd-pleaser.",
    confidenceScore: 80,
    whatToWatch: {
      name: "Any WNBA game or USWNT match",
      context:
        "The WNBA season runs summer-fall with playoff drama. USWNT matches (especially World Cup or Olympics) are cultural events. Both are perfect entry points.",
    },
  },
};
