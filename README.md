# Sports Bestie

Never feel lost in a sports conversation again.

Built for people who want to feel **included** in sports talk — not become experts. Social confidence through storytelling.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

1. **60 Second Sports Lore** (`/reels`) — Flagship feature. TikTok/Reels-style story viewer with narration, progress bars, and cinematic slides.
2. **Prep Me for the Group Chat** (`/prep`) — Pick a sport, get a briefing card with main character, current drama, safe opinion, and confidence score.
2. **Sports Lore Mode** (`/lore`) — Immersive story cards explaining sports drama like gossip.
3. **Why Should I Care?** (`/why-care`) — Sports explained through culture and emotion, not rules.
4. **Sports Personality Quiz** (`/quiz`) — Find your starter pack based on what interests you.
5. **Sports Bestie Chat** (`/chat`) — Ask why people care. No jargon, no judgment.

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Local state only — no auth, no database

## Project Structure

```
app/
  page.tsx          → Homepage (social confidence positioning)
  prep/page.tsx     → Group chat prep (primary feature)
  lore/page.tsx     → Lore mode stories
  why-care/page.tsx → Why should I care section
  quiz/page.tsx     → Personality quiz
  results/page.tsx  → Starter pack results
  chat/page.tsx     → Sports Bestie chat
components/         → UI components
context/            → Quiz state (React Context)
lib/                → Mock data and logic
```
