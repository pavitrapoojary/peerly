// js/views/profile.js - "My Peerly" Profile & Accountability Hub for v2

const ProfileView = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const isVerifiedSeller = !!user.isVerifiedSeller;
    const activeBorrows = appState.activeBorrows || [];
    const myListings = appState.listings.filter(l => l.ownerId === user.id);
    const myNeeds = appState.needs.filter(n => n.seekerId === user.id);
    const myConnections = (appState.connections || []).map(id => appState.getUserById(id));
    const isPairingOn = !!appState.peerPairingOptIn;

    return `
      <div class="main-container">
        <div style="max-width: 920px; margin: 0 auto;">
          <!-- Profile Card Header -->
          <div class="card" style="padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden; border-radius: var(--radius-lg);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
              <div style="display: flex; align-items: center; gap: 18px;">
                <img src="${user.avatar}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--color-primary-light);" alt="${user.name}" />
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
                    <h1 style="font-size: 24px; font-weight: 700;">${user.name}</h1>
                    ${user.verified ? `
                      <span class="badge badge-verified" title="Campus Email Verified">
                        ${Icons.shieldCheck(14)} Verified Student
                      </span>
                    ` : ''}
                    ${isVerifiedSeller ? `
                      <span class="badge badge-verified-seller" title="ID-Verified for Bulk Commerce">
                        ${Icons.sparkles(12)} Verified Seller
                      </span>
                    ` : `
                      <button class="btn btn-ghost btn-sm" onclick="NewListingView.handleUnlockVerifiedSeller()" style="font-size: 11px; padding: 2px 8px; border: 1px dashed var(--color-primary); color: var(--color-primary); border-radius: var(--radius-full);">
                        + Unlock Seller Badge
                      </button>
                    `}
                  </div>
                  <div style="font-size: 13.5px; color: var(--color-text-secondary); margin-bottom: 4px;">
                    ${user.role || 'PGPM Batchmate'} · ${user.batch || 'PGP 2026'} · ${user.campus}
                  </div>
                  <div style="font-size: 13px; color: var(--color-text-muted);">
                    ${user.email}
                  </div>
                </div>
              </div>

              <!-- Campus Trust Score -->
              <div style="background: var(--color-surface-alt); border-radius: var(--radius-lg); padding: 14px 20px; text-align: center; border: 1px solid var(--color-border); min-width: 170px;">
                <div style="font-size: 11.5px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 4px;">Campus Trust Score</div>
                <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; justify-content: center; gap: 6px;">
                  <span>${Icons.thumbsUp(20, 'var(--color-primary)')}</span>
                  <span>${user.rating?.up || 14}</span>
                  <span style="font-size: 14px; font-family: var(--font-sans); color: var(--color-secondary); font-weight: 700; margin-left: 2px;">(100%)</span>
                </div>
                <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;">
                  0 complaints recorded
                </div>
              </div>
            </div>

            <!-- Profile Tags & Customization Section (§3.2a) -->
            <div style="margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--color-border);">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                <div style="font-weight: 700; font-size: 14px; color: var(--color-text-primary); display: flex; align-items: center; gap: 6px;">
                  ${Icons.target(16, 'var(--color-primary)')} Specializations, Skills & Interests (Matching Graph)
                </div>
                <button class="btn btn-secondary btn-sm" onclick="Modal.openEditProfileTagsModal()" style="font-size: 12px; padding: 4px 10px;">
                  ${Icons.sparkles(13)} Edit Matching Preferences
                </button>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
                <div style="background: var(--color-surface-alt); padding: 12px 14px; border-radius: var(--radius-md);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 6px;">Background / Domain</div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${(user.background || ["General"]).map(b => `<span class="badge" style="background: #E8EEF8; color: #2B5797; font-size: 11px;">${b}</span>`).join("")}
                  </div>
                </div>

                <div style="background: var(--color-surface-alt); padding: 12px 14px; border-radius: var(--radius-md);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 6px;">Skills I Can Help With</div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${(user.skills || []).map(s => `<span class="badge badge-verified" style="font-size: 11px;">${s}</span>`).join("")}
                  </div>
                </div>

                <div style="background: var(--color-surface-alt); padding: 12px 14px; border-radius: var(--radius-md);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 6px;">Target Radar Interests</div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${(user.interests || []).map(i => `<span class="badge" style="background: var(--color-primary-light); color: var(--color-primary); font-size: 11px;">${i}</span>`).join("")}
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Bar -->
            <div style="display: flex; gap: 24px; padding-top: 16px; margin-top: 16px; border-top: 1px solid var(--color-border); flex-wrap: wrap;">
              <div style="font-size: 13px;">
                <strong style="color: var(--color-text-primary);">${user.stats?.borrowed || 0}</strong> <span style="color: var(--color-text-secondary);">Borrows</span>
              </div>
              <div style="font-size: 13px;">
                <strong style="color: var(--color-text-primary);">${user.stats?.lent || 0}</strong> <span style="color: var(--color-text-secondary);">Items Shared</span>
              </div>
              <div style="font-size: 13px;">
                <strong style="color: var(--color-text-primary);">${user.stats?.sold || 0}</strong> <span style="color: var(--color-text-secondary);">Items Resold</span>
              </div>
              <div style="font-size: 13px;">
                <strong style="color: var(--color-text-primary);">${myConnections.length}</strong> <span style="color: var(--color-text-secondary);">Campus Connections</span>
              </div>
            </div>
          </div>

          <!-- Peer Pairing Status Widget (§3.2c) -->
          <div class="card" style="padding: 18px 22px; margin-bottom: 24px; background: linear-gradient(135deg, #1E1B2E 0%, #2D2754 100%); color: #FFFFFF; border: none; border-radius: var(--radius-lg);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
              <div style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: #93C5FD;">
                  ${Icons.coffee(22, '#93C5FD')}
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 16px; color: #FFFFFF;">
                    Peer Pairing ("Coffee Roulette") Status: ${isPairingOn ? "Active" : "Paused"}
                  </div>
                  <div style="font-size: 12.5px; color: #D1D5DB;">
                    Automatic biweekly networking matches based on shared campus interests.
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 10px; align-items: center;">
                <button class="btn btn-sm btn-ghost" onclick="Modal.openSimulatePairingModal()" style="color: #FFFFFF; border: 1px solid rgba(255,255,255,0.3);">
                  ${Icons.coffee(14)} View Pairing Match
                </button>
              </div>
            </div>
          </div>

          <!-- Active Borrows Reminder Card (§5.6) -->
          <div style="margin-bottom: 30px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h2 style="font-size: 19px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                ${Icons.clock(18, 'var(--color-secondary)')} Active Campus Borrows & Returns
              </h2>
              <span class="badge badge-borrow" style="font-size: 11px;">
                ${activeBorrows.length} Active
              </span>
            </div>

            ${activeBorrows.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 14px;">
                ${activeBorrows.map(borrow => `
                  <div class="card" style="border-left: 5px solid var(--color-secondary); padding: 18px 20px; border-radius: var(--radius-md);">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
                      <div style="display: flex; align-items: center; gap: 14px;">
                        <img src="${borrow.photoUrl}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover;" alt="${borrow.title}" />
                        <div>
                          <div style="font-weight: 700; font-size: 16px; color: var(--color-text-primary);">${borrow.title}</div>
                          <div style="font-size: 13px; color: var(--color-text-secondary); margin-top: 2px;">
                            Borrowed from <strong>${borrow.owner?.name || 'Batchmate'}</strong> (${borrow.location || 'On campus'})
                          </div>
                          <div style="font-size: 12px; color: #177260; font-weight: 600; margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                            ${Icons.clock(12)} Return Due: ${borrow.returnBy}
                          </div>
                        </div>
                      </div>

                      <div style="display: flex; align-items: center; gap: 10px;">
                        <button class="btn btn-secondary btn-sm" onclick="Modal.openChatDrawer('${borrow.listingId}')">
                          ${Icons.messageSquare(14)} Message Owner
                        </button>
                        <button class="btn btn-teal btn-sm" onclick="Modal.openConditionRatingModal('${borrow.listingId}', () => Router.renderCurrentRoute())">
                          ${Icons.check(14)} Mark as Returned
                        </button>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : `
              <div class="card" style="text-align: center; padding: 24px; color: var(--color-text-secondary); background: var(--color-surface-alt);">
                ${Icons.checkCircle(24, 'var(--color-secondary)')}
                <div style="font-weight: 600; margin-top: 6px; font-size: 14px;">No overdue or pending return items!</div>
              </div>
            `}
          </div>

          <!-- Connected Batchmates List -->
          <div style="margin-bottom: 30px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h2 style="font-size: 19px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                ${Icons.users(18, 'var(--color-accent-blue)')} Connected Peers (${myConnections.length})
              </h2>
              <a href="#/connect" class="btn btn-secondary btn-sm">
                ${Icons.plus(13)} Meet More Batchmates
              </a>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
              ${myConnections.map(c => `
                <div class="card" style="padding: 14px; display: flex; align-items: center; justify-content: space-between; border-radius: var(--radius-md);">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${c.avatar}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" alt="${c.name}" />
                    <div>
                      <div style="font-weight: 700; font-size: 14px; color: var(--color-text-primary);">${c.name}</div>
                      <div style="font-size: 11.5px; color: var(--color-text-secondary);">${c.batch || 'PGP 2026'} · ${c.background?.[0] || 'Peer'}</div>
                    </div>
                  </div>
                  <button class="btn btn-ghost btn-sm" onclick="Modal.openChatDrawer('${c.id}', 'Chat with ${c.name}', 'CONNECT')">
                    ${Icons.messageSquare(14)}
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- My Posted Listings & Needs Tabs -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h2 style="font-size: 19px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                ${Icons.tag(18, 'var(--color-primary)')} My Posted Items & Needs
              </h2>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-sm" onclick="Modal.openCreateNeedModal()">
                  + Post Need
                </button>
                <a href="#/new-listing" class="btn btn-primary btn-sm">
                  + New Listing
                </a>
              </div>
            </div>

            ${myListings.length > 0 ? `
              <div class="item-grid" style="margin-bottom: 24px;">
                ${myListings.map(item => FeedView.renderItemCard(item)).join("")}
              </div>
            ` : `
              <div class="card" style="text-align: center; padding: 28px 20px; margin-bottom: 24px;">
                <p style="font-size: 13.5px; color: var(--color-text-secondary);">
                  You haven't posted any idle items for sale or borrow yet.
                </p>
              </div>
            `}

            ${myNeeds.length > 0 ? `
              <div style="margin-top: 18px;">
                <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: #B36B00;">
                  🙋 My Active Needs (${myNeeds.length})
                </h3>
                <div class="needs-grid">
                  ${myNeeds.map(need => FeedView.renderNeedCard(need)).join("")}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
};
