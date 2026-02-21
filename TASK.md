# Build: IdeaShot MVP

## What
A single-page Next.js 14 app that validates startup ideas instantly using AI.

## User Flow
1. User lands on page — minimal UI with 3 inputs:
   - "Your idea" (textarea, e.g. "A Duolingo for coding interviews")
   - "Target audience" (text input, e.g. "Junior devs prepping for FAANG")
   - "Problem you solve" (text input)
2. User hits "Validate →" button
3. Loading spinner
4. Structured result appears:
   - 🎯 ICP Score (1-10) with explanation
   - 📈 Market Signal (Hot / Warm / Cold) with reasoning
   - ⚠️ Top 3 Risks (list)
   - ✅ What's Strong (list)
   - 🚀 Suggested MVP Scope (what to build first, 2-3 bullets)
   - 💬 One brutal honest sentence at the bottom
5. "Share" button copies a URL — result encoded in base64 query param so it's shareable without a DB

## API Route
- POST /api/validate
- Calls Anthropic API (claude-haiku-4-5 or claude-3-haiku) 
- Returns structured JSON
- Use streaming for faster perceived performance

## Stack
- Next.js 14 App Router
- Tailwind CSS
- Vercel AI SDK (@ai-sdk/anthropic)
- TypeScript

## Design
- Dark theme: bg-zinc-950, text-zinc-100
- Accent: violet-500
- Clean, minimal, fast-feeling
- One column, max-w-2xl centered
- No navigation, no footer fluff
- Mobile responsive

## Env vars needed
- ANTHROPIC_API_KEY (will be set externally)

## package.json scripts
- dev: next dev
- build: next build
- start: next start

## Important
- Keep it SIMPLE — no auth, no DB, no unnecessary complexity
- The shareable URL encodes the INPUT params (not the result) so re-running gives fresh analysis
- Add a meta og:image and title for good Twitter card when shared

## When done
Write a DONE.md with:
- How to run locally
- Env vars needed
- Deploy instructions for Vercel

Then run:
openclaw system event --text "IdeaShot MVP built! Ready to review and deploy." --mode now
