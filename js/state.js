// js/state.js - In-Memory App State & Action Handlers for Peerly v2 Campus OS

class AppState {
  constructor() {
    this.listeners = [];
    this.resetState();
  }

  resetState() {
    // Deep clone initial data
    this.listings = JSON.parse(JSON.stringify(MOCK_LISTINGS));
    this.users = JSON.parse(JSON.stringify(MOCK_USERS));
    this.needs = JSON.parse(JSON.stringify(MOCK_NEEDS));
    this.communityPosts = JSON.parse(JSON.stringify(MOCK_COMMUNITY_POSTS));
    this.opportunities = JSON.parse(JSON.stringify(MOCK_OPPORTUNITIES));
    this.chats = JSON.parse(JSON.stringify(MOCK_CHAT_SCRIPTS));
    
    this.selectedCampus = MOCK_CAMPUSES[0];
    this.currentUser = { ...this.users[0] }; // Haripriya M.
    this.isOnboarded = true; // Pre-onboarded for smooth preview
    this.onboardingStep = 1;
    this.onboardingData = {
      campus: MOCK_CAMPUSES[0],
      email: "haripriya.m@greatlakes.edu.in",
      otp: "",
      idUploaded: true,
      batch: "PGP 2026",
      background: ["Marketing", "Strategy", "Consulting"],
      skills: ["GTM Strategy", "Consumer Research", "Pitch Decks", "Public Speaking"],
      interests: ["Finance", "Consulting", "Product Management", "Analytics"]
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

    // Connect & Peer Pairing State (§3.2)
    this.peerPairingOptIn = true;
    this.activePairing = MOCK_PAIRINGS[0];
    this.connections = ["u_rohan", "u_priya", "u_ananya"];

    // Marketplace Feed Filter State
    this.marketplaceTab = "browse"; // "browse" | "needs"
    this.searchQuery = "";
    this.selectedCategory = "all";
    this.selectedMode = "all"; // all | share | sell | give

    // Opportunities Filter State (§3.4)
    this.opportunitiesCategory = "all";
    this.opportunitiesSource = "all";
    this.followedSources = ["Unstop", "Tata Group", "BCG Campus", "Campus Notice Board", "LinkedIn Jobs"];

    // Community Filter State (§3.3)
    this.communityTypeFilter = "all"; // all | team-up | ask | announcement

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

  // --- General Navigation & Filter Actions ---

  setMarketplaceTab(tab) {
    this.marketplaceTab = tab;
    this.notify();
  }

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

  // --- Onboarding & Profile Actions ---

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
    if (this.onboardingData.batch) this.currentUser.batch = this.onboardingData.batch;
    if (this.onboardingData.background) this.currentUser.background = this.onboardingData.background;
    if (this.onboardingData.skills) this.currentUser.skills = this.onboardingData.skills;
    if (this.onboardingData.interests) this.currentUser.interests = this.onboardingData.interests;
    this.notify();
  }

  updateUserProfile(updatedData) {
    this.currentUser = { ...this.currentUser, ...updatedData };
    const idx = this.users.findIndex(u => u.id === this.currentUser.id);
    if (idx !== -1) {
      this.users[idx] = { ...this.currentUser };
    }
    this.notify();
  }

  // --- Marketplace Item Listings Actions ---

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

    this.listings.unshift(newListing);
    
    if (this.currentUser.stats) {
      if (newListing.mode === "share") this.currentUser.stats.lent++;
      else if (newListing.mode === "sell") this.currentUser.stats.sold++;
    }

    this.notify();
    return newListing;
  }

