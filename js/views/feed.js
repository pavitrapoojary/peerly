// js/views/feed.js - Marketplace Feed with Dual Tabs (Browse Items vs. Campus Needs) (§3.1)

const FeedView = {
  render() {
    const currentTab = appState.marketplaceTab || "browse";
    const items = appState.getFilteredListings();
    const needs = appState.getFilteredNeeds();
    const selectedMode = appState.selectedMode || "all";
    const selectedCategory = appState.selectedCategory || "all";
    const searchQuery = appState.searchQuery || "";
    const campus = appState.selectedCampus || MOCK_CAMPUSES[0];

    return `
      <div class="main-container">
        <!-- Feed Header -->
        <div class="feed-header">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge badge-borrow" style="font-size: 11px;">Things Pillar</span>
                <span style="font-size: 12.5px; color: var(--color-text-secondary);">${campus.name.split('(')[0].trim()}</span>
              </div>
              <h1 style="font-size: 28px; font-weight: 700;">Campus Marketplace</h1>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="btn btn-secondary btn-sm" onclick="Modal.openCreateNeedModal()" style="border-color: var(--color-accent-amber); color: #B36B00;">
                ${Icons.plus(15, '#B36B00')} Post a Need
              </button>
              <a href="#/new-listing" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                ${Icons.plus(15)} Post an Item
              </a>
            </div>
          </div>

          <!-- Dual Primary Tabs: Browse Items vs Campus Needs (§3.1) -->
          <div class="marketplace-main-tabs">
            <button class="market-tab-btn ${currentTab === 'browse' ? 'active' : ''}" id="tab-btn-browse">
              ${Icons.layers(16)} Browse Available Items (${appState.listings.length})
            </button>
            <button class="market-tab-btn ${currentTab === 'needs' ? 'active' : ''}" id="tab-btn-needs">
              ${Icons.helpCircle(16)} Campus Needs (Looking For) (${appState.needs.length})
              <span class="tab-highlight-dot"></span>
            </button>
          </div>

          <!-- Live Search Bar -->
          <div class="feed-search-bar" style="margin-top: 16px;">
            <span class="search-icon-inside">${Icons.search(20)}</span>
            <input 
              type="text" 
              id="feed-search-input" 
              class="search-input" 
              placeholder="${currentTab === 'browse' ? 'Search blazers, TI-84 calculators, notes, badminton gear...' : 'Search what batchmates are looking for (speakers, suits, adapters)...'}" 
              value="${searchQuery}" 
              autocomplete="off"
            />
            ${searchQuery ? `
              <button id="clear-search-btn" class="btn btn-ghost btn-sm" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); padding: 4px; border-radius: 50%;">
                ${Icons.x(16)}
              </button>
            ` : ''}
          </div>

          <!-- Mode Filters (Only in Browse Tab) -->
          ${currentTab === 'browse' ? `
            <div class="filters-row" style="margin-top: 14px;">
              <div class="mode-chips">
                <button class="chip-btn ${selectedMode === 'all' ? 'active' : ''}" data-mode="all">
                  ${Icons.layers(14)} All (${appState.listings.length})
                </button>
                <button class="chip-btn ${selectedMode === 'share' ? 'active' : ''}" data-mode="share" style="${selectedMode === 'share' ? 'background: var(--color-secondary); border-color: var(--color-secondary);' : ''}">
                  ${Icons.briefcase(14)} Borrow & Share
                </button>
                <button class="chip-btn ${selectedMode === 'sell' ? 'active' : ''}" data-mode="sell" style="${selectedMode === 'sell' ? 'background: var(--color-accent-pink); border-color: var(--color-accent-pink);' : ''}">
                  ${Icons.tag(14)} Buy & Sell
                </button>
                <button class="chip-btn ${selectedMode === 'give' ? 'active' : ''}" data-mode="give" style="${selectedMode === 'give' ? 'background: var(--color-accent-amber); border-color: var(--color-accent-amber);' : ''}">
                  ${Icons.heartHandshake(14)} Give Away (Free)
                </button>
              </div>
            </div>
          ` : `
            <!-- Needs Context Header Banner -->
            <div class="need-explainer-banner">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--color-accent-amber);">${Icons.lightbulb(20)}</span>
                <div>
                  <strong>Surface Hidden Supply:</strong> Batchmates often have idle items they haven't listed. See someone asking for something you own? Tap <strong>"I Have This"</strong> to lend or sell!
                </div>
              </div>
            </div>
          `}

          <!-- Category Pill Buttons -->
          <div class="category-scroll" style="margin-top: 14px;">
            ${MOCK_CATEGORIES.map(cat => `
              <button class="category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
                ${cat.icon && Icons[cat.icon] ? Icons[cat.icon](14) : ''}
                ${cat.label}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Tab Content Display -->
        ${currentTab === 'browse' ? `
          <!-- Items Grid or Empty State -->
          ${items.length > 0 ? `
            <div class="item-grid">
              ${items.map(item => this.renderItemCard(item)).join("")}
            </div>
          ` : this.renderEmptyState('items')}
        ` : `
          <!-- Needs Grid or Empty State (§3.1) -->
          ${needs.length > 0 ? `
            <div class="needs-grid">
              ${needs.map(need => this.renderNeedCard(need)).join("")}
            </div>
          ` : this.renderEmptyState('needs')}
        `}

        <!-- Floating Action Button (+ Post Item / Need) -->
        <div class="fab-post-group">
          <button class="fab-post" onclick="Modal.openCreateNeedModal()" style="background: #E88813;" title="Post a Need / Looking for">
            ${Icons.helpCircle(18)}
            <span>I Need This</span>
          </button>
          <a href="#/new-listing" class="fab-post" title="List an Item">
            ${Icons.plus(18)}
            <span>Post an Item</span>
          </a>
        </div>
      </div>
    `;
  },

  renderItemCard(item) {
    const owner = appState.getUserById(item.ownerId);
    const isAvailable = item.status === "available";

    let modeBadgeClass = "badge-borrow";
    let modeText = "BORROW";
    if (item.mode === "sell") {
      modeBadgeClass = "badge-sell";
      modeText = "BUY";
    } else if (item.mode === "give") {
      modeBadgeClass = "badge-give";
      modeText = "FREE";
    }

    let statusBadgeClass = isAvailable ? "badge-available" : "badge-borrowed";
    let statusText = isAvailable ? "Available" : (item.mode === "sell" ? "Sold" : "Borrowed");

    return `
      <div class="item-card" onclick="Router.navigate('#/item/${item.id}')">
        <div class="item-image-wrapper">
          <img src="${item.photoUrl}" class="item-img" alt="${item.title}" loading="lazy" />
          
          <div class="item-tag-overlay">
            <span class="badge ${modeBadgeClass}">${modeText}</span>
            ${item.isMultipleUnits ? `<span class="badge badge-verified-seller">Bulk</span>` : ''}
          </div>

          <div class="item-status-overlay">
            <span class="badge ${statusBadgeClass}">${statusText}</span>
          </div>
        </div>

        <div class="item-content">
          <div class="item-meta-top">
            <span>${item.category}</span>
            <span>${item.createdAt}</span>
          </div>

          <h3 class="item-title">${item.title}</h3>
          <p class="item-desc-snippet">${item.description}</p>

          <div class="item-footer">
            <div class="item-price-or-mode">
              ${item.mode === 'sell' ? `₹${item.price}` : item.mode === 'give' ? 'Free Gift' : 'Borrow / Lend'}
            </div>

            <div class="item-owner-info">
              <img src="${owner?.avatar || MOCK_USERS[0].avatar}" class="item-owner-avatar" alt="${owner?.name}" />
              <span>${owner?.name?.split(' ')[0] || 'User'}</span>
              ${owner?.verified ? `<span style="color: var(--color-secondary);" title="Verified Student">${Icons.shieldCheck(14)}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderNeedCard(need) {
    const seeker = appState.getUserById(need.seekerId);
    let termsLabel = "Borrow Only";
    if (need.terms === "willing-to-pay") termsLabel = need.budget ? `Willing to Pay (${need.budget})` : "Willing to Pay";
    else if (need.terms === "either") termsLabel = "Borrow or Buy";

    return `
      <div class="need-card">
        <div class="need-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-need-pill">🙋 LOOKING FOR</span>
            <span class="badge" style="background: var(--color-surface-alt); font-size: 11px;">${need.category}</span>
          </div>
          <span style="font-size: 12px; color: var(--color-text-muted);">${need.createdAt}</span>
        </div>

        <h3 class="need-card-title">${need.title}</h3>
        <p class="need-card-desc">${need.description}</p>

        <div class="need-info-row">
          <div class="need-info-chip">
            ${Icons.clock(13, '#B36B00')}
            <span>Needed by: <strong>${need.neededBy}</strong></span>
          </div>
          <div class="need-info-chip">
            ${Icons.tag(13, '#B36B00')}
            <span>Terms: <strong>${termsLabel}</strong></span>
          </div>
          <div class="need-info-chip">
            ${Icons.mapPin(13, '#B36B00')}
            <span>Location: <strong>${need.location}</strong></span>
          </div>
        </div>

        <div class="need-card-footer">
          <div class="need-seeker-info">
            <img src="${seeker?.avatar || MOCK_USERS[0].avatar}" class="item-owner-avatar" alt="${seeker?.name}" />
            <div>
              <div style="font-weight: 700; font-size: 13px; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px;">
                ${seeker?.name}
                ${seeker?.verified ? `<span style="color: var(--color-secondary);">${Icons.shieldCheck(13)}</span>` : ''}
              </div>
              <div style="font-size: 11px; color: var(--color-text-secondary);">${seeker?.role || 'PGPM Batchmate'}</div>
            </div>
          </div>

          <button class="btn btn-teal btn-sm" onclick="FeedView.handleRespondToNeed('${need.id}')" style="background: #E88813; border-color: #E88813; color: #FFFFFF;">
            ${Icons.handshake(15)} I Have This!
          </button>
        </div>
      </div>
    `;
  },

  handleRespondToNeed(needId) {
    const need = appState.respondToNeed(needId);
    if (!need) return;
    const seeker = appState.getUserById(need.seekerId);
    Toast.success(`Chat opened with ${seeker.name.split(' ')[0]} to coordinate handoff! 👋`);
    Modal.openChatDrawer(need.id, `Need: ${need.title}`, "LOOKING FOR");
  },

  renderEmptyState(type = 'items') {
    return `
      <div class="empty-state">
        <div class="empty-icon">
          ${Icons.search(32)}
        </div>
        <h3 style="font-size: 20px; margin-bottom: 8px; font-weight: 700;">
          ${type === 'items' ? 'No items found' : 'No open needs found'}
        </h3>
        <p style="font-size: 14px; margin-bottom: 20px;">
          ${type === 'items' 
            ? "We couldn't find any available items matching your filter. Try another term or post a Need!" 
            : "No active campus requests matching your filter. Be the first to ask!"}
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">
            Reset Filters
          </button>
          ${type === 'items' ? `
            <a href="#/new-listing" class="btn btn-primary btn-sm">
              ${Icons.plus(16)} Post This Item
            </a>
          ` : `
            <button class="btn btn-primary btn-sm" onclick="Modal.openCreateNeedModal()" style="background: #E88813; border-color: #E88813;">
              ${Icons.plus(16)} Post a Need
            </button>
          `}
        </div>
      </div>
    `;
  },

  afterRender() {
    // Tab switching
    document.getElementById("tab-btn-browse")?.addEventListener("click", () => {
      appState.setMarketplaceTab("browse");
    });
    document.getElementById("tab-btn-needs")?.addEventListener("click", () => {
      appState.setMarketplaceTab("needs");
    });

    // Search input handler
    const searchInput = document.getElementById("feed-search-input");
    searchInput?.addEventListener("input", (e) => {
      appState.setSearchQuery(e.target.value);
    });

    document.getElementById("clear-search-btn")?.addEventListener("click", () => {
      appState.setSearchQuery("");
      const input = document.getElementById("feed-search-input");
      if (input) input.value = "";
    });

    // Mode chips handlers
    document.querySelectorAll(".chip-btn").forEach(chip => {
      chip.addEventListener("click", () => {
        appState.setSelectedMode(chip.dataset.mode);
      });
    });

    // Category pill handlers
    document.querySelectorAll(".category-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.setSelectedCategory(btn.dataset.category);
      });
    });

    // Reset filters button in empty state
    document.getElementById("btn-reset-filters")?.addEventListener("click", () => {
      appState.setSearchQuery("");
      appState.setSelectedCategory("all");
      appState.setSelectedMode("all");
    });
  }
};
