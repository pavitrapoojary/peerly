// js/components/navbar.js - Top Navigation and 4-Pillar Primary Nav for Peerly v2

const Navbar = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const campus = appState.selectedCampus || MOCK_CAMPUSES[0];
    const activeHash = window.location.hash || "#/";

    const isMarketplace = activeHash.startsWith("#/feed") || activeHash.startsWith("#/item") || activeHash.startsWith("#/new-listing");
    const isConnect = activeHash.startsWith("#/connect");
    const isCommunity = activeHash.startsWith("#/community");
    const isOpportunities = activeHash.startsWith("#/opportunities");
    const isProfile = activeHash.startsWith("#/profile");

    return `
      <!-- Top Demo Affordance Bar -->
      <div class="demo-bar">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="demo-bar-badge">${Icons.sparkles(12, '#2DBFA0')} v2 Demo</span>
          <span class="demo-bar-desc">
            Campus Operating System · 4 Pillars · Real client-side state
          </span>
        </div>

        <div class="demo-bar-actions">
          <div class="persona-select-wrapper">
            <span>Persona:</span>
            <select class="persona-select" id="demo-persona-select" onchange="Navbar.handlePersonaChange(this.value)">
              <option value="u_me" ${user.id === 'u_me' ? 'selected' : ''}>Haripriya M. (Seeker / Demand)</option>
              <option value="u_jean" ${user.id === 'u_jean' ? 'selected' : ''}>Jean R. (Finance / Idle Owner)</option>
              <option value="u_meera" ${user.id === 'u_meera' ? 'selected' : ''}>Meera K. (Finance Club Lead)</option>
              <option value="u_thiru" ${user.id === 'u_thiru' ? 'selected' : ''}>Thirupathi M. (Bulk-Reseller)</option>
              <option value="u_rohan" ${user.id === 'u_rohan' ? 'selected' : ''}>Rohan K. (Consulting Lender)</option>
              <option value="u_ananya" ${user.id === 'u_ananya' ? 'selected' : ''}>Ananya D. (Tech & Analytics)</option>
            </select>
          </div>

          <button class="demo-btn-sm" onclick="Modal.openRoadmapModal()">
            ${Icons.layers(14)} Roadmap
          </button>

          <button class="demo-btn-sm" onclick="Navbar.handleResetDemo()">
            ${Icons.repeat(13)} Reset Data
          </button>
        </div>
      </div>

      <!-- Main Navbar & 4-Pillar Tabs -->
      <header class="navbar">
        <div class="nav-container">
          <!-- Brand / Logo -->
          <div style="display: flex; align-items: center; gap: 14px;">
            <a href="#/" class="nav-brand">
              ${Icons.logo(32)}
              <div>
                <div class="nav-brand-title">Peerly</div>
              </div>
            </a>
            
            <!-- Campus Pill Switcher -->
            <button class="campus-pill-btn" onclick="Modal.openCampusSelectModal()" title="Click to switch residential campus">
              <span style="color: var(--color-primary);">${Icons.mapPin(14)}</span>
              <span class="campus-pill-name">${campus.name.split('(')[0].trim()}</span>
            </button>
          </div>

          <!-- 4-Pillar Primary Nav Bar (§5) -->
          <nav class="nav-pillars">
            <a href="#/feed" class="pillar-tab ${isMarketplace ? 'active' : ''}">
              <span class="pillar-icon" style="color: var(--color-secondary);">${Icons.tag(16)}</span>
              <span class="pillar-label">Marketplace</span>
              <span class="pillar-indicator"></span>
            </a>

            <a href="#/connect" class="pillar-tab ${isConnect ? 'active' : ''}">
              <span class="pillar-icon" style="color: var(--color-accent-blue);">${Icons.users(16)}</span>
              <span class="pillar-label">Connect</span>
              <span class="pillar-indicator"></span>
            </a>

            <a href="#/community" class="pillar-tab ${isCommunity ? 'active' : ''}">
              <span class="pillar-icon" style="color: var(--color-accent-amber);">${Icons.messageCircle(16)}</span>
              <span class="pillar-label">Community</span>
              <span class="pillar-indicator"></span>
            </a>

            <a href="#/opportunities" class="pillar-tab ${isOpportunities ? 'active' : ''}">
              <span class="pillar-icon" style="color: var(--color-primary);">${Icons.compass(16)}</span>
              <span class="pillar-label">Opportunities</span>
              <span class="pillar-indicator"></span>
            </a>
          </nav>

          <!-- Right Action & Profile Entry Point -->
          <div class="nav-right-actions">
            <a href="#/new-listing" class="btn-post-nav" title="Post an Item or Seek a Need">
              ${Icons.plus(15)} <span>Post</span>
            </a>

            <a href="#/profile" class="nav-user-pill ${isProfile ? 'active' : ''}" title="My Peerly Profile">
              <img src="${user.avatar}" class="nav-avatar" alt="${user.name}" />
              <div class="nav-user-info-hide-mobile">
                <span class="nav-user-name">${user.name.split(' ')[0]}</span>
                ${user.verified ? `<span style="color: var(--color-secondary);">${Icons.shieldCheck(13)}</span>` : ''}
              </div>
            </a>
          </div>
        </div>
      </header>
    `;
  },

  handlePersonaChange(userId) {
    appState.setPersona(userId);
    Toast.info(`Switched view to persona: ${appState.currentUser.name}`);
    Router.renderCurrentRoute();
  },

  handleResetDemo() {
    appState.resetState();
    Toast.success("Demo state reset to original mock data!");
    Router.renderCurrentRoute();
  }
};
