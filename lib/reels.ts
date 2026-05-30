import { REEL_IMAGES } from "./reel-images";

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
  images: string[];
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

const M = REEL_IMAGES.messiRonaldo;
const J = REEL_IMAGES.jordanLebron;
const F = REEL_IMAGES.hamiltonVerstappen;
const B = REEL_IMAGES.brady;
const T = REEL_IMAGES.tiger;
const C = REEL_IMAGES.caitlinClark;

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
        images: [M.worldCupFinal, M.messi, M.ronaldo, M.soccerCrowd, M.soccerStadium, M.soccerNight],
        imageAlt: "World Cup final atmosphere",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Messi — quiet genius, humble, makes magic look effortless. Ronaldo — flashy, sculpted, obsessed with being the best. Opposite personalities. Same impossible talent.",
        images: [M.messi, M.ronaldo, M.messiArgentina, M.ronaldoFreeKick, M.ballonDor, M.elClasico],
        imageAlt: "Lionel Messi and Cristiano Ronaldo",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "They didn't just play in the same era — they chased the same crown every single year. Every goal, every award, every Champions League night became a referendum.",
        images: [M.elClasico, M.campNou, M.ballonDor, M.messi, M.ronaldo, M.soccerAction],
        imageAlt: "El Clásico rivalry",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Ballon d'Or battles. Record-breaking goal tallies. El Clásico when Ronaldo played for Madrid and Messi for Barcelona. The whole world stopped to watch.",
        images: [M.ballonDor, M.elClasico, M.messi, M.ronaldo, M.worldCupTrophy, M.soccerNight],
        imageAlt: "Ballon d'Or and El Clásico moments",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "You didn't need to know soccer tactics. You just needed a take. Dinner parties, group chats, comment sections — everyone had an opinion on Messi or Ronaldo.",
        images: [M.soccerCrowd, M.ronaldo, M.messi, M.debateCrowd, M.soccerFans, M.soccerStadium],
        imageAlt: "Passionate soccer fans",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Messi fans say natural talent wins. Ronaldo fans say work ethic wins. The truth? Both became global icons. The debate never ended — and maybe that was the point.",
        images: [M.messi, M.ronaldo, M.worldCupFinal, M.messiArgentina, M.ronaldoFreeKick, M.worldCupTrophy],
        imageAlt: "Messi World Cup triumph",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Even now, saying 'Messi or Ronaldo?' instantly starts a conversation. They taught a generation that sports isn't about stats — it's about stories you pick a side in.",
        images: [M.worldCupFinal, M.messi, M.soccerStadium, M.soccerCrowd, M.elClasico, M.soccerNight],
        imageAlt: "Legacy of the greatest rivalry",
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
        images: [J.jordan, J.lebron, J.nbaFinals, J.nbaArena, J.crowdCheer, J.basketballCourt],
        imageAlt: "Jordan and LeBron era",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Michael Jordan — six rings, killer instinct, the Flu Game, the shoes everyone still wears. LeBron James — hyped since age 15, still elite at 40, the ultimate main character.",
        images: [J.jordan, J.lebron, J.airJordan, J.sneakerCulture, J.jordanDunk, J.lebronDunk],
        imageAlt: "Michael Jordan and LeBron James",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "They never played each other in their primes. But their legacies collided anyway — every championship, every highlight reel, every 'clutch gene' argument reopened the wound.",
        images: [J.jordanGame, J.lebronLakers, J.bulls, J.lakersFans, J.nbaFinals, J.jordanDunk],
        imageAlt: "Iconic Jordan and LeBron moments",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Jordan's last shot with the Bulls. LeBron's block in Game 7. The Decision. The Last Dance doc. Every generation got a moment that made them swear their guy was unbeatable.",
        images: [J.jordanGame, J.lebronLakers, J.airJordan, J.bulls, J.nbaArena, J.crowdCheer],
        imageAlt: "Jordan last shot and LeBron block",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Picking Jordan or LeBron says something about you — perfection vs longevity, loyalty vs adaptability, the 90s vs today. It's identity, not basketball.",
        images: [J.nbaArena, J.jordan, J.lebron, J.goatDebate, J.crowdCheer, J.lakersFans],
        imageAlt: "NBA fans debating GOAT",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Jordan fans: six-for-six in Finals, never lost the big one. LeBron fans: played 20+ years, beat more great teams, carried worse rosters. Both have receipts. Neither concedes.",
        images: [J.bulls, J.lebron, J.jordan, J.jordanGame, J.lebronLakers, J.airJordan],
        imageAlt: "Jordan rings vs LeBron longevity",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Your uncle swears Jordan. Your cousin says LeBron. The debate keeps basketball alive between generations — and somehow, everyone still has fun arguing.",
        images: [J.lebron, J.jordan, J.nbaFinals, J.basketballCourt, J.nbaArena, J.goatDebate],
        imageAlt: "The GOAT debate lives on",
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
        images: [F.abuDhabi, F.f1Grid, F.monaco, F.f1Race, F.netflixVibes, F.f1Crowd],
        imageAlt: "Abu Dhabi Grand Prix 2021",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Lewis Hamilton — seven-time champion, global superstar, fighting for equality on and off the track. Max Verstappen — young, fearless, raised to beat Lewis and nothing else.",
        images: [F.hamilton, F.verstappen, F.hamiltonHelmet, F.verstappenWin, F.mercedes, F.redBull],
        imageAlt: "Lewis Hamilton and Max Verstappen",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "The established legend vs the hungry challenger. Every race felt personal. Team radios leaked. Social media exploded. F1 went from niche to must-watch TV overnight.",
        images: [F.f1Race, F.mercedes, F.redBull, F.pitLane, F.f1Speed, F.abuDhabi],
        imageAlt: "Hamilton vs Verstappen on track",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Silverstone collision. Monza run-in. Then 2021: one lap, one controversial call, one champion crowned. Fans were screaming. Drivers were fuming. History was made.",
        images: [F.abuDhabi, F.f1Race, F.verstappen, F.champagneSpray, F.f1Grid, F.monaco],
        imageAlt: "2021 Abu Dhabi title decider",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Team Lewis or Team Max became a personality test. You didn't need to understand tire strategy — you just needed to pick a side and watch the beef unfold.",
        images: [F.f1Grid, F.hamilton, F.verstappen, F.f1Crowd, F.netflixVibes, F.pitLane],
        imageAlt: "F1 fans pick a side",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Verstappen won 2021 and kept winning. Hamilton fans say the system robbed him. Verstappen fans say he finally dethroned the king. The sport is still divided.",
        images: [F.verstappen, F.redBull, F.abuDhabi, F.verstappenWin, F.champagneSpray, F.f1Race],
        imageAlt: "Verstappen championship celebration",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "This rivalry turned casual viewers into diehards. It proved F1 isn't about cars going fast — it's about characters, conflict, and moments you can't script.",
        images: [F.monaco, F.hamilton, F.verstappen, F.f1Speed, F.f1Crowd, F.netflixVibes],
        imageAlt: "F1 as global drama",
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
        images: [B.brady, B.lombardi, B.superBowl, B.bradyRing, B.nflCrowd, B.superBowlParty],
        imageAlt: "Tom Brady Super Bowl legacy",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Tom Brady — slow, unathletic by NFL standards, obsessed with winning. Bill Belichick — the grumpy genius coach who built a dynasty in New England around him.",
        images: [B.brady, B.belichick, B.patriots, B.bradyTrophy, B.tampaBay, B.draftDay],
        imageAlt: "Tom Brady and Bill Belichick",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "Brady vs everyone who doubted him. Brady vs Father Time. Brady vs his own coach when they eventually split. Every chapter added to the legend — or the annoyance.",
        images: [B.nflAction, B.bradyRing, B.comeback, B.brady, B.patriots, B.hatersFans],
        imageAlt: "Brady defying expectations",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "The tuck rule game. 28-3 Super Bowl comeback. Deflategate. Leaving New England. Winning a ring in Tampa at 43. Each one felt like a movie sequel nobody asked for — but everyone watched.",
        images: [B.bradyRing, B.lombardi, B.superBowl, B.ringsCloseUp, B.bradyTrophy, B.comeback],
        imageAlt: "Super Bowl comeback and trophies",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Half the country loved him. Half wanted him to lose so badly it became a personality. Being a Brady hater was almost as fun as being a Brady fan.",
        images: [B.superBowl, B.brady, B.patriots, B.nflCrowd, B.hatersFans, B.superBowlParty],
        imageAlt: "America divided over Brady",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Most people agree: Brady won. Seven rings. Two decades of dominance. The GOAT debate in football is basically over — and the stories from his career will never stop.",
        images: [B.lombardi, B.bradyRing, B.brady, B.ringsCloseUp, B.bradyTrophy, B.tampaBay],
        imageAlt: "Seven Super Bowl rings",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Brady proved you don't need to be the most talented — you need to be the most relentless. His career is the ultimate 'never count anyone out' story.",
        images: [B.brady, B.lombardi, B.nflAction, B.comeback, B.patriots, B.draftDay],
        imageAlt: "The ultimate underdog story",
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
        images: [T.masters2019, T.augusta, T.greenJacket, T.tiger, T.galleryRoar, T.golfSunset],
        imageAlt: "Tiger Woods 2019 Masters",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Tiger Woods — child prodigy, global icon, 15 major championships. Also a human being who faced injuries, scandal, and years where nobody thought he'd compete again.",
        images: [T.tiger, T.tigerSwing, T.masters2019, T.tigerYoung, T.fistPump, T.comebackTears],
        imageAlt: "Tiger Woods through the years",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "This wasn't Tiger vs another player. It was Tiger vs his own body. Every surgery, every failed comeback, every doubt made the story harder — and the eventual triumph sweeter.",
        images: [T.tigerSwing, T.golfGreen, T.tiger, T.augusta, T.golfSunset, T.galleryRoar],
        imageAlt: "Tiger battling injury and doubt",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Dominance in the 2000s. The fall. The car crash. Years away from winning. Then April 2019 — Augusta National, green jacket, tears. Even non-golf people cried.",
        images: [T.masters2019, T.greenJacket, T.augusta, T.comebackTears, T.fistPump, T.galleryRoar],
        imageAlt: "2019 Masters green jacket moment",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "Everyone loves a comeback. Tiger's was the most extreme version imaginable — a reminder that the human story behind sports is always more powerful than the scoreboard.",
        images: [T.golfCrowd, T.masters2019, T.augusta, T.galleryRoar, T.golfSunset, T.fistPump],
        imageAlt: "Crowd reacts to Tiger comeback",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Tiger won — not just the Masters, but the narrative. He reminded the world why we watch: not for stats, but for moments that feel impossible until they happen.",
        images: [T.greenJacket, T.masters2019, T.tiger, T.comebackTears, T.fistPump, T.tigerSwing],
        imageAlt: "Tiger wins the narrative",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Tiger's story is the template for every comeback narrative in sports. When someone returns from the brink, this is the bar — and the reason fans believe in miracles.",
        images: [T.augusta, T.masters2019, T.golfGreen, T.golfLegacy, T.golfSunset, T.galleryRoar],
        imageAlt: "Augusta National legacy",
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
        images: [C.clark, C.iowaArena, C.fans, C.recordCrowd, C.collegeHoops, C.newEra],
        imageAlt: "Caitlin Clark phenomenon begins",
      },
      {
        type: "characters",
        label: "Meet the Characters",
        caption:
          "Caitlin Clark — Iowa's sharpshooting superstar with unlimited range and main character energy. Angel Reese — LSU's fierce rival who turned every game into must-see TV.",
        images: [C.clark, C.reese, C.clarkGame, C.clarkShoot, C.reeseGame, C.rivalryEnergy],
        imageAlt: "Caitlin Clark and Angel Reese",
      },
      {
        type: "rivalry",
        label: "The Rivalry Begins",
        caption:
          "Clark vs Reese became bigger than basketball — a cultural flashpoint about stardom, celebration, and what it means to be the face of a movement.",
        images: [C.clarkGame, C.reese, C.womensGame, C.rivalryEnergy, C.logoThree, C.recordCrowd],
        imageAlt: "Clark vs Reese rivalry",
      },
      {
        type: "moments",
        label: "The Biggest Moments",
        caption:
          "Logo threes from half court. Record-breaking viewership. The NCAA Final. The WNBA draft becoming appointment television. Every moment felt like history in real time.",
        images: [C.clarkGame, C.wnba, C.iowaArena, C.logoThree, C.fans, C.collegeHoops],
        imageAlt: "Record-breaking college moments",
      },
      {
        type: "obsessed",
        label: "Why Fans Became Obsessed",
        caption:
          "People who'd never watched women's basketball stopped and said 'wait, this is incredible.' Clark didn't just play — she proved the audience was always there, just ignored.",
        images: [C.fans, C.clark, C.collegeHoops, C.recordCrowd, C.newEra, C.wnba],
        imageAlt: "New fans discover women's basketball",
      },
      {
        type: "winner",
        label: "Who People Think Won",
        caption:
          "Women's sports won. Clark opened the door. The WNBA sold out arenas. Sponsorships followed. The 'nobody cares' era didn't just end — it became embarrassing to ever believe.",
        images: [C.wnba, C.clark, C.fans, C.draftNight, C.newEra, C.recordCrowd],
        imageAlt: "WNBA draft and new era",
      },
      {
        type: "matters",
        label: "Why It Still Matters",
        caption:
          "Clark changed what people expect from women's sports. If you want to understand the biggest shift in sports culture right now — this is the story to know.",
        images: [C.clark, C.wnba, C.womensGame, C.draftNight, C.logoThree, C.newEra],
        imageAlt: "Changing women's sports forever",
      },
    ],
  },
];

export function getReelById(id: string): ReelStory | undefined {
  return REEL_STORIES.find((story) => story.id === id);
}

export function getSlideCover(slide: ReelSlide): string {
  return slide.images[0];
}
