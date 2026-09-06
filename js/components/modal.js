// js/components/modal.js - Modal and Chat Drawer System for Peerly

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
    // Trigger animation
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

  // 1. Scripted Chat Drawer
  openChatDrawer(listingId) {
    let drawer = document.getElementById("chat-drawer-container");
    if (drawer) drawer.remove();

    const listing = appState.listings.find(l => l.id === listingId) || appState.listings[0];
    const owner = appState.getUserById(listing.ownerId);
    const messages = appState.chats[listing.id] || [
      { sender: owner.id, time: "10:00 AM", text: `Hey! Thanks for connecting about ${listing.title} 👋` },
      { sender: "me", time: "10:02 AM", text: `Hi ${owner.name.split(' ')[0]}, let me know when we can coordinate handoff!` }
    ];

    drawer = document.createElement("div");
    drawer.id = "chat-drawer-container";
    drawer.className = "chat-drawer";

    const renderMessages = () => {
      const msgs = appState.chats[listing.id] || messages;
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
          <img src="${owner.avatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" alt="${owner.name}">
          <div>
            <div style="font-size: 13px; font-weight: 700; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px;">
              ${owner.name}
              ${owner.verified ? `<span title="Verified Student" style="color: var(--color-secondary);">${Icons.shieldCheck(14)}</span>` : ''}
            </div>
            <div style="font-size: 11px; color: var(--color-text-secondary);">${listing.location || 'On Campus'}</div>
          </div>
        </div>
        <button id="close-chat-btn" class="btn btn-ghost btn-sm" style="padding: 4px;">
          ${Icons.x(18)}
        </button>
      </div>

      <div style="padding: 8px 14px; background: #FFFFFF; border-bottom: 1px solid var(--color-border); font-size: 12px; color: var(--color-text-secondary); display: flex; align-items: center; justify-content: space-between;">
        <span style="font-weight: 600; color: var(--color-text-primary);">${listing.title}</span>
        <span class="badge ${listing.mode === 'share' ? 'badge-borrow' : listing.mode === 'sell' ? 'badge-sell' : 'badge-give'}">
          ${listing.mode.toUpperCase()}
        </span>
      </div>

      <div class="chat-messages-container" id="chat-messages-box">
        ${renderMessages()}
      </div>

      <div class="chat-input-area">
        <input type="text" class="chat-input" id="chat-text-input" placeholder="Type a message (e.g. Meet at library?)..." autocomplete="off" />
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

      appState.sendChatMessage(listing.id, text);
      input.value = "";
      const msgBox = document.getElementById("chat-messages-box");
      if (msgBox) {
        msgBox.innerHTML = renderMessages();
        msgBox.scrollTop = msgBox.scrollHeight;
      }

      // Simulated auto-reply after 800ms
      setTimeout(() => {
        const autoReplies = [
          "Perfect, see you there!",
          "Sounds good, I'll bring it along.",
          "Awesome, ping me when you reach the lobby 👍"
        ];
        const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        if (!appState.chats[listing.id]) appState.chats[listing.id] = [];
        appState.chats[listing.id].push({
          sender: owner.id,
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

  // 2. Accountability Condition Check + Rating Modal
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
            
            // Execute return in state
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

  // 3. Roadmap / What's Next Modal (§2.3 & §1.4)
  openRoadmapModal() {
    const content = `
      <div>
        <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
          Peerly is structured around validating <strong>trust, discoverability, and campus peer accountability</strong> before scaling backend infrastructure. Here is our product roadmap:
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
      title: "Product Roadmap & Future Architecture",
      contentHtml: content,
      footerHtml: `<button class="btn btn-primary btn-sm" onclick="Modal.close()">Close</button>`
    });
  },

  // 4. Low-Visibility Report Modal (§1.4)
  openReportModal(listingId) {
    const listing = appState.listings.find(l => l.id === listingId);
    const content = `
      <div>
        <p style="font-size: 14px; margin-bottom: 16px;">
          Help keep Peerly safe and trusted. What issue would you like to flag regarding <strong>"${listing?.title || 'this listing'}"</strong>?
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer;">
            <input type="radio" name="report_reason" checked value="inaccurate" /> Inaccurate description or photo
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer;">
            <input type="radio" name="report_reason" value="unresponsive" /> Owner is unresponsive / no-show
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer;">
            <input type="radio" name="report_reason" value="prohibited" /> Prohibited or commercial item
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer;">
            <input type="radio" name="report_reason" value="other" /> Other campus policy concern
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

  // 5. Campus Switcher Modal
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
