# Peerly v2 — From Marketplace to Campus Operating System
**"Your Campus, Fully Connected."**

> Builds on top of the deployed v1 prototype (peerly-dun.vercel.app). This is a **product evolution spec**, not a rebuild — v1's marketplace stays, and three new pillars get added around it. Deliverable type is unchanged: **front-end-only interactive prototype, no real backend**, built the same way v1 was (plain HTML/CSS/JS, hand-rolled router, in-memory mock data — see v1 spec §6–7 for the baseline patterns; this doc only specifies what's new or changed).

---

## 1. Why v2 exists — the differentiation problem

v1 proved the core insight (idle campus resources + no trusted discovery layer). But once you look at what's already out there — **Jugarr** (jugarr.in) being the closest direct comparable — it's clear that "campus marketplace for books/gadgets/furniture" is now a *category*, not a differentiator. Multiple players are converging on the same tangible-goods-exchange idea, some also dabbling in services/intangibles. If Peerly stays there, it's a feature, not a product.

### 1.1 The actual differentiator
Go back to the original research (§1.4 / the Ideate stage in the deck) — the four pillars were always **Things, Skills, Knowledge, Help**. v1 only really shipped **Things**. The other three were named but never built. That's the opportunity: **v2 doesn't pivot — it completes the original thesis.**

> **Positioning statement:** *Peerly isn't another campus marketplace app. It's the one place a student opens for anything campus-related — trade what you have, meet who you should know, ask for help when you're stuck, and find out what opportunities you're eligible for — instead of four different WhatsApp groups, three different apps, and a lot of luck.*

### 1.2 The four pillars, now mapped to real product surfaces

| Original pillar | v1 status | v2 product surface |
|---|---|---|
| **Things** | ✅ Built (Marketplace) | Marketplace — *now completed* with reverse "Need" postings so hidden supply can surface |
| **Skills** | Named only | **Connect** — profile-based networking + skill-swap matching |
| **Knowledge** | Named only | **Opportunities** — a personalized radar for hackathons, competitions, scholarships, internships |
| **Help** | Named only | **Community Board** — team-formation requests, favors, announcements |

This table is your single most important slide when you present v2 — it shows the differentiator was in your own research from day one, and v2 is disciplined execution, not scope creep chasing shiny features.

### 1.3 Why this beats "just add more categories"
A competitor can copy a marketplace category in a weekend. They can't copy a **relationship graph** (who you're connected to, who you've been paired with, what you've said you're interested in) — that compounds the longer you use the app and gets harder to replicate the more users are on it. That network effect / lock-in argument is worth stating explicitly when you defend this.

---

## 2. Landing Page — Rewrite for Simplicity

### 2.1 What to borrow from Jugarr's approach
Jugarr's own positioning is deliberately plain: *"Buy and sell books, notes, furniture, and gadgets. Find internships, offer services, and earn — all within your college campus."* One sentence, everyday words, no metaphor, no jargon. Compare that to v1 Peerly's landing narrative ("What if your campus were your marketplace?" + a slow-build empathy story) — it's well-crafted for a design-thinking submission, but it takes longer to "get" than Jugarr's landing does. For v2, keep the emotional story as **supporting content further down the page**, but lead with a Jugarr-simple headline.

### 2.2 New landing page structure
1. **Hero (first screen, no scrolling required to get it):**
   - Headline: something in the register of *"Everything campus. One app."* or *"Your batch. Your stuff. Your next opportunity. All in one place."*
   - Subhead, one sentence, plain language: *"Buy, sell, or borrow from batchmates. Meet people worth knowing. Find teammates. Never miss a deadline that matters to you."*
   - Single primary CTA: "Get Started."
   - Optionally: 4 small icon-labels under the CTA representing the four pillars (Marketplace / Connect / Community / Opportunities) — this single row *is* the elevator pitch, a visitor should understand the whole product from the hero alone.
