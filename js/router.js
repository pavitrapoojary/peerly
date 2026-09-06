// js/router.js - Vanilla Hash-Based Client-Side Router for Peerly

const Router = {
  routes: {
    "#/": LandingView,
    "#/onboarding": OnboardingView,
    "#/feed": FeedView,
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
    const isTyping = activeElement && (activeElement.id === "feed-search-input" || activeElement.id === "chat-text-input");

    if (isStateUpdate && isTyping) {
      // For live search typing, selectively update items grid rather than full page wipe
      if (view === FeedView) {
        const grid = document.querySelector(".item-grid, .empty-state");
        if (grid) {
          const items = appState.getFilteredListings();
          if (items.length > 0) {
            const tempDiv = document.createElement("div");
            tempDiv.className = "item-grid";
            tempDiv.innerHTML = items.map(item => FeedView.renderItemCard(item)).join("");
            grid.replaceWith(tempDiv);
          } else {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = FeedView.renderEmptyState();
            grid.replaceWith(tempDiv.firstElementChild);
            document.getElementById("btn-reset-filters")?.addEventListener("click", () => {
              appState.setSearchQuery("");
              appState.setSelectedCategory("all");
              appState.setSelectedMode("all");
            });
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
