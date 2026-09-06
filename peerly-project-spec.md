# Peerly — Project Implementation Spec
**"Share. Connect. Campus."**
A trusted peer-to-peer marketplace for residential MBA campuses — borrow, sell, give away, or trade skills with verified batchmates.

> Prepared for: build handoff to Antigravity
> Source: Innovation Sandbox assignment (Empathize → Define → Ideate)
> Deliverable type: **Front-end only prototype / clickable MVP** — no real backend, no real auth, no payments. All data is mocked/in-memory. The goal is to demonstrate product thinking, IA, and UX craft — not to ship production infrastructure.

---

## 1. What We're Building & Why

### 1.1 The one-line pitch
Peerly turns an MBA hostel campus into a searchable, trusted marketplace — so idle blazers, calculators, notes, and skills two floors away actually find the people who need them.

### 1.2 Problem (from research)
On residential campuses, the need and the supply already exist side by side — but there's no shared, trusted way to discover each other beyond one's immediate friend circle. WhatsApp groups are lossy (buried in hours), reach is capped to one's own batch, there's zero accountability for returns, and repeated selling in friend circles feels spammy. The result: students buy unnecessarily, useful items sit idle, and informal resellers can't scale past their own social graph.

**The problem isn't scarcity. It's discoverability, access, and trust.**

### 1.3 Who it's for (3 core personas — carry these into the prototype's mock data/testimonials)
| Persona | Role in system | Core need |
|---|---|---|
| **Jean R.** — Passive Idle Owner | Supply | A low-effort way to list an item once and let interested people come to him, with accountability built in |
| **Haripriya M.** — Seeker (short-term need) | Demand | A trusted, fast way to check "does anyone have this" before defaulting to buying |
| **Thirupathi M.** — Bulk-Buyer-Reseller | Proactive commerce | A pull-based space where buyers opt in, so pricing feels transactional, not personal/spammy |

### 1.4 Design principles → feature mapping
These are the principles a reviewer should be able to spot directly in the UI. Treat this table as the rubric for every screen you build.

| Insight | Design Principle | How it shows up in the prototype |
|---|---|---|
| Push messaging feels spammy; pull/browse doesn't | **Pull-based, not push-based** | No mass-messaging anywhere in the UI. A browsable feed + search, students opt in by tapping "Request" |
| Trust precedes convenience | **Verify before you can list or request** | Campus email verification gated before Home Feed; optional ID upload unlocks a "Verified Seller" badge |
| Posting is more effortful than searching (asymmetric effort) | **Listing takes under 60 seconds** | Minimal-field, camera-first "Create Listing" flow with smart defaults |
| Existing channels (WhatsApp) are "good enough" to survive but too weak to solve it | **Searchable & persistent, not buried in hours** | Every listing stays live with a status tag until closed; filter chips + search bar |
| Owners fear items not being returned | **Lightweight accountability, not heavy bureaucracy** | Return-by date, one-tap return reminder, post-exchange thumbs up/down rating, low-visibility report/flag |

### 1.5 What this prototype must prove (success criteria for the deliverable itself)
- A reviewer can go from "what's the problem" → "who is it for" → "here's the product" → "here's how it actually works" in under 3 minutes of clicking.
- Every screen traces back to a design principle above — nothing decorative without purpose.
- It *looks* like a real, fundable product — not a wireframe or a slide deck pretending to be an app.

---

## 2. Explicit Scope Boundaries

