export interface SportRecommendation {
  sport: string;
  emoji: string;
  gradient: string;
  whyMatch: string;
  playerToFollow: { name: string; reason: string };
  storylineToFollow: { name: string; reason: string };
  documentary: { title: string; reason: string };
  loreRecommendation: { id: string; title: string; reason: string };
}

export const SPORT_RECOMMENDATIONS: Record<string, SportRecommendation> = {
  NFL: {
    sport: "NFL",
    emoji: "🏈",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    whyMatch:
      "You love drama, big personalities, and stories that feel like a season of reality TV. The NFL delivers all of that every single week — with stakes, plot twists, and characters you'll love (or love to hate).",
    playerToFollow: {
      name: "Patrick Mahomes",
      reason:
        "Think of him as the main character of a blockbuster franchise — flashy, clutch, and always doing something that makes you gasp.",
    },
    storylineToFollow: {
      name: "Can anyone stop the Chiefs?",
      reason:
        "The dynasty storyline is the NFL's version of 'will the empire fall?' — even casual fans have an opinion.",
    },
    documentary: {
      title: "Hard Knocks (HBO)",
      reason:
        "Reality TV but make it football. You get behind-the-scenes drama, rookies freaking out, and coaches yelling at people.",
    },
    loreRecommendation: {
      id: "brady-dynasty",
      title: "Tom Brady's Dynasty",
      reason:
        "The ultimate underdog-to-GOAT story. Once you know this, half of NFL conversations make sense.",
    },
  },
  NBA: {
    sport: "NBA",
    emoji: "🏀",
    gradient: "from-orange-500 via-red-500 to-purple-600",
    whyMatch:
      "You want celebrity culture, heated debates, and nonstop action. The NBA is basically Twitter drama with incredible athleticism — and the arguments never end.",
    playerToFollow: {
      name: "LeBron James",
      reason:
        "He's been the main character of sports for 20 years. Following LeBron is like following the protagonist of a very long, very dramatic series.",
    },
    storylineToFollow: {
      name: "The next generation vs the old guard",
      reason:
        "Young stars like Wembanyama are arriving while LeBron is still elite. It's a passing-the-torch story happening in real time.",
    },
    documentary: {
      title: "The Last Dance (Netflix)",
      reason:
        "Michael Jordan's story told like a thriller. Even non-sports people binge this in a weekend.",
    },
    loreRecommendation: {
      id: "lebron-jordan",
      title: "Jordan vs LeBron",
      reason:
        "The debate you'll hear in every group chat. Knowing both sides makes you instantly credible.",
    },
  },
  Soccer: {
    sport: "Soccer",
    emoji: "⚽",
    gradient: "from-blue-600 via-indigo-500 to-violet-600",
    whyMatch:
      "You crave global drama, passionate fanbases, and rivalries that feel centuries old. Soccer is the world's biggest soap opera — and you're about to get hooked.",
    playerToFollow: {
      name: "Kylian Mbappé",
      reason:
        "Young, fast, famous, and always in the headlines. He's the kind of star who makes you understand why billions of people care.",
    },
    storylineToFollow: {
      name: "The post-Messi/Ronaldo era",
      reason:
        "The two GOATs are fading, but their rivalry shaped everything. Now a new generation is fighting to be 'the next one.'",
    },
    documentary: {
      title: "Take the Ball, Pass the Ball (Netflix)",
      reason:
        "How Barcelona built one of the greatest teams ever. It's part sports story, part art film.",
    },
    loreRecommendation: {
      id: "messi-ronaldo",
      title: "Messi vs Ronaldo",
      reason:
        "The rivalry that defined a generation. Mention it in any soccer conversation and you're in.",
    },
  },
  "Formula 1": {
    sport: "Formula 1",
    emoji: "🏎️",
    gradient: "from-red-600 via-rose-500 to-orange-500",
    whyMatch:
      "You love strategy, glamour, and rivalries that play out like a prestige drama. F1 is chess at 200 mph — with billionaires, fashion, and beef.",
    playerToFollow: {
      name: "Max Verstappen",
      reason:
        "The dominant force right now. Following Max means you're watching the main villain/hero of the current era.",
    },
    storylineToFollow: {
      name: "Can anyone challenge Red Bull?",
      reason:
        "Verstappen's team is so dominant that the whole sport is asking: is this good for the drama or killing it?",
    },
    documentary: {
      title: "Drive to Survive (Netflix)",
      reason:
        "This show made F1 explode in popularity. It's basically Real Housewives with race cars — and it works.",
    },
    loreRecommendation: {
      id: "hamilton-verstappen",
      title: "Hamilton vs Verstappen",
      reason:
        "The rivalry that turned casual Netflix viewers into F1 fans. Essential context.",
    },
  },
  Tennis: {
    sport: "Tennis",
    emoji: "🎾",
    gradient: "from-lime-500 via-green-500 to-emerald-600",
    whyMatch:
      "You appreciate individual journeys, comebacks, and one-on-one battles. Tennis is like watching two people in the most intense job interview of their lives — for hours.",
    playerToFollow: {
      name: "Coco Gauff",
      reason:
        "Young, charismatic, and already a champion. She's the kind of star who makes you feel like you're watching someone's origin story.",
    },
    storylineToFollow: {
      name: "The changing of the guard",
      reason:
        "Federer, Nadal, and Djokovic dominated for 15 years. Now a new generation is writing the next chapter.",
    },
    documentary: {
      title: "Break Point (Netflix)",
      reason:
        "Follows players through the emotional rollercoaster of the tour. You'll feel things about people you've never heard of.",
    },
    loreRecommendation: {
      id: "tiger-comeback",
      title: "Tiger Woods Comeback",
      reason:
        "Not tennis — but the greatest individual comeback story in sports. The emotional blueprint for understanding why we care.",
    },
  },
  Golf: {
    sport: "Golf",
    emoji: "⛳",
    gradient: "from-teal-600 via-cyan-500 to-blue-500",
    whyMatch:
      "You prefer thoughtful strategy, individual stars, and slow-burn drama. Golf is a mental game disguised as a chill afternoon — until someone melts down on the 18th hole.",
    playerToFollow: {
      name: "Scottie Scheffler",
      reason:
        "Currently the world's best, and weirdly relatable for a golf superstar. Calm, dominant, and quietly hilarious.",
    },
    storylineToFollow: {
      name: "LIV Golf vs the PGA Tour",
      reason:
        "Money, loyalty, and a sport split in half. It's a business drama as much as a sports one.",
    },
    documentary: {
      title: "Tiger (HBO)",
      reason:
        "The rise, fall, and comeback of the most famous athlete on earth. It's not really about golf — it's about being human.",
    },
    loreRecommendation: {
      id: "tiger-comeback",
      title: "Tiger Woods Comeback",
      reason:
        "The story that made non-golf people cry. Pure human drama.",
    },
  },
  "Women's Sports": {
    sport: "Women's Sports",
    emoji: "💪",
    gradient: "from-pink-500 via-rose-500 to-purple-600",
    whyMatch:
      "You're drawn to underdog stories, cultural moments, and athletes who are changing the game. Women's sports are having their biggest moment ever — and you're catching it at the perfect time.",
    playerToFollow: {
      name: "Caitlin Clark",
      reason:
        "She didn't just play basketball — she changed what people thought was possible for women's sports viewership. A genuine cultural phenomenon.",
    },
    storylineToFollow: {
      name: "The WNBA and NWSL explosion",
      reason:
        "Record viewership, sold-out arenas, and athletes finally getting the spotlight they deserve. You're watching history.",
    },
    documentary: {
      title: "Title IX and beyond (ESPN's 30 for 30)",
      reason:
        "Understanding how we got here makes the current moment hit even harder.",
    },
    loreRecommendation: {
      id: "caitlin-clark",
      title: "Caitlin Clark Phenomenon",
      reason:
        "The story everyone was talking about. Know this and you understand why women's sports are different now.",
    },
  },
};