2. **"A day in Peerly" strip (short, concrete, borrowed from your own deck's storytelling strength):** 4 short beats, one per pillar, each 1–2 sentences with a small illustration — e.g. *"Need a blazer for tomorrow? Someone two floors up has three."* / *"New to campus? Meet 2 people in your batch this week — we'll introduce you."* / *"Short one teammate for the hackathon? Post it, get matched."* / *"A case-comp for your specialization just opened — we'll tell you before the deadline sneaks up."*
3. **"Why not just WhatsApp / Jugarr / OLX" section (optional but strong for a PM audience):** a small honest comparison — 3 columns (Generic marketplace apps / WhatsApp groups / Peerly) across Discovery, Trust, and "does it help you meet people or find opportunities" — makes the differentiation explicit rather than implied.
4. **How it works** (keep from v1 — the 4-step visual).
5. **Footer** with the roadmap strip (unchanged from v1).

Keep sections 2–3 short — one scroll each, not essay-length. The goal is "explained in under 20 seconds," matching what you liked about Jugarr.

---

## 3. New Feature Specs

### 3.1 Marketplace completion — "Need" postings (reverse listings)
This closes the loop the original research flagged: owners with idle items often don't know anyone needs them until asked directly.

- New listing type alongside Share/Sell/Give: **"I Need This"** — a seeker posts what they're looking for (title, category, needed-by date, "willing to pay / borrow only / either" toggle) instead of posting an item they own.
- Need posts appear in their own feed tab (**Marketplace → Needs**) — separate from item listings, same visual language (cards, status tags), but visually flagged (e.g., a "🙋 Looking For" tag in a distinct color from "Available").
- Any verified student — even someone who has never listed anything — can respond to a Need post ("I have this") — this is the "hidden seller" scenario you described: supply gets surfaced only when asked, without requiring pre-listing.
- Matching nudge (simulated, client-side): when a Need post is created, if any existing listing's title/category loosely matches (simple string/category match against `mockData`), show the seeker an inline "Good news — 2 people already listed something like this" prompt pointing to those existing listings, before they finish posting the Need. This single interaction demonstrates real product thinking (reduce redundant asks) without needing any real backend matching engine.

### 3.2 Connect — profile-based networking
This is the new pillar with the most surface area. Scope it in three parts so it stays buildable:

**a) Profile enrichment (extend the existing onboarding/profile):**
Add fields the matching logic will run on:
- Batch/cohort year (e.g., "PGP 2026", "PGP 2027")
- Background/specialization tags (e.g., Engineering, Finance, Marketing, Consulting, Operations, Design — multi-select)
- Skills you can teach/help with (multi-select or free tags — e.g., "Excel modeling," "Python," "Public speaking")
- Interests you want to learn/explore (multi-select — this doubles as input for the Opportunities pillar too, see §3.3)
- A one-line "About me" text field

**b) Two suggestion rails on a new "Connect" screen:**
- **"People like you"** — same batch and/or overlapping background tags → low-friction, familiar networking (study buddies, same-specialization peers).
- **"People to learn from"** — different background tag from yours, but their skills overlap with your stated interests (e.g., you're Engineering + interested in "Finance," it surfaces Finance-background batchmates who listed relevant skills). Frame these cards with a one-line reason: *"Meera (Finance) can help with: Excel modeling, Valuation basics"* — the *reason* is what makes the suggestion feel intelligent rather than random.
- Each suggested profile card has a simple "Say Hi" button → simulated connection request → simulated accept → unlocks a scripted chat starter (reuse the same scripted-chat pattern from Marketplace item requests in v1).

**c) Peer Pairing ("Coffee Roulette" equivalent) — the effortless-networking feature:**
- A single toggle on the Connect screen: **"Join Peer Pairing"** — opt-in, described as *"Every two weeks, we'll pair you with 1–2 people you haven't met yet. No planning needed — just show up."*
- Once toggled on, show a "You're in! Next pairing: [date, simulated as ~2 weeks out]" confirmation.
- For the demo, include a button like "Simulate This Week's Pairing" that instantly shows a result: a small card with 1–2 matched profiles, a shared icebreaker prompt (e.g., *"You both listed 'Finance' as an interest — ask them about the Bajaj Auto valuation case!"*), and a "Say Hi" CTA. This proves the mechanic without needing an actual biweekly scheduler.
- Design principle to state explicitly when presenting: **zero-effort networking** — the whole value proposition is that the user makes *one* decision (opt in) and the system does the rest, mirroring the workplace "coffee roulette" pattern you described.

### 3.3 Community Board — team-ups, asks, and announcements
A lightweight forum/feed, distinct from the transactional Marketplace:
- Post types (a simple category selector, not separate screens):
  - **Team-Up** — e.g., "Need 1 more teammate for [Hackathon name], deadline [date], looking for someone strong in [skill]." Interested students tap "I'm Interested," poster sees a list of interested people (name, one-line background) and can message.
  - **Ask/Favor** — informal help requests that aren't item-based (e.g., "Can someone proofread my SOP by tonight?").
  - **Announcement/Shoutout** — promote something you built, an event, a club initiative — plain broadcast post, optional "🎉 Congratulate" or "👍" reaction instead of a comment thread (keep it lightweight, not a full social feed).
