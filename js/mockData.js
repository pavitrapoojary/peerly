// js/mockData.js - Pre-seeded Mock Data for Peerly MVP

const MOCK_CAMPUSES = [
  { id: "glim-chennai", name: "Great Lakes Institute of Management (GLIM Chennai)", domain: "greatlakes.edu.in", studentsCount: "1,200+ Active" },
  { id: "iim-bangalore", name: "IIM Bangalore (IIMB)", domain: "iimb.ac.in", studentsCount: "1,800+ Active" },
  { id: "isb-hyderabad", name: "Indian School of Business (ISB Hyderabad)", domain: "isb.edu", studentsCount: "950+ Active" },
  { id: "xlri-jamshedpur", name: "XLRI — Xavier School of Management (Jamshedpur)", domain: "xlri.ac.in", studentsCount: "1,100+ Active" },
  { id: "spjimr-mumbai", name: "SPJIMR (Mumbai)", domain: "spjimr.org", studentsCount: "850+ Active" }
];

const MOCK_CATEGORIES = [
  { id: "all", label: "All Items", icon: "layers" },
  { id: "Formal Wear", label: "Formal Wear", icon: "briefcase" },
  { id: "Electronics", label: "Electronics", icon: "sparkles" },
  { id: "Books & Notes", label: "Books & Notes", icon: "bookOpen" },
  { id: "Sports Gear", label: "Sports Gear", icon: "flame" },
  { id: "Skills & Coaching", label: "Skills & Coaching", icon: "lightbulb" },
  { id: "Stationery", label: "Stationery", icon: "tag" },
  { id: "Bulk Resale", label: "Bulk Resale", icon: "repeat" }
];

const MOCK_USERS = [
  {
    id: "u_me",
    name: "Haripriya M.",
    role: "1st Year PGPM (Marketing & Strategy)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "haripriya.m@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Always looking for case prep resources and study notes. Happy to share what I have!",
    rating: { up: 14, down: 0 },
    stats: { borrowed: 4, lent: 2, sold: 1 }
  },
  {
    id: "u_jean",
    name: "Jean R.",
    role: "2nd Year PGPM (Finance)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "jean.r@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Have plenty of idle gear from Term 1 & 2. Ping me anytime if you need calculators or suits!",
    rating: { up: 18, down: 0 },
    stats: { borrowed: 1, lent: 9, sold: 0 }
  },
  {
    id: "u_thiru",
    name: "Thirupathi M.",
    role: "2nd Year PGPM (Operations)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "thirupathi.m@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Bulk campus distributor. Bringing quality wholesale study essentials directly to hostel blocks.",
    rating: { up: 42, down: 0 },
    stats: { borrowed: 0, lent: 0, sold: 38 }
  },
  {
    id: "u_rohan",
    name: "Rohan K.",
    role: "PGPM Cohort 2025 (Consulting)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "rohan.k@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Hostel 3, Room 314. Feel free to borrow for SIP interviews.",
    rating: { up: 21, down: 0 },
    stats: { borrowed: 3, lent: 12, sold: 2 }
  },
  {
    id: "u_priya",
    name: "Priya S.",
    role: "PGPM Finance Club Core",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "priya.s@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Hostel 1. Graduating soon so clearing out my books and case binders.",
    rating: { up: 19, down: 1 },
    stats: { borrowed: 2, lent: 5, sold: 8 }
  },
  {
    id: "u_vikram",
    name: "Vikram A.",
    role: "PGPM Sports Committee",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "vikram.a@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Badminton and Table Tennis enthusiast. Keeping campus active!",
    rating: { up: 15, down: 0 },
    stats: { borrowed: 1, lent: 8, sold: 0 }
  },
  {
    id: "u_ananya",
    name: "Ananya D.",
    role: "PGPM Analytics Specialist",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "ananya.d@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Ex-McKinsey analyst. Happy to trade financial modeling tips or mock interview practice.",
    rating: { up: 27, down: 0 },
    stats: { borrowed: 0, lent: 16, sold: 0 }
  }
];

