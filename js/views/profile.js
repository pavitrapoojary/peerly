// js/views/profile.js - "My Peerly" Profile & Accountability Hub

const ProfileView = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const isVerifiedSeller = !!user.isVerifiedSeller;
    const activeBorrows = appState.activeBorrows || [];
    const myListings = appState.listings.filter(l => l.ownerId === user.id);

    return `
      <div class="main-container">
        <div style="max-width: 900px; margin: 0 auto;">
          <!-- Profile Card Header -->
          <div class="card" style="padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
              <div style="display: flex; align-items: center; gap: 18px;">
                <img src="${user.avatar}" style="width: 76px; height: 76px; border-radius: 50%; object-fit: cover; border: 3px solid var(--color-primary-light);" alt="${user.name}" />
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
                    ${user.role || 'PGPM Batchmate'} · ${user.campus}
                  </div>
                  <div style="font-size: 13px; color: var(--color-text-muted);">
                    ${user.email}
                  </div>
                </div>
              </div>

              <!-- Trust Score Box -->
              <div style="background: var(--color-surface-alt); border-radius: var(--radius-lg); padding: 14px 20px; text-align: center; border: 1px solid var(--color-border); min-width: 170px;">
                <div style="font-size: 12px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 4px;">Campus Trust Score</div>
                <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; justify-content: center; gap: 6px;">
                  <span>${Icons.thumbsUp(20, 'var(--color-primary)')}</span>
                  <span>${user.rating?.up || 14}</span>
                  <span style="font-size: 14px; font-family: var(--font-sans); color: var(--color-secondary); font-weight: 700; margin-left: 2px;">(100%)</span>
                </div>
                <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;">
                  0 negative ratings recorded
                </div>
              </div>
            </div>

            <!-- Stats Bar -->
            <div style="display: flex; gap: 24px; padding-top: 18px; margin-top: 20px; border-top: 1px solid var(--color-border); flex-wrap: wrap;">
              <div style="font-size: 13.5px;">
                <strong style="color: var(--color-text-primary);">${user.stats?.borrowed || 0}</strong> <span style="color: var(--color-text-secondary);">Items Borrowed</span>
              </div>
              <div style="font-size: 13.5px;">
                <strong style="color: var(--color-text-primary);">${user.stats?.lent || 0}</strong> <span style="color: var(--color-text-secondary);">Items Shared</span>
              </div>
              <div style="font-size: 13.5px;">
                <strong style="color: var(--color-text-primary);">${user.stats?.sold || 0}</strong> <span style="color: var(--color-text-secondary);">Items Resold</span>
              </div>
            </div>
          </div>

          <!-- Accountability Layer: Active Borrows Reminder Card (§5.6) -->
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
                  <div class="card" style="border-left: 5px solid var(--color-secondary); padding: 18px 20px;">
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
                <div style="font-size: 12.5px; margin-top: 2px;">Browse the feed to borrow formal wear, gear, or study notes.</div>
              </div>
            `}
          </div>

          <!-- My Active Listings -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h2 style="font-size: 19px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                ${Icons.tag(18, 'var(--color-primary)')} My Posted Listings
              </h2>
              <a href="#/new-listing" class="btn btn-primary btn-sm">
                ${Icons.plus(14)} + New Listing
              </a>
            </div>

            ${myListings.length > 0 ? `
              <div class="item-grid">
                ${myListings.map(item => FeedView.renderItemCard(item)).join("")}
              </div>
            ` : `
              <div class="card" style="text-align: center; padding: 36px 20px;">
                <div style="font-size: 14.5px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 6px;">
                  You haven't posted any idle items or skills yet.
                </div>
                <p style="font-size: 13.5px; color: var(--color-text-secondary); margin-bottom: 16px;">
                  Listing takes less than 60 seconds with our smart defaults!
                </p>
                <a href="#/new-listing" class="btn btn-primary btn-sm">
                  ${Icons.plus(16)} Post Your First Item
                </a>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  },

  afterRender() {
    // Event bindings if needed
  }
};
