# Build Log — Artifact 1: Portfolio

Running log of what I asked the chat AI for and what changed. Newest entries at the bottom.

**Chat AI:** Claude (Claude app, Cowork mode)
**Stack:** plain HTML + CSS + JavaScript, no framework, no build step
**Hosting:** GitHub Pages

---

## 2026-10-08 — Session 1

### 1. Kickoff
- **Asked:** "Build me a live portfolio website so I can impress peers and recruiters for AI/ML and quant roles," pasting the full Artifact 1 instructions.
- **Claude asked back:** how to deploy, what visual direction, what to include.
- **Decided:** push from my Mac to GitHub Pages; include projects, work experience, and contact links; leave futures trading off the public site.

### 2. Picking a look
- **Asked:** show me theme options first (the assignment suggests a side-by-side artifact).
- **Got:** three directions as a Claude artifact: *Order Book* (dark terminal), *Working Paper* (light research-paper style), *Graph Paper* (engineering notebook).
- **Changed course:** none of the three felt right. I sent Claude a portfolio I like (ciangoon.dev) and said "I want something like this."
- **What Claude pulled from it:** pure-black page, animated low-poly background, floating pill nav, big "Hi, I'm ___" hero with a typewriter subtitle, a loading screen with a percentage and a joke line, glassy cards, project filter tabs, accordion experience, stack chips, quote of the day, and an easter egg.
- **Made it mine:** low-poly surface drawn on a `<canvas>` whose lighting follows the mouse; loader lines about candles and agents; artifact status shown as green "▲ Shipped" vs amber "◇ Idea" like up-ticks; Konami-code "bull market mode" easter egg (tap the name 5x on phones).

### 3. Structure decisions
- Put **all editable text in `content.js`** (artifact cards, projects, experience, stack, quotes) so filling in a card each week means editing one object, not HTML.
- Artifact 1 is a wide feature card; cards 2–5 are dashed "idea" cards with brainstorm bullets.
- Dark-only on purpose; respects `prefers-reduced-motion` (no animation, static background).
- No contact form: GitHub Pages can't run a backend, so the email is shown with a Copy button instead.

### 4. Placeholder ideas (brainstorm, not commitments)
- **A2 Something You Will Use:** morning market brief, or a Canvas deadline radar.
- **A3 AI Inside It:** RAG Q&A over 10-K filings and earnings calls, with citations.
- **A4 For Someone Else:** bilingual storefront builder for Little Saigon small businesses (grows out of Project LS).
- **A5 Moonshot:** deploy Ace-local, my multi-agent research system, with an eval dashboard.

### 5. Deploy
- Repo named `bryanhuynh11.github.io` so the site lives at the root URL and the link never changes for Canvas.

### TODO (me)
- [ ] Add real dates to the Experience entries in `content.js`.
- [ ] Add `resume.pdf` and set `resumeUrl: "resume.pdf"`.
- [ ] Link Ace-local / Killzone repos once they're public.
- [ ] Rewrite the Artifact 1 reflection in my own words before submitting.

---

## How to update a card later
1. Open `content.js`, find the artifact in `ARTIFACTS`.
2. Set `status: "shipped"`, fill `title`, `link`, `reflection`, optional `tags`.
3. `git commit -am "Artifact N card" && git push` — Pages redeploys in about a minute.
4. Add a dated entry to this log.
