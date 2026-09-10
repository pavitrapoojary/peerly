// js/views/community.js - Community Board View (§3.3)

const CommunityView = {
  render() {
    const user = appState.currentUser || MOCK_USERS[0];
    const typeFilter = appState.communityTypeFilter || "all";
    
    const posts = appState.communityPosts.filter(p => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      return true;
    });

    return `
      <div class="main-container">
        <!-- Community Board Header -->
        <div class="community-header">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge" style="background: var(--color-accent-amber-light); color: #B36B00; font-size: 11px;">
                  Help & Campus Voice Pillar
                </span>
                <span style="font-size: 12.5px; color: var(--color-text-secondary);">${user.campus?.split('(')[0] || 'Campus'}</span>
              </div>
              <h1 style="font-size: 28px; font-weight: 700;">Community Board</h1>
              <p style="font-size: 14px; color: var(--color-text-secondary); max-width: 600px; margin-top: 4px;">
                Team up for case competitions, ask informal favors, and celebrate cohort milestones in one place.
              </p>
            </div>

            <button class="btn btn-primary btn-sm" onclick="Modal.openCreateCommunityPostModal()" style="background: var(--color-accent-amber); border-color: var(--color-accent-amber); color: #1E1B2E; font-weight: 700;">
              ${Icons.plus(15, '#1E1B2E')} Post to Community
            </button>
          </div>

          <!-- Category Filter Chips (§3.3) -->
          <div class="community-filter-row">
            <button class="chip-btn ${typeFilter === 'all' ? 'active' : ''}" data-type="all">
              ${Icons.layers(14)} All Posts (${appState.communityPosts.length})
            </button>
            <button class="chip-btn ${typeFilter === 'team-up' ? 'active' : ''}" data-type="team-up" style="${typeFilter === 'team-up' ? 'background: #5B4FE0; border-color: #5B4FE0;' : ''}">
              🤝 Team-Ups (${appState.communityPosts.filter(p => p.type === 'team-up').length})
            </button>
            <button class="chip-btn ${typeFilter === 'ask' ? 'active' : ''}" data-type="ask" style="${typeFilter === 'ask' ? 'background: #2DBFA0; border-color: #2DBFA0;' : ''}">
              🙋 Asks & Favors (${appState.communityPosts.filter(p => p.type === 'ask').length})
            </button>
            <button class="chip-btn ${typeFilter === 'announcement' ? 'active' : ''}" data-type="announcement" style="${typeFilter === 'announcement' ? 'background: #E85B94; border-color: #E85B94;' : ''}">
              📢 Announcements (${appState.communityPosts.filter(p => p.type === 'announcement').length})
            </button>
          </div>
        </div>

        <!-- Community Feed Posts List -->
        <div class="community-posts-layout">
          ${posts.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 18px;">
              ${posts.map(post => this.renderPostCard(post)).join("")}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-icon">${Icons.messageCircle(32)}</div>
              <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">No community posts in this category</h3>
              <p style="font-size: 14px; margin-bottom: 16px;">Be the first to post a team-up request or announcement!</p>
              <button class="btn btn-primary btn-sm" onclick="Modal.openCreateCommunityPostModal()">
                ${Icons.plus(16)} Create Post
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  },

  renderPostCard(post) {
    const author = appState.getUserById(post.authorId);
    const isMe = author.id === appState.currentUser.id;
    const isInterested = (post.interested || []).includes(appState.currentUser.id);

    let typeBadgeClass = "badge-borrow";
    let typeLabel = "🤝 TEAM-UP";
    if (post.type === "ask") {
      typeBadgeClass = "badge-available";
      typeLabel = "🙋 ASK / FAVOR";
    } else if (post.type === "announcement") {
      typeBadgeClass = "badge-sell";
      typeLabel = "📢 ANNOUNCEMENT";
    }

    const reactions = post.reactions || { congrats: 0, thumbsUp: 0, fire: 0 };
    const interestedUsers = (post.interested || []).map(id => appState.getUserById(id));

    return `
      <div class="community-post-card">
        <!-- Post Header -->
        <div class="post-header-row">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${author.avatar}" class="item-owner-avatar" style="width: 44px; height: 44px;" alt="${author.name}" />
            <div>
              <div style="font-weight: 700; font-size: 15px; color: var(--color-text-primary); display: flex; align-items: center; gap: 6px;">
                ${author.name}
                ${author.verified ? `<span style="color: var(--color-secondary);">${Icons.shieldCheck(14)}</span>` : ''}
              </div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">
                ${author.role || 'PGPM Batchmate'} · ${post.createdAt}
              </div>
            </div>
          </div>

          <span class="badge ${typeBadgeClass}" style="font-size: 11px;">${typeLabel}</span>
        </div>

        <!-- Post Title & Body -->
        <h3 class="community-post-title">${post.title}</h3>
        <p class="community-post-body">${post.description}</p>

        <!-- Topic Tags & Urgency Info -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin: 14px 0;">
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${(post.tags || []).map(t => `<span class="badge" style="background: var(--color-surface-alt); font-size: 11px;">#${t}</span>`).join("")}
          </div>

          ${post.deadline ? `
            <div style="font-size: 12px; color: var(--color-danger); font-weight: 700; display: flex; align-items: center; gap: 4px;">
              ${Icons.clock(13, 'var(--color-danger)')} Deadline: ${post.deadline}
            </div>
          ` : ''}
        </div>

        <!-- Interested Batchmates Section (For Team-Ups) (§3.3) -->
        ${post.type === 'team-up' ? `
          <div class="interested-pill-box">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--color-primary);">
              <span>${Icons.users(14, 'var(--color-primary)')}</span>
              <span>Interested Batchmates (${interestedUsers.length}):</span>
            </div>
            ${interestedUsers.length > 0 ? `
              <div class="interested-avatars-row">
                ${interestedUsers.map(u => `
                  <div class="interested-user-chip" title="${u.name} (${u.role})">
                    <img src="${u.avatar}" style="width: 20px; height: 20px; border-radius: 50%;" alt="${u.name}" />
                    <span>${u.name.split(' ')[0]}</span>
                  </div>
                `).join("")}
              </div>
            ` : `
              <span style="font-size: 12px; color: var(--color-text-muted);">Be the first to show interest!</span>
            `}
          </div>
        ` : ''}

        <!-- Post Footer & Reaction Mechanics (§3.3) -->
        <div class="post-footer-row">
          <!-- Emoji Reactions -->
          <div class="reactions-btn-group">
            <button class="reaction-btn" onclick="CommunityView.handleReaction('${post.id}', 'thumbsUp')">
              👍 <span>${reactions.thumbsUp || 0}</span>
            </button>
            <button class="reaction-btn" onclick="CommunityView.handleReaction('${post.id}', 'congrats')">
              🎉 <span>${reactions.congrats || 0}</span>
            </button>
            <button class="reaction-btn" onclick="CommunityView.handleReaction('${post.id}', 'fire')">
              🔥 <span>${reactions.fire || 0}</span>
            </button>
          </div>

          <!-- CTAs -->
          <div style="display: flex; gap: 8px;">
            ${post.type === 'team-up' && !isMe ? `
              <button class="btn btn-sm ${isInterested ? 'btn-secondary' : 'btn-teal'}" onclick="CommunityView.handleExpressInterest('${post.id}')">
                ${isInterested ? '✓ Interested' : 'I\'m Interested 🙋'}
              </button>
            ` : ''}

            ${!isMe ? `
              <button class="btn btn-sm btn-secondary" onclick="Modal.openChatDrawer('${author.id}', 'Community: ${post.title}', '${typeLabel}')">
                ${Icons.messageSquare(14)} Message ${author.name.split(' ')[0]}
              </button>
            ` : `
              <span class="badge" style="background: var(--color-surface-alt); font-size: 11px;">Your Post</span>
            `}
          </div>
        </div>
      </div>
    `;
  },

  handleReaction(postId, reactionKey) {
    appState.toggleCommunityReaction(postId, reactionKey);
  },

  handleExpressInterest(postId) {
    appState.expressInterestInPost(postId);
    Toast.success("You marked yourself as interested! Poster notified. 🎉");
    Router.renderCurrentRoute();
  },

  afterRender() {
    document.querySelectorAll(".community-filter-row .chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.communityTypeFilter = btn.dataset.type;
        Router.renderCurrentRoute();
      });
    });
  }
};