  requestListing(listingId) {
    const listing = this.listings.find(l => l.id === listingId);
    if (!listing) return null;

    const owner = this.users.find(u => u.id === listing.ownerId) || this.users[1];

    if (listing.mode === "share") {
      listing.status = "borrowed";
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 3);
      const dateStr = returnDate.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      listing.returnBy = dateStr;

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

  returnBorrow(listingId, conditionGood, ratingUp) {
    const borrowIndex = this.activeBorrows.findIndex(b => b.listingId === listingId);
    if (borrowIndex !== -1) {
      this.activeBorrows.splice(borrowIndex, 1);
    }

    const listing = this.listings.find(l => l.id === listingId);
    if (listing) {
      listing.status = "available";
      listing.returnBy = null;
      
      const owner = this.users.find(u => u.id === listing.ownerId);
      if (owner && owner.rating) {
        if (ratingUp) owner.rating.up++;
        else owner.rating.down++;
      }
    }

    if (this.currentUser && this.currentUser.rating) {
      this.currentUser.rating.up++;
    }

    this.notify();
  }

  // --- Marketplace Reverse "Need" Actions (§3.1) ---

  addNeed(needData) {
    const newNeed = {
      id: "n_" + Date.now(),
      title: needData.title,
      category: needData.category,
      neededBy: needData.neededBy || "This week",
      terms: needData.terms || "either", // "borrow-only" | "willing-to-pay" | "either"
      budget: needData.budget || null,
      seekerId: this.currentUser.id,
      location: needData.location || (this.currentUser.name + "'s Hostel Room"),
      description: needData.description,
      status: "open",
      createdAt: "Just now"
    };

    this.needs.unshift(newNeed);
    this.notify();
    return newNeed;
  }

  respondToNeed(needId) {
    const need = this.needs.find(n => n.id === needId);
    if (!need) return null;

    const seeker = this.getUserById(need.seekerId);

    // Seed chat script with seeker
    if (!this.chats[need.id]) {
      this.chats[need.id] = [
        { sender: "me", time: "Just now", text: `Hey ${seeker.name.split(' ')[0]}! I saw your request for "${need.title}" — I have one in my room (${this.currentUser.name.split(' ')[0]}'s room) that you can use! 👋` },
        { sender: seeker.id, time: "Just now", text: `Oh fantastic! That saves my day. When can I drop by to pick it up?` },
        { sender: "me", time: "Just now", text: `I'm in my hostel right now. Drop by whenever convenient!` }
      ];
    }

    this.notify();
    return need;
  }

  findMatchingListingsForNeed(query, category) {
    if (!query || query.trim().length < 3) return [];
    const q = query.toLowerCase().trim();
    const words = q.split(" ").filter(w => w.length > 2);

    return this.listings.filter(l => {
      const titleLower = l.title.toLowerCase();
      const descLower = l.description.toLowerCase();
      const catMatch = category && l.category === category;
      const wordMatch = words.some(w => titleLower.includes(w) || descLower.includes(w));
      return (wordMatch || catMatch) && l.status === "available";
    }).slice(0, 3);
  }

  // --- Connect & Peer Pairing Actions (§3.2) ---

  connectWithUser(userId) {
    if (!this.connections.includes(userId)) {
      this.connections.push(userId);
    }
    const user = this.getUserById(userId);
    if (!this.chats[userId]) {
      this.chats[userId] = [
        { sender: "me", time: "Just now", text: `Hi ${user.name.split(' ')[0]}! Connected with you on Peerly 👋` },
        { sender: user.id, time: "Just now", text: `Hey ${this.currentUser.name.split(' ')[0]}! Great to connect. Let's catch up sometime on campus!` }
      ];
    }
    this.notify();
  }

  togglePeerPairing() {
    this.peerPairingOptIn = !this.peerPairingOptIn;
    this.notify();
  }

  simulatePeerPairing() {
    // Pick next simulated pairing or randomize
    const nextIdx = Math.floor(Math.random() * MOCK_PAIRINGS.length);
    this.activePairing = MOCK_PAIRINGS[nextIdx];
    this.peerPairingOptIn = true;
    this.notify();
    return this.activePairing;
  }

  getPeopleLikeYou() {
    const myBatch = this.currentUser.batch || "PGP 2026";
    const myBg = this.currentUser.background || [];
    return this.users.filter(u => {
      if (u.id === this.currentUser.id) return false;
      const sameBatch = u.batch === myBatch;
      const overlapBg = u.background?.some(b => myBg.includes(b));
      return sameBatch || overlapBg;
    });
  }

  getPeopleToLearnFrom() {
    const myInterests = this.currentUser.interests || [];
    const myBg = this.currentUser.background || [];
    return this.users.filter(u => {
      if (u.id === this.currentUser.id) return false;
      // People who have skills that match my interests, or have different background
      const matchingSkills = u.skills?.filter(s => 
        myInterests.some(interest => s.toLowerCase().includes(interest.toLowerCase()) || interest.toLowerCase().includes(s.toLowerCase()))
      ) || [];
      const distinctBg = !u.background?.some(b => myBg.includes(b));
      return matchingSkills.length > 0 || (distinctBg && u.skills && u.skills.length > 0);
    });
  }

  // --- Community Board Actions (§3.3) ---

  addCommunityPost(postData) {
    const newPost = {
      id: "c_" + Date.now(),
      type: postData.type, // "team-up" | "ask" | "announcement"
      title: postData.title,
      authorId: this.currentUser.id,
      description: postData.description,
      tags: postData.tags || ["Campus"],
      deadline: postData.deadline || null,
      interested: [],
      reactions: { congrats: 0, thumbsUp: 1, fire: 0 },
      createdAt: "Just now"
    };

    this.communityPosts.unshift(newPost);
    this.notify();
    return newPost;
  }

  toggleCommunityReaction(postId, reactionKey) {
    const post = this.communityPosts.find(p => p.id === postId);
    if (!post) return;
    if (!post.reactions) post.reactions = { congrats: 0, thumbsUp: 0, fire: 0 };
    post.reactions[reactionKey] = (post.reactions[reactionKey] || 0) + 1;
    this.notify();
  }

  expressInterestInPost(postId) {
    const post = this.communityPosts.find(p => p.id === postId);
    if (!post) return;
    if (!post.interested) post.interested = [];
    if (!post.interested.includes(this.currentUser.id)) {
      post.interested.push(this.currentUser.id);
    }
    this.notify();
  }

  // --- Opportunities Radar Personalized Engine (§3.4) ---

  getPersonalizedOpportunities() {
    const userInterests = this.currentUser.interests || [];
    
    // Tag overlap calculation
    const recommended = [];
    const allOthers = [];

    this.opportunities.forEach(opp => {
      const matchScore = opp.tags.filter(t => 
        userInterests.some(i => i.toLowerCase() === t.toLowerCase() || t.toLowerCase().includes(i.toLowerCase()))
      ).length;

      if (matchScore > 0) {
        recommended.push({ ...opp, matchScore, isRecommended: true });
      } else {
        allOthers.push({ ...opp, matchScore: 0, isRecommended: false });
      }
    });

    // Sort recommended by highest match score
    recommended.sort((a, b) => b.matchScore - a.matchScore);

    return {
      recommended,
      allOthers,
      total: this.opportunities.length
    };
  }

  // --- Chat Actions ---

  sendChatMessage(threadId, text) {
    if (!this.chats[threadId]) {
      this.chats[threadId] = [];
    }
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chats[threadId].push({
      sender: "me",
      time: now,
      text: text
    });
    this.notify();
  }

  // --- Helper Queries ---

  getUserById(userId) {
    if (userId === "u_me" || userId === this.currentUser?.id || userId === "me") return this.currentUser;
    return this.users.find(u => u.id === userId) || this.users[0];
  }

  getFilteredListings() {
    return this.listings.filter(item => {
      if (this.selectedMode !== "all" && item.mode !== this.selectedMode) {
        return false;
      }
      if (this.selectedCategory !== "all" && item.category !== this.selectedCategory) {
        return false;
      }
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

  getFilteredNeeds() {
    return this.needs.filter(need => {
      if (this.selectedCategory !== "all" && need.category !== this.selectedCategory) {
        return false;
      }
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        const matchTitle = need.title.toLowerCase().includes(query);
        const matchDesc = need.description.toLowerCase().includes(query);
        const matchCat = need.category.toLowerCase().includes(query);
        const seeker = this.getUserById(need.seekerId);
        const matchSeeker = seeker ? seeker.name.toLowerCase().includes(query) : false;
        if (!matchTitle && !matchDesc && !matchCat && !matchSeeker) {
          return false;
        }
      }
      return true;
    });
  }
}

// Global App State Instance
const appState = new AppState();
