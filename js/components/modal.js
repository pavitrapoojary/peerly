// js/components/modal.js - Modal and Chat Drawer System for Peerly v2

const Modal = {
  // Generic Modal Opener
  open({ title, contentHtml, footerHtml = "", customClass = "", onClose = null }) {
    this.close(); // Close any active modal first

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "active-modal-overlay";

    overlay.innerHTML = `
      <div class="modal-card ${customClass}">
        <div class="modal-header">
          <h3 style="font-size: 18px; font-weight: 700;">${title}</h3>
          <button class="btn btn-ghost btn-sm" id="modal-close-btn" style="padding: 6px; border-radius: 50%;">
            ${Icons.x(20)}
          </button>
        </div>
        <div class="modal-body">
          ${contentHtml}
        </div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ""}
      </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.classList.add("open");
    });

    const closeHandler = () => {
      overlay.classList.remove("open");
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (onClose) onClose();
      }, 250);
    };

    overlay.querySelector("#modal-close-btn").addEventListener("click", closeHandler);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeHandler();
    });

    return { close: closeHandler };
  },

  close() {
    const existing = document.getElementById("active-modal-overlay");
    if (existing && existing.parentNode) {
      existing.classList.remove("open");
      setTimeout(() => {
        if (existing.parentNode) existing.parentNode.removeChild(existing);
      }, 200);
    }
  },

  // 1. Universal Chat Drawer (Items, Needs, Connect, Community)
  openChatDrawer(threadId, customTitle = null, customBadge = null) {
    let drawer = document.getElementById("chat-drawer-container");
    if (drawer) drawer.remove();

    // Resolve context: could be listing, need, or user ID
    const listing = appState.listings.find(l => l.id === threadId);
    const need = appState.needs.find(n => n.id === threadId);
    const targetUser = appState.getUserById(threadId);

    let partner = targetUser;
    let headerTitle = customTitle || "Campus Chat";
    let headerSubtitle = "Hostel Network";
    let badgeHtml = customBadge ? `<span class="badge badge-borrow">${customBadge}</span>` : "";

    if (listing) {
      partner = appState.getUserById(listing.ownerId);
      headerTitle = listing.title;
      headerSubtitle = listing.location || "On Campus";
      badgeHtml = `<span class="badge ${listing.mode === 'share' ? 'badge-borrow' : listing.mode === 'sell' ? 'badge-sell' : 'badge-give'}">${listing.mode.toUpperCase()}</span>`;
    } else if (need) {
      partner = appState.getUserById(need.seekerId);
      headerTitle = need.title;
      headerSubtitle = `Needed by ${need.neededBy}`;
      badgeHtml = `<span class="badge badge-need-pill">LOOKING FOR</span>`;
    } else if (targetUser) {
      partner = targetUser;
      headerTitle = partner.name;
      headerSubtitle = `${partner.role || 'PGPM Batchmate'} · ${partner.campus?.split('(')[0] || 'Campus'}`;
      badgeHtml = `<span class="badge badge-verified" style="background:var(--color-accent-blue-light); color:var(--color-accent-blue);">PEER CONNECT</span>`;
    }

    if (!partner || partner.id === appState.currentUser.id) {
      partner = appState.users[1]; // Fallback to Jean
    }

    const messages = appState.chats[threadId] || [
      { sender: partner.id, time: "10:00 AM", text: `Hey ${appState.currentUser.name.split(' ')[0]}! Thanks for reaching out 👋` },
      { sender: "me", time: "10:02 AM", text: `Hi ${partner.name.split(' ')[0]}, glad to connect!` }
    ];

    drawer = document.createElement("div");
    drawer.id = "chat-drawer-container";
    drawer.className = "chat-drawer";

    const renderMessages = () => {
      const msgs = appState.chats[threadId] || messages;
      return msgs.map(m => {
        const isMe = m.sender === "me" || m.sender === appState.currentUser.id;
        return `
          <div class="chat-bubble ${isMe ? 'outgoing' : 'incoming'}">
            <div>${m.text}</div>
            <div class="chat-time">${m.time}</div>
          </div>
        `;
      }).join("");
    };

    drawer.innerHTML = `
      <div class="chat-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${partner.avatar}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" alt="${partner.name}">
          <div>
            <div style="font-size: 14px; font-weight: 700; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px;">
              ${partner.name}
              ${partner.verified ? `<span title="Verified Student" style="color: var(--color-secondary);">${Icons.shieldCheck(14)}</span>` : ''}
            </div>
            <div style="font-size: 11.5px; color: var(--color-text-secondary);">${headerSubtitle}</div>
          </div>
        </div>
        <button id="close-chat-btn" class="btn btn-ghost btn-sm" style="padding: 4px;">
          ${Icons.x(18)}
        </button>
      </div>

      <div style="padding: 8px 14px; background: #FFFFFF; border-bottom: 1px solid var(--color-border); font-size: 12px; color: var(--color-text-secondary); display: flex; align-items: center; justify-content: space-between;">
        <span style="font-weight: 600; color: var(--color-text-primary);">${headerTitle}</span>
        ${badgeHtml}
      </div>

      <div class="chat-messages-container" id="chat-messages-box">
        ${renderMessages()}
      </div>

      <div class="chat-input-area">
        <input type="text" class="chat-input" id="chat-text-input" placeholder="Type a message (e.g. Can I pick it up at 5 PM?)..." autocomplete="off" />
        <button id="send-chat-btn" class="btn btn-primary" style="padding: 8px 14px; border-radius: var(--radius-full);">
          ${Icons.send(16)}
        </button>
      </div>
    `;

    document.body.appendChild(drawer);
    requestAnimationFrame(() => {
      drawer.classList.add("open");
      const msgBox = document.getElementById("chat-messages-box");
      if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
    });

    const closeChat = () => {
      drawer.classList.remove("open");
      setTimeout(() => drawer.remove(), 250);
    };

    drawer.querySelector("#close-chat-btn").addEventListener("click", closeChat);

    const handleSendMessage = () => {
      const input = document.getElementById("chat-text-input");
      const text = input.value.trim();
      if (!text) return;

      appState.sendChatMessage(threadId, text);
      input.value = "";
      const msgBox = document.getElementById("chat-messages-box");
      if (msgBox) {
        msgBox.innerHTML = renderMessages();
        msgBox.scrollTop = msgBox.scrollHeight;
      }

      // Simulated realistic auto-reply after 800ms
      setTimeout(() => {
        const autoReplies = [
          "Perfect, see you there!",
          "Sounds great, let me know when you're nearby 👍",
          "Awesome! I'm in my hostel room right now.",
          "Done! Looking forward to catching up."
        ];
        const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        if (!appState.chats[threadId]) appState.chats[threadId] = [];
        appState.chats[threadId].push({
          sender: partner.id,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: reply
        });
        if (msgBox) {
          msgBox.innerHTML = renderMessages();
          msgBox.scrollTop = msgBox.scrollHeight;
        }
      }, 900);
    };

    drawer.querySelector("#send-chat-btn").addEventListener("click", handleSendMessage);
    drawer.querySelector("#chat-text-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSendMessage();
    });
  },

  // 2. Create Need Modal (§3.1)
  openCreateNeedModal() {
    const content = `
      <div>
        <p style="font-size: 13.5px; color: var(--color-text-secondary); margin-bottom: 16px;">
          Ask your batch for what you need. Unlisted items and hidden supplies surface when asked!
        </p>

        <form id="modal-create-need-form" onsubmit="event.preventDefault();">
          <div class="form-group">
            <label class="form-label">What are you looking for? *</label>
            <input type="text" id="need-title-input" class="form-input" placeholder="e.g. Bluetooth Speaker, Blazer (Size 38), Macroeconomics Book..." required />
          </div>

          <!-- Simulated Match Nudge Box (§3.1) -->
          <div id="need-match-nudge-box" style="display: none; margin-bottom: 16px; background: #EEECFC; border: 1.5px solid var(--color-primary); border-radius: var(--radius-md); padding: 12px 14px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              ${Icons.sparkles(16, 'var(--color-primary)')} Good news — batchmates already listed this!
            </div>
            <div style="font-size: 12.5px; color: var(--color-text-secondary);" id="need-match-nudge-text">
              We found matching items already available in Marketplace. Check them out first to save time!
            </div>
            <div id="need-match-nudge-links" style="margin-top: 8px; display: flex; flex-direction: column; gap: 4px;"></div>
          </div>

          <div class="form-group">
            <label class="form-label">Category *</label>
            <select id="need-category-select" class="form-select">
              <option value="Electronics">Electronics & Calculators</option>
              <option value="Formal Wear">Formal Wear & Suits</option>
              <option value="Books & Notes">Books & Cheat Sheets</option>
              <option value="Sports Gear">Sports & Fitness</option>
              <option value="Skills & Coaching">Skills & Peer Coaching</option>
              <option value="Stationery">Stationery & Room Essentials</option>
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Needed By *</label>
              <input type="text" id="need-by-input" class="form-input" placeholder="e.g. Tomorrow, 9:00 AM" value="Tomorrow, 6:00 PM" required />
            </div>

            <div class="form-group">
              <label class="form-label">Terms</label>
              <select id="need-terms-select" class="form-select">
                <option value="borrow-only">Borrow Only</option>
                <option value="willing-to-pay">Willing to Pay / Rent</option>
                <option value="either" selected>Either Borrow or Buy</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Details / Context</label>
            <textarea id="need-desc-input" class="form-textarea" rows="3" placeholder="Explain your requirement, hostel room, or urgency..."></textarea>
          </div>
        </form>
      </div>
    `;

    const modalInstance = this.open({
      title: "🙋 Post a Need (Ask the Campus)",
      contentHtml: content,
      footerHtml: `
        <button class="btn btn-ghost btn-sm" onclick="Modal.close()">Cancel</button>
        <button class="btn btn-primary btn-sm" id="btn-submit-modal-need">Post Need to Feed</button>
      `
    });

    const titleInput = document.getElementById("need-title-input");
    const nudgeBox = document.getElementById("need-match-nudge-box");
    const nudgeLinks = document.getElementById("need-match-nudge-links");

    titleInput?.addEventListener("input", (e) => {
      const q = e.target.value;
      const cat = document.getElementById("need-category-select")?.value;
      const matches = appState.findMatchingListingsForNeed(q, cat);

      if (matches.length > 0) {
        nudgeBox.style.display = "block";
        nudgeLinks.innerHTML = matches.map(m => `
          <a href="#/item/${m.id}" onclick="Modal.close()" style="font-size: 12.5px; font-weight: 600; color: var(--color-primary); display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--color-border);">
            <span>${m.title} (${m.mode.toUpperCase()})</span>
            <span>View →</span>
          </a>
        `).join("");
      } else {
        nudgeBox.style.display = "none";
      }
    });

    document.getElementById("btn-submit-modal-need")?.addEventListener("click", () => {
      const title = document.getElementById("need-title-input")?.value?.trim();
      const category = document.getElementById("need-category-select")?.value;
      const neededBy = document.getElementById("need-by-input")?.value?.trim() || "This week";
      const terms = document.getElementById("need-terms-select")?.value;
      const desc = document.getElementById("need-desc-input")?.value?.trim() || "Urgent campus need";

      if (!title) {
        Toast.warning("Please enter what you are looking for");
        return;
      }

      appState.addNeed({
        title,
        category,
        neededBy,
        terms,
        description: desc
      });

      modalInstance.close();
      Toast.success("Need posted live to Campus Feed! 🎉");
      appState.setMarketplaceTab("needs");
      Router.navigate("#/feed");
    });
  },

  // 3. Create Community Board Post (§3.3)
  openCreateCommunityPostModal() {
    const content = `
      <div>
        <p style="font-size: 13.5px; color: var(--color-text-secondary); margin-bottom: 16px;">
          Find teammates, ask informal favors, or celebrate milestones with your cohort.
        </p>

        <form id="modal-community-post-form" onsubmit="event.preventDefault();">
          <div class="form-group">
            <label class="form-label">Post Type *</label>
            <div class="segmented-control" style="grid-template-columns: 1fr 1fr 1fr;">
              <button type="button" class="segmented-btn active" id="comm-type-team" data-type="team-up">
                🤝 Team-Up
              </button>
              <button type="button" class="segmented-btn" id="comm-type-ask" data-type="ask">
                🙋 Ask / Favor
              </button>
              <button type="button" class="segmented-btn" id="comm-type-ann" data-type="announcement">
                📢 Announcement
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Title *</label>
            <input type="text" id="comm-title-input" class="form-input" placeholder="e.g. Need 1 Finance person for Case Comp, Resume review favor..." required />
          </div>

          <div class="form-group">
            <label class="form-label">Description & What you're looking for *</label>
            <textarea id="comm-desc-input" class="form-textarea" rows="3" placeholder="Provide background, deadlines, target skills, or details..." required></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Topic / Tag</label>
              <input type="text" id="comm-tag-input" class="form-input" placeholder="e.g. Case Comp, Quiz, SOP" value="Case Comp" />
            </div>

            <div class="form-group">
              <label class="form-label">Deadline (Optional)</label>
              <input type="text" id="comm-deadline-input" class="form-input" placeholder="e.g. This Sunday" />
            </div>
          </div>
        </form>
      </div>
    `;

    let selectedType = "team-up";

    const modalInstance = this.open({
      title: "✍️ Post to Community Board",
      contentHtml: content,
      footerHtml: `
        <button class="btn btn-ghost btn-sm" onclick="Modal.close()">Cancel</button>
        <button class="btn btn-primary btn-sm" id="btn-submit-comm-post">Publish Post</button>
      `
    });

    const typeTeam = document.getElementById("comm-type-team");
    const typeAsk = document.getElementById("comm-type-ask");
    const typeAnn = document.getElementById("comm-type-ann");

    const setType = (t) => {
      selectedType = t;
      [typeTeam, typeAsk, typeAnn].forEach(b => b?.classList.remove("active"));
      if (t === "team-up") typeTeam?.classList.add("active");
      if (t === "ask") typeAsk?.classList.add("active");
      if (t === "announcement") typeAnn?.classList.add("active");
    };

    typeTeam?.addEventListener("click", () => setType("team-up"));
    typeAsk?.addEventListener("click", () => setType("ask"));
    typeAnn?.addEventListener("click", () => setType("announcement"));

    document.getElementById("btn-submit-comm-post")?.addEventListener("click", () => {
      const title = document.getElementById("comm-title-input")?.value?.trim();
      const desc = document.getElementById("comm-desc-input")?.value?.trim();
      const tag = document.getElementById("comm-tag-input")?.value?.trim() || "General";
      const deadline = document.getElementById("comm-deadline-input")?.value?.trim() || null;

      if (!title || !desc) {
        Toast.warning("Please fill in required fields");
        return;
      }

      appState.addCommunityPost({
        type: selectedType,
        title,
        description: desc,
        tags: [tag],
        deadline
      });

      modalInstance.close();
      Toast.success("Post published to Community Board! 🎉");
      Router.navigate("#/community");
    });
  },

  // 4. Edit Profile Tags Modal (Test live how changing interests re-filters Opportunities & Connect)
  openEditProfileTagsModal() {
    const user = appState.currentUser;
    const allBgOptions = ["Marketing", "Strategy", "Consulting", "Finance", "Operations", "Analytics", "Engineering", "Design", "General Mgmt"];
    const allInterestOptions = ["Finance", "Consulting", "Product Management", "Analytics", "Venture Capital", "Strategy", "Marketing", "Design", "Supply Chain", "AI Tools"];
    const allSkillOptions = ["GTM Strategy", "Consumer Research", "Pitch Decks", "Excel modeling", "Valuation basics", "Python for Data", "MECE Structuring", "Figma Prototyping", "Public Speaking", "SQL & Dashboards"];

    const currentBg = user.background || [];
    const currentInterests = user.interests || [];
    const currentSkills = user.skills || [];

    const content = `
      <div>
        <p style="font-size: 13.5px; color: var(--color-text-secondary); margin-bottom: 16px;">
          Update your background and interest tags to test <strong>real-time client-side personalization</strong> on the Opportunities Radar and Connect suggestions!
        </p>

        <div style="margin-bottom: 18px;">
          <label class="form-label" style="font-weight: 700;">Background / Specializations (Select 1-3)</label>
          <div class="tag-selector-grid" id="bg-tags-container">
            ${allBgOptions.map(bg => `
              <button type="button" class="tag-toggle-btn ${currentBg.includes(bg) ? 'active' : ''}" data-type="bg" data-val="${bg}">
                ${bg}
              </button>
            `).join("")}
          </div>
        </div>

        <div style="margin-bottom: 18px;">
          <label class="form-label" style="font-weight: 700;">Interests You Want to Explore / Opportunities Radar Target</label>
          <div class="tag-selector-grid" id="interest-tags-container">
            ${allInterestOptions.map(int => `
              <button type="button" class="tag-toggle-btn ${currentInterests.includes(int) ? 'active' : ''}" data-type="interest" data-val="${int}">
                ${int}
              </button>
            `).join("")}
          </div>
        </div>

        <div style="margin-bottom: 18px;">
          <label class="form-label" style="font-weight: 700;">Skills You Can Teach / Help With</label>
          <div class="tag-selector-grid" id="skill-tags-container">
            ${allSkillOptions.map(sk => `
              <button type="button" class="tag-toggle-btn ${currentSkills.includes(sk) ? 'active' : ''}" data-type="skill" data-val="${sk}">
                ${sk}
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    let selectedBg = [...currentBg];
    let selectedInterests = [...currentInterests];
    let selectedSkills = [...currentSkills];

    const modalInstance = this.open({
      title: "🎯 Edit Profile Tags & Preferences",
      contentHtml: content,
      footerHtml: `
        <button class="btn btn-ghost btn-sm" onclick="Modal.close()">Cancel</button>
        <button class="btn btn-primary btn-sm" id="btn-save-profile-tags">Save & Update Feed</button>
      `
    });

    document.querySelectorAll(".tag-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        const val = btn.dataset.val;

        if (type === "bg") {
          if (selectedBg.includes(val)) selectedBg = selectedBg.filter(x => x !== val);
          else selectedBg.push(val);
          btn.classList.toggle("active");
        } else if (type === "interest") {
          if (selectedInterests.includes(val)) selectedInterests = selectedInterests.filter(x => x !== val);
          else selectedInterests.push(val);
          btn.classList.toggle("active");
        } else if (type === "skill") {
          if (selectedSkills.includes(val)) selectedSkills = selectedSkills.filter(x => x !== val);
          else selectedSkills.push(val);
          btn.classList.toggle("active");
        }
      });
    });

    document.getElementById("btn-save-profile-tags")?.addEventListener("click", () => {
      appState.updateUserProfile({
        background: selectedBg,
        interests: selectedInterests,
        skills: selectedSkills
      });

      modalInstance.close();
      Toast.success("Profile tags updated! Opportunities & Connect re-personalized. 🚀");
      Router.renderCurrentRoute();
    });
  },

  // 5. Simulate Peer Pairing Modal (§3.2c)
  openSimulatePairingModal() {
    const pairing = appState.activePairing || MOCK_PAIRINGS[0];
    const partner = appState.getUserById(pairing.partnerId);

    const content = `
      <div style="text-align: center; padding: 10px 0;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-accent-blue-light); color: var(--color-accent-blue); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
          ${Icons.coffee(28, 'var(--color-accent-blue)')}
        </div>
        
        <div class="badge" style="background: var(--color-accent-blue-light); color: var(--color-accent-blue); font-size: 11px; margin-bottom: 8px;">
          BIWEEKLY COFFEE ROULETTE MATCH
        </div>
        
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">You are paired with ${partner.name}!</h3>
        <p style="font-size: 13.5px; color: var(--color-text-secondary); margin-bottom: 20px;">
          ${partner.role || 'PGPM Batchmate'} · ${partner.campus?.split('(')[0]}
        </p>

        <div class="card" style="background: var(--color-surface-alt); padding: 16px; text-align: left; margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--color-accent-blue); text-transform: uppercase; margin-bottom: 4px;">
            💡 Shared Icebreaker
          </div>
          <div style="font-size: 14px; font-weight: 600; color: var(--color-text-primary); line-height: 1.5; margin-bottom: 8px;">
            "${pairing.icebreaker}"
          </div>
          <div style="font-size: 12px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 4px;">
            ${Icons.mapPin(12)} Suggested Meetup: <strong>${pairing.suggestedLocation}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 10px; justify-content: center;">
          <button class="btn btn-secondary btn-sm" onclick="Modal.close()">
            Maybe Later
          </button>
          <button class="btn btn-primary btn-sm" id="btn-pairing-say-hi" style="background: var(--color-accent-blue); border-color: var(--color-accent-blue);">
            ${Icons.messageSquare(15)} Say Hi & Coordinate Coffee
          </button>
        </div>
      </div>
    `;

    const modalInstance = this.open({
      title: "☕ Peer Pairing Simulation",
      contentHtml: content
    });

    document.getElementById("btn-pairing-say-hi")?.addEventListener("click", () => {
      appState.connectWithUser(partner.id);
      modalInstance.close();
      Modal.openChatDrawer(partner.id, `Coffee Pairing with ${partner.name}`, "PEER PAIRING");
    });
  },

  // 6. Accountability Condition Check + Rating Modal
  openConditionRatingModal(listingId, onComplete) {
    const borrow = appState.activeBorrows.find(b => b.listingId === listingId) || {
      title: "Borrowed Item",
      owner: { name: "Batchmate" }
    };
    const ownerName = borrow.owner?.name || "the owner";

    let step = 1;
    let conditionGood = true;
    let ratingUp = true;

    const renderStepContent = () => {
      if (step === 1) {
        return `
          <div style="text-align: center; padding: 10px 0;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-secondary-light); color: var(--color-secondary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
              ${Icons.shieldCheck(28)}
            </div>
            <h4 style="font-size: 18px; margin-bottom: 8px; font-weight: 700;">Condition Check</h4>
            <p style="font-size: 14px; margin-bottom: 24px;">Was <strong>"${borrow.title}"</strong> returned in good, undamaged condition?</p>

            <div style="display: flex; gap: 12px; justify-content: center;">
              <button class="btn btn-secondary condition-opt" data-good="false" style="flex: 1; padding: 14px;">
                ${Icons.alertCircle(18, '#E0544F')} Minor Issue / Damage
              </button>
              <button class="btn btn-teal condition-opt" data-good="true" style="flex: 1; padding: 14px;">
                ${Icons.checkCircle(18, '#FFFFFF')} Yes, Perfect Condition
              </button>
            </div>
          </div>
        `;
      } else {
        return `
          <div style="text-align: center; padding: 10px 0;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
              ${Icons.thumbsUp(26)}
            </div>
            <h4 style="font-size: 18px; margin-bottom: 8px; font-weight: 700;">Rate Your Peer Exchange</h4>
            <p style="font-size: 14px; margin-bottom: 24px;">How was your interaction with <strong>${ownerName}</strong>?</p>

            <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 16px;">
              <button class="btn btn-secondary rate-opt" data-up="false" style="flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 6px;">
                <span style="color: var(--color-danger);">${Icons.thumbsDown(24)}</span>
                <span style="font-size: 13px;">Needs Improvement</span>
              </button>
              <button class="btn btn-secondary rate-opt" data-up="true" style="flex: 1; padding: 16px; border-color: var(--color-primary); background: var(--color-primary-light); display: flex; flex-direction: column; gap: 6px;">
                <span style="color: var(--color-primary);">${Icons.thumbsUp(24)}</span>
                <span style="font-size: 13px; font-weight: 700; color: var(--color-primary);">Smooth & Friendly!</span>
              </button>
            </div>
            <div style="font-size: 12px; color: var(--color-text-secondary);">Your rating builds peer accountability across the campus network.</div>
          </div>
        `;
      }
    };

    const modalInstance = this.open({
      title: "Return & Accountability",
      contentHtml: `<div id="condition-rating-container">${renderStepContent()}</div>`,
      footerHtml: `
        <button class="btn btn-ghost btn-sm" id="cancel-return-btn">Cancel</button>
      `
    });

    const bindEvents = () => {
      const container = document.getElementById("condition-rating-container");
      if (!container) return;

      if (step === 1) {
        container.querySelectorAll(".condition-opt").forEach(btn => {
          btn.addEventListener("click", () => {
            conditionGood = btn.dataset.good === "true";
            step = 2;
            container.innerHTML = renderStepContent();
            bindEvents();
          });
        });
      } else {
        container.querySelectorAll(".rate-opt").forEach(btn => {
          btn.addEventListener("click", () => {
            ratingUp = btn.dataset.up === "true";
            appState.returnBorrow(listingId, conditionGood, ratingUp);
            modalInstance.close();
            Toast.success("Item returned and peer rating recorded! 🎉");
            if (onComplete) onComplete();
          });
        });
      }
    };

    bindEvents();
    document.getElementById("cancel-return-btn")?.addEventListener("click", () => modalInstance.close());
  },

  // 7. Roadmap Modal
  openRoadmapModal() {
    const content = `
      <div>
        <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
          Peerly v2 is structured as a <strong>Campus Operating System</strong> covering all 4 core pillars: <strong>Things, Skills, Knowledge, and Help</strong>.
        </p>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${MOCK_ROADMAP_ITEMS.map((item, idx) => `
            <div style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 16px; background: ${idx === 0 ? 'var(--color-surface-alt)' : '#FFFFFF'};">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <span style="font-weight: 700; font-size: 15px; color: var(--color-text-primary);">${item.phase}</span>
                <span class="badge ${idx === 0 ? 'badge-available' : 'badge-borrowed'}" style="font-size: 11px;">
                  ${item.status}
                </span>
              </div>
              <ul style="padding-left: 18px; font-size: 13px; color: var(--color-text-secondary); line-height: 1.6;">
                ${item.items.map(li => `<li>${li}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    this.open({
      title: "Product Evolution Roadmap",
      contentHtml: content,
      footerHtml: `<button class="btn btn-primary btn-sm" onclick="Modal.close()">Close</button>`
    });
  },

  // 8. Low-Visibility Report Modal
  openReportModal(listingId) {
    const listing = appState.listings.find(l => l.id === listingId);
    const content = `
      <div>
        <p style="font-size: 14px; margin-bottom: 16px;">
          Help keep Peerly safe and trusted. What issue would you like to flag regarding <strong>"${listing?.title || 'this post'}"</strong>?
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer;">
            <input type="radio" name="report_reason" checked value="inaccurate" /> Inaccurate description or photo
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer;">
            <input type="radio" name="report_reason" value="unresponsive" /> Batchmate is unresponsive / no-show
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer;">
            <input type="radio" name="report_reason" value="prohibited" /> Prohibited or commercial item
          </label>
        </div>
        <textarea class="form-textarea" placeholder="Optional notes for campus moderators..." rows="3"></textarea>
      </div>
    `;

    this.open({
      title: "Report an Issue",
      contentHtml: content,
      footerHtml: `
        <button class="btn btn-ghost btn-sm" onclick="Modal.close()">Cancel</button>
        <button class="btn btn-primary btn-sm" id="submit-report-btn">Submit Report</button>
      `
    });

    document.getElementById("submit-report-btn")?.addEventListener("click", () => {
      Modal.close();
      Toast.success("Thank you. Report received for moderator review.", 4000);
    });
  },

  // 9. Campus Switcher Modal
  openCampusSelectModal() {
    const content = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <p style="font-size: 13.5px; margin-bottom: 10px;">Select your residential B-school campus:</p>
        ${MOCK_CAMPUSES.map(c => `
          <div class="card card-hover campus-choice-card" data-campus-id="${c.id}" style="padding: 14px; cursor: pointer; border-color: ${c.id === appState.selectedCampus.id ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${c.id === appState.selectedCampus.id ? 'var(--color-primary-light)' : '#FFFFFF'};">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-weight: 700; font-size: 14px; color: var(--color-text-primary);">${c.name}</div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">${c.studentsCount} · @${c.domain}</div>
              </div>
              ${c.id === appState.selectedCampus.id ? `<span style="color: var(--color-primary);">${Icons.checkCircle(18)}</span>` : ''}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    const modalInstance = this.open({
      title: "Switch Campus",
      contentHtml: content
    });

    document.querySelectorAll(".campus-choice-card").forEach(el => {
      el.addEventListener("click", () => {
        appState.setCampus(el.dataset.campusId);
        modalInstance.close();
        Toast.info(`Campus switched to ${appState.selectedCampus.name}`);
      });
    });
  }
};