### 2.1 In scope (build this)
- A fully clickable, responsive **web app prototype** (desktop + mobile-width layouts), built with **plain HTML, CSS, and vanilla JavaScript — no framework, no build step, no `npm install` required.** It should be openable by double-clicking an `index.html` file or serving the folder with any static server.
- All 4 flows below, fully navigable, with realistic mock data pre-seeded.
- Polished visual design system (see §4) — this is the primary grading surface, so design quality matters more than feature count.
- Light/local state only: a single plain JS object (in-memory "app state") that drives what's shown on screen, updated via functions, no page reloads. **No `localStorage`, no `sessionStorage`, no backend, no real database, no real auth, no real payments, no npm/React/build tooling.**
- A subtle "Demo Mode" affordance is fine (e.g., a small badge or About panel explaining it's a prototype) — but don't let it dominate the UI.

### 2.2 Explicitly out of scope (do NOT build)
- Real user accounts / real OTP / real email sending — **simulate** the verification flow with fake OTP ("Enter any 4 digits") and a fake success state.
- Real payments or escrow.
- Real-time chat backend — **simulate** chat with a scripted, pre-written conversation that "plays" when opened.
- Push notifications, actual email/SMS.
- Multi-campus / admin analytics dashboard — mention these as "Post-Pilot / Later" in an in-app roadmap section instead of building them.
- Any server, API route, or database. If Antigravity defaults to scaffolding a backend, redirect it back to a static/client-only app.

### 2.3 MVP feature list (v1 — build all of these)
- [ ] Landing / marketing page (the "pitch" — problem, solution, how it works)
- [ ] Campus selection → email verification (simulated) → optional ID upload → Verified badge → onboarding complete
- [ ] Home feed: browse + search + filter chips (Borrow / Buy / Give) + status tags (Available / Borrowed / Sold)
- [ ] Item detail page → "Request to Borrow / Buy" → simulated accept → return-by date shown → "Open Chat" (scripted)
- [ ] Create Listing flow (Share / Sell / Give Away, under-60-seconds feel, "listing multiple units" toggle → routes to Verified Seller flow)
- [ ] Accountability layer: return reminder card, condition-check prompt, post-exchange rating (thumbs up/down), low-key report/flag option
- [ ] A simple "My Peerly" / profile-ish screen showing the user's own listings, active borrows, and rating — this doesn't need to be in the diagrammed flows but rounds out the prototype and gives you a place to show the Verified badge
- [ ] In-app "Roadmap" or "What's Next" panel (can live in a footer/About section) listing the Later/Post-Pilot items — this reinforces PM thinking without you having to build them

---

## 3. Information Architecture

```
Landing (#/)
 └─ "Get Started" → Onboarding
Onboarding (#/onboarding)
 ├─ Step 1: Select Campus
 ├─ Step 2: Verify .edu Email (simulated OTP)
 ├─ Step 3: Upload ID (optional, skippable)
 └─ Step 4: You're In! → redirects to Home Feed
Home Feed (#/feed)
 ├─ Search bar + filter chips (All / Borrow / Buy / Give)
 ├─ Item cards (grid or list) with status tags
 ├─ "+ Post an Item" (floating action button) → Create Listing
 └─ Nav → Item Detail, My Peerly
Item Detail (#/item/:id)
 ├─ Photo, owner, description, price/free/borrow terms
 ├─ "Request to Borrow/Buy" → Request Accepted state → Return-by date → Open Chat
 └─ Chat (scripted, inline drawer/modal on the same view)
Create Listing (#/new-listing)
 ├─ Photo upload (mock — accept a file or use a placeholder gallery)
 ├─ Title, category, description
 ├─ Mode: Share / Sell / Give Away (segmented control)
 ├─ Conditional: Expected Return Date (Share only), Price (Sell only)
 └─ "Listing multiple units?" toggle → shows Verified Seller gate if not yet ID-verified
My Peerly (#/profile)
 ├─ Verified badge status
 ├─ My Listings (with status tags)
 ├─ Active Borrows (with return reminder + condition-check CTA)
 └─ Rating summary (thumbs up/down history)
```

Build this as a **single `index.html`** with one `<main id="app">` mount point. Use the URL hash (`#/feed`, `#/item/3`, etc.) plus a small vanilla-JS router: listen for `hashchange` and `DOMContentLoaded`, look at `location.hash`, and re-render the right "view" function into `#app` using template literals or manual DOM creation. This keeps real, bookmarkable-feeling URLs and a back-button that works, without any framework or bundler — it's ~30 lines of routing code total.

---

## 4. Visual Design System — Light Theme

Design direction: **calm, trustworthy, "campus-fresh"** — not corporate-SaaS blue, not neon-startup. Think: warm neutrals, one confident brand teal, soft purple/pink accents borrowed directly from the deck's own palette (the deck already uses teal/purple/pink/orange consistently — carry that forward so the prototype feels like a continuation of the pitch, not a different product).

### 4.1 Color palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FAFAF8` | App background (warm off-white, not stark white) |
| `--color-surface` | `#FFFFFF` | Cards, modals |
| `--color-surface-alt` | `#F3F1FB` | Subtle section backgrounds |
| `--color-primary` | `#5B4FE0` | Peerly brand purple (from logo) — primary buttons, active nav, links |
| `--color-primary-hover` | `#4A3FC4` | Hover/active state |
| `--color-secondary` | `#2DBFA0` | Teal accent — success states, "Available" tags, verified checkmarks |
| `--color-accent-pink` | `#E85B94` | "Sell" tags, highlights, the logo's pink half |
| `--color-accent-amber` | `#F5A742` | "Give Away" tags, warm callouts |
| `--color-text-primary` | `#1E1B2E` | Headings, body text |
| `--color-text-secondary` | `#6B6779` | Meta text, timestamps, helper copy |
| `--color-border` | `#E7E4F0` | Card borders, dividers |
| `--color-borrow-tag` | `#2DBFA0` (bg tint `#E4F7F1`) | "Borrow"/"Available" status |
| `--color-sold-tag` | `#9B96A8` (bg tint `#EEEDF2`) | "Borrowed"/"Sold" status |
| `--color-danger` | `#E0544F` | Report/flag, destructive actions (used sparingly, never default focus) |

Guiding rule: **purple = brand/primary action, teal = trust/success/verification, pink = commerce/selling, amber = generosity/giving.** This mapping should be consistent everywhere so a reviewer subconsciously learns the color language in the first screen.

### 4.2 Typography
- **Headings:** A confident serif or slab-serif for hero/section titles only (e.g., "Fraunces", "Lora", or "Merriweather") — echoes the deck's serif headline style ("INNOVATION SANDBOX", "The Problem") and gives Peerly a distinct, non-generic-startup feel.
- **Body/UI:** A clean grotesk sans (e.g., "Inter", "Manrope", or "General Sans") for all UI chrome, buttons, form fields, item text — legibility and density matter here since it's an app, not a poster.
- Scale suggestion: 
  - H1 (landing hero): 48–56px, serif, weight 600
  - H2 (section headers): 28–32px, serif, weight 600
  - H3 (card titles): 18–20px, sans, weight 600
  - Body: 15–16px, sans, weight 400
  - Meta/caption: 13px, sans, weight 500, `--color-text-secondary`

### 4.3 Shape & elevation
- Border radius: 16px on cards, 12px on buttons/inputs, 24px on the phone-frame mockups if you build any.
- Shadows: soft and low-contrast only — `0 2px 8px rgba(30,27,46,0.06)`. Avoid hard drop shadows; this is a light, airy product, not a dark-mode dashboard.
- Generous whitespace on the landing page (mirror the deck's use of empty space); tighter, denser spacing inside the app screens (feed, item detail) since those need to feel functional.

### 4.4 Status tag component (reused everywhere)
Pill-shaped, small-caps or medium-weight label, colored background tint + matching text color, per §4.1:
- `Available` → teal tint
- `Borrowed` / `Sold` → grey tint
- `Verified` badge → purple outline pill with a small checkmark icon, teal check inside

### 4.5 Iconography
Use a single consistent icon set throughout (Lucide or Phosphor icons work well and are free) — do not mix icon styles. Icons should be line-style, 1.5–2px stroke, colored to match the section they're in (purple for nav/primary, teal for trust/verification, pink for commerce).

---

## 5. Screen-by-Screen Build Notes

### 5.1 Landing Page
Purpose: this is the "pitch deck as a webpage" — a reviewer should get the problem → solution → how-it-works in one scroll.
- Hero: logo, tagline ("Share. Connect. Campus."), one-line pitch, primary CTA "Get Started" → Onboarding.
- Problem section: short version of §1.2 — 3 icon+text cards ("The Need Exists", "The Supply Exists", "The Connection Is Missing").
- Solution section: the 4 pillars — Things, Skills, Knowledge, Help — as a 2x2 icon grid (mirrors the deck's "Our Solution" slide).
- "How it works" section: 4-step visual (Owner lists → Seeker discovers → Request & accept → Return & rate), using the persona icons/illustrations style from the deck if you can source similar flat-illustration assets.
- Footer: small "Roadmap / What's Next" strip (Later items from §2.3) + a one-line "This is a prototype built for [Innovation Sandbox / GLIM PGPM]" credit line.

### 5.2 Onboarding (4 steps, matches the deck exactly)
1. **Select Campus** — searchable list, pre-seed with "Great Lakes Institute of Management (Chennai)" pre-highlighted/selected plus 2–3 dummy other colleges for realism.
2. **Verify .edu Email** — text input + "Send OTP" button (does nothing real) → 4-digit OTP boxes → any input auto-advances → "Verify" always succeeds after a short simulated loading spinner (400–800ms, not instant — instant makes it feel fake).
3. **Upload ID (Optional)** — dashed drop-zone, "Upload Photo" and "Skip for now" both lead forward; if uploaded, set a flag that unlocks the Verified Seller badge later.
4. **You're In!** — success state with "Verified at [Campus Name]" pill, "Welcome to your campus feed!" → auto-redirect or button to Home Feed.

Use a step-indicator (1–2–3–4 dots or a progress bar) at the top, consistent with the deck.

### 5.3 Home Feed
- Top: search bar (functional client-side filter against mock data — actually filter as the user types, this is easy to implement and impressive), filter chips (All/Borrow/Buy/Give — functional filter, not decorative).
- Grid or list of item cards: photo, title, price or "Free"/"By [Owner]", status tag, and a small Verified badge if the owner is ID-verified.
- Floating "+" action button → Create Listing.
- Empty/no-results state should be designed too (don't skip this — it's a small detail that signals product maturity).

### 5.4 Item Detail
- Large photo, title, owner name + avatar + (Verified badge if applicable), description, mode-specific info (return terms if Share, price if Sell, "no return expected" note if Give Away).
- Primary CTA button copy changes by mode: "Request to Borrow" / "Buy Now" / "Request This".
- On click → short loading state → "Request Accepted!" success card → shows Return-by date (Share mode only) → "Open Chat" button.
- Chat: a simple drawer/modal with a **pre-scripted** 4–6 message exchange (already written, not live) between the requester and owner, ending in a friendly handoff-arrangement message. Label clearly if needed, but it should feel real, not stubby.

### 5.5 Create Listing
- Photo upload zone (accept file input for realism, or offer a small gallery of pre-set placeholder photos to click).
- Title, category dropdown (Formal Wear, Electronics, Books & Notes, Sports Gear, Stationery, Skills/Services, Other).
- Segmented control: **Share / Sell / Give Away** — changes the fields below it live:
  - Share → "Expected Return Date" date picker appears.
  - Sell → "Price (₹)" field appears.
  - Give Away → neither, just a small "No return expected" note.
- Toggle: "I'm listing multiple units" → if ON and user is not ID-verified yet, show an inline nudge: "Bulk/resale listings require a Verified Seller badge" with a "Verify Now" link back into the ID-upload step (don't hard-block; this should feel like a helpful nudge, matching the deck's tone).
- "Post Item" → success toast/confirmation → redirect to Home Feed with the new item visible at the top (this requires holding listings in shared app state, not just local component state — worth the extra 20 minutes, it's a nice "wow, it actually works" moment for a reviewer).

### 5.6 Accountability moments (weave these in, don't make a separate dead-end page)
- **Return reminder**: show as a dismissible card at the top of "My Peerly" for any active borrow ("Return by tomorrow, 6:00 PM").
- **Condition check**: after a simulated "Mark as Returned" action, show a quick "Returned in good condition?" Yes/No tap.
- **Post-exchange rating**: simple thumbs-up/down after any completed transaction, feeding into a small rating shown on the user's profile.
- **Report/Flag**: a small, low-visibility text link ("Report an issue") on the item detail/chat screen — deliberately not a prominent button, per the deck's own instruction that this should "never be the default UI focus."

### 5.7 My Peerly (profile)
- Header: avatar, name, campus, Verified badge (or "Verify your ID to unlock bulk selling" prompt if not verified).
- Rating summary: e.g., "👍 12 · 👎 0" or a simple star/percentage.
- Tabs or sections: My Listings / Active Borrows / History.
- This screen is what ties the accountability layer together visually — treat it as the "proof the system works" screen.

---

## 6. Mock Data Model

Keep this as a single `mockData.js` file, loaded via a `<script>` tag before the main app script, that defines a few plain JS arrays/objects in the global (or a single namespaced `Peerly` object to avoid polluting `window`). The app's "state" is just one more plain object (`appState`) that starts as a copy of this mock data and gets mutated by event handlers — no external state library needed.

```js
// mockData.js
// mode: "share" | "sell" | "give"
// status: "available" | "borrowed" | "sold"

const users = [
  {
    id: "u1", name: "Rohan", avatarUrl: "...", campus: "GLIM Chennai",
    verified: true, rating: { up: 12, down: 0 }
  },
  // ...more users
];

const listings = [
  {
    id: "l1", title: "Navy Blazer (M)", category: "Formal Wear",
    description: "Only worn once for a competition. Happy to lend it out for interviews!",
    photoUrl: "...", mode: "share", status: "available",
    ownerId: "u1", createdAt: "2026-09-01"
    // returnByDate gets set only once someone requests it
  },
  // ...more listings
];

const chatScripts = {
  // keyed by listingId, a pre-written back-and-forth used when "Open Chat" is tapped
  l1: [
    { sender: "u1", text: "Hey! Saw you requested the blazer 👋" },
    { sender: "me", text: "Yes! Need it for tomorrow's finals, is it still free?" },
    // ...
  ],
};
```

Seed with **at least 10–12 listings** spanning all 3 modes and multiple categories (blazer, calculator, lecture notes, textbook, badminton racket, an "Excel modeling help — 1hr" skills listing, a bulk-resale steel bottle listing tagged Verified Seller, etc.) so the feed doesn't look empty or repetitive. Pull directly from the deck's own examples (Navy Blazer, Scientific Calculator, Fin 1 Notes, Steel Bottles) — this keeps the prototype consistent with the story you already told in the pitch.

---

## 7. Suggested Tech Stack — deliberately no framework, no install step

The whole point of this choice is: nothing to `npm install`, nothing to configure, nothing that can "break the build." Open `index.html` in a browser (or serve the folder) and it works.

- **Structure:** Plain HTML + CSS + vanilla JavaScript. One `index.html`, one `styles.css`, and a small number of `.js` files (`mockData.js`, `router.js`, `app.js`, and one file per view is fine — e.g. `views/feed.js`, `views/onboarding.js`) loaded via plain `<script>` tags in order. No bundler, no transpiler, no `package.json` required.
- **Styling:** Hand-written CSS using **CSS custom properties** for the color tokens in §4.1 (defined once on `:root`) and a simple responsive grid/flexbox layout. If you want utility-class convenience without installing anything, you can pull in Tailwind's browser/CDN build via a single `<script src="https://cdn.tailwindcss.com"></script>` tag — this needs no install and no build step, and you can still theme it with the custom colors via an inline Tailwind config object. Either approach (hand-written CSS or Tailwind-via-CDN) is acceptable; hand-written CSS gives more control over the exact aesthetic described in §4.
- **Routing:** Hand-rolled hash router as described in §3 (~30 lines: listen to `hashchange`, map hash → render function).
- **State:** One plain JS object (`appState`) holding the current user, the listings array (seeded from `mockData.js`, then mutated as new listings are created), and simple UI flags (e.g., which onboarding step you're on). Re-render the relevant view function whenever state changes — no reactivity library needed at this scale.
- **Icons:** Inline SVGs (copy-paste from a free set like Lucide or Phosphor's website — no npm package needed, just the raw SVG markup) or a CDN icon font if simpler.
- **Fonts:** Google Fonts loaded via a normal `<link>` tag in `<head>` — e.g., `Fraunces` (headings) + `Inter` or `Manrope` (body). No install needed.
- **Images:** Use royalty-free stock/illustration placeholders (direct image URLs, e.g. from Unsplash) or simple colored placeholder blocks for item photos and persona avatars — don't spend time generating custom art; consistent placeholders are fine for a prototype.
- **No `localStorage`/`sessionStorage`, no backend, no build tooling.** Everything resets on refresh — that's expected and fine for a demo; optionally show a tiny "Reset Demo Data" button somewhere unobtrusive.

---

## 8. Instructions for Antigravity (paste/adapt as the actual build prompt)

> Build a fully responsive, front-end-only web app prototype called **Peerly** based on the spec above. Use **plain HTML, CSS, and vanilla JavaScript only — no React, no Vue, no build tools, no npm install, nothing that requires a terminal command to set up.** It should run by opening `index.html` directly or serving the folder with any static file server. Use a small hand-rolled hash-based router (`#/feed`, `#/item/:id`, etc.) to switch between views inside one `index.html`. Do not create any backend, API routes, database, or real authentication — simulate all of it with a plain in-memory JS state object and short artificial loading delays (400–800ms) so interactions feel real. Implement the full information architecture in §3, all screens in §5, the color system and typography in §4, and seed the app with the mock data described in §6 (at least 10–12 listings across Share/Sell/Give modes). New listings created via "Create Listing" must appear in the Home Feed live, by mutating the shared in-memory state and re-rendering. Prioritize visual polish, consistent spacing, and smooth micro-interactions (button hover/active states, loading skeletons, success toasts, CSS transitions) over feature breadth — this is a portfolio/grading deliverable where design quality is the primary signal, and the code should stay simple enough that someone with a software background but no MBA-specific dev setup can still read and tweak it.

---

## 9. Presentation / Grading Angle (for your own notes, not for Antigravity)
When you present this, frame it explicitly as: *"We deliberately scoped this as a click-through MVP rather than building real backend infrastructure, because at this stage the risk isn't technical feasibility — it's trust and adoption. The prototype exists to validate the experience, not the plumbing."* That one sentence pre-empts the "where's the backend" question and reframes the lightweight build as a scoping decision, not a limitation — which is itself the PM skill you want to showcase.
