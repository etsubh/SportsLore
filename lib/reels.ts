export type ReelSlideType =
  | "hook"
  | "characters"
  | "rivalry"
  | "moments"
  | "obsessed"
  | "winner"
  | "matters";

export interface ReelSlide {
  type: ReelSlideType;
  label: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export interface ReelStory {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  accent: string;
  duration: string;
  slides: ReelSlide[];
}

export const REEL_STORIES: ReelStory[] = [
  {
    id: "messi-ronaldo",
    title: "Messi vs Ronaldo",
    subtitle: "The rivalry that split the planet",
    emoji: "⚽",
    gradient: "from-blue-700 via-indigo-800 to-purple-900",
    accent: "#3B82F6",
    duration: "58s",
    slides: [
      {
        type: "hook",
        label: "The Hook",
        caption:
          "For more than a decade, the sports world was divided into two camps. Not teams. Not countries. Two men.",
        image:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
        imageAlt: "Soccer stadium atmosphere",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Messi — quiet genius, humble, makes magic look effortless. Ronaldo — flashy, sculpted, obsessed with being the best. Opposite personalities. Same impossible talent.",
        image:
          "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
        imageAlt: "Soccer player on field",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "They didn't just play in the same era — they chased the same crown every single year. Every goal, every award, every Champions League night became a referendum.",
        image:
          "https://images.unsplash.com/photo-1522778119026-d647f056a1c8?w=800&q=80",
        imageAlt: "Soccer match intensity",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Ballon d'Or battles. Record-breaking goal tallies. El Clásico when Ronaldo played for Madrid and Messi for Barcelona. The whole world stopped to watch.",
        image:
          "https://images.unsplash.com/photo-1508098682722-e99b7749270e?w=800&q=80",
        imageAlt: "Crowd celebrating at soccer game",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "You didn't need to know soccer tactics. You just needed a take. Dinner parties, group chats, comment sections — everyone had an opinion on Messi or Ronaldo.",
        image:
          "https://images.unsplash.com/photo-1459865274687-595ded65355d?w=800&q=80",
        imageAlt: "Fans cheering in stands",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Messi fans say natural talent wins. Ronaldo fans say work ethic wins. The truth? Both became global icons. The debate never ended — and maybe that was the point.",
        image:
          "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
        imageAlt: "Soccer ball on pitch",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Even now, saying 'Messi or Ronaldo?' instantly starts a conversation. They taught a generation that sports isn't about stats — it's about stories you pick a side in.",
        image:
          "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
        imageAlt: "Stadium lights at night",
      },
    ],
  },
  {
    id: "lebron-jordan",
    title: "Jordan vs LeBron",
    subtitle: "The GOAT debate that never dies",
    emoji: "🏀",
    gradient: "from-red-700 via-orange-800 to-yellow-900",
    accent: "#F97316",
    duration: "60s",
    slides: [
      {
        type: "hook",
        label: "The Hook",
        caption:
          "One man retired as the undisputed greatest. Twenty years later, another showed up and made the entire internet ask: wait… is HE actually the GOAT?",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
        imageAlt: "Basketball court",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Michael Jordan — six rings, killer instinct, the Flu Game, the shoes everyone still wears. LeBron James — hyped since age 15, still elite at 40, the ultimate main character.",
        image:
          "https://images.unsplash.com/photo-1504450758481-733568eba272?w=800&q=80",
        imageAlt: "Basketball going through hoop",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "They never played each other in their primes. But their legacies collided anyway — every championship, every highlight reel, every 'clutch gene' argument reopened the wound.",
        image:
          "https://images.unsplash.com/photo-1519861530983-0d825486d831?w=800&q=80",
        imageAlt: "Basketball arena",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Jordan's last shot with the Bulls. LeBron's block in Game 7. The Decision. The Last Dance doc. Every generation got a moment that made them swear their guy was unbeatable.",
        image:
          "https://images.unsplash.com/photo-1574623452334-1e0ac2b86748?w=800&q=80",
        imageAlt: "Basketball game action",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Picking Jordan or LeBron says something about you — perfection vs longevity, loyalty vs adaptability, the 90s vs today. It's identity, not basketball.",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
        imageAlt: "Basketball hoop close up",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Jordan fans: six-for-six in Finals, never lost the big one. LeBron fans: played 20+ years, beat more great teams, carried worse rosters. Both have receipts. Neither concedes.",
        image:
          "https://images.unsplash.com/photo-1628779237767-84a63a597ae6?w=800&q=80",
        imageAlt: "Basketball on court",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Your uncle swears Jordan. Your cousin says LeBron. The debate keeps basketball alive between generations — and somehow, everyone still has fun arguing.",
        image:
          "https://images.unsplash.com/photo-1504450758481-733568eba272?w=800&q=80",
        imageAlt: "Basketball swish",
      },
    ],
  },
  {
    id: "hamilton-verstappen",
    title: "Hamilton vs Verstappen",
    subtitle: "When Netflix drama met real life",
    emoji: "🏎️",
    gradient: "from-red-800 via-rose-900 to-orange-950",
    accent: "#EF4444",
    duration: "57s",
    slides: [
      {
        type: "hook",
        label: "The Hook",
        caption:
          "Drive to Survive made F1 famous. Then two drivers gave the show a finale so chaotic that people who'd never watched a race suddenly cared about turn 5 in Abu Dhabi.",
        image:
          "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
        imageAlt: "Formula 1 race car",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Lewis Hamilton — seven-time champion, global superstar, fighting for equality on and off the track. Max Verstappen — young, fearless, raised to beat Lewis and nothing else.",
        image:
          "https://images.unsplash.com/photo-1541443131876-44b370bce916?w=800&q=80",
        imageAlt: "Racing car on track",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "The established legend vs the hungry challenger. Every race felt personal. Team radios leaked. Social media exploded. F1 went from niche to must-watch TV overnight.",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
        imageAlt: "Race car speed",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Silverstone collision. Monza run-in. Then 2021: one lap, one controversial call, one champion crowned. Fans were screaming. Drivers were fuming. History was made.",
        image:
          "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
        imageAlt: "F1 car racing",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Team Lewis or Team Max became a personality test. You didn't need to understand tire strategy — you just needed to pick a side and watch the beef unfold.",
        image:
          "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
        imageAlt: "Racing start lights",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Verstappen won 2021 and kept winning. Hamilton fans say the system robbed him. Verstappen fans say he finally dethroned the king. The sport is still divided.",
        image:
          "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
        imageAlt: "Red racing car",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "This rivalry turned casual viewers into diehards. It proved F1 isn't about cars going fast — it's about characters, conflict, and moments you can't script.",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
        imageAlt: "Sports car on road",
      },
    ],
  },
  {
    id: "brady-dynasty",
    title: "Tom Brady Dynasty",
    subtitle: "The kid nobody wanted",
    emoji: "🏈",
    gradient: "from-blue-900 via-slate-800 to-red-950",
    accent: "#3B82F6",
    duration: "59s",
    slides: [
      {
        type: "hook",
        label: "The Hook",
        caption:
          "He was picked 199th in the draft. Translation: literally everyone passed on him. Then he won seven Super Bowls and became the most winning athlete in modern sports history.",
        image:
          "https://images.unsplash.com/photo-1508098682722-e99b7749270e?w=800&q=80",
        imageAlt: "Football stadium",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Tom Brady — slow, unathletic by NFL standards, obsessed with winning. Bill Belichick — the grumpy genius coach who built a dynasty in New England around him.",
        image:
          "https://images.unsplash.com/photo-1566577739090-0d1dd9a2c2f8?w=800&q=80",
        imageAlt: "American football",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "Brady vs everyone who doubted him. Brady vs Father Time. Brady vs his own coach when they eventually split. Every chapter added to the legend — or the annoyance.",
        image:
          "https://images.unsplash.com/photo-1517927039222-0919a495adfa?w=800&q=80",
        imageAlt: "Football on field",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "The tuck rule game. 28-3 Super Bowl comeback. Deflategate. Leaving New England. Winning a ring in Tampa at 43. Each one felt like a movie sequel nobody asked for — but everyone watched.",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
        imageAlt: "Stadium crowd",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Half the country loved him. Half wanted him to lose so badly it became a personality. Being a Brady hater was almost as fun as being a Brady fan.",
        image:
          "https://images.unsplash.com/photo-1459865274687-595ded65355d?w=800&q=80",
        imageAlt: "Cheering sports fans",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Most people agree: Brady won. Seven rings. Two decades of dominance. The GOAT debate in football is basically over — and the stories from his career will never stop.",
        image:
          "https://images.unsplash.com/photo-1566577739090-0d1dd9a2c2f8?w=800&q=80",
        imageAlt: "Football close up",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Brady proved you don't need to be the most talented — you need to be the most relentless. His career is the ultimate 'never count anyone out' story.",
        image:
          "https://images.unsplash.com/photo-1517927039222-0919a495adfa?w=800&q=80",
        imageAlt: "Football field lights",
      },
    ],
  },
  {
    id: "tiger-comeback",
    title: "Tiger Woods Comeback",
    subtitle: "The greatest redemption arc",
    emoji: "⛳",
    gradient: "from-green-800 via-emerald-900 to-teal-950",
    accent: "#10B981",
    duration: "56s",
    slides: [
      {
        type: "hook",
        label: "The Hook",
        caption:
          "The most famous athlete on earth lost everything — his body, his image, his invincibility. Then at 43, against all logic, he won the one tournament that matters most.",
        image:
          "https://images.unsplash.com/photo-1535131749006-b7f58c990339?w=800&q=80",
        imageAlt: "Golf course at sunrise",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Tiger Woods — child prodigy, global icon, 15 major championships. Also a human being who faced injuries, scandal, and years where nobody thought he'd compete again.",
        image:
          "https://images.unsplash.com/photo-1593111778420-6631e288797c?w=800&q=80",
        imageAlt: "Golf ball on tee",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "This wasn't Tiger vs another player. It was Tiger vs his own body. Every surgery, every failed comeback, every doubt made the story harder — and the eventual triumph sweeter.",
        image:
          "https://images.unsplash.com/photo-1587174486073-ae5e5cff23fa?w=800&q=80",
        imageAlt: "Golfer swinging",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Dominance in the 2000s. The fall. The car crash. Years away from winning. Then April 2019 — Augusta National, green jacket, tears. Even non-golf people cried.",
        image:
          "https://images.unsplash.com/photo-1596727362302-b6577632b128?w=800&q=80",
        imageAlt: "Golf course landscape",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Everyone loves a comeback. Tiger's was the most extreme version imaginable — a reminder that the human story behind sports is always more powerful than the scoreboard.",
        image:
          "https://images.unsplash.com/photo-1535131749006-b7f58c990339?w=800&q=80",
        imageAlt: "Golf green",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Tiger won — not just the Masters, but the narrative. He reminded the world why we watch: not for stats, but for moments that feel impossible until they happen.",
        image:
          "https://images.unsplash.com/photo-1587174486073-ae5e5cff23fa?w=800&q=80",
        imageAlt: "Golf swing silhouette",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Tiger's story is the template for every comeback narrative in sports. When someone returns from the brink, this is the bar — and the reason fans believe in miracles.",
        image:
          "https://images.unsplash.com/photo-1593111778420-6631e288797c?w=800&q=80",
        imageAlt: "Golf ball close up",
      },
    ],
  },
  {
    id: "caitlin-clark",
    title: "Caitlin Clark Phenomenon",
    subtitle: "The moment everything changed",
    emoji: "🏀",
    gradient: "from-pink-600 via-rose-700 to-orange-800",
    accent: "#EC4899",
    duration: "60s",
    slides: [
      {
        type: "hook",
        label: "The Hook",
        caption:
          "A college basketball player didn't just break records — she broke the idea that nobody watches women's sports. ESPN's app crashed. Viewership shattered. A movement started.",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
        imageAlt: "Basketball court lights",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Caitlin Clark — Iowa's sharpshooting superstar with unlimited range and main character energy. Angel Reese — LSU's fierce rival who turned every game into must-see TV.",
        image:
          "https://images.unsplash.com/photo-1574623452334-1e0ac2b86748?w=800&q=80",
        imageAlt: "Women's basketball game",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "Clark vs Reese became bigger than basketball — a cultural flashpoint about stardom, celebration, and what it means to be the face of a movement.",
        image:
          "https://images.unsplash.com/photo-1519861530983-0d825486d831?w=800&q=80",
        imageAlt: "Basketball arena crowd",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Logo threes from half court. Record-breaking viewership. The NCAA Final. The WNBA draft becoming appointment television. Every moment felt like history in real time.",
        image:
          "https://images.unsplash.com/photo-1504450758481-733568eba272?w=800&q=80",
        imageAlt: "Basketball swish moment",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "People who'd never watched women's basketball stopped and said 'wait, this is incredible.' Clark didn't just play — she proved the audience was always there, just ignored.",
        image:
          "https://images.unsplash.com/photo-1459865274687-595ded65355d?w=800&q=80",
        imageAlt: "Excited fans in stands",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Women's sports won. Clark opened the door. The WNBA sold out arenas. Sponsorships followed. The 'nobody cares' era didn't just end — it became embarrassing to ever believe.",
        image:
          "https://images.unsplash.com/photo-1574623452334-1e0ac2b86748?w=800&q=80",
        imageAlt: "Basketball game energy",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Clark changed what people expect from women's sports. If you want to understand the biggest shift in sports culture right now — this is the story to know.",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
        imageAlt: "Basketball court overhead",
      },
    ],
  },
];

export function getReelById(id: string): ReelStory | undefined {
  return REEL_STORIES.find((story) => story.id === id);
}