const MOCK_LISTINGS = [
  {
    id: "l1",
    title: "Navy Blue Formal Blazer (Size 40 / M)",
    category: "Formal Wear",
    mode: "share", // "share" | "sell" | "give"
    status: "available", // "available" | "borrowed" | "sold"
    price: null,
    ownerId: "u_rohan",
    location: "Hostel 3, 3rd Floor",
    photoUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
    description: "Raymond wool blend navy blazer in mint condition. Perfect for summer placement interviews, case finals, and corporate guest lectures. Freshly dry-cleaned.",
    terms: "Borrow for up to 3 days. Please return on hanger and keep in suit cover.",
    condition: "Like New (Worn 2 times)",
    createdAt: "2 hours ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l2",
    title: "Texas Instruments TI-84 Plus CE Graphic Calculator",
    category: "Electronics",
    mode: "share",
    status: "available",
    price: null,
    ownerId: "u_jean",
    location: "Hostel 2, Room 204",
    photoUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80",
    description: "Essential for Advanced Corporate Finance, Statistics, and Derivatives midterm exam prep. Comes with USB charging cable and preloaded TVM financial solvers.",
    terms: "Borrow for exam week (up to 5 days). Keep screen protected in hard case.",
    condition: "Excellent (Battery at 100%)",
    createdAt: "5 hours ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l3",
    title: "Term 1 Financial Accounting & Formula Cheat Sheets",
    category: "Books & Notes",
    mode: "give",
    status: "available",
    price: 0,
    ownerId: "u_me",
    location: "Hostel 1 Common Area",
    photoUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    description: "Complete handwritten summary binder covering Balance Sheet ratios, Cash Flow mechanics, and standard exam case traps with color-coded bookmarks.",
    terms: "100% Free gift for any Term 1 junior needing help before end-terms. No return needed!",
    condition: "Spiral Bound, highlighted with notes",
    createdAt: "1 day ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l4",
    title: "Kotler & Keller Marketing Management (16th Edition)",
    category: "Books & Notes",
    mode: "sell",
    status: "available",
    price: 450,
    originalPrice: 1200,
    ownerId: "u_priya",
    location: "Hostel 1, Room 112",
    photoUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    description: "Standard MBA core marketing textbook in clean condition. No torn pages, minimal pencil markings in margin cases. Retails for ₹1,200+ on Amazon.",
    terms: "Direct campus sale. UPI on pickup at Hostel 1 lobby.",
    condition: "Very Good",
    createdAt: "1 day ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l5",
    title: "Yonex Nanoray 10F Badminton Racket + 3 Feather Shuttles",
    category: "Sports Gear",
    mode: "share",
    status: "available",
    price: null,
    ownerId: "u_vikram",
    location: "Sports Complex / Hostel 4",
    photoUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80",
    description: "Lightweight graphite racket with fresh BG-65 strings at 24lbs tension. Perfect for evening matches at the campus badminton court.",
    terms: "Borrow for same-day evening sessions (return by 11:00 PM).",
    condition: "Good Condition",
    createdAt: "2 days ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l6",
    title: "Excel 3-Statement Financial Modeling & DCF Coaching (1 hr)",
    category: "Skills & Coaching",
    mode: "share",
    status: "available",
    price: null,
    ownerId: "u_ananya",
    location: "Library Discussion Room 2 / Zoom",
    photoUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    description: "1-on-1 walkthrough of building a clean 3-statement model from scratch, linking circular interest schedules, and running sensitivity tables for IB/PE case prep.",
    terms: "Peer skill exchange — bring your laptop with Excel installed. Coffee or case tips welcome!",
    condition: "1 Hour Interactive Session",
    createdAt: "3 days ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l7",
    title: "Insulated Double-Wall Stainless Steel Water Bottle (1000ml)",
    category: "Bulk Resale",
    mode: "sell",
    status: "available",
    price: 299,
    originalPrice: 799,
    ownerId: "u_thiru",
    location: "Hostel 2, Room 102",
    photoUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    description: "Brand new matte black vacuum insulated flask. Keeps ice cold for 24h or coffee hot for 12h during long study marathon nights. 8 units left in batch stock.",
    terms: "Verified Seller bulk lot. Sealed in box with warranty card. Cash or GPay on delivery.",
    condition: "Brand New in Box",
    createdAt: "3 days ago",
    returnBy: null,
    isMultipleUnits: true
  },
  {
    id: "l8",
    title: "Magnetic Whiteboard Marker Set (4 Colors) + Eraser",
    category: "Stationery",
    mode: "give",
    status: "available",
    price: 0,
    ownerId: "u_priya",
    location: "Academic Block 2 Study Room",
    photoUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80",
    description: "Set of Black, Blue, Red, and Green markers + magnetic felt duster. All pens have 80%+ ink left. Great for group brainstorm sessions.",
    terms: "Take it for your study room! No return needed.",
    condition: "Gently Used",
    createdAt: "4 days ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l9",
    title: "Casio FX-991EX ClassWiz Advanced Scientific Calculator",
    category: "Electronics",
    mode: "share",
    status: "available",
    price: null,
    ownerId: "u_jean",
    location: "Hostel 2, Room 204",
    photoUrl: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80",
    description: "High-resolution Natural Textbook Display calculator. 552 functions including matrix calculations and probability distributions for Decision Science exams.",
    terms: "Borrow for up to 4 days during quiz/exam weeks.",
    condition: "Very Good",
    createdAt: "4 days ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l10",
    title: "Case Competition Deck Structure & Storyboarding Review",
    category: "Skills & Coaching",
    mode: "share",
    status: "available",
    price: null,
    ownerId: "u_jean",
    location: "Campus Amphitheatre / Online",
    photoUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80",
    description: "National finalist in 3 corporate case comps. Will give objective 30-min slide-by-slide feedback on executive summary, MECE structure, and presentation flow.",
    terms: "Skill trade / mutual practice. Share your PPT draft 2 hours before.",
    condition: "45 Min Peer Review",
    createdAt: "5 days ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l11",
    title: "Classic Black Derby Leather Formal Shoes (UK 8 / EU 42)",
    category: "Formal Wear",
    mode: "share",
    status: "available",
    price: null,
    ownerId: "u_rohan",
    location: "Hostel 3, Room 314",
    photoUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80",
    description: "Genuine leather formal shoes, freshly polished with high-shine wax. Ideal if your formal footwear got delayed in shipping or for placement week.",
    terms: "Borrow for placement interview slots (up to 2 days). Please wipe clean before returning.",
    condition: "Like New",
    createdAt: "6 days ago",
    returnBy: null,
    isMultipleUnits: false
  },
  {
    id: "l12",
    title: "Table Tennis Pro Bats Pair (Stiga Carbon) + 6 DHS Balls",
    category: "Sports Gear",
    mode: "share",
    status: "available",
    price: null,
    ownerId: "u_vikram",
    location: "Hostel 4 Recreation Room",
    photoUrl: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=600&auto=format&fit=crop&q=80",
    description: "High-spin ITTF approved rubbers on carbon-ply blades. Comes with protective zippered racket bag and 3-star tournament balls.",
    terms: "Borrow for rec room tournaments (return by 11:30 PM).",
    condition: "Excellent",
    createdAt: "1 week ago",
    returnBy: null,
    isMultipleUnits: false
  }
];

