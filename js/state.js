// js/state.js - In-Memory App State & Action Handlers for Peerly

class AppState {
  constructor() {
    this.listeners = [];
    this.resetState();
  }

  resetState() {
    // Deep clone initial data
    this.listings = JSON.parse(JSON.stringify(MOCK_LISTINGS));
    this.users = JSON.parse(JSON.stringify(MOCK_USERS));
    this.chats = JSON.parse(JSON.stringify(MOCK_CHAT_SCRIPTS));
    
    this.selectedCampus = MOCK_CAMPUSES[0];
    this.currentUser = { ...this.users[0] }; // Haripriya M.
    this.isOnboarded = true; // Pre-onboarded for smooth preview, with ability to restart
    this.onboardingStep = 1;
    this.onboardingData = {
      campus: MOCK_CAMPUSES[0],
      email: "haripriya.m@greatlakes.edu.in",
      otp: "",
      idUploaded: true
    };

    // Pre-seed an active borrow to showcase the return reminder card & accountability loop
    this.activeBorrows = [
      {
        listingId: "l1",
        title: "Navy Blue Formal Blazer (Size 40 / M)",
        owner: this.users.find(u => u.id === "u_rohan"),
        photoUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
        borrowedDate: "Yesterday",
        returnBy: "Tomorrow, 6:00 PM",
        status: "active",
        location: "Hostel 3, Room 314"
      }
    ];

    this.searchQuery = "";
    this.selectedCategory = "all";
    this.selectedMode = "all"; // all | share | sell | give

    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(this); } catch (e) { console.error("Listener error:", e); }
    });
  }

  // --- Actions ---

  setSearchQuery(query) {
    this.searchQuery = query;
    this.notify();
  }

  setSelectedCategory(catId) {
    this.selectedCategory = catId;
    this.notify();
  }

  setSelectedMode(mode) {
    this.selectedMode = mode;
    this.notify();
  }

  setCampus(campusId) {
    const campus = MOCK_CAMPUSES.find(c => c.id === campusId) || MOCK_CAMPUSES[0];
    this.selectedCampus = campus;
    if (this.currentUser) {
      this.currentUser.campus = campus.name;
    }
    this.notify();
  }

  setPersona(userId) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.currentUser = { ...user };
      this.notify();
    }
  }

  // Onboarding wizard actions
  setOnboardingStep(step) {
    this.onboardingStep = step;
    this.notify();
  }

  updateOnboardingData(data) {
    this.onboardingData = { ...this.onboardingData, ...data };
    this.notify();
  }

  completeOnboarding() {
    this.isOnboarded = true;
    this.currentUser.verified = true;
    this.currentUser.isVerifiedSeller = !!this.onboardingData.idUploaded;
    this.currentUser.email = this.onboardingData.email || this.currentUser.email;
    this.currentUser.campus = this.onboardingData.campus?.name || this.currentUser.campus;
    this.notify();
  }

  // Listing creation action
  addListing(newListingData) {
    const newId = "l_" + Date.now();
    const newListing = {
      id: newId,
      title: newListingData.title,
      category: newListingData.category,
      mode: newListingData.mode, // "share" | "sell" | "give"
      status: "available",
      price: newListingData.mode === "sell" ? Number(newListingData.price) : null,
      originalPrice: newListingData.originalPrice ? Number(newListingData.originalPrice) : null,
      ownerId: this.currentUser.id,
      location: newListingData.location || (this.currentUser.name + "'s Hostel Room"),
      photoUrl: newListingData.photoUrl || PRESET_PHOTO_OPTIONS[0].url,
      description: newListingData.description,
      terms: newListingData.terms || (newListingData.mode === "share" ? "Expected return in 3 days" : "Standard campus pickup"),
      condition: newListingData.condition || "Gently Used",
      createdAt: "Just now",
      returnBy: newListingData.returnBy || null,
      isMultipleUnits: !!newListingData.isMultipleUnits
    };

    // Prepend to listings array so it appears at top of feed!
    this.listings.unshift(newListing);
    
    // Update user stats
    if (this.currentUser.stats) {
      if (newListing.mode === "share") this.currentUser.stats.lent++;
      else if (newListing.mode === "sell") this.currentUser.stats.sold++;
    }

    this.notify();
    return newListing;
  }

  // Request an item (simulated flow)
  requestListing(listingId) {
    const listing = this.listings.find(l => l.id === listingId);
    if (!listing) return null;

    const owner = this.users.find(u => u.id === listing.ownerId) || this.users[1];

    if (listing.mode === "share") {
      listing.status = "borrowed";
      // Calculate return date 3 days from now
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 3);
      const dateStr = returnDate.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      listing.returnBy = dateStr;

      // Add to current user's active borrows
      this.activeBorrows.unshift({
        listingId: listing.id,
        title: listing.title,
        owner: owner,
        photoUrl: listing.photoUrl,
        borrowedDate: "Just now",
        returnBy: dateStr,
        status: "active",
        location: listing.location
      });
      if (this.currentUser.stats) this.currentUser.stats.borrowed++;
    } else if (listing.mode === "sell") {
      listing.status = "sold";
    } else if (listing.mode === "give") {
      listing.status = "claimed";
    }

    // Ensure chat script exists
    if (!this.chats[listingId]) {
      this.chats[listingId] = [
        { sender: owner.id, time: "Just now", text: `Hey ${this.currentUser.name}! Saw your request for ${listing.title} 👋` },
        { sender: "me", time: "Just now", text: `Hi ${owner.name.split(' ')[0]}! Yes, when can I pick it up?` },
        { sender: owner.id, time: "Just now", text: `I'm free at ${listing.location}. Let me know when you're nearby!` }
      ];
    }

    this.notify();
    return listing;
  }

  // Return an active borrow & complete rating
  returnBorrow(listingId, conditionGood, ratingUp) {
    // Update active borrow
    const borrowIndex = this.activeBorrows.findIndex(b => b.listingId === listingId);
    if (borrowIndex !== -1) {
      this.activeBorrows.splice(borrowIndex, 1);
    }

    // Reset listing status back to available
    const listing = this.listings.find(l => l.id === listingId);
    if (listing) {
      listing.status = "available";
      listing.returnBy = null;
      
      // Update owner rating
      const owner = this.users.find(u => u.id === listing.ownerId);
      if (owner && owner.rating) {
        if (ratingUp) owner.rating.up++;
        else owner.rating.down++;
      }
    }

    // Also bump current user's rating for responsible return
    if (this.currentUser && this.currentUser.rating) {
      this.currentUser.rating.up++;
    }

    this.notify();
  }

  // Add a message to chat
  sendChatMessage(listingId, text) {
    if (!this.chats[listingId]) {
      this.chats[listingId] = [];
    }
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chats[listingId].push({
      sender: "me",
      time: now,
      text: text
    });
    this.notify();
  }

  getUserById(userId) {
    if (userId === "u_me" || userId === this.currentUser?.id) return this.currentUser;
    return this.users.find(u => u.id === userId) || this.users[0];
  }

  getFilteredListings() {
    return this.listings.filter(item => {
      // Mode filter
      if (this.selectedMode !== "all" && item.mode !== this.selectedMode) {
        return false;
      }
      // Category filter
      if (this.selectedCategory !== "all" && item.category !== this.selectedCategory) {
        return false;
      }
      // Search query filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        const owner = this.getUserById(item.ownerId);
        const matchOwner = owner ? owner.name.toLowerCase().includes(query) : false;
        if (!matchTitle && !matchDesc && !matchCat && !matchOwner) {
          return false;
        }
      }
      return true;
    });
  }
}

// Global App State Instance
const appState = new AppState();
