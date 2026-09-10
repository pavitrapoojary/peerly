# 🎓 Peerly v2 — The Campus Operating System
**"Your Campus, Fully Connected."**

> **Peerly v2** is a comprehensive **Campus Operating System** engineered for colleges, universities, and higher education institutions worldwide. Built on deep campus research, Peerly integrates all four student exchange pillars into a single trusted, closed-network platform: **Things** (Marketplace & Reverse Needs), **Skills** (Connect Hub & Biweekly Peer Pairing), **Help** (Community Board & Team-Ups), and **Knowledge** (Personalized Opportunities Radar).

[![Prototype Status](https://img.shields.io/badge/Prototype-v2%20Fully%20Interactive-5B4FE0?style=for-the-badge&logo=appveyor)](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/index.html)
[![Stack](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20ES6%20JS-2DBFA0?style=for-the-badge)](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/styles.css)
[![Campus Coverage](https://img.shields.io/badge/Campus-Universities%20%7C%20Colleges%20%7C%20Institutes-E85B94?style=for-the-badge)](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/mockData.js)
[![Spec Reference](https://img.shields.io/badge/Spec-Peerly%20v2%20Spec-F5A742?style=for-the-badge)](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/peerly-v2-spec.md)

---

## 📌 Table of Contents

1. [🌟 Executive Summary & The Generic Campus Thesis](#-executive-summary--the-generic-campus-thesis)
2. [🏛️ The 4 Product Pillars (Universal Student Exchange)](#️-the-4-product-pillars)
3. [🏗️ System Architecture & Interactive Diagrams](#️-system-architecture--interactive-diagrams)
   - [3.1 High-Level Component & Data Flow Architecture](#31-high-level-component--data-flow-architecture)
   - [3.2 5-Step Enriched Onboarding & Institutional Verification](#32-5-step-enriched-onboarding--institutional-verification)
   - [3.3 Dual-Track Marketplace & Reverse Needs Engine](#33-dual-track-marketplace--reverse-needs-engine)
   - [3.4 Closed-Loop Campus Accountability State Machine](#34-closed-loop-campus-accountability-state-machine)
   - [3.5 Connect Hub & Peer Pairing Coffee Roulette](#35-connect-hub--peer-pairing-coffee-roulette)
   - [3.6 Opportunities Radar Client-Side Matching Engine](#36-opportunities-radar-client-side-matching-engine)
   - [3.7 Community Board Team-Up Lifecycle](#37-community-board-team-up-lifecycle)
4. [🚀 Universal Feature Specifications & Implementation](#-universal-feature-specifications--implementation)
5. [🔄 Multi-Disciplinary Personas & Simulation Walkthroughs](#-multi-disciplinary-personas--simulation-walkthroughs)
6. [💻 Technical Implementation & Code Examples](#-technical-implementation--code-examples)
7. [📊 Mock Data Schema & Pre-Seeded Inventory](#-mock-data-schema--pre-seeded-inventory)
8. [📂 PlantUML Diagram Suite (.puml Files)](#-plantuml-diagram-suite-puml-files)
9. [🔮 Production Roadmap & PM Defense Guide](#-production-roadmap--pm-defense-guide)
10. [⚡ Quickstart & Local Setup](#-quickstart--local-setup)

---

## 🌟 Executive Summary & The Generic Campus Thesis

### 1.1 The Universal Campus Friction
On virtually every college, institute, or university campus (engineering, design, arts, medicine, law, or business), resource exchange and student networking are fragmented:
- **Idle Assets:** Thousands of textbooks, graphing calculators, lab equipment, monitors, cameras, sports gear, and interview attire sit idle in dorms and hostels.
- **Disconnected Talent:** Students lack a low-friction way to discover cross-departmental peers (e.g., engineers seeking designers for hackathons, marketers seeking financial modelers, researchers seeking coders).
- **Buried Requests:** WhatsApp/Telegram batch groups are noisy, lossy, and unsearchable. An ask posted at noon is buried under 300 messages by evening.
- **Accountability Vacuum:** Informal lending between peers suffers from awkward reminders and lost items due to zero return tracking.
- **Opportunity FOMO:** National hackathons, case competitions, fellowships, and grants are scattered across dozens of portals (Unstop, LinkedIn, university notice boards), leading to missed deadlines.

```
                          GENERIC CLASSIFIEDS (OLX / Jugarr / WhatsApp)
                                    ┌──────────────┐
                                    │    Things    │
                                    └──────────────┘
                                           │
                                           ▼
                           PEERLY v2 CAMPUS OPERATING SYSTEM
                     ┌─────────────────────┬─────────────────────┐
                     │       Things        │       Skills        │
                     │ (Marketplace+Needs) │  (Connect Pairing)  │
                     ├─────────────────────┼─────────────────────┤
                     │        Help         │      Knowledge      │
                     │  (Community Board)  │ (Opportunities Radar│
                     └─────────────────────┴─────────────────────┘
```

> **Universal Positioning Statement:** *Peerly isn't just a campus buy-and-sell board. It is the single operating system a student opens for everything campus-related — trade what you have, meet who you should know across departments, ask for help when you're stuck, and discover every opportunity you're eligible for — instead of five chaotic WhatsApp groups, three disjointed apps, and a lot of luck.*

---

## 🏛️ The 4 Product Pillars

| Pillar | Campus Problem Solved | Product Surface | Core Mechanism | Technical Implementation |
|---|---|---|---|---|
| **Things** | Idle dorm gear & hidden campus supply | [Marketplace & Needs Feed](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/feed.js) | Dual-track feed: Browse items + Reverse "Looking For" needs with live duplicate detection nudge and "I Have This" handoff. | [feed.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/feed.js), [itemDetail.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/itemDetail.js), [newListing.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/newListing.js) |
| **Skills** | Siloed departments & networking awkwardness | [Connect & Pairing Hub](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/connect.js) | Cross-domain skill exchange ("People to learn from" + "People like you") + Zero-effort biweekly Peer Pairing ("Coffee Roulette"). | [connect.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/connect.js), [modal.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/components/modal.js) |
| **Help** | Fragmented hackathon teaming & favor requests | [Community Board](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/community.js) | Competition & Hackathon `🤝 Team-Up` with live batchmate interest roster, `🙋 Ask / Favor` requests, and `📢 Announcement` milestones. | [community.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/community.js), [modal.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/components/modal.js) |
| **Knowledge** | Scattered deadlines & opportunity discovery | [Opportunities Radar](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/opportunities.js) | Client-side tag-matching engine filtering 15+ curated competitions, grants, and internships against student interests with 7-day "Closing Soon" badges. | [opportunities.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/views/opportunities.js), [state.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/state.js) |

---

## 🏗️ System Architecture & Interactive Diagrams

### 3.1 High-Level Component & Data Flow Architecture

```mermaid
graph TD
    subgraph Presentation_Layer["Presentation Layer (HTML5 / Vanilla CSS3)"]
        HTML["index.html (#app mount)"]
        CSS["styles.css (Design System Tokens)"]
        Nav["Navbar (Persistent 4-Pillar Tabs)"]
        ModalComp["Modal & Universal Chat Drawer"]
        ToastComp["Toast Notifications System"]
    end

    subgraph Routing_Layer["Routing & View Layer"]
        Router["Router (#/ Hash Listener)"]
        VLanding["LandingView (#/)"]
        VOnboard["OnboardingView 5-Steps (#/onboarding)"]
        VFeed["FeedView: Marketplace & Needs (#/feed)"]
        VDetail["ItemDetailView (#/item/:id)"]
        VNew["NewListingView (#/new-listing)"]
        VConnect["ConnectView (#/connect)"]
        VCommunity["CommunityView (#/community)"]
        VOpps["OpportunitiesView (#/opportunities)"]
        VProfile["ProfileView (#/profile)"]
    end

    subgraph State_Engine_Layer["Reactive Client-Side State & Logic Engine"]
        State["AppState Singleton (js/state.js)"]
        MatchEngine["Radar Tag-Matching Engine"]
        NudgeEngine["Duplicate Need Detection Engine"]
        PairingEngine["Coffee Roulette Suggester"]
        TrustEngine["Trust Score & Rating Engine"]
    end

    subgraph Mock_Data_Store["In-Memory Data Models (js/mockData.js)"]
        MUsers["MOCK_USERS (Diverse Student Profiles)"]
        MListings["MOCK_LISTINGS (12 Items)"]
        MNeeds["MOCK_NEEDS (6 Requests)"]
        MOpps["MOCK_OPPORTUNITIES (15 Entries)"]
        MPosts["MOCK_COMMUNITY_POSTS (8 Posts)"]
        MCampus["MOCK_CAMPUSES (Tech, Design, Arts, Mgmt)"]
        MChats["MOCK_CHAT_SCRIPTS"]
    end

    HTML --> Router
    Router --> VLanding & VOnboard & VFeed & VDetail & VNew & VConnect & VCommunity & VOpps & VProfile
    
    VFeed & VConnect & VCommunity & VOpps & VProfile --> State
    State --> MatchEngine & NudgeEngine & PairingEngine & TrustEngine
    State -.->|Deep Cloned at Init| Mock_Data_Store
    
    VFeed & VConnect & VCommunity --> ModalComp
    State --> ToastComp
```

---

### 3.2 5-Step Enriched Onboarding & Institutional Verification

```mermaid
sequenceDiagram
    autonumber
    actor Student as College / University Student
    participant UI as Router / Onboarding (#/onboarding)
    participant Engine as Verification Engine (Simulated)
    participant State as AppState (In-Memory)

    Student->>UI: Taps "Get Started" on Landing
    Note over UI: Step 1: Campus Selection
    UI->>Student: Displays searchable institutions (GLIM, IIT Madras, BITS Pilani, Ashoka, NID, NLSIU, IIMB)
    Student->>UI: Selects their institution
    UI->>State: Sets selectedCampus & domain context (@greatlakes.edu.in, @iitm.ac.in, etc.)

    Note over UI: Step 2: Institutional .edu Email OTP
    UI->>Student: Prompts for student email
    Student->>UI: Submits student.name@domain.edu
    UI->>Engine: Dispatches 4-digit OTP (Code: 4829)
    Student->>UI: Enters OTP in auto-advancing input boxes
    UI->>Engine: Simulates validation spinner (600ms)
    Engine-->>UI: Verified! (user.verified = true)

    Note over UI: Step 3: Background & Radar Profile Setup
    UI->>Student: Prompts Cohort (2026/2027), Specialization (Engineering/Design/Marketing/Finance), Skills, & Radar Target Interests
    Student->>UI: Customizes tag selections
    UI->>State: Stores batch, background, skills, and target interests

    Note over UI: Step 4: Student ID Upload (Optional)
    UI->>Student: Prompts Student ID card upload for "Verified Seller" badge
    alt Uploads Student ID
        Student->>UI: Uploads ID photo (student_id.png)
        UI->>State: Sets user.isVerifiedSeller = true
    else Skips Step
        Student->>UI: Taps "Skip for now"
    end

    Note over UI: Step 5: You're In! Celebration
    UI->>Student: Renders celebration modal with verified campus badge + tailored opportunity preview
    Student->>UI: Taps "Explore Campus Feed"
    UI->>State: Calls completeOnboarding()
    UI-->>Student: Navigates to Marketplace (#/feed) with full privileges
```

---

### 3.3 Dual-Track Marketplace & Reverse Needs Engine

```mermaid
flowchart TD
    Start["Student Opens Marketplace (#/feed)"] --> TabChoice{"Select Primary Tab"}
    
    TabChoice -->|Tab 1: Browse Items| BrowseFeed["Browse 12+ Available Campus Items"]
    BrowseFeed --> FilterMode["Filter Mode: All | Borrow | Buy | Give"]
    BrowseFeed --> SearchItems["Live Search: 'Blazer', 'Calculator', 'Notes', 'Racket'"]
    BrowseFeed --> ItemCard["Click Item Card (#/item/:id)"]
    ItemCard --> BorrowReq["Tap 'Request to Borrow' / 'Buy Now'"]
    BorrowReq --> AcceptModal["Simulated Accept Modal (Return-by Date Calculated)"]
    AcceptModal --> OpenChat["Open Universal Scripted Chat Drawer"]

    TabChoice -->|Tab 2: Campus Needs| NeedsFeed["Campus Needs (Looking For) Feed"]
    NeedsFeed --> NeedCard["View Need: 'Bluetooth Speaker for Fest'"]
    NeedCard --> HaveThis["Owner Taps 'I Have This'"]
    HaveThis --> HandoffChat["Opens Scripted Chat Drawer with Seeker"]

    Start --> CreatePost{"Click '+ Post'"}
    CreatePost -->|Post Item| NewItemFlow["Create Listing (#/new-listing) in <60s"]
    CreatePost -->|Post a Need| NewNeedModal["Open Need Modal: Title, Date, Terms"]
    NewNeedModal --> LiveType["User Types Need Title (e.g. 'TI-84')"]
    LiveType --> MatchCheck{"Matches Existing Listings?"}
    MatchCheck -->|Yes| ShowNudge["Display Inline Nudge: '2 batchmates already listed this!'"]
    MatchCheck -->|No| NormalPost["Submit Need to Live Needs Feed"]
    ShowNudge --> NormalPost
```

---

### 3.4 Closed-Loop Campus Accountability State Machine

```mermaid
stateDiagram-v2
    [*] --> ItemAvailable : Student lists item in <60s
    
    state ItemAvailable {
        [*] --> FeedVisible
        FeedVisible : Status = "Available"
        FeedVisible : Badge = "Share / Available"
    }

    ItemAvailable --> RequestAccepted : Peer taps "Request to Borrow"
    
    state RequestAccepted {
        [*] --> SetReturnDate
        SetReturnDate : Status = "Borrowed"
        SetReturnDate : Return-by Date calculated (+3 days)
        SetReturnDate : Scripted chat drawer opened
    }

    RequestAccepted --> ActiveBorrow : Physical handoff at dorm/campus lobby
    
    state ActiveBorrow {
        [*] --> ActiveTimer
        ActiveTimer : Active Countdown Card in "My Peerly" (#/profile)
        ActiveTimer : Reminder: "Return by tomorrow, 6:00 PM"
    }

    ActiveBorrow --> ConditionCheck : Borrower taps "Mark as Returned"
    
    state ConditionCheck {
        [*] --> InspectItem
        InspectItem : Prompt: "Returned in good condition?"
        InspectItem : Options: [Yes, Perfect Condition] / [Minor Wear / Damage]
    }

    ConditionCheck --> PeerRating : Condition recorded
    
    state PeerRating {
        [*] --> RateExperience
        RateExperience : Prompt: "Rate your peer interaction"
        RateExperience : Options: [👍 Smooth & Friendly] / [👎 Needs Improvement]
    }

    PeerRating --> TrustScoreUpdated : Rating submitted
    
    state TrustScoreUpdated {
        [*] --> BumpScores
        BumpScores : Owner Rating Incremented (👍 19, 100%)
        BumpScores : Borrower Trust History Logged
        BumpScores : Item Status Reset to "Available"
    }

    TrustScoreUpdated --> ItemAvailable : Ready for next borrower
    TrustScoreUpdated --> [*]
```

---

### 3.5 Connect Hub & Peer Pairing Coffee Roulette

```mermaid
sequenceDiagram
    autonumber
    actor Haripriya as Haripriya (Strategy & Marketing)
    participant Connect as Connect View (#/connect)
    participant Engine as Peer Matching Engine
    actor Meera as Meera K. (Finance Lead)

    Haripriya->>Connect: Opens Connect Hub
    Connect->>Engine: Evaluates Haripriya's interests: ['Finance', 'Consulting']
    Engine->>Engine: Scans student cohort skills for matches
    Engine-->>Connect: Renders "People to Learn From" Rail
    Note over Connect: "Meera K. (Finance) can help with: Excel modeling, Valuation basics"
    
    Haripriya->>Connect: Taps "Say Hi" on Meera's card
    Connect-->>Haripriya: Opens scripted peer conversation starter

    Note over Connect: Zero-Effort Peer Pairing ("Coffee Roulette")
    Haripriya->>Connect: Toggles ON "Join Peer Pairing"
    Haripriya->>Connect: Taps "Simulate This Week's Pairing"
    Connect->>Engine: Runs bipartite pairing algorithm
    Engine-->>Connect: Matches Haripriya with Meera K.
    Connect-->>Haripriya: Displays match card with shared icebreaker: "You both follow Strategy — discuss the Bain case!"
```

---

### 3.6 Opportunities Radar Client-Side Matching Engine

```mermaid
graph LR
    subgraph Profile_Inputs["Student Profile State"]
        Cohort["Cohort: 2026"]
        Background["Background: Marketing, Design, Strategy"]
        Interests["🎯 Target Interests: Finance, Consulting, PM, AI"]
    end

    subgraph Radar_Engine["Radar Personalization Engine (js/state.js)"]
        Filter["Tag Intersect Algorithm:\nopp.tags.some(t => user.interests.includes(t))"]
        Urgency["Urgency Classifier:\nopp.daysLeft <= 7 ? 'Closing Soon' : 'Standard'"]
        Score["Match Score:\n(sharedTags / totalTags) * 100"]
    end

    subgraph Opportunities_Database["15+ Curated Multi-Disciplinary Opportunities"]
        O1["National Product Case Challenge (Product, Tech)"]
        O2["Tata Crucible Campus Quiz & Hackathon (Strategy)"]
        O3["Google Summer APM Internship (Product, AI)"]
        O4["Goldman Sachs Investment Research (Finance)"]
        O5["L'Oréal Brandstorm Innovation (Marketing, Design)"]
    end

    Profile_Inputs --> Filter
    Opportunities_Database --> Filter
    Filter --> Score
    Filter --> Urgency
    
    Score --> RecRail["⭐ Recommended for You (Top Matches)"]
    Urgency --> ClosingSoon["🚨 Animated Amber 'Closing Soon' Pill"]
    Filter --> AllRail["📋 All Campus Opportunities"]
```

---

### 3.7 Community Board Team-Up Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Rohan as Rohan K. (Author)
    participant Board as Community Board (#/community)
    actor Haripriya as Haripriya (Peer)
    participant State as AppState (communityPosts)

    Rohan->>Board: Taps "Post to Community"
    Rohan->>Board: Selects Type: 🤝 Team-Up, Title: "Need 1 more for CaseComp / Hackathon", Skill: "Marketing & GTM"
    Board->>State: Appends new post to communityPosts
    Board-->>Rohan: Displays live post on feed

    Haripriya->>Board: Views post & taps "I'm Interested"
    Board->>State: Adds "u_me" to post.interested array
    Board-->>Haripriya: Button updates to "✓ Interested" + Toast confirmation
    Board-->>Rohan: Live interested roster updates showing Haripriya's avatar & profile
    Rohan->>Board: Taps "Message" on Haripriya's avatar -> Opens chat to confirm team
```

---

## 🚀 Universal Feature Specifications & Implementation

### 1. Pillar 1: Things — Marketplace & Reverse Needs Engine
- **Dual-Track Feed Tabs:** Seamless switching between **"Browse Available Items"** (12+ items) and **"Campus Needs (Looking For)"** (6+ requests).
- **Reverse Seeker Requests:** Students post what they are seeking with needed-by dates and terms (`Borrow Only`, `Willing to Pay`, `Either`).
- **"I Have This" Instant Response:** Any verified student can respond to a Need card, instantly launching a scripted handoff chat without needing an existing listing.
- **Simulated Duplicate Match Nudge:** Live typing during Need creation runs a substring/category match against active inventory. If an item exists, an amber alert banner guides the user to the existing listing.

### 2. Pillar 2: Skills — Connect Hub & Peer Pairing
- **"People to Learn From" Rail:** Dynamic student cards displaying peers whose skills match your stated learning interests, complete with an explanation (*"Meera (Finance) can help with: Excel modeling, Valuation basics"*).
- **"People Like You" Rail:** Overlapping cohort and specialization peers for study circles and projects.
- **Zero-Effort Peer Pairing ("Coffee Roulette"):** Biweekly opt-in toggle + "Simulate This Week's Pairing" demo trigger with mutual icebreakers.
- **Interactive Skill/Interest Customizer:** Modal allowing real-time edits to user skills and radar interests.

### 3. Pillar 3: Help — Community Board
- **Three Core Post Types:**
  - `🤝 Team-Up`: Form case competition, research, or hackathon teams with role requirements, deadline trackers, and an interactive **"I'm Interested"** batchmate roster.
  - `🙋 Ask / Favor`: Informal requests for SOP reviews, mock interviews, lab notes, or lost item recovery.
  - `📢 Announcement`: Campus achievements, club webinars, podcast releases, and student initiatives.
- **Interactive Emoji Reactions:** Real-time reaction counters for 👍 Thumbs Up, 🎉 Celebrate, and 🔥 Fire.

### 4. Pillar 4: Knowledge — Personalized Opportunities Radar
- **Client-Side Tag Matching:** Real-time array intersection filtering against `currentUser.interests`.
- **"Recommended for You" Tier:** Highlighting highest-relevance opportunities with match percentage badges.
- **"Closing Soon" Alerts:** Animated amber urgency pills for competitions closing within 7 days.
- **Multi-Source Curation:** Curated listings from Unstop, LinkedIn Jobs, Tata Group, BCG Campus, and Campus Notice Boards.

---

## 🔄 Multi-Disciplinary Personas & Simulation Walkthroughs

Use the top **Persona Demo Bar** to switch between pre-seeded personas representing diverse campus disciplines:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 👤 Demo Persona Bar: [ Haripriya M. (Marketing) ▼ ] [ Reset Demo Data ]  [ GLIM Chennai ▼ ] │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Persona Matrix

| ID | Persona | Specialization & Focus | Skills Offered | Target Interests | Key Simulation Role |
|---|---|---|---|---|---|
| `u_me` | **Haripriya M.** | Strategy & Marketing | GTM Strategy, Pitch Decks, Public Speaking | Finance, Consulting, PM, Analytics | Demand Seeker, Case Competitor, Peer Learner |
| `u_jean` | **Jean R.** | Economics & Finance | Excel modeling, DCF Analysis, Corporate Tax | Consulting, Venture Capital, Fintech | Passive Idle Owner (Lends TI-84 & Textbooks) |
| `u_meera` | **Meera K.** | Finance & Investments | Valuation basics, LBO Modeling, M&A | Product Management, AI Tools, Consulting | Skill Mentor, Coffee Roulette Partner |
| `u_thiru` | **Thirupathi M.** | Operations & Supply Chain | Six Sigma, Vendor Sourcing, Logistics | E-Commerce, Retail Tech, Operations | Verified Bulk Reseller (Water Bottles & Essentials) |
| `u_rohan` | **Rohan K.** | Consulting & Strategy | Case Structuring, Guesstimates | Strategy, Tech Consulting | CaseComp Team Lead, Blazer Lender |
| `u_priya` | **Priya S.** | Design & Digital Media | Figma Prototyping, UI/UX, Copywriting | Product Management, Design, Marketing | Creative Designer, Textbook Seller |

---

### Step-by-Step Simulation Examples

#### Example 1: Borrowing Formal Attire for Final Presentations (Pillar: Things)
1. Navigate to **Marketplace** (`#/feed`). Ensure the **"Browse Available Items"** tab is active.
2. Type `"Blazer"` into the search bar or click the **"Formal Wear"** category chip.
3. Click on the listing **"Navy Blue Formal Blazer (Size 40 / M)"** (`#/item/l1`).
4. Note the owner (Rohan K., 100% Rating, Hostel 3) and status (**Available**).
5. Click **"Request to Borrow"**. A simulated 500ms spinner completes, displaying:
   - *Status:* **Borrowed**
   - *Return-by Date:* **Tomorrow, 6:00 PM**
6. Click **"Open Scripted Chat"**. Review the pre-scripted handoff dialog coordinating a lobby pickup at Hostel 3.

#### Example 2: Reverse Need with Duplicate Detection (Pillar: Things)
1. On the Marketplace feed, click **"Post a Need"** or switch to the **"Campus Needs"** tab.
2. In the modal, type `"TI-84 Calculator"` in the title field.
3. Observe the live **Duplicate Detection Nudge Banner**:
   > *"Good news — Jean R. already listed 'TI-84 Plus CE Graphing Calculator' for borrow! Check existing listings before posting."*
4. Change the title to `"Bluetooth Speaker for Campus Terrace"`, set Needed-by Date to `2026-09-14`, select `"Borrow Only"`, and submit.
5. The new card immediately appears at the top of the **Campus Needs** feed.
6. Switch persona to **Jean R.** -> Jean sees the need and can tap **"I Have This"** to open a handoff chat.

#### Example 3: Cross-Department Skill Swap & Coffee Roulette (Pillar: Skills)
1. Navigate to **Connect** (`#/connect`).
2. Observe the **"People to Learn From"** rail. Because Haripriya's interests include *Finance*, Meera K. and Jean R. appear with reason pills:
   - *"Meera K. (Finance) can help with: Excel modeling, Valuation basics"*
3. Click **"Say Hi"** on Meera's card to launch the peer chat starter.
4. In the **Peer Pairing ("Coffee Roulette")** section, click **"Simulate This Week's Pairing"**.
5. The preview card updates with paired peer Meera K., the mutual topic (*Finance & Valuation Modeling*), and an icebreaker prompt (*"Ask Meera about her breakdown of the Bajaj Auto valuation case!"*).

#### Example 4: Case Competition / Hackathon Team-Up (Pillar: Help)
1. Navigate to **Community Board** (`#/community`).
2. Filter by the **"🤝 Team-Ups"** chip.
3. Locate post `c1`: *"Need 1 more for CaseComp Nationals (Marketing / GTM focus)"* by Rohan K.
4. Click **"I'm Interested"**. The button updates to **"✓ Interested"**, a success toast fires, and Haripriya's avatar appears in the live roster of interested students.
5. Click **"Post to Community"** to open the composer and publish a new Ask or Announcement.

#### Example 5: Opportunities Radar Personalization (Pillar: Knowledge)
1. Navigate to **Opportunities** (`#/opportunities`).
2. Observe that the **"Recommended for You"** section highlights:
   - *National Product Case Challenge* (Tags: Product, Strategy)
   - *Google Summer APM Intern* (Tags: Product, AI Tools)
   - *Goldman Sachs Investment Research* (Tags: Finance, Markets)
3. Notice the animated amber **"Closing in 3 days"** badge on urgent competitions.
4. Click **"Customize My Radar Tags"**, add `"Fintech"`, and click save. Watch the feed re-filter immediately in real-time.

#### Example 6: Closed-Loop Return & Trust Score Bump (Accountability)
1. Navigate to **My Peerly Profile** (`#/profile`).
2. Under **Active Borrows**, locate the Navy Blazer card with the countdown reminder: *"Return by tomorrow, 6:00 PM"*.
3. Click **"Mark as Returned"**.
4. In Step 1 of the modal, select **"Yes, Perfect Condition"**.
5. In Step 2, select **"👍 Smooth & Friendly"**.
6. Submit: The active borrow card clears, and Rohan's trust rating increments to **👍 19 (100%)**.

---

## 💻 Technical Implementation & Code Examples

### 1. In-Memory Reactive State Management ([js/state.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/state.js))
Peerly maintains an in-memory singleton `AppState` with a subscriber pattern for zero-reload reactive updates:

```javascript
class AppState {
  constructor() {
    this.listeners = [];
    this.resetState();
  }

  resetState() {
    this.listings = JSON.parse(JSON.stringify(MOCK_LISTINGS));
    this.users = JSON.parse(JSON.stringify(MOCK_USERS));
    this.needs = JSON.parse(JSON.stringify(MOCK_NEEDS));
    this.opportunities = JSON.parse(JSON.stringify(MOCK_OPPORTUNITIES));
    this.communityPosts = JSON.parse(JSON.stringify(MOCK_COMMUNITY_POSTS));
    this.currentUser = { ...this.users[0] }; // Haripriya M.
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => { this.listeners = this.listeners.filter(cb => cb !== callback); };
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }
}
```

### 2. Client-Side Radar Personalization Engine ([js/state.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/state.js))

```javascript
getPersonalizedOpportunities() {
  const userInterests = this.currentUser?.interests || [];
  
  const recommended = [];
  const allOthers = [];

  this.opportunities.forEach(opp => {
    // Real client-side tag overlap matching
    const matchingTags = opp.tags.filter(tag => userInterests.includes(tag));
    const isRecommended = matchingTags.length > 0;
    
    // Urgency calculation (< 7 days)
    const daysLeft = this.calculateDaysLeft(opp.deadline);
    const isClosingSoon = daysLeft <= 7 && daysLeft >= 0;

    const enrichedOpp = {
      ...opp,
      matchingTags,
      matchPercentage: isRecommended ? Math.round((matchingTags.length / opp.tags.length) * 100) : 0,
      isClosingSoon,
      daysLeft
    };

    if (isRecommended) recommended.push(enrichedOpp);
    else allOthers.push(enrichedOpp);
  });

  return { recommended, allOthers, total: this.opportunities.length };
}
```

### 3. Duplicate Need Detection Algorithm ([js/components/modal.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/components/modal.js))

```javascript
checkDuplicateNeedMatch(inputTitle) {
  if (!inputTitle || inputTitle.trim().length < 3) return null;
  const clean = inputTitle.toLowerCase().trim();
  
  return appState.listings.find(item => {
    const itemTitle = item.title.toLowerCase();
    const itemCat = item.category.toLowerCase();
    return itemTitle.includes(clean) || clean.includes(itemTitle.slice(0, 5)) || itemCat.includes(clean);
  });
}
```

### 4. Hash Router with Route Parameters ([js/router.js](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/js/router.js))

```javascript
const routes = {
  "/": LandingView,
  "/onboarding": OnboardingView,
  "/feed": FeedView,
  "/item/:id": ItemDetailView,
  "/new-listing": NewListingView,
  "/connect": ConnectView,
  "/community": CommunityView,
  "/opportunities": OpportunitiesView,
  "/profile": ProfileView
};

function handleRoute() {
  const hash = window.location.hash.slice(1) || "/";
  const matchedView = resolveRoute(hash, routes);
  document.getElementById("app").innerHTML = matchedView.render();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);
```

---

## 📊 Mock Data Schema & Pre-Seeded Inventory

### Data Models Summary

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   MOCK_USERS    │◄─────►│  MOCK_LISTINGS  │◄─────►│   MOCK_NEEDS    │
│  (6 Profiles)   │       │   (12 Items)    │       │  (6 Requests)   │
└────────┬────────┘       └─────────────────┘       └─────────────────┘
         │
         ├───────────────►┌─────────────────────┐
         │                │ MOCK_COMMUNITY_POSTS│
         │                │     (8 Posts)       │
         │                └─────────────────────┘
         │
         └───────────────►┌─────────────────────┐
                          │ MOCK_OPPORTUNITIES  │
                          │   (15 Curated)      │
                          └─────────────────────┘
```

- **Campuses (`MOCK_CAMPUSES`):** Multi-disciplinary coverage across engineering, management, design, liberal arts, and sciences (GLIM, IIT Madras, BITS Pilani, Ashoka University, NID, IIM Bangalore, NLSIU).
- **Users (`MOCK_USERS`):** 6 diverse profiles with batch year, specialization, verified flags, ratings, bio, skills, and target interests.
- **Listings (`MOCK_LISTINGS`):** 12 items across Formal Wear, Electronics, Books & Notes, Sports Gear, and Bulk Resale with photos, terms, and status (`available`, `borrowed`, `sold`).
- **Needs (`MOCK_NEEDS`):** 6 reverse requests (Bluetooth Speaker, Lab Coat, TI-84, Marketing Case Study, Table Lamp) with needed-by dates and terms (`borrow-only`, `willing-to-pay`, `either`).
- **Opportunities (`MOCK_OPPORTUNITIES`):** 15 curated competitions, hackathons, and scholarships across all disciplines.
- **Community Posts (`MOCK_COMMUNITY_POSTS`):** 8 multi-category posts with live reaction counts and interested student lists.
- **Chat Scripts (`MOCK_CHAT_SCRIPTS`):** Pre-scripted contextual message exchanges for items, needs, and peer connections.

---

## 📂 PlantUML Diagram Suite (.puml Files)

For formal UML documentation and PlantUML rendering tools, the project includes standalone PUML files in the [`diagrams/`](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/diagrams) directory:

1. [diagrams/system-architecture.puml](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/diagrams/system-architecture.puml) — Complete component layout, presentation layer, reactive state store, and matching engine interactions.
2. [diagrams/onboarding-flow.puml](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/diagrams/onboarding-flow.puml) — Full 5-step sequence diagram for campus selection, OTP verification, profile enrichment, ID badge upload, and celebration.
3. [diagrams/persona-journeys.puml](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/diagrams/persona-journeys.puml) — 7 comprehensive persona journeys spanning all 4 product pillars (Borrowing, Reverse Needs, Connect Hub, Community Team-Ups, Opportunities Radar, Resale, and Accountability).
4. [diagrams/accountability-loop.puml](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/diagrams/accountability-loop.puml) — Closed-loop campus trust state machine from listing to handoff, return condition inspection, and peer rating bump.

---

## 🔮 Production Roadmap & PM Defense Guide

When presenting the Peerly prototype to evaluators or investors, use these architectural defense points:

### 1. "Why Front-End Only?"
> *"We deliberately scoped Peerly as a high-fidelity client-side prototype because at this stage the primary risk is not technical feasibility — it is trust, discoverability, and daily habit adoption. The prototype validates the complete user experience and UX craft before capital is committed to backend infrastructure."*

### 2. Production Implementation Path
- **Opportunities Radar in Production:** Scheduled serverless cron workers (AWS Lambda / Cloudflare Workers) scraping RSS/APIs (Unstop, LinkedIn, Internshala, University Portals), deduplicating records, running LLM/NLP embedding categorization, and generating daily digest emails/push notifications.
- **Connect Peer Pairing in Production:** A weighted bipartite matching algorithm factoring in domain diversity, schedule availability, and shared interests, automatically issuing Google/Outlook Calendar invites.
- **Community Board & Marketplace:** WebSockets/Firebase real-time synchronization, PostgreSQL relational store, and automated image moderation.

---

## ⚡ Quickstart & Local Setup

Peerly is built with **zero external dependencies, zero npm packages, and zero build steps**.

### Option 1: Direct File Open
Double-click [index.html](file:///c:/Users/pavit/Documents/MBA/2025/PROJECTS/peerly/index.html) in your file explorer to run directly in Google Chrome, Microsoft Edge, Safari, or Firefox.

### Option 2: Local HTTP Server
Run any local static server inside the project root:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000` in your web browser.

---

*Peerly v2 — The Multi-Campus Operating System for Higher Education Institutions*