const PRESET_PHOTO_OPTIONS = [
  { id: "blazer", label: "Navy Blazer", url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80" },
  { id: "calc", label: "Calculator", url: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80" },
  { id: "notes", label: "Study Notes", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80" },
  { id: "book", label: "Textbook", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80" },
  { id: "racket", label: "Sports Racket", url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80" },
  { id: "gadget", label: "Bottle / Item", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80" }
];

const MOCK_CHAT_SCRIPTS = {
  l1: [
    { sender: "u_rohan", time: "10:14 AM", text: "Hey Haripriya! Saw your borrow request for the Navy Blazer 👋" },
    { sender: "me", time: "10:15 AM", text: "Hi Rohan! Yes, I have a consulting case presentation tomorrow morning at 9 AM. Is it available for pickup today?" },
    { sender: "u_rohan", time: "10:17 AM", text: "Absolutely! It's dry-cleaned and hanging in my room (Hostel 3, Room 314). I'm around until 8:00 PM." },
    { sender: "me", time: "10:19 AM", text: "Awesome! I'll drop by at 5:30 PM right after the Marketing lecture." },
    { sender: "u_rohan", time: "10:20 AM", text: "Sounds perfect! See you at 5:30 at Hostel 3 lobby 🙌" }
  ],
  l2: [
    { sender: "u_jean", time: "02:30 PM", text: "Hey! Just accepted your request for the TI-84 Plus Graphic Calculator 🧮" },
    { sender: "me", time: "02:32 PM", text: "Thanks Jean! Midterms are in 2 days and my old Casio stopped turning on." },
    { sender: "u_jean", time: "02:33 PM", text: "Haha don't worry, this one has full charge and comes with the charging cable. I'm in Hostel 2, Room 204." },
    { sender: "me", time: "02:35 PM", text: "Can I pick it up around 6 PM near the canteen?" },
    { sender: "u_jean", time: "02:36 PM", text: "Sure, let's meet at the canteen entrance table at 6 PM! 👍" }
  ],
  l4: [
    { sender: "u_priya", time: "11:05 AM", text: "Hey! Glad you want the Kotler Marketing textbook 📚" },
    { sender: "me", time: "11:06 AM", text: "Hi Priya! Is ₹450 fine via GPay when we meet?" },
    { sender: "u_priya", time: "11:07 AM", text: "Yes, GPay is totally fine! Are you free around 4 PM near the Library foyer?" },
    { sender: "me", time: "11:08 AM", text: "Yes, perfect! See you at 4 PM in the library foyer." }
  ],
  l7: [
    { sender: "u_thiru", time: "03:10 PM", text: "Hi! Thanks for reserving the 1000ml Insulated Bottle 💧" },
    { sender: "me", time: "03:12 PM", text: "Hey Thiru! Love the matte black color. Is it brand new in the box?" },
    { sender: "u_thiru", time: "03:13 PM", text: "100% factory sealed with double-wall insulation. I have it ready in Hostel 2 Room 102." },
    { sender: "me", time: "03:15 PM", text: "Great, I'll pay ₹299 via UPI upon collection this evening!" }
  ]
};

const MOCK_ROADMAP_ITEMS = [
  {
    phase: "Phase 1 (Current MVP)",
    status: "Live in Prototype",
    items: [
      "Simulated .edu email verification & instant campus gated access",
      "P2P Browse, Live Search, & Mode Filters (Share / Sell / Give Away)",
      "Under-60s rapid listing flow with bulk seller verification nudge",
      "Accountability Layer: return-by dates, condition checks, and post-exchange ratings",
      "Trust & Identity: Verified Student & Verified Seller badges"
    ]
  },
  {
    phase: "Phase 2 (Post-Pilot / Campus Launch)",
    status: "Next Quarter",
    items: [
      "Hostel Room Drop & Smart Locker Integration across campus wings",
      "Automated UPI Escrow & Security Deposit holds for high-value items",
      "Batch WhatsApp / Telegram Bot notification bridge for instant handoff pings",
      "Multi-Campus Inter-B-School Network (IIMs, ISB, XLRI, GLIM)"
    ]
  },
  {
    phase: "Phase 3 (Ecosystem Scale)",
    status: "Future Vision",
    items: [
      "Campus Alumni Item Donation & Hand-me-down clearinghouse at convocation",
      "Integrated Skill Exchange Credit economy (earn hours by teaching, spend on borrowing)",
      "Student Entrepreneur Storefronts for custom campus merchandise"
    ]
  }
];
