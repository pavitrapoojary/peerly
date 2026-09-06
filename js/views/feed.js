// js/views/feed.js - Home Marketplace Feed with Live Search & Filters

const FeedView = {
  render() {
    const items = appState.getFilteredListings();
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
              <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">Campus Marketplace</h1>
              <p style="font-size: 14px; color: var(--color-text-secondary);">
                Active listings in <strong>${campus.name.split('(')[0].trim()}</strong>
              </p>
            </div>

            <a href="#/new-listing" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
              ${Icons.plus(16)} Post an Item
            </a>
          </div>

          <!-- Live Search Bar -->
          <div class="feed-search-bar">
            <span class="search-icon-inside">${Icons.search(20)}</span>
            <input 
              type="text" 
              id="feed-search-input" 
              class="search-input" 
              placeholder="Search blazers, TI-84 calculators, finance notes, badminton gear, Excel coaching..." 
              value="${searchQuery}" 
              autocomplete="off"
            />
            ${searchQuery ? `
              <button id="clear-search-btn" class="btn btn-ghost btn-sm" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); padding: 4px; border-radius: 50%;">
                ${Icons.x(16)}
              </button>
            ` : ''}
          </div>

          <!-- Mode Filter Chips (Segmented) -->
          <div class="filters-row">
            <div class="mode-chips">
              <button class="chip-btn ${selectedMode === 'all' ? 'active' : ''}" data-mode="all">
                ${Icons.layers(14)} All Listings (${appState.listings.length})
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

          <!-- Category Pill Buttons -->
          <div class="category-scroll">
            ${MOCK_CATEGORIES.map(cat => `
              <button class="category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
                ${cat.icon && Icons[cat.icon] ? Icons[cat.icon](14) : ''}
                ${cat.label}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Items Grid or Empty State -->
        ${items.length > 0 ? `
          <div class="item-grid">
            ${items.map(item => this.renderItemCard(item)).join("")}
          </div>
        ` : this.renderEmptyState()}

        <!-- Floating Action Button (+ Post Item) -->
        <a href="#/new-listing" class="fab-post" title="List an Item in under 60 seconds">
          ${Icons.plus(20)}
          <span>Post an Item</span>
        </a>
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
              ${owner?.isVerifiedSeller ? `<span style="color: var(--color-primary);" title="Verified Seller">${Icons.sparkles(12)}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderEmptyState() {
    return `
      <div class="empty-state">
        <div class="empty-icon">
          ${Icons.search(32)}
        </div>
        <h3 style="font-size: 20px; margin-bottom: 8px; font-weight: 700;">No items found</h3>
        <p style="font-size: 14px; margin-bottom: 20px;">
          We couldn't find any listings matching your search or filters. Try another term or be the first to post!
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">
            Reset Filters
          </button>
          <a href="#/new-listing" class="btn btn-primary btn-sm">
            ${Icons.plus(16)} Post This Item
          </a>
        </div>
      </div>
    `;
  },

  afterRender() {
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
