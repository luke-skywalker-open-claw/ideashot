# IdeaShot — Done ✅

## What was built
Single-page Next.js 14 app that validates startup ideas via Claude AI.
No auth, no DB, shareable URLs via base64-encoded query params.

## Run locally
```bash
cd /home/luke-skywalker/apps/ideashot
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
npm run dev
# → http://localhost:3000
```

## Env vars
| Var | Description |
|-----|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key (required) |

## Deploy on Vercel
1. Push to GitHub: `git push`
2. Import repo at vercel.com
3. Add env var: `ANTHROPIC_API_KEY`
4. Deploy — done

## File structure
```
app/
  layout.tsx        — metadata, fonts
  page.tsx          — main UI (form + results)
  globals.css       — tailwind base
  api/validate/
    route.ts        — POST /api/validate → calls Claude
```

## Day 001 — 2026-02-21
