// js/components/navbar.js - Top Navigation and Demo Control Bar

const Navbar = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const campus = appState.selectedCampus || MOCK_CAMPUSES[0];
    const activeHash = window.location.hash || "#/";

    return `
      <!-- Demo Affordance Bar -->
      <div class="demo-bar">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="demo-bar-badge">${Icons.sparkles(12, '#2DBFA0')} MVP Demo</span>
          <span style="color: #D1CFE3; font-size: 12px; display: none; @media(min-width:600px){display:inline;}">
            Interactive front-end prototype · In-memory state
          </span>
        </div>

        <div class="demo-bar-actions">
          <div class="persona-select-wrapper">
            <span>Persona:</span>
            <select class="persona-select" id="demo-persona-select" onchange="Navbar.handlePersonaChange(this.value)">
              <option value="u_me" ${user.id === 'u_me' ? 'selected' : ''}>Haripriya M. (Seeker / Demand)</option>
              <option value="u_jean" ${user.id === 'u_jean' ? 'selected' : ''}>Jean R. (Idle Owner / Supply)</option>
              <option value="u_thiru" ${user.id === 'u_thiru' ? 'selected' : ''}>Thirupathi M. (Bulk-Reseller)</option>
              <option value="u_rohan" ${user.id === 'u_rohan' ? 'selected' : ''}>Rohan K. (Peer Lender)</option>
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

      <!-- Main Navbar -->
      <header class="navbar">
        <div class="nav-container">
          <div style="display: flex; align-items: center; gap: 16px;">
            <a href="#/" class="nav-brand">
              ${Icons.logo(32)}
              <div>
                <div class="nav-brand-title">Peerly</div>
              </div>
            </a>
            <span class="nav-brand-tagline">Share · Connect · Campus</span>
          </div>

          <!-- Campus Pill Switcher -->
          <button class="campus-pill-btn" onclick="Modal.openCampusSelectModal()" title="Click to switch campus">
            <span style="color: var(--color-primary);">${Icons.mapPin(15)}</span>
            <span style="font-weight: 600;">${campus.name.split('(')[0].trim()}</span>
          </button>

          <!-- Nav Links -->
          <nav class="nav-links">
            <a href="#/feed" class="nav-link ${activeHash.startsWith('#/feed') ? 'active' : ''}">
              ${Icons.search(16)} Browse Feed
            </a>

            <a href="#/new-listing" class="btn-post-nav">
              ${Icons.plus(16)} Post an Item
            </a>

            <a href="#/profile" class="nav-user-pill" title="My Peerly Profile">
              <img src="${user.avatar}" class="nav-avatar" alt="${user.name}" />
              <span class="nav-user-name">${user.name.split(' ')[0]}</span>
              ${user.verified ? `<span style="color: var(--color-secondary);">${Icons.shieldCheck(14)}</span>` : ''}
            </a>
          </nav>
        </div>
      </header>
    `;
  },

  handlePersonaChange(userId) {
    appState.setPersona(userId);
    Toast.info(`Switched view to persona: ${appState.currentUser.name}`);
    Router.navigate(window.location.hash || "#/feed");
  },

  handleResetDemo() {
    appState.resetState();
    Toast.success("Demo state reset to original mock data!");
    Router.navigate("#/feed");
  }
};
