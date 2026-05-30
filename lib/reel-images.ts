/** Curated story images — direct Wikimedia upload URLs + verified Unsplash photos */

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

/** Verified Unsplash atmosphere shots (all return HTTP 200) */
const UNSPLASH = {
  soccerStadium: U("photo-1529900748604-07564a03e7a6"),
  soccerCrowd: U("photo-1431324155629-1a6deb1dec8d"),
  soccerNight: U("photo-1612872087720-bb876e2e67d1"),
  soccerFans: U("photo-1579952363873-27f3bade9f55"),
  soccerAction: U("photo-1574629810360-7efbbe195018"),
  sneakers: U("photo-1542291026-7eec264c27ff"),
  basketball: U("photo-1546519638-68e109498ffc"),
  basketballArena: U("photo-1552674605-db6ffd4facb5"),
  boxingEnergy: U("photo-1575361204480-aadea25e6e68"),
  f1Race: U("photo-1551958219-acbc608c6377"),
  f1Grid: U("photo-1560272564-c83b66b1ad12"),
  f1Car: U("photo-1492144534655-ae79c964c9d7"),
  f1Mercedes: U("photo-1583121274602-3e2820c69888"),
  sportsCrowd: U("photo-1558618666-fcd25c85cd64"),
} as const;

/** Direct upload.wikimedia.org URLs — avoids Special:FilePath redirects that 404 in Next.js */
const WIKI = {
  messi:
    "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
  ronaldo:
    "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
  jordan2014:
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Michael_Jordan_in_2014.jpg",
  jordan:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Michael_Jordan.jpg/960px-Michael_Jordan.jpg",
  lebron:
    "https://upload.wikimedia.org/wikipedia/commons/0/09/LeBron_James.jpg",
  hamilton:
    "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
  verstappen:
    "https://upload.wikimedia.org/wikipedia/commons/7/75/Max_Verstappen_2017_Malaysia_3.jpg",
  brady:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Tom_Brady_2011.JPG/960px-Tom_Brady_2011.JPG",
  tiger:
    "https://upload.wikimedia.org/wikipedia/commons/6/67/Tiger_Woods.jpg",
  clark:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Caitlin_Clark_%28cropped%29.jpg/960px-Caitlin_Clark_%28cropped%29.jpg",
  reese:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Angel_Reese_%28cropped%29.jpg/960px-Angel_Reese_%28cropped%29.jpg",
} as const;

