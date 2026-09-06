// js/views/newListing.js - Under-60-Seconds Fast Create Listing View

const NewListingView = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const isVerifiedSeller = !!user.isVerifiedSeller;

    return `
      <div class="main-container">
        <div style="max-width: 640px; margin: 0 auto;">
          <!-- Back Link -->
          <div class="btn-back" onclick="Router.navigate('#/feed')">
            ${Icons.arrowLeft(18)} Back to Feed
          </div>

          <div class="card" style="padding: 32px 28px;">
            <div style="margin-bottom: 24px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge badge-borrow" style="font-size: 11px;">Fast 60s Flow</span>
                <span style="font-size: 12px; color: var(--color-text-secondary);">Campus Gated Listing</span>
              </div>
              <h1 style="font-size: 26px; font-weight: 700;">List an Item or Skill</h1>
              <p style="font-size: 14px; color: var(--color-text-secondary);">
                Share with verified batchmates across your residential hostel campus.
              </p>
            </div>

            <form id="new-listing-form" onsubmit="event.preventDefault();">
              <!-- Photo Selection -->
              <div class="form-group">
                <label class="form-label">Item Photo</label>
                <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 8px;">
                  <div id="preview-photo-box" style="width: 80px; height: 80px; border-radius: var(--radius-md); overflow: hidden; background: #ECEAF4; border: 1.5px solid var(--color-primary); flex-shrink: 0;">
                    <img id="active-photo-img" src="${PRESET_PHOTO_OPTIONS[0].url}" style="width: 100%; height: 100%; object-fit: cover;" alt="Preview" />
                  </div>
                  <div>
                    <div style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary);">Choose a preset photo or upload:</div>
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
                  <option value="Other">Other Campus Utility</option>
                </select>
              </div>

              <!-- Segmented Mode Control: Share / Sell / Give Away -->
              <div class="form-group">
                <label class="form-label">Listing Type *</label>
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
                  <div class="form-hint">Let your batchmate know when you expect the item back.</div>
                </div>

                <!-- Sell Fields (Hidden by default) -->
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

                <!-- Give Away Fields (Hidden by default) -->
                <div id="fields-give" style="display: none;">
                  <div style="display: flex; align-items: center; gap: 8px; color: var(--color-accent-amber); font-weight: 600; font-size: 14px;">
                    ${Icons.sparkles(16)} 100% Free Campus Gift
                  </div>
                  <div style="font-size: 13px; color: var(--color-text-secondary); margin-top: 4px;">
                    No return expected. Perfect for passing down notes or donating study materials to juniors!
                  </div>
                </div>
              </div>

              <!-- Multiple Units / Bulk Reseller Toggle (§5.5) -->
              <div class="card" style="background: #FFFFFF; border: 1px solid var(--color-border); padding: 14px 16px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <div style="font-weight: 700; font-size: 14px; color: var(--color-text-primary);">
                      Listing multiple units / bulk inventory?
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">
                      For student distributors, bulk study merchandise, or batch lots.
                    </div>
                  </div>
                  <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                    <input type="checkbox" id="toggle-multiple-units" style="opacity: 0; width: 0; height: 0;" />
                    <span style="position: absolute; inset: 0; background-color: #CCC; border-radius: 34px; transition: .3s;" id="toggle-slider"></span>
                  </label>
                </div>

                <!-- Inline Verified Seller Nudge (§5.5) -->
                <div id="bulk-verify-nudge" style="display: none; margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--color-border);">
                  <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--color-text-secondary);">
                    <span style="color: var(--color-primary);">${Icons.shieldCheck(18)}</span>
                    <div>
                      <strong>Verified Seller Required:</strong> Bulk & multiple-unit listings are tagged with a Verified Seller trust badge.
                      ${!isVerifiedSeller ? `
                        <div style="margin-top: 6px;">
                          <a href="javascript:void(0)" onclick="NewListingView.handleUnlockVerifiedSeller()" style="font-weight: 700; color: var(--color-primary); text-decoration: underline;">
                            Upload Campus ID to unlock Verified Seller status →
                          </a>
                        </div>
                      ` : `
                        <div style="color: var(--color-secondary); font-weight: 700; margin-top: 4px;">
                          ✓ You are already ID-Verified for bulk listings!
                        </div>
                      `}
                    </div>
                  </div>
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
                ${Icons.plus(18)} Post Listing to Feed
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  handleUnlockVerifiedSeller() {
    Modal.open({
      title: "Unlock Verified Seller Status",
      contentHtml: `
        <div style="text-align: center;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
            ${Icons.upload(24)}
          </div>
          <p style="font-size: 14px; margin-bottom: 16px;">
            To maintain campus safety and prevent unverified commercial spam, batch resale requires student ID confirmation.
          </p>
          <div class="dropzone" id="quick-id-dropzone" style="margin-bottom: 16px;">
            <div style="font-weight: 700; font-size: 14px;">Click to simulate Student ID verification</div>
            <div style="font-size: 12px; color: var(--color-text-secondary);">Instant verification for demo</div>
          </div>
        </div>
      `,
      footerHtml: `<button class="btn btn-primary btn-sm" id="btn-quick-verify-done">Verify & Continue</button>`
    });

    const verifyAction = () => {
      appState.currentUser.isVerifiedSeller = true;
      Modal.close();
      Toast.success("Verified Seller badge unlocked! 🎉");
      Router.renderCurrentRoute();
    };

    document.getElementById("quick-id-dropzone")?.addEventListener("click", verifyAction);
    document.getElementById("btn-quick-verify-done")?.addEventListener("click", verifyAction);
  },

  afterRender() {
    let currentMode = "share";
    let selectedPhotoUrl = PRESET_PHOTO_OPTIONS[0].url;

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

    // Segmented Mode Controls
    const modeShareBtn = document.getElementById("mode-share-btn");
    const modeSellBtn = document.getElementById("mode-sell-btn");
    const modeGiveBtn = document.getElementById("mode-give-btn");

    const fieldsShare = document.getElementById("fields-share");
    const fieldsSell = document.getElementById("fields-sell");
    const fieldsGive = document.getElementById("fields-give");

    const setMode = (mode) => {
      currentMode = mode;
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
    const nudge = document.getElementById("bulk-verify-nudge");

    toggle?.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      if (slider) {
        slider.style.backgroundColor = isChecked ? "var(--color-primary)" : "#CCC";
      }
      if (nudge) {
        nudge.style.display = isChecked ? "block" : "none";
      }
    });

    // Form submission
    const form = document.getElementById("new-listing-form");
    form?.addEventListener("submit", (e) => {
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

      if (currentMode === "sell") {
        price = document.getElementById("sell-price")?.value;
        originalPrice = document.getElementById("sell-original-price")?.value;
        terms = "Payment on handoff via UPI/Cash";
        if (!price) {
          Toast.warning("Please enter a selling price");
          return;
        }
      } else if (currentMode === "share") {
        terms = document.getElementById("share-terms")?.value || "Return in 3 days";
      } else {
        terms = "100% Free gift. No return expected.";
      }

      if (!title || !desc) {
        Toast.warning("Please fill in required fields");
        return;
      }

      const submitBtn = document.getElementById("btn-submit-listing");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Publishing listing...`;
      }

      setTimeout(() => {
        const created = appState.addListing({
          title,
          category,
          mode: currentMode,
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
        Router.navigate("#/feed");
      }, 500);
    });
  }
};
