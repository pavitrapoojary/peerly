// js/router.js - Vanilla Hash-Based Client-Side Router for Peerly v2

const Router = {
  routes: {
    "#/": LandingView,
    "#/onboarding": OnboardingView,
    "#/feed": FeedView,
    "#/connect": ConnectView,
    "#/community": CommunityView,
    "#/opportunities": OpportunitiesView,
    "#/new-listing": NewListingView,
    "#/profile": ProfileView
  },

  init() {
    window.addEventListener("hashchange", () => this.handleRouteChange());
    window.addEventListener("DOMContentLoaded", () => this.handleRouteChange());

    // Subscribe to state changes so UI remains fresh
    appState.subscribe(() => {
      this.renderCurrentRoute(true); // Soft update
    });
  },

  navigate(hash) {
    window.location.hash = hash;
  },

  getRouteInfo() {
    let hash = window.location.hash || "#/";
    if (!hash.startsWith("#/")) hash = "#/";

    // Check dynamic routes like #/item/:id
    if (hash.startsWith("#/item/")) {
      const id = hash.replace("#/item/", "");
      return {
        view: ItemDetailView,
        param: id,
        hash: "#/item"
      };
    }

    const view = this.routes[hash] || LandingView;
    return {
      view: view,
      param: null,
      hash: hash
    };
  },

  handleRouteChange() {
    window.scrollTo(0, 0);
    this.renderCurrentRoute();
  },

  renderCurrentRoute(isStateUpdate = false) {
    const appEl = document.getElementById("app");
    if (!appEl) return;

    const { view, param } = this.getRouteInfo();

    // Do not wipe out active focused inputs during search typing
    const activeElement = document.activeElement;
    const isTyping = activeElement && (activeElement.id === "feed-search-input" || activeElement.id === "chat-text-input" || activeElement.id === "seek-need-title" || activeElement.id === "need-title-input");

    if (isStateUpdate && isTyping) {
      if (view === FeedView) {
        const isNeeds = appState.marketplaceTab === "needs";
        if (isNeeds) {
          const grid = document.querySelector(".needs-grid, .empty-state");
          if (grid) {
            const needs = appState.getFilteredNeeds();
            if (needs.length > 0) {
              const tempDiv = document.createElement("div");
              tempDiv.className = "needs-grid";
              tempDiv.innerHTML = needs.map(n => FeedView.renderNeedCard(n)).join("");
              grid.replaceWith(tempDiv);
            }
          }
        } else {
          const grid = document.querySelector(".item-grid, .empty-state");
          if (grid) {
            const items = appState.getFilteredListings();
            if (items.length > 0) {
              const tempDiv = document.createElement("div");
              tempDiv.className = "item-grid";
              tempDiv.innerHTML = items.map(item => FeedView.renderItemCard(item)).join("");
              grid.replaceWith(tempDiv);
            }
          }
        }
        return;
      }
    }

    // Full page render
    const navHtml = Navbar.render();
    const viewHtml = view.render(param);
    const footerHtml = Footer.render();

    appEl.innerHTML = `
      ${navHtml}
      <main style="flex: 1;">
        ${viewHtml}
      </main>
      ${footerHtml}
    `;

    // Execute post-render script hooks
    if (view.afterRender) {
      view.afterRender(param);
    }
  }
};
