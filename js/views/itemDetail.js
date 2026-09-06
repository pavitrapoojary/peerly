// js/views/itemDetail.js - Item Detail View with Simulated Request & Scripted Chat

const ItemDetailView = {
  render(itemId) {
    const item = appState.listings.find(l => l.id === itemId) || appState.listings[0];
    const owner = appState.getUserById(item.ownerId);
    const isAvailable = item.status === "available";
    const isBorrowedByMe = appState.activeBorrows.some(b => b.listingId === item.id);

    let modeBadgeClass = "badge-borrow";
    let modeLabel = "Share / Borrow";
    let ctaButtonText = "Request to Borrow";
    let ctaButtonClass = "btn-teal";

    if (item.mode === "sell") {
      modeBadgeClass = "badge-sell";
      modeLabel = "Campus Resale";
      ctaButtonText = `Buy for ₹${item.price}`;
      ctaButtonClass = "btn-pink";
    } else if (item.mode === "give") {
      modeBadgeClass = "badge-give";
      modeLabel = "Free Giveaway";
      ctaButtonText = "Claim Free Item";
      ctaButtonClass = "btn-primary";
    }

    return `
      <div class="main-container">
        <div class="item-detail-container">
          <!-- Back Link -->
          <div class="btn-back" onclick="Router.navigate('#/feed')">
            ${Icons.arrowLeft(18)} Back to Campus Feed
          </div>

          <div class="item-detail-layout">
            <!-- Left: Photo Gallery & Badges -->
            <div class="detail-gallery">
              <img src="${item.photoUrl}" class="detail-img" alt="${item.title}" />
              
              <div class="item-tag-overlay">
                <span class="badge ${modeBadgeClass}">${modeLabel}</span>
                ${item.isMultipleUnits ? `<span class="badge badge-verified-seller">Verified Seller Batch</span>` : ''}
              </div>

              <div class="item-status-overlay">
                <span class="badge ${isAvailable ? 'badge-available' : 'badge-borrowed'}">
                  ${isAvailable ? 'Available' : (item.mode === 'sell' ? 'Sold' : 'Borrowed')}
                </span>
              </div>
            </div>

            <!-- Right: Details & Action Flow -->
            <div class="detail-info">
              <div class="detail-header-tags">
                <span class="badge" style="background: var(--color-surface-alt); color: var(--color-text-secondary);">
                  ${item.category}
                </span>
                <span style="font-size: 13px; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px;">
                  ${Icons.clock(13)} Posted ${item.createdAt}
                </span>
              </div>

              <h1 class="detail-title">${item.title}</h1>

              <!-- Owner Profile Card -->
              <div class="detail-owner-card">
                <div class="owner-profile-left">
                  <img src="${owner?.avatar || MOCK_USERS[0].avatar}" class="owner-avatar-lg" alt="${owner?.name}" />
                  <div>
                    <div style="font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 6px;">
                      ${owner?.name}
                      ${owner?.verified ? `<span title="Verified Student" style="color: var(--color-secondary);">${Icons.shieldCheck(15)}</span>` : ''}
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">${owner?.role || 'PGPM Batchmate'}</div>
                  </div>
                </div>

                <div style="text-align: right;">
                  <div style="font-size: 13px; font-weight: 700; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px; justify-content: flex-end;">
                    <span style="color: var(--color-primary);">${Icons.thumbsUp(14)}</span>
                    ${owner?.rating ? `${owner.rating.up} · 100%` : 'New'}
                  </div>
                  <div style="font-size: 11px; color: var(--color-text-muted);">Trust Score</div>
                </div>
              </div>

              <!-- Location & Condition -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                <div style="background: var(--color-surface-alt); padding: 10px 14px; border-radius: var(--radius-md);">
                  <div style="font-size: 11px; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Location</div>
                  <div style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                    ${Icons.mapPin(14, 'var(--color-primary)')} ${item.location}
                  </div>
                </div>

                <div style="background: var(--color-surface-alt); padding: 10px 14px; border-radius: var(--radius-md);">
                  <div style="font-size: 11px; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Condition</div>
                  <div style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                    ${Icons.sparkles(14, 'var(--color-secondary)')} ${item.condition}
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div style="margin-bottom: 20px;">
                <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 6px;">About this item</h3>
                <p style="font-size: 14.5px; line-height: 1.55; color: var(--color-text-primary);">
                  ${item.description}
                </p>
              </div>

              <!-- Terms Box -->
              <div class="detail-terms-box">
                <div style="font-weight: 700; font-size: 13px; color: #8A5800; margin-bottom: 4px;">
                  ${item.mode === 'share' ? 'Borrowing Terms & Accountability' : item.mode === 'sell' ? 'Purchase & Handover Terms' : 'Giveaway Terms'}
                </div>
                <div style="color: #4A3E26;">
                  ${item.terms}
                </div>
              </div>

              <!-- Action Card (Dynamic State) -->
              <div id="item-action-card-container">
                ${this.renderActionCard(item, isAvailable, isBorrowedByMe, ctaButtonText, ctaButtonClass)}
              </div>

              <!-- Low-visibility report link (§5.6) -->
              <div style="text-align: center; margin-top: 24px;">
                <button class="btn btn-ghost btn-sm" onclick="Modal.openReportModal('${item.id}')" style="font-size: 12px; color: var(--color-text-muted);">
                  ${Icons.flag(12)} Report an issue with this listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderActionCard(item, isAvailable, isBorrowedByMe, ctaButtonText, ctaButtonClass) {
    if (isBorrowedByMe) {
      return `
        <div class="card" style="background: var(--color-secondary-light); border-color: var(--color-secondary); padding: 18px; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 700; color: #177260; font-size: 16px; margin-bottom: 6px;">
            ${Icons.checkCircle(20, '#2DBFA0')} You are currently borrowing this!
          </div>
          <p style="font-size: 13.5px; color: #1E4E44; margin-bottom: 14px;">
            ${item.returnBy ? `Return by: <strong>${item.returnBy}</strong>` : 'Return due soon'}
          </p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-teal btn-sm" onclick="Modal.openChatDrawer('${item.id}')">
              ${Icons.messageSquare(16)} Open Chat
            </button>
            <button class="btn btn-secondary btn-sm" onclick="Modal.openConditionRatingModal('${item.id}', () => Router.renderCurrentRoute())">
              ${Icons.check(16)} Mark as Returned
            </button>
          </div>
        </div>
      `;
    }

    if (!isAvailable) {
      return `
        <div class="card" style="background: var(--color-surface-alt); padding: 18px; text-align: center;">
          <div style="font-weight: 700; color: var(--color-text-secondary); margin-bottom: 6px;">
            This item is currently ${item.status === 'sold' ? 'sold' : 'checked out by another student'}.
          </div>
          <button class="btn btn-secondary btn-sm" onclick="Modal.openChatDrawer('${item.id}')">
            ${Icons.messageSquare(16)} Ask Owner about next availability
          </button>
        </div>
      `;
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button id="btn-request-item" class="btn ${ctaButtonClass} btn-full btn-lg" data-id="${item.id}">
          ${ctaButtonText}
        </button>

        <button class="btn btn-secondary btn-full" onclick="Modal.openChatDrawer('${item.id}')">
          ${Icons.messageSquare(16)} Message Owner to Ask a Question
        </button>
      </div>
    `;
  },

  afterRender(itemId) {
    const requestBtn = document.getElementById("btn-request-item");
    if (requestBtn) {
      requestBtn.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        const listingId = btn.dataset.id;

        btn.disabled = true;
        btn.innerHTML = `<span style="display:inline-block;animation:spin 1s linear infinite;">⏳</span> Confirming with batchmate...`;

        setTimeout(() => {
          const updated = appState.requestListing(listingId);
          Toast.success("Request accepted by owner! 🎉");
          
          // Re-render action card container
          const container = document.getElementById("item-action-card-container");
          if (container) {
            container.innerHTML = `
              <div class="card" style="background: #FFFFFF; border: 2px solid var(--color-secondary); padding: 20px; text-align: center; animation: toastIn 0.3s ease forwards;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-secondary-light); color: var(--color-secondary); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px auto;">
                  ${Icons.checkCircle(28)}
                </div>
                <h3 style="font-size: 18px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px;">
                  Request Accepted!
                </h3>
                <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 16px;">
                  ${updated.mode === 'share' ? `Return scheduled for: <strong>${updated.returnBy}</strong>` : 'Pickup coordinated at ' + updated.location}
                </p>

                <div style="display: flex; gap: 10px; justify-content: center;">
                  <button class="btn btn-primary btn-full" onclick="Modal.openChatDrawer('${updated.id}')">
                    ${Icons.messageSquare(16)} Open Chat to Coordinate Pickup
                  </button>
                </div>
              </div>
            `;
          }
        }, 550);
      });
    }
  }
};