export const REEL_IMAGES = {
  messiRonaldo: {
    messi: WIKI.messi,
    ronaldo: WIKI.ronaldo,
    ronaldoFreeKick: WIKI.ronaldo,
    messiArgentina: WIKI.messi,
    worldCupFinal: WIKI.messi,
    worldCupTrophy: WIKI.messi,
    elClasico: UNSPLASH.soccerNight,
    campNou: UNSPLASH.soccerStadium,
    ballonDor: UNSPLASH.soccerFans,
    soccerCrowd: UNSPLASH.soccerCrowd,
    soccerStadium: UNSPLASH.soccerStadium,
    soccerNight: UNSPLASH.soccerNight,
    soccerFans: UNSPLASH.soccerFans,
    soccerAction: UNSPLASH.soccerAction,
    debateCrowd: UNSPLASH.soccerCrowd,
  },
  jordanLebron: {
    jordan: WIKI.jordan2014,
    lebron: WIKI.lebron,
    jordanGame: WIKI.jordan,
    jordanDunk: WIKI.jordan,
    lebronDunk: WIKI.lebron,
    airJordan: UNSPLASH.sneakers,
    nbaFinals: UNSPLASH.basketball,
    lebronLakers: WIKI.lebron,
    bulls: UNSPLASH.basketballArena,
    nbaArena: UNSPLASH.basketball,
    basketballCourt: UNSPLASH.basketball,
    sneakerCulture: UNSPLASH.sneakers,
    crowdCheer: UNSPLASH.soccerCrowd,
    lakersFans: UNSPLASH.boxingEnergy,
    goatDebate: UNSPLASH.basketballArena,
  },
  hamiltonVerstappen: {
    hamilton: WIKI.hamilton,
    verstappen: WIKI.verstappen,
    verstappenWin: WIKI.verstappen,
    hamiltonHelmet: WIKI.hamilton,
    abuDhabi: UNSPLASH.f1Race,
    f1Race: UNSPLASH.f1Race,
    f1Grid: UNSPLASH.f1Grid,
    f1Speed: UNSPLASH.f1Car,
    mercedes: UNSPLASH.f1Mercedes,
    redBull: UNSPLASH.f1Car,
    monaco: UNSPLASH.f1Race,
    pitLane: UNSPLASH.f1Grid,
    f1Crowd: UNSPLASH.sportsCrowd,
    netflixVibes: UNSPLASH.f1Grid,
    champagneSpray: UNSPLASH.f1Race,
  },
  brady: {
    brady: WIKI.brady,
    bradyRing: WIKI.brady,
    bradyTrophy: WIKI.brady,
    lombardi: WIKI.brady,
    superBowl: UNSPLASH.sportsCrowd,
    patriots: UNSPLASH.basketballArena,
    belichick: WIKI.brady,
    nflAction: UNSPLASH.boxingEnergy,
    nflCrowd: UNSPLASH.sportsCrowd,
    comeback: UNSPLASH.basketballArena,
    superBowlParty: UNSPLASH.soccerCrowd,
    tampaBay: UNSPLASH.basketballArena,
    draftDay: UNSPLASH.boxingEnergy,
    ringsCloseUp: WIKI.brady,
    hatersFans: UNSPLASH.sportsCrowd,
  },
  tiger: {
    tiger: WIKI.tiger,
    tigerYoung: WIKI.tiger,
    masters2019: UNSPLASH.soccerAction,
    greenJacket: WIKI.tiger,
    augusta: UNSPLASH.soccerNight,
    tigerSwing: UNSPLASH.basketballArena,
    golfCrowd: UNSPLASH.sportsCrowd,
    golfGreen: UNSPLASH.soccerAction,
    golfSunset: UNSPLASH.soccerNight,
    fistPump: WIKI.tiger,
    galleryRoar: UNSPLASH.sportsCrowd,
    comebackTears: WIKI.tiger,
    golfLegacy: UNSPLASH.soccerNight,
  },
  caitlinClark: {
    clark: WIKI.clark,
    clarkShoot: WIKI.clark,
    clarkGame: UNSPLASH.basketball,
    reese: WIKI.reese,
    reeseGame: WIKI.reese,
    iowaArena: UNSPLASH.basketballArena,
    womensGame: UNSPLASH.basketball,
    wnba: UNSPLASH.basketballArena,
    fans: UNSPLASH.sportsCrowd,
    collegeHoops: UNSPLASH.basketball,
    recordCrowd: UNSPLASH.soccerCrowd,
    draftNight: UNSPLASH.basketballArena,
    logoThree: UNSPLASH.basketball,
    rivalryEnergy: UNSPLASH.boxingEnergy,
    newEra: UNSPLASH.basketball,
  },
} as const;

export function getCoverImage(storyId: string): string {
  const covers: Record<string, string> = {
    "messi-ronaldo": REEL_IMAGES.messiRonaldo.messi,
    "lebron-jordan": REEL_IMAGES.jordanLebron.jordan,
    "hamilton-verstappen": REEL_IMAGES.hamiltonVerstappen.hamilton,
    "brady-dynasty": REEL_IMAGES.brady.brady,
    "tiger-comeback": REEL_IMAGES.tiger.augusta,
    "caitlin-clark": REEL_IMAGES.caitlinClark.clark,
  };
  return covers[storyId] ?? REEL_IMAGES.messiRonaldo.soccerStadium;
}
