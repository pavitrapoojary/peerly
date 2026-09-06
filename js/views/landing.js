// js/views/landing.js - Landing Page (Pitch Deck as a Webpage)

const LandingView = {
  render() {
    return `
      <!-- Hero Section -->
      <section class="landing-hero">
        <div class="hero-pill">
          ${Icons.sparkles(14, '#5B4FE0')} Residential MBA Campus Marketplace
        </div>

        <h1 class="hero-title">
          The items and skills you need are already <span class="gradient-text">two floors away</span>.
        </h1>

        <p class="hero-subtitle">
          Peerly turns your MBA hostel into a searchable, trusted marketplace — borrow formal wear for interviews, grab calculators for exam week, trade notes, or book peer case coaching without WhatsApp clutter.
        </p>

        <div class="hero-cta-group">
          <a href="#/onboarding" class="btn btn-primary btn-lg">
            ${Icons.sparkles(18)} Get Started (Test Onboarding)
          </a>
          <a href="#/feed" class="btn btn-secondary btn-lg">
            ${Icons.search(18)} Explore Live Campus Feed
          </a>
        </div>

        <div class="hero-stats-row">
          <div class="stat-item">
            <div class="stat-number">1,200+</div>
            <div class="stat-label">Verified Students</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">&lt;60s</div>
            <div class="stat-label">Rapid Listing Flow</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Accountability & Returns</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">0</div>
            <div class="stat-label">WhatsApp Spam</div>
          </div>
        </div>
      </section>

      <div class="main-container" style="padding-top: 10px;">
        <!-- Problem Statement Section -->
        <section style="margin-bottom: 70px;">
          <div class="section-header">
            <div class="section-tag">The Problem</div>
            <h2 class="section-title">The problem isn't scarcity. It's discoverability and trust.</h2>
            <p class="section-desc">
              On residential campuses, demand and supply live right beside each other in hostel wings, but existing channels fail to connect them.
            </p>
          </div>

          <div class="problem-grid">
            <div class="problem-card">
              <div class="problem-icon-wrapper" style="color: var(--color-primary);">
                ${Icons.flame(24)}
              </div>
              <h3>The Need Exists</h3>
              <p style="font-size: 14.5px; line-height: 1.55;">
                Urgent requirements for summer placement suits, graphing calculators, case finals, and course notes lead to panicked last-minute purchases on Amazon.
              </p>
            </div>

            <div class="problem-card">
              <div class="problem-icon-wrapper" style="color: var(--color-secondary);">
                ${Icons.layers(24)}
              </div>
              <h3>The Supply Exists</h3>
              <p style="font-size: 14.5px; line-height: 1.55;">
                Blazers, financial calculators, textbooks, and domain coaching skills sit idle across senior and batchmate rooms two corridors away.
              </p>
            </div>

            <div class="problem-card">
              <div class="problem-icon-wrapper" style="color: var(--color-accent-pink);">
                ${Icons.messageSquare(24)}
              </div>
              <h3>The Connection is Broken</h3>
              <p style="font-size: 14.5px; line-height: 1.55;">
                Broadcast WhatsApp messages get buried in minutes, reach is capped by batch silos, there's zero return accountability, and selling feels spammy.
              </p>
            </div>
          </div>
        </section>

        <!-- Solution Section - 4 Pillars -->
        <section style="margin-bottom: 70px;">
          <div class="section-header">
            <div class="section-tag">Our Solution</div>
            <h2 class="section-title">Four campus exchange pillars in one trusted hub.</h2>
            <p class="section-desc">
              Designed explicitly around pull-based discovery, lightweight verification, and built-in return accountability.
            </p>
          </div>

          <div class="solution-grid">
            <div class="pillar-card">
              <div class="pillar-icon-box" style="background: var(--color-primary-light); color: var(--color-primary);">
                ${Icons.briefcase(26)}
              </div>
              <h3 style="font-size: 18px; margin-bottom: 8px;">Things (Borrow)</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                Blazers, calculators, sports gear, and electronics lent with clear return-by dates and condition checks.
              </p>
            </div>

            <div class="pillar-card">
              <div class="pillar-icon-box" style="background: var(--color-accent-pink-light); color: var(--color-accent-pink);">
                ${Icons.tag(26)}
              </div>
              <h3 style="font-size: 18px; margin-bottom: 8px;">Commerce (Buy & Sell)</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                Textbooks, stationery, and verified bulk essentials sold in a transparent, opt-in marketplace.
              </p>
            </div>

            <div class="pillar-card">
              <div class="pillar-icon-box" style="background: var(--color-secondary-light); color: var(--color-secondary);">
                ${Icons.bookOpen(26)}
              </div>
              <h3 style="font-size: 18px; margin-bottom: 8px;">Knowledge (Give Away)</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                Term 1 cheat sheets, formula binders, and lecture notes passed down freely to juniors.
              </p>
            </div>

            <div class="pillar-card">
              <div class="pillar-icon-box" style="background: var(--color-accent-amber-light); color: var(--color-accent-amber);">
                ${Icons.lightbulb(26)}
              </div>
              <h3 style="font-size: 18px; margin-bottom: 8px;">Skills (Peer Coaching)</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                Excel financial modeling, case competition teardowns, and consulting resume reviews.
              </p>
            </div>
          </div>
        </section>

        <!-- How It Works Section -->
        <section style="margin-bottom: 70px;">
          <div class="section-header">
            <div class="section-tag">How It Works</div>
            <h2 class="section-title">Frictionless, closed-loop campus discovery.</h2>
            <p class="section-desc">Designed so finding an item takes seconds, and returning it feels natural.</p>
          </div>

          <div class="how-it-works-grid">
            <div class="step-card">
              <div class="step-number">1</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">Verify Campus Email</h3>
              <p style="font-size: 13.5px; line-height: 1.5;">
                Gated to verified @greatlakes.edu.in students. Optional campus ID upload unlocks the Verified Seller badge.
              </p>
            </div>

            <div class="step-card">
              <div class="step-number">2</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">Post or Browse</h3>
              <p style="font-size: 13.5px; line-height: 1.5;">
                List idle gear in under 60 seconds. Filter live by Borrow, Buy, or Give Away tags.
              </p>
            </div>

            <div class="step-card">
              <div class="step-number">3</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">Coordinate Handoff</h3>
              <p style="font-size: 13.5px; line-height: 1.5;">
                One-tap request with instant terms, return deadline confirmation, and scripted hostel chat.
              </p>
            </div>

            <div class="step-card">
              <div class="step-number">4</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">Return & Rate</h3>
              <p style="font-size: 13.5px; line-height: 1.5;">
                Condition checks and peer thumbs up/down ratings build a transparent trust score on your profile.
              </p>
            </div>
          </div>
        </section>

        <!-- Persona Testimonials -->
        <section style="margin-bottom: 70px;">
          <div class="section-header">
            <div class="section-tag">Built for Campus Personas</div>
            <h2 class="section-title">Designed for real MBA workflows.</h2>
            <p class="section-desc">Carried directly from innovation research into our product architecture.</p>
          </div>

          <div class="persona-grid">
            <div class="persona-card">
              <div>
                <div class="persona-header">
                  <img src="${MOCK_USERS[1].avatar}" class="persona-avatar" alt="Jean R." />
                  <div>
                    <div class="persona-name">Jean R.</div>
                    <div class="persona-role">Passive Idle Owner · Supply</div>
                  </div>
                </div>
                <div class="persona-quote">
                  "I listed my TI-84 calculator once and let juniors come to me. The return-by date means I don't have to chase anyone before exams."
                </div>
              </div>
              <span class="badge badge-borrow" style="align-self: flex-start;">${Icons.shieldCheck(14)} Verified Lender</span>
            </div>

            <div class="persona-card">
              <div>
                <div class="persona-header">
                  <img src="${MOCK_USERS[0].avatar}" class="persona-avatar" alt="Haripriya M." />
                  <div>
                    <div class="persona-name">Haripriya M.</div>
                    <div class="persona-role">Seeker · Short-term Demand</div>
                  </div>
                </div>
                <div class="persona-quote">
                  "Instead of buying a new blazer for our mock placement round, I found one in my exact size in Hostel 3 in two clicks."
                </div>
              </div>
              <span class="badge badge-borrow" style="align-self: flex-start;">${Icons.check(14)} Active Borrower</span>
            </div>

            <div class="persona-card">
              <div>
                <div class="persona-header">
                  <img src="${MOCK_USERS[2].avatar}" class="persona-avatar" alt="Thirupathi M." />
                  <div>
                    <div class="persona-name">Thirupathi M.</div>
                    <div class="persona-role">Bulk Reseller · Proactive Commerce</div>
                  </div>
                </div>
                <div class="persona-quote">
                  "Having an opt-in marketplace with the Verified Seller badge means I don't spam cohort groups with wholesale essentials."
                </div>
              </div>
              <span class="badge badge-verified-seller" style="align-self: flex-start;">${Icons.sparkles(12, '#FFFFFF')} Verified Seller</span>
            </div>
          </div>
        </section>

        <!-- Final CTA Banner -->
        <section class="card" style="background: linear-gradient(135deg, #1E1B2E 0%, #312866 100%); color: #FFFFFF; text-align: center; padding: 48px 24px; border: none; margin-bottom: 40px;">
          <h2 style="color: #FFFFFF; font-size: clamp(26px, 4vw, 36px); margin-bottom: 14px;">
            Ready to explore the Peerly campus marketplace?
          </h2>
          <p style="color: #D1CFE3; max-width: 600px; margin: 0 auto 28px auto; font-size: 16px;">
            Experience the live clickable prototype with pre-seeded listings, simulated onboarding, and real-time state updates.
          </p>
          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
            <a href="#/feed" class="btn btn-primary btn-lg" style="background: var(--color-primary);">
              ${Icons.search(18)} Open Campus Feed
            </a>
            <a href="#/onboarding" class="btn btn-secondary btn-lg" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3); color: #FFFFFF;">
              ${Icons.shieldCheck(18, '#FFFFFF')} Test Onboarding Flow
            </a>
          </div>
        </section>
      </div>
    `;
  },

  afterRender() {
    // Any event bindings if necessary
  }
};
