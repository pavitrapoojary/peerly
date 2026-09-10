// js/views/landing.js - Radically Simplified v2 Landing Page (§2)

const LandingView = {
  render() {
    return `
      <!-- Hero Section (§2.2.1) -->
      <section class="landing-hero">
        <div class="hero-pill">
          ${Icons.sparkles(14, '#5B4FE0')} The Campus Operating System
        </div>

        <h1 class="hero-title">
          Everything campus. <span class="gradient-text">One app.</span>
        </h1>

        <p class="hero-subtitle">
          Buy, sell, or borrow from batchmates. Meet people worth knowing. Find teammates. Never miss a deadline that matters to you.
        </p>

        <div class="hero-cta-group">
          <a href="#/feed" class="btn btn-primary btn-lg">
            ${Icons.sparkles(18)} Get Started (Explore Campus)
          </a>
          <a href="#/onboarding" class="btn btn-secondary btn-lg">
            ${Icons.shieldCheck(18)} Test Onboarding Flow
          </a>
        </div>

        <!-- 4-Pillar Visual Elevator Pitch Strip (§2.2.1) -->
        <div class="hero-pillars-row">
          <a href="#/feed" class="hero-pillar-badge" title="Marketplace">
            <span class="hero-pillar-icon" style="color: var(--color-secondary);">${Icons.tag(16)}</span>
            <span class="hero-pillar-name"><strong>Marketplace</strong> · Borrow / Buy / Give</span>
          </a>
          <a href="#/connect" class="hero-pillar-badge" title="Connect">
            <span class="hero-pillar-icon" style="color: var(--color-accent-blue);">${Icons.users(16)}</span>
            <span class="hero-pillar-name"><strong>Connect</strong> · Meet Batchmates & Swap Skills</span>
          </a>
          <a href="#/community" class="hero-pillar-badge" title="Community Board">
            <span class="hero-pillar-icon" style="color: var(--color-accent-amber);">${Icons.messageCircle(16)}</span>
            <span class="hero-pillar-name"><strong>Community</strong> · Team-Ups & Asks</span>
          </a>
          <a href="#/opportunities" class="hero-pillar-badge" title="Opportunities Radar">
            <span class="hero-pillar-icon" style="color: var(--color-primary);">${Icons.compass(16)}</span>
            <span class="hero-pillar-name"><strong>Opportunities</strong> · Curated Radar</span>
          </a>
        </div>
      </section>

      <div class="main-container" style="padding-top: 20px;">
        <!-- "A Day in Peerly" 4-Beat Story Strip (§2.2.2) -->
        <section style="margin-bottom: 70px;">
          <div class="section-header">
            <div class="section-tag">A Day in Peerly</div>
            <h2 class="section-title">One campus. Four everyday moments.</h2>
            <p class="section-desc">
              How Peerly replaces four chaotic WhatsApp groups and three fragmented apps with one trusted routine.
            </p>
          </div>

          <div class="solution-grid">
            <div class="pillar-card day-beat-card" onclick="Router.navigate('#/feed')">
              <div class="pillar-icon-box" style="background: var(--color-secondary-light); color: var(--color-secondary);">
                ${Icons.briefcase(24)}
              </div>
              <div class="day-beat-pillar">Things · Marketplace</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">"Need a blazer for tomorrow?"</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                Someone two floors up has three in your exact size. Request it in 10 seconds with automatic return accountability.
              </p>
              <div class="day-beat-action">Browse Marketplace →</div>
            </div>

            <div class="pillar-card day-beat-card" onclick="Router.navigate('#/connect')">
              <div class="pillar-icon-box" style="background: var(--color-accent-blue-light); color: var(--color-accent-blue);">
                ${Icons.coffee(24)}
              </div>
              <div class="day-beat-pillar" style="color: var(--color-accent-blue);">Skills · Connect</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">"New to campus?"</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                Meet 2 people in your batch this week. Our zero-effort Peer Pairing sets up coffee and gives you a mutual icebreaker.
              </p>
              <div class="day-beat-action" style="color: var(--color-accent-blue);">Explore Connect →</div>
            </div>

            <div class="pillar-card day-beat-card" onclick="Router.navigate('#/community')">
              <div class="pillar-icon-box" style="background: var(--color-accent-amber-light); color: var(--color-accent-amber);">
                ${Icons.handshake(24)}
              </div>
              <div class="day-beat-pillar" style="color: var(--color-accent-amber);">Help · Community</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">"Short one teammate?"</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                Need a finance modeler for this weekend's case comp? Post on the Community Board and get matched before deadlines.
              </p>
              <div class="day-beat-action" style="color: var(--color-accent-amber);">Open Community Board →</div>
            </div>

            <div class="pillar-card day-beat-card" onclick="Router.navigate('#/opportunities')">
              <div class="pillar-icon-box" style="background: var(--color-primary-light); color: var(--color-primary);">
                ${Icons.target(24)}
              </div>
              <div class="day-beat-pillar" style="color: var(--color-primary);">Knowledge · Opportunities</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">"Never miss a deadline"</h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
                A national case competition tailored to your specialization just opened. We surface it on your radar with closing soon alerts.
              </p>
              <div class="day-beat-action" style="color: var(--color-primary);">View Radar →</div>
            </div>
          </div>
        </section>

        <!-- "Why not just WhatsApp / Jugarr / OLX" Comparison Table (§2.2.3) -->
        <section style="margin-bottom: 70px;">
          <div class="section-header">
            <div class="section-tag">Why Peerly</div>
            <h2 class="section-title">Built for campus density, not generic classifieds.</h2>
            <p class="section-desc">
              Why adding more categories to a marketplace doesn't solve the core student friction.
            </p>
          </div>

          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Feature / Dimension</th>
                  <th style="width: 25%;">Generic Apps (OLX / Jugarr)</th>
                  <th style="width: 25%;">WhatsApp Batch Groups</th>
                  <th style="width: 25%; background: var(--color-primary-light); color: var(--color-primary);">
                    ✨ Peerly v2 Campus OS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Resource Discovery</strong></td>
                  <td>Only tangible items listed for sale; no reverse seeker requests</td>
                  <td>Spam-heavy broadcasts, buried in 5 minutes</td>
                  <td class="highlight-cell">
                    <strong>Searchable items + "Needs" tab</strong> with inline matching nudges
                  </td>
                </tr>
                <tr>
                  <td><strong>Trust & Accountability</strong></td>
                  <td>Strangers, no hostel room verification or return enforcement</td>
                  <td>Social awkwardness, zero tracking of lent gear</td>
                  <td class="highlight-cell">
                    <strong>Gated .edu verification</strong> + return timers & condition rating loops
                  </td>
                </tr>
                <tr>
                  <td><strong>Relationship Graph</strong></td>
                  <td>Transactional only — buyer disappears after purchase</td>
                  <td>Siloed into isolated hostel or section groups</td>
                  <td class="highlight-cell">
                    <strong>Connect networking</strong> with skill-swap matches & zero-effort Peer Pairing
                  </td>
                </tr>
                <tr>
                  <td><strong>Curated Radar</strong></td>
                  <td>None (must search external job boards)</td>
                  <td>Occasional unorganized forwarding of links</td>
                  <td class="highlight-cell">
                    <strong>Daily-curated Opportunities Radar</strong> personalized to your exact interest tags
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- How It Works Section (§2.2.4) -->
        <section style="margin-bottom: 70px;">
          <div class="section-header">
            <div class="section-tag">How It Works</div>
            <h2 class="section-title">Zero friction. Verified trust. Closed loop.</h2>
            <p class="section-desc">Designed so finding what you need takes seconds, and returning it feels natural.</p>
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
              <h3 style="font-size: 17px; margin-bottom: 8px;">Browse, Seek, or Connect</h3>
              <p style="font-size: 13.5px; line-height: 1.5;">
                Borrow idle gear, post a "Need", find hackathon teammates on the Community board, or swap skills on Connect.
              </p>
            </div>

            <div class="step-card">
              <div class="step-number">3</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">Coordinate Handoff</h3>
              <p style="font-size: 13.5px; line-height: 1.5;">
                One-tap request with instant terms, return deadline confirmation, and built-in hostel chat starters.
              </p>
            </div>

            <div class="step-card">
              <div class="step-number">4</div>
              <h3 style="font-size: 17px; margin-bottom: 8px;">Return, Rate & Compound</h3>
              <p style="font-size: 13.5px; line-height: 1.5;">
                Condition checks and peer thumbs up/down ratings build a transparent trust score on your campus profile.
              </p>
            </div>
          </div>
        </section>

        <!-- Final CTA Banner -->
        <section class="card" style="background: linear-gradient(135deg, #1E1B2E 0%, #312866 100%); color: #FFFFFF; text-align: center; padding: 48px 24px; border: none; margin-bottom: 40px; border-radius: var(--radius-xl);">
          <div class="badge badge-borrow" style="margin-bottom: 12px; display: inline-flex;">
            ${Icons.sparkles(12, '#2DBFA0')} Ready to test the v2 prototype?
          </div>
          <h2 style="color: #FFFFFF; font-size: clamp(26px, 4vw, 36px); margin-bottom: 14px;">
            Your campus, fully connected.
          </h2>
          <p style="color: #D1CFE3; max-width: 600px; margin: 0 auto 28px auto; font-size: 15.5px;">
            Experience all four pillars live with pre-seeded campus listings, reverse needs, networking rails, community team-ups, and personalized opportunities radar.
          </p>
          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
            <a href="#/feed" class="btn btn-primary btn-lg" style="background: var(--color-primary);">
              ${Icons.tag(18)} Open Marketplace
            </a>
            <a href="#/connect" class="btn btn-secondary btn-lg" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3); color: #FFFFFF;">
              ${Icons.users(18, '#FFFFFF')} Explore Connect & Pairing
            </a>
          </div>
        </section>
      </div>
    `;
  }
};