- Feed is chronological with category filter chips (mirrors the Marketplace feed's filter-chip pattern for visual/interaction consistency across the app).
- No threaded comments needed for the prototype — reactions + a single "I'm Interested / Message" action per post is enough to demonstrate the mechanic.

### 3.4 Opportunities — the personalized radar
This is the "differentiator that looks like magic but is actually just good filtering" feature.

- **What it is for the prototype:** a pre-seeded list of ~15–20 mock opportunities (hackathons, case comps, scholarships, internships — pull realistic examples, can reference real platforms like Unstop by name for flavor without actually integrating anything) each tagged with: category, relevant background/interest tags, deadline date, and source label.
- **Personalization (real, client-side, no backend needed):** filter the seeded list against the interest tags the user picked in their Profile (§3.2a). Show a "Recommended for you" section first (tag overlap), then "All Opportunities" below for everything else — this is a straightforward JS `.filter()` against shared tags, genuinely functional in the prototype, not just a mockup.
- **Deadline urgency:** sort or badge anything closing within 7 days as "Closing soon" — small red/amber pill, reuses the status-tag visual language from Marketplace.
- **Optional settings toggle (decorative for v1, but worth including to show forward thinking):** "Sources I follow" — a checklist of platforms (Unstop, LinkedIn, college notice board, etc.) — doesn't need to do anything functional, but signals the intended real-world architecture (see §4 for what this becomes post-pilot).
- Be explicit in the UI (small caption text) that this is a **daily-curated digest**, reinforcing the "you don't have to go searching, it comes to you" value prop — that framing is the actual product insight, independent of whether the backend is real yet.

---

## 4. What "Real" Would Require (for your own defense notes — do not build this)
State this clearly when presenting, so the judges know you understand the gap between prototype and production:
- **Opportunities radar in production** would need a scheduled backend job (cron/serverless function) that scrapes or pulls from partner APIs/RSS (Unstop, Internshala, LinkedIn Jobs, scholarship portals), de-duplicates, tags by NLP-based category matching against user interests, and pushes a daily digest (email/push notification). This is a real, buildable v2-post-pilot feature — just not a weekend one.
- **Connect/Peer Pairing in production** would need a real matching algorithm (e.g., a simple weighted score on shared tags + diversity bonus for "learn from" pairs), a scheduler for the biweekly cycle, and real notifications.
- **Community Board** would need moderation tooling once it's not just your own cohort using it.
- Naming this out loud is itself a PM signal: you're not pretending the prototype is production-ready, you're showing you already know the roadmap.

---

## 5. Updated Information Architecture

```
Landing (#/)                       — rewritten per §2
Onboarding (#/onboarding)          — unchanged flow, +new profile fields (§3.2a) added as a step
                                       or folded into "My Peerly" as an editable section post-onboarding
Marketplace (#/feed)
 ├─ Tab: Browse (existing v1 feed — Borrow/Buy/Give filter chips)
 ├─ Tab: Needs (new — §3.1)
 └─ "+ Post" → choose Item Listing vs "I Need This"
Item / Need Detail (#/item/:id, #/need/:id)
Connect (#/connect)                — new (§3.2)
 ├─ "People like you" rail
 ├─ "People to learn from" rail
 └─ Peer Pairing opt-in + simulate button
Community (#/community)            — new (§3.3)
 ├─ Filter chips: Team-Up / Ask / Announcement
 └─ Post composer
Opportunities (#/opportunities)    — new (§3.4)
 ├─ Recommended for You
 ├─ All Opportunities
 └─ Closing Soon badges
My Peerly (#/profile)              — extended with background/skills/interests (§3.2a),
                                       Peer Pairing status, Connections list
```

**Primary navigation** should now be a persistent tab/side bar with 4 icons: Marketplace, Connect, Community, Opportunities (+ Profile as a 5th, or tucked into a corner avatar menu). This nav bar *is* the four-pillar story made visible — worth making it slightly more prominent than a typical nav, since it's doing positioning work, not just wayfinding.

---

## 6. Visual System Additions
Keep the v1 palette (§4 of the v1 spec) as the base. Add tag colors for the new modules so a user can tell modules apart at a glance:

| New tag/module | Color | Notes |
|---|---|---|
| "Looking For" (Need post tag) | Amber-adjacent but distinct outline style, e.g. dashed border in `--color-accent-amber` | Visually signals "this is a request, not an offer" — dashed vs. solid border is enough differentiation, don't introduce a whole new hue |
| Connect module accent | A soft blue (e.g. `#4A90E2`) — new to the palette, used only for Connect's nav icon, section headers, and the Peer Pairing card | Keeps Connect visually distinct from commerce (pink/teal) since it's relational, not transactional |
| Community module accent | Reuse `--color-accent-amber` (generosity/help association already established in v1) |
| Opportunities module accent | Reuse `--color-primary` (purple) with a small clock/calendar icon system for deadlines | Ties it to the "brand" as the flagship differentiator |
| "Closing Soon" badge | `--color-danger` background tint, not full red — urgency without alarm |

---

## 7. Mock Data Additions
Extend the existing `mockData.js` (same file, same pattern as v1 §6) with:

```js
const needs = [
  { id: "n1", title: "Bluetooth Speaker", category: "Electronics",
    neededBy: "2026-09-14", terms: "borrow-only", seekerId: "u3", status: "open" },
  // ...
];

const connections = [
  // pre-seeded "profiles" beyond the current user, each with background/skills/interests
  { id: "u5", name: "Meera", batch: "PGP 2026", background: ["Finance"],
    skills: ["Excel modeling", "Valuation basics"], interests: ["Consulting"] },
  // ...
];

const communityPosts = [
  { id: "c1", type: "team-up", title: "Need 1 more for CaseComp Nationals",
    deadline: "2026-09-20", authorId: "u2", interested: ["u4", "u6"] },
  { id: "c2", type: "announcement", title: "Just launched my first podcast episode 🎙️",
    authorId: "u7" },
  // ...
];

const opportunities = [
  { id: "o1", title: "Unstop — Product Case Challenge", category: "Product Management",
    tags: ["Consulting", "Product"], deadline: "2026-09-16", source: "Unstop" },
  // ...
];
```

Matching logic (Connect + Opportunities personalization) is just array filtering against shared tags — no library needed, e.g.:
```js
const recommended = opportunities.filter(o =>
  o.tags.some(tag => currentUser.interests.includes(tag))
);
```

---

## 8. Build Instructions for Antigravity (v2 prompt)

> Extend the existing Peerly prototype (built with plain HTML/CSS/vanilla JS, hash-based routing, in-memory mock data — do not introduce React, Vue, or any build tooling; keep the same architecture as the current deployed app). Add three new sections — **Connect**, **Community**, and **Opportunities** — plus a **Needs** tab inside the existing Marketplace, per the spec above. Rewrite the landing page hero and top sections to be radically simpler and benefit-led (see §2) while keeping the existing "how it works" and roadmap sections. Add a persistent 4-icon primary navigation (Marketplace / Connect / Community / Opportunities) plus a profile entry point. Extend the user profile with batch year, background/specialization tags, skills, and interests, collected either during onboarding or as an editable section in "My Peerly." Implement the Connect suggestion rails and Peer Pairing simulate-button, the Community Board with category filter chips and a lightweight post composer, and the Opportunities feed with real client-side tag-based personalization (filter the seeded opportunities array against the current user's interest tags — this must actually work, not just look like it does) plus "Closing Soon" deadline badges. Extend `mockData.js` with the new arrays (needs, connections, communityPosts, opportunities) per §7, with enough seeded entries (10+ each) that every new screen looks populated and realistic. Maintain the existing color system and add the new module accent colors from §6. As before, everything is simulated client-side with short artificial delays where an action would normally hit a server — no real backend, no real notifications, no real data fetching from external sites.

---

## 9. Presentation Framing (for your own notes)
When you defend v2, the narrative arc is:
1. *"Our original research identified four pillars — Things, Skills, Knowledge, Help — but we deliberately shipped only one first, to validate the riskiest assumption cheaply."*
2. *"Once live, we noticed the market is already crowded on 'Things' alone — so completing the other three pillars is how we differentiate, not by adding more marketplace categories."*
3. *"Connect and Opportunities specifically create a network effect and a habitual daily-open reason that a pure marketplace app can't replicate — that's our moat."*
4. *"Everything here is a real, working client-side prototype except two things we've explicitly scoped out and named: real scheduled data-fetching for Opportunities, and a real backend matching algorithm for Peer Pairing — both because they're genuine backend/infra work, not because we couldn't design them."*

That last point matters: naming what you *didn't* build, and why, reads as far stronger product judgment than silently hoping nobody asks.
