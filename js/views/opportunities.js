// js/views/opportunities.js - Personalized Opportunities Radar (§3.4)

const OpportunitiesView = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const userInterests = user.interests || [];
    const { recommended, allOthers, total } = appState.getPersonalizedOpportunities();
    const selectedCategory = appState.opportunitiesCategory || "all";
    const selectedSource = appState.opportunitiesSource || "all";

    // Filter list based on selected category & source
    const filterOpp = (list) => {
      return list.filter(o => {
        if (selectedCategory !== "all" && o.category !== selectedCategory) return false;
        if (selectedSource !== "all" && o.source !== selectedSource) return false;
        return true;
      });
    };

    const filteredRecommended = filterOpp(recommended);
    const filteredAllOthers = filterOpp(allOthers);

    const categories = ["all", "Case Competitions", "Product Management", "Competitions", "Internships", "Scholarships"];
    const sources = ["all", "Unstop", "LinkedIn Jobs", "Campus Notice Board", "BCG Campus", "Tata Group"];

    return `
      <div class="main-container">
        <!-- Radar Header -->
        <div class="opportunities-header">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge" style="background: var(--color-primary-light); color: var(--color-primary); font-size: 11px;">
                  Knowledge Pillar · Personalized Radar
                </span>
                <span style="font-size: 12.5px; color: var(--color-text-secondary);">${user.campus?.split('(')[0] || 'Campus'}</span>
              </div>
              <h1 style="font-size: 28px; font-weight: 700;">Campus Opportunities Radar</h1>
              <p style="font-size: 14px; color: var(--color-text-secondary); max-width: 620px; margin-top: 4px;">
                Daily curated competitions, hackathons, scholarships, and internships matched to your exact interests.
              </p>
            </div>

            <!-- Edit Tags Button -->
            <button class="btn btn-secondary btn-sm" onclick="Modal.openEditProfileTagsModal()" style="border-color: var(--color-primary); color: var(--color-primary);">
              ${Icons.target(14, 'var(--color-primary)')} Customize My Radar Tags
            </button>
          </div>

          <!-- Radar Match Profile Strip -->
          <div class="radar-preferences-strip" style="margin-top: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 12px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">
                🎯 Your Target Interests:
              </span>
              ${userInterests.map(interest => `
                <span class="badge badge-verified" style="background: var(--color-primary-light); color: var(--color-primary); font-size: 11px; font-weight: 700;">
                  ${interest}
                </span>
              `).join("")}
              <span style="font-size: 12px; color: var(--color-text-secondary); margin-left: 6px;">
                (${filteredRecommended.length} recommended matches)
              </span>
            </div>
            
            <div style="font-size: 11.5px; color: var(--color-text-muted); margin-top: 4px;">
              📡 Daily-curated digest — opportunities automatically scanned and tagged against your profile.
            </div>
          </div>

          <!-- Category & Platform Source Filters -->
          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; align-items: center;">
            <!-- Category Pills -->
            <div class="category-scroll" style="flex: 1;">
              ${categories.map(cat => `
                <button class="category-pill-btn ${selectedCategory === cat ? 'active' : ''}" data-opp-cat="${cat}">
                  ${cat === 'all' ? 'All Categories' : cat}
                </button>
              `).join("")}
            </div>

            <!-- Source Filter Select -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 12px; font-weight: 600; color: var(--color-text-secondary);">Source:</span>
              <select class="form-select" id="opp-source-select" style="padding: 6px 12px; font-size: 12px; width: auto;" onchange="OpportunitiesView.handleSourceChange(this.value)">
                ${sources.map(src => `
                  <option value="${src}" ${selectedSource === src ? 'selected' : ''}>
                    ${src === 'all' ? 'All Sources (Unstop, LinkedIn...)' : src}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>
        </div>

        <!-- 1. Recommended For You Section (§3.4) -->
        <section style="margin-bottom: 40px;">
          <div class="section-rail-header" style="margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
                ${Icons.sparkles(16)}
              </div>
              <div>
                <h2 style="font-size: 20px; font-weight: 700;">Recommended for You</h2>
                <div style="font-size: 12.5px; color: var(--color-text-secondary);">
                  Ranked by tag overlap with your profile (${userInterests.join(", ")})
                </div>
              </div>
            </div>
            <span class="badge badge-verified" style="font-size: 11px;">
              ${filteredRecommended.length} Matches
            </span>
          </div>

          ${filteredRecommended.length > 0 ? `
            <div class="opportunities-grid">
              ${filteredRecommended.map(opp => this.renderOpportunityCard(opp, true)).join("")}
            </div>
          ` : `
            <div class="card" style="padding: 24px; text-align: center; background: var(--color-surface-alt);">
              <p style="font-size: 13.5px; color: var(--color-text-secondary);">
                No recommended opportunities in this specific filter. Try selecting "All Categories" or adjust your interest tags.
              </p>
            </div>
          `}
        </section>

        <!-- 2. All Opportunities Section (§3.4) -->
        <section style="margin-bottom: 40px;">
          <div class="section-rail-header" style="margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-surface-alt); color: var(--color-text-primary); display: flex; align-items: center; justify-content: center;">
                ${Icons.compass(16)}
              </div>
              <div>
                <h2 style="font-size: 20px; font-weight: 700;">All Campus Opportunities</h2>
                <div style="font-size: 12.5px; color: var(--color-text-secondary);">
                  Full directory of active campus challenges and listings
                </div>
              </div>
            </div>
            <span class="badge" style="background: var(--color-surface-alt); font-size: 11px;">
              ${filteredAllOthers.length} Available
            </span>
          </div>

          ${filteredAllOthers.length > 0 ? `
            <div class="opportunities-grid">
              ${filteredAllOthers.map(opp => this.renderOpportunityCard(opp, false)).join("")}
            </div>
          ` : `
            <div class="card" style="padding: 24px; text-align: center; background: var(--color-surface-alt);">
              <p style="font-size: 13.5px; color: var(--color-text-secondary);">
                All active opportunities currently match your profile recommendations above!
              </p>
            </div>
          `}
        </section>
      </div>
    `;
  },

  renderOpportunityCard(opp, isRecommended) {
    // Calculate if closing within 7 days (§3.4)
    const deadlineDate = new Date(opp.deadline);
    const now = new Date();
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isClosingSoon = diffDays >= 0 && diffDays <= 7;

    const formattedDeadline = deadlineDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    return `
      <div class="opportunity-card ${isRecommended ? 'recommended-glow' : ''}">
        <div class="opp-card-header">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <span class="badge" style="background: var(--color-surface-alt); font-size: 11px;">${opp.category}</span>
            <span class="badge" style="background: #FFFFFF; border: 1px solid var(--color-border); font-size: 10.5px; color: var(--color-text-secondary);">
              ${opp.source}
            </span>
          </div>

          ${isClosingSoon ? `
            <span class="badge-closing-soon">
              ${Icons.clock(12, '#C93B37')} Closing Soon (${diffDays}d left)
            </span>
          ` : `
            <span style="font-size: 11.5px; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px;">
              ${Icons.calendar(12)} Due ${formattedDeadline}
            </span>
          `}
        </div>

        <h3 class="opp-title">${opp.title}</h3>
        <div class="opp-organizer">${opp.organizer} · ${opp.eligibility}</div>

        <p class="opp-desc">${opp.description}</p>

        <!-- Prize / Benefit Box -->
        <div class="opp-prize-box">
          <span style="color: #D97706;">${Icons.award(15, '#D97706')}</span>
          <span style="font-weight: 700; font-size: 12.5px; color: #92400E;">${opp.prizePool}</span>
        </div>

        <!-- Tags matching -->
        <div class="opp-tags-row">
          ${(opp.tags || []).map(t => {
            const matchesUser = (appState.currentUser.interests || []).some(i => i.toLowerCase() === t.toLowerCase());
            return `
              <span class="badge ${matchesUser ? 'badge-verified' : ''}" style="font-size: 10.5px; ${matchesUser ? 'background:var(--color-primary-light); color:var(--color-primary); font-weight:700;' : 'background:var(--color-surface-alt);'}">
                ${matchesUser ? '★ ' : ''}${t}
              </span>
            `;
          }).join("")}
        </div>

        <div class="opp-footer-row">
          <a href="${opp.linkUrl}" target="_blank" class="btn btn-primary btn-sm btn-full" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            <span>Apply on ${opp.source}</span>
            ${Icons.externalLink(13)}
          </a>
        </div>
      </div>
    `;
  },

  handleSourceChange(src) {
    appState.opportunitiesSource = src;
    Router.renderCurrentRoute();
  },

  afterRender() {
    document.querySelectorAll("[data-opp-cat]").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.opportunitiesCategory = btn.dataset.oppCat;
        Router.renderCurrentRoute();
      });
    });
  }
};
