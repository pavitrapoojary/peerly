// js/views/newListing.js - Create Item Listing or Post a Need with Inline Matching Nudge (§3.1)

const NewListingView = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const isVerifiedSeller = !!user.isVerifiedSeller;

    return `
      <div class="main-container">
        <div style="max-width: 680px; margin: 0 auto;">
          <!-- Back Link -->
          <div class="btn-back" onclick="Router.navigate('#/feed')">
            ${Icons.arrowLeft(18)} Back to Marketplace
          </div>

          <div class="card" style="padding: 32px 28px; border-radius: var(--radius-lg);">
            <!-- Flow Type Switcher: Item Offer vs Seeker Need -->
            <div style="margin-bottom: 24px;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <span class="badge badge-borrow" style="font-size: 11px;">Fast 60s Flow</span>
                <span style="font-size: 12px; color: var(--color-text-secondary);">Campus Gated Listing</span>
              </div>
              <h1 style="font-size: 26px; font-weight: 700; margin-bottom: 4px;">Post to Campus Network</h1>
              <p style="font-size: 14px; color: var(--color-text-secondary);">
                Choose whether you're offering an idle item/skill or asking for something you need.
              </p>
            </div>

            <!-- Segmented Top Mode: Offer Item vs I Need This (§3.1) -->
            <div class="marketplace-main-tabs" style="margin-bottom: 24px;">
              <button class="market-tab-btn active" id="btn-post-type-offer">
                ${Icons.tag(16)} List Item / Skill (Offer)
              </button>
              <button class="market-tab-btn" id="btn-post-type-need">
                ${Icons.helpCircle(16)} "I Need This" (Seeker Request)
              </button>
            </div>

            <!-- 1. Offer Item Form -->
            <form id="offer-item-form" onsubmit="event.preventDefault();">
              <!-- Photo Selection -->
              <div class="form-group">
                <label class="form-label">Item Photo</label>
                <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 8px;">
                  <div id="preview-photo-box" style="width: 80px; height: 80px; border-radius: var(--radius-md); overflow: hidden; background: #ECEAF4; border: 1.5px solid var(--color-primary); flex-shrink: 0;">
                    <img id="active-photo-img" src="${PRESET_PHOTO_OPTIONS[0].url}" style="width: 100%; height: 100%; object-fit: cover;" alt="Preview" />
                  </div>
                  <div>
                    <div style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary);">Choose a preset photo or select:</div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">Instant high-res photo picker for quick listings</div>
                  </div>
                </div>

                <div class="photo-presets-grid">
                  ${PRESET_PHOTO_OPTIONS.map((opt, idx) => `
                    <div class="preset-photo-thumb ${idx === 0 ? 'selected' : ''}" data-url="${opt.url}" title="${opt.label}">
                      <img src="${opt.url}" alt="${opt.label}" />
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Title -->
              <div class="form-group">
                <label class="form-label" for="listing-title">Listing Title *</label>
                <input 
                  type="text" 
                  id="listing-title" 
                  class="form-input" 
                  placeholder="e.g. Raymond Navy Blazer (Size 40), TI-84 Plus, Fin 1 Binder..." 
                  required 
                  autocomplete="off"
                />
              </div>

              <!-- Category -->
              <div class="form-group">
                <label class="form-label" for="listing-category">Category *</label>
                <select id="listing-category" class="form-select">
                  <option value="Formal Wear">Formal Wear (Suits, Ties, Shoes)</option>
                  <option value="Electronics">Electronics & Calculators</option>
                  <option value="Books & Notes">Books, Cheat Sheets & Case Binders</option>
                  <option value="Sports Gear">Sports & Fitness Equipment</option>
                  <option value="Skills & Coaching">Skills, Mock Interviews & Peer Coaching</option>
                  <option value="Stationery">Stationery & Room Supplies</option>
                  <option value="Bulk Resale">Bulk Resale & Essentials</option>
                </select>
              </div>

              <!-- Segmented Mode Control: Share / Sell / Give Away -->
              <div class="form-group">
                <label class="form-label">Exchange Terms *</label>
                <div class="segmented-control">
                  <button type="button" class="segmented-btn active" data-mode="share" id="mode-share-btn">
                    ${Icons.briefcase(14)} Share (Lend)
                  </button>
                  <button type="button" class="segmented-btn" data-mode="sell" id="mode-sell-btn">
                    ${Icons.tag(14)} Sell
                  </button>
                  <button type="button" class="segmented-btn" data-mode="give" id="mode-give-btn">
                    ${Icons.heartHandshake(14)} Give Away
                  </button>
                </div>
              </div>

              <!-- Dynamic Mode-Specific Fields -->
              <div id="dynamic-mode-fields" style="background: var(--color-surface-alt); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
                <!-- Default Share Fields -->
                <div id="fields-share">
                  <label class="form-label" style="font-size: 13px;">Max Borrow Duration / Return Terms</label>
                  <input type="text" id="share-terms" class="form-input" value="Borrow for up to 3 days (Please return clean)" />
                  <div class="form-hint">Set a return date so batchmates know when you need it back.</div>
                </div>

                <!-- Sell Fields -->
                <div id="fields-sell" style="display: none;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                      <label class="form-label" style="font-size: 13px;">Selling Price (₹) *</label>
                      <input type="number" id="sell-price" class="form-input" placeholder="e.g. 350" />
                    </div>
                    <div>
                      <label class="form-label" style="font-size: 13px;">Original Price (₹)</label>
                      <input type="number" id="sell-original-price" class="form-input" placeholder="e.g. 900" />
                    </div>
                  </div>
                  <div class="form-hint">Payment is settled directly on handoff via UPI / Cash.</div>
                </div>

                <!-- Give Away Fields -->
                <div id="fields-give" style="display: none;">
                  <div style="display: flex; align-items: center; gap: 8px; color: var(--color-accent-amber); font-weight: 600; font-size: 14px;">
                    ${Icons.sparkles(16)} 100% Free Campus Gift
                  </div>
                  <div style="font-size: 13px; color: var(--color-text-secondary); margin-top: 4px;">
                    No return expected. Perfect for passing down notes or donating study materials to juniors!
                  </div>
                </div>
              </div>

              <!-- Multiple Units / Bulk Reseller Toggle -->
              <div class="card" style="background: #FFFFFF; border: 1px solid var(--color-border); padding: 14px 16px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <div style="font-weight: 700; font-size: 14px; color: var(--color-text-primary);">
                      Listing multiple units / bulk inventory?
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">
                      For student distributors or wholesale lots.
                    </div>
                  </div>
                  <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                    <input type="checkbox" id="toggle-multiple-units" style="opacity: 0; width: 0; height: 0;" />
                    <span style="position: absolute; inset: 0; background-color: #CCC; border-radius: 34px; transition: .3s;" id="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Description -->
              <div class="form-group">
                <label class="form-label" for="listing-desc">Description & Usage Notes *</label>
                <textarea 
                  id="listing-desc" 
                  class="form-textarea" 
                  rows="3" 
                  placeholder="Describe condition, size, exam relevance, or pickup preferences..." 
                  required
                ></textarea>
              </div>

              <!-- Location & Condition -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label" for="listing-location">Campus Location</label>
                  <input type="text" id="listing-location" class="form-input" value="Hostel 3, Room 204" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="listing-condition">Condition</label>
                  <select id="listing-condition" class="form-select">
                    <option value="Like New (Mint)">Like New (Mint)</option>
                    <option value="Very Good" selected>Very Good</option>
                    <option value="Good Condition">Good Condition</option>
                    <option value="Gently Used">Gently Used</option>
                    <option value="Brand New (In Box)">Brand New (In Box)</option>
                  </select>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" id="btn-submit-listing" class="btn btn-primary btn-full btn-lg" style="margin-top: 10px;">
                ${Icons.plus(18)} Post Item to Marketplace
              </button>
            </form>

            <!-- 2. "I Need This" Seeker Form (§3.1) -->
            <form id="need-request-form" style="display: none;" onsubmit="event.preventDefault();">
              <div class="form-group">
                <label class="form-label">What item or gear do you need? *</label>
                <input 
                  type="text" 
                  id="seek-need-title" 
                  class="form-input" 
                  placeholder="e.g. Navy Blazer Size 38, TI-84 Calculator, HDMI adapter..." 
                  required 
                  autocomplete="off"
                />
              </div>

              <!-- Inline Match Nudge (§3.1) -->
              <div id="inline-match-nudge-box" style="display: none; margin-bottom: 20px; background: #EEECFC; border: 1.5px solid var(--color-primary); border-radius: var(--radius-md); padding: 14px 16px;">
                <div style="font-size: 13.5px; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                  ${Icons.sparkles(16, 'var(--color-primary)')} Good news — batchmates already listed something like this!
                </div>
                <p style="font-size: 12.5px; color: var(--color-text-secondary);">
                  Check these available marketplace listings before posting a separate request:
                </p>
                <div id="inline-match-nudge-items" style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;"></div>
              </div>

              <div class="form-group">
                <label class="form-label">Category *</label>
                <select id="seek-need-category" class="form-select">
                  <option value="Formal Wear">Formal Wear (Suits, Ties, Shoes)</option>
                  <option value="Electronics">Electronics & Calculators</option>
                  <option value="Books & Notes">Books & Cheat Sheets</option>
                  <option value="Sports Gear">Sports & Fitness</option>
                  <option value="Skills & Coaching">Skills & Peer Coaching</option>
                  <option value="Stationery">Stationery & Room Supplies</option>
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label">Needed By *</label>
                  <input type="text" id="seek-need-by" class="form-input" placeholder="e.g. Tomorrow, 9:00 AM" value="Tomorrow, 6:00 PM" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Terms Preference</label>
                  <select id="seek-need-terms" class="form-select">
                    <option value="either" selected>Borrow or Buy</option>
                    <option value="borrow-only">Borrow Only</option>
                    <option value="willing-to-pay">Willing to Pay / Rent</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Context & Urgency</label>
                <textarea id="seek-need-desc" class="form-textarea" rows="3" placeholder="Why do you need this, and where in the hostel can someone find you?"></textarea>
              </div>

              <button type="submit" id="btn-submit-seek-need" class="btn btn-primary btn-full btn-lg" style="margin-top: 10px; background: #E88813; border-color: #E88813;">
                ${Icons.helpCircle(18)} Post Need to Campus Feed
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  afterRender() {
    let currentOfferMode = "share";
    let selectedPhotoUrl = PRESET_PHOTO_OPTIONS[0].url;

    const offerTabBtn = document.getElementById("btn-post-type-offer");
    const needTabBtn = document.getElementById("btn-post-type-need");
    const offerForm = document.getElementById("offer-item-form");
    const needForm = document.getElementById("need-request-form");

    offerTabBtn?.addEventListener("click", () => {
      offerTabBtn.classList.add("active");
      needTabBtn?.classList.remove("active");
      if (offerForm) offerForm.style.display = "block";
      if (needForm) needForm.style.display = "none";
    });

    needTabBtn?.addEventListener("click", () => {
      needTabBtn.classList.add("active");
      offerTabBtn?.classList.remove("active");
      if (offerForm) offerForm.style.display = "none";
      if (needForm) needForm.style.display = "block";
    });

    // Preset photo picker
    document.querySelectorAll(".preset-photo-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        document.querySelectorAll(".preset-photo-thumb").forEach(t => t.classList.remove("selected"));
        thumb.classList.add("selected");
        selectedPhotoUrl = thumb.dataset.url;
        const img = document.getElementById("active-photo-img");
        if (img) img.src = selectedPhotoUrl;
      });
    });

    // Segmented Mode Controls in Offer form
    const modeShareBtn = document.getElementById("mode-share-btn");
    const modeSellBtn = document.getElementById("mode-sell-btn");
    const modeGiveBtn = document.getElementById("mode-give-btn");

    const fieldsShare = document.getElementById("fields-share");
    const fieldsSell = document.getElementById("fields-sell");
    const fieldsGive = document.getElementById("fields-give");

    const setMode = (mode) => {
      currentOfferMode = mode;
      [modeShareBtn, modeSellBtn, modeGiveBtn].forEach(b => b?.classList.remove("active"));
      if (fieldsShare) fieldsShare.style.display = "none";
      if (fieldsSell) fieldsSell.style.display = "none";
      if (fieldsGive) fieldsGive.style.display = "none";

      if (mode === "share") {
        modeShareBtn?.classList.add("active");
        if (fieldsShare) fieldsShare.style.display = "block";
      } else if (mode === "sell") {
        modeSellBtn?.classList.add("active");
        if (fieldsSell) fieldsSell.style.display = "block";
      } else if (mode === "give") {
        modeGiveBtn?.classList.add("active");
        if (fieldsGive) fieldsGive.style.display = "block";
      }
    };

    modeShareBtn?.addEventListener("click", () => setMode("share"));
    modeSellBtn?.addEventListener("click", () => setMode("sell"));
    modeGiveBtn?.addEventListener("click", () => setMode("give"));

    // Multiple units toggle
    const toggle = document.getElementById("toggle-multiple-units");
    const slider = document.getElementById("toggle-slider");
    toggle?.addEventListener("change", (e) => {
      if (slider) slider.style.backgroundColor = e.target.checked ? "var(--color-primary)" : "#CCC";
    });

    // Match nudge input listener for Seeker Need Form (§3.1)
    const needTitleInput = document.getElementById("seek-need-title");
    const matchBox = document.getElementById("inline-match-nudge-box");
    const matchItems = document.getElementById("inline-match-nudge-items");

    needTitleInput?.addEventListener("input", (e) => {
      const q = e.target.value;
      const cat = document.getElementById("seek-need-category")?.value;
      const matches = appState.findMatchingListingsForNeed(q, cat);

      if (matches.length > 0) {
        matchBox.style.display = "block";
        matchItems.innerHTML = matches.map(m => `
          <a href="#/item/${m.id}" style="font-size: 13px; font-weight: 600; color: var(--color-primary); display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--color-border); text-decoration: none;">
            <span>${m.title} (${m.mode.toUpperCase()})</span>
            <span style="font-size: 12px; color: var(--color-text-secondary);">View Available Item →</span>
          </a>
        `).join("");
      } else {
        matchBox.style.display = "none";
      }
    });

    // Offer form submit
    offerForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("listing-title")?.value?.trim();
      const category = document.getElementById("listing-category")?.value;
      const desc = document.getElementById("listing-desc")?.value?.trim();
      const location = document.getElementById("listing-location")?.value?.trim();
      const condition = document.getElementById("listing-condition")?.value;
      const isMultiple = document.getElementById("toggle-multiple-units")?.checked || false;

      let price = null;
      let originalPrice = null;
      let terms = "Standard campus exchange";

      if (currentOfferMode === "sell") {
        price = document.getElementById("sell-price")?.value;
        originalPrice = document.getElementById("sell-original-price")?.value;
        terms = "Payment on handoff via UPI/Cash";
        if (!price) {
          Toast.warning("Please enter a selling price");
          return;
        }
      } else if (currentOfferMode === "share") {
        terms = document.getElementById("share-terms")?.value || "Return in 3 days";
      } else {
        terms = "100% Free gift. No return expected.";
      }

      if (!title || !desc) {
        Toast.warning("Please fill in required fields");
        return;
      }

      appState.addListing({
        title,
        category,
        mode: currentOfferMode,
        description: desc,
        location,
        condition,
        photoUrl: selectedPhotoUrl,
        price,
        originalPrice,
        terms,
        isMultipleUnits: isMultiple
      });

      Toast.success("Listing published live to Campus Feed! 🎉");
      appState.setMarketplaceTab("browse");
      Router.navigate("#/feed");
    });

    // Seeker Need form submit
    needForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("seek-need-title")?.value?.trim();
      const category = document.getElementById("seek-need-category")?.value;
      const neededBy = document.getElementById("seek-need-by")?.value?.trim() || "This week";
      const terms = document.getElementById("seek-need-terms")?.value;
      const desc = document.getElementById("seek-need-desc")?.value?.trim() || "Urgent campus need";

      if (!title) {
        Toast.warning("Please enter what you need");
        return;
      }

      appState.addNeed({
        title,
        category,
        neededBy,
        terms,
        description: desc
      });

      Toast.success("Need posted to Campus Feed! 🎉");
      appState.setMarketplaceTab("needs");
      Router.navigate("#/feed");
    });
  }
};
