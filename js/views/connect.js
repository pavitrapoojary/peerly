// js/views/connect.js - Connect Networking & Peer Pairing Hub (§3.2)

const ConnectView = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const peopleLikeYou = appState.getPeopleLikeYou();
    const peopleToLearnFrom = appState.getPeopleToLearnFrom();
    const isPairingOptedIn = !!appState.peerPairingOptIn;
    const activePairing = appState.activePairing || MOCK_PAIRINGS[0];
    const pairedPartner = appState.getUserById(activePairing.partnerId);

    return `
      <div class="main-container">
        <!-- Connect Header -->
        <div class="connect-header">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge" style="background: var(--color-accent-blue-light); color: var(--color-accent-blue); font-size: 11px;">
                  Skills & Networking Pillar
                </span>
                <span style="font-size: 12.5px; color: var(--color-text-secondary);">${user.campus?.split('(')[0] || 'Campus'}</span>
              </div>
              <h1 style="font-size: 28px; font-weight: 700;">Peer Connect & Pairing</h1>
              <p style="font-size: 14px; color: var(--color-text-secondary); max-width: 600px; margin-top: 4px;">
                Discover peers in your cohort, swap skills, and meet batchmates worth knowing without awkward networking friction.
              </p>
            </div>

            <!-- Profile Tags Quick Edit Trigger -->
            <button class="btn btn-secondary btn-sm" onclick="Modal.openEditProfileTagsModal()" style="border-color: var(--color-accent-blue); color: var(--color-accent-blue);">
              ${Icons.sparkles(14, 'var(--color-accent-blue)')} Edit My Skills & Interests
            </button>
          </div>

          <!-- Current User Tag Summary Pill Strip -->
          <div class="user-interests-summary-bar" style="margin-top: 18px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">
              Matching On:
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
              <span class="badge badge-verified" style="font-size: 11px;">${user.batch || 'PGP 2026'}</span>
              ${(user.background || []).map(bg => `<span class="badge" style="background: #E8EEF8; color: #2B5797; font-size: 11px;">${bg}</span>`).join("")}
              <span style="color: var(--color-text-muted); font-size: 11px; margin: 0 4px;">· Looking to learn:</span>
              ${(user.interests || []).slice(0, 3).map(int => `<span class="badge" style="background: var(--color-primary-light); color: var(--color-primary); font-size: 11px;">${int}</span>`).join("")}
            </div>
          </div>
        </div>

        <!-- 1. Zero-Effort Peer Pairing ("Coffee Roulette") Card (§3.2c) -->
        <section class="peer-pairing-hero-card" style="margin-bottom: 36px;">
          <div class="pairing-card-glow"></div>
          <div class="pairing-content-layout">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(255,255,255,0.2); color: #FFFFFF; font-size: 11px;">
                  ${Icons.coffee(13, '#FFFFFF')} ZERO-EFFORT NETWORKING
                </span>
                <span style="font-size: 12px; color: #E0E7FF;">Biweekly Cohort Roulette</span>
              </div>
              
              <h2 style="font-size: 22px; color: #FFFFFF; font-weight: 700; margin-bottom: 6px;">
                Peer Pairing ("Coffee Roulette")
              </h2>
              <p style="font-size: 13.5px; color: #D1D5DB; line-height: 1.5; max-width: 520px; margin-bottom: 16px;">
                Every two weeks, we automatically pair you with 1–2 batchmates you haven't met yet with a shared icebreaker. No planning needed — just show up!
              </p>

              <!-- Opt-In Toggle & Next Date -->
              <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                <label class="pairing-toggle-label">
                  <input type="checkbox" id="toggle-peer-pairing" ${isPairingOptedIn ? 'checked' : ''} onchange="ConnectView.handleTogglePairing(this.checked)" />
                  <span class="pairing-toggle-slider"></span>
                  <span style="font-size: 13px; font-weight: 700; color: #FFFFFF; margin-left: 8px;">
                    ${isPairingOptedIn ? "✓ Enrolled in Peer Pairing" : "Paused"}
                  </span>
                </label>

                <span style="font-size: 12px; color: #93C5FD;">
                  Next cycle: <strong>${activePairing.date}</strong>
                </span>
              </div>
            </div>

            <!-- Simulation Result Card Box -->
            <div class="pairing-preview-box">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-size: 11px; font-weight: 700; color: #93C5FD; text-transform: uppercase;">
                  This Week's Paired Match
                </span>
                <span class="badge badge-available" style="font-size: 10px;">Simulated</span>
              </div>

              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                <img src="${pairedPartner.avatar}" class="pairing-partner-avatar" alt="${pairedPartner.name}" />
                <div>
                  <div style="font-weight: 700; font-size: 15px; color: #FFFFFF; display: flex; align-items: center; gap: 4px;">
                    ${pairedPartner.name}
                    ${pairedPartner.verified ? `<span style="color: #2DBFA0;">${Icons.shieldCheck(14)}</span>` : ''}
                  </div>
                  <div style="font-size: 12px; color: #93C5FD;">${pairedPartner.role || 'PGPM Batchmate'}</div>
                </div>
              </div>

              <div class="pairing-icebreaker-snippet">
                "${activePairing.icebreaker}"
              </div>

              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn btn-sm btn-primary" onclick="ConnectView.handleSayHi('${pairedPartner.id}', 'Coffee Pairing with ${pairedPartner.name}')" style="background: #FFFFFF; color: #1E1B2E; font-weight: 700; flex: 1;">
                  ${Icons.coffee(14, '#1E1B2E')} Say Hi for Coffee
                </button>
                <button class="btn btn-sm btn-ghost" onclick="ConnectView.handleSimulateNext()" style="color: #FFFFFF; border: 1px solid rgba(255,255,255,0.3);" title="Simulate different pair">
                  ${Icons.repeat(14)}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. "People to Learn From" Rail (§3.2b) -->
        <section style="margin-bottom: 40px;">
          <div class="section-rail-header">
            <div>
              <div class="section-tag" style="color: var(--color-accent-blue); background: var(--color-accent-blue-light);">
                Skills & Cross-Domain Exchange
              </div>
              <h2 style="font-size: 20px; font-weight: 700; margin-top: 2px;">
                People to Learn From
              </h2>
              <p style="font-size: 13.5px; color: var(--color-text-secondary);">
                Peers whose listed skills match your stated learning interests.
              </p>
            </div>
          </div>

          <div class="connect-grid">
            ${peopleToLearnFrom.map(p => this.renderLearnFromCard(p)).join("")}
          </div>
        </section>

        <!-- 3. "People Like You" Rail (§3.2b) -->
        <section style="margin-bottom: 40px;">
          <div class="section-rail-header">
            <div>
              <div class="section-tag" style="color: var(--color-secondary); background: var(--color-secondary-light);">
                Same Cohort & Specialization
              </div>
              <h2 style="font-size: 20px; font-weight: 700; margin-top: 2px;">
                People Like You
              </h2>
              <p style="font-size: 13.5px; color: var(--color-text-secondary);">
                Same batch and overlapping domain backgrounds — perfect for case study groups.
              </p>
            </div>
          </div>

          <div class="connect-grid">
            ${peopleLikeYou.map(p => this.renderPeopleLikeYouCard(p)).join("")}
          </div>
        </section>
      </div>
    `;
  },

  renderLearnFromCard(person) {
    const isConnected = appState.connections.includes(person.id);
    const bgList = person.background || ["General"];
    const matchingSkills = (person.skills || []).slice(0, 3);

    return `
      <div class="profile-connect-card">
        <div class="profile-card-top">
          <img src="${person.avatar}" class="profile-connect-avatar" alt="${person.name}" />
          <div>
            <div style="font-weight: 700; font-size: 15px; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px;">
              ${person.name}
              ${person.verified ? `<span style="color: var(--color-secondary);">${Icons.shieldCheck(14)}</span>` : ''}
            </div>
            <div style="font-size: 12px; color: var(--color-text-secondary);">${person.batch || 'PGP 2026'} · ${bgList.join(", ")}</div>
          </div>
        </div>

        <!-- Intelligent Rationale Pill Box (§3.2b) -->
        <div class="match-reason-box">
          <div style="font-size: 11px; font-weight: 700; color: var(--color-accent-blue); text-transform: uppercase;">
            💡 Why this suggestion:
          </div>
          <div style="font-size: 12.5px; font-weight: 600; color: var(--color-text-primary); margin-top: 2px;">
            ${person.name.split(' ')[0]} (${bgList[0]}) can help with:
          </div>
          <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">
            ${matchingSkills.join(" · ")}
          </div>
        </div>

        <p class="profile-card-bio">${person.bio || 'Happy to connect with batchmates!'}</p>

        <div class="profile-card-footer">
          <button class="btn btn-sm ${isConnected ? 'btn-secondary' : 'btn-teal'} btn-full" onclick="ConnectView.handleSayHi('${person.id}', 'Peer Connect: ${person.name}')" style="${!isConnected ? 'background: var(--color-accent-blue); border-color: var(--color-accent-blue);' : ''}">
            ${isConnected ? `${Icons.messageSquare(14)} Message` : `${Icons.sparkles(14)} Say Hi & Connect`}
          </button>
        </div>
      </div>
    `;
  },

  renderPeopleLikeYouCard(person) {
    const isConnected = appState.connections.includes(person.id);
    const bgList = person.background || ["General"];

    return `
      <div class="profile-connect-card">
        <div class="profile-card-top">
          <img src="${person.avatar}" class="profile-connect-avatar" alt="${person.name}" />
          <div>
            <div style="font-weight: 700; font-size: 15px; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px;">
              ${person.name}
              ${person.verified ? `<span style="color: var(--color-secondary);">${Icons.shieldCheck(14)}</span>` : ''}
            </div>
            <div style="font-size: 12px; color: var(--color-text-secondary);">${person.batch || 'PGP 2026'} · ${bgList.join(", ")}</div>
          </div>
        </div>

        <div style="display: flex; gap: 5px; flex-wrap: wrap; margin: 10px 0;">
          ${(person.skills || []).slice(0, 3).map(s => `
            <span class="badge" style="background: var(--color-surface-alt); font-size: 10.5px;">${s}</span>
          `).join("")}
        </div>

        <p class="profile-card-bio">${person.bio || 'Looking for case study buddies and peer practice.'}</p>

        <div class="profile-card-footer">
          <button class="btn btn-sm ${isConnected ? 'btn-secondary' : 'btn-primary'} btn-full" onclick="ConnectView.handleSayHi('${person.id}', 'Peer Connect: ${person.name}')">
            ${isConnected ? `${Icons.messageSquare(14)} Message` : `${Icons.users(14)} Connect`}
          </button>
        </div>
      </div>
    `;
  },

  handleTogglePairing(optedIn) {
    appState.peerPairingOptIn = optedIn;
    Toast.info(optedIn ? "Enrolled in Peer Pairing! Next pairing in ~2 weeks." : "Peer Pairing paused.");
    Router.renderCurrentRoute();
  },

  handleSimulateNext() {
    const newPairing = appState.simulatePeerPairing();
    const partner = appState.getUserById(newPairing.partnerId);
    Toast.success(`Simulated pairing match with ${partner.name}! ☕`);
    Router.renderCurrentRoute();
  },

  handleSayHi(userId, title) {
    appState.connectWithUser(userId);
    const user = appState.getUserById(userId);
    Toast.success(`Connection request sent to ${user.name.split(' ')[0]}! Opening chat... 👋`);
    Modal.openChatDrawer(userId, title, "CONNECT");
  }
};
