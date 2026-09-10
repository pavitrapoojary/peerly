// js/mockData.js - Pre-seeded Mock Data for Peerly v2 Campus Operating System

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
    batch: "PGP 2026",
    role: "1st Year PGPM (Marketing & Strategy)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "haripriya.m@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Ex-Brand consultant. Always looking for case prep partners and finance crash-course tips. Happy to share what I have!",
    background: ["Marketing", "Strategy", "Consulting"],
    skills: ["GTM Strategy", "Consumer Research", "Pitch Decks", "Public Speaking"],
    interests: ["Finance", "Consulting", "Product Management", "Analytics"],
    rating: { up: 14, down: 0 },
    stats: { borrowed: 4, lent: 2, sold: 1 }
  },
  {
    id: "u_jean",
    name: "Jean R.",
    batch: "PGP 2026",
    role: "2nd Year PGPM (Finance)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "jean.r@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Ex-KPMG audit analyst. Have plenty of idle gear from Term 1 & 2. Ping me anytime for calculators or valuation tips!",
    background: ["Finance", "Accounting"],
    skills: ["Excel modeling", "Valuation basics", "DCF Analysis", "Corporate Tax"],
    interests: ["Consulting", "Venture Capital", "Fintech"],
    rating: { up: 18, down: 0 },
    stats: { borrowed: 1, lent: 9, sold: 0 }
  },
  {
    id: "u_meera",
    name: "Meera K.",
    batch: "PGP 2026",
    role: "PGPM (Finance Club Lead)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "meera.k@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "CFA Level 2 candidate. Passionate about equity research, startup term sheets, and peer mentoring.",
    background: ["Finance", "Investment Banking"],
    skills: ["Excel modeling", "Valuation basics", "LBO Modeling", "Mergers & Acquisitions"],
    interests: ["Product Management", "AI Tools", "Consulting"],
    rating: { up: 23, down: 0 },
    stats: { borrowed: 2, lent: 14, sold: 0 }
  },
  {
    id: "u_thiru",
    name: "Thirupathi M.",
    batch: "PGP 2026",
    role: "2nd Year PGPM (Operations)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "thirupathi.m@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Bulk campus distributor. Bringing quality wholesale study essentials and room gear directly to hostel blocks.",
    background: ["Operations", "Supply Chain"],
    skills: ["Six Sigma", "Logistics Optimization", "Vendor Sourcing", "Negotiation"],
    interests: ["E-Commerce", "Retail Tech", "Operations"],
    rating: { up: 42, down: 0 },
    stats: { borrowed: 0, lent: 0, sold: 38 }
  },
  {
    id: "u_rohan",
    name: "Rohan K.",
    batch: "PGP 2026",
    role: "PGPM Cohort 2026 (Consulting Club)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "rohan.k@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Hostel 3, Room 314. Ex-Bain associate. Feel free to borrow blazers for SIP interviews or mock case rounds.",
    background: ["Consulting", "Strategy"],
    skills: ["Guesstimates", "Market Sizing", "MECE Structuring", "Resume Teardown"],
    interests: ["Product Management", "Venture Capital", "Operations"],
    rating: { up: 21, down: 0 },
    stats: { borrowed: 3, lent: 12, sold: 2 }
  },
  {
    id: "u_priya",
    name: "Priya S.",
    batch: "PGP 2026",
    role: "PGPM Marketing Specialist",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "priya.s@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Hostel 1. Passionate about digital marketing campaigns, UI/UX storytelling, and case comps.",
    background: ["Marketing", "Design"],
    skills: ["Figma Prototyping", "Growth Marketing", "Social Media Strategy", "Copywriting"],
    interests: ["Product Management", "Design", "Consulting"],
    rating: { up: 19, down: 1 },
    stats: { borrowed: 2, lent: 5, sold: 8 }
  },
  {
    id: "u_vikram",
    name: "Vikram A.",
    batch: "PGP 2027",
    role: "PGPM Sports Committee Lead",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "vikram.a@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Badminton and Table Tennis enthusiast. Keeping campus active and organizing weekend inter-hostel cups!",
    background: ["Operations", "Sports Management"],
    skills: ["Event Operations", "Team Management", "Tournament Coordination"],
    interests: ["Operations", "Supply Chain", "Fitness Tech"],
    rating: { up: 15, down: 0 },
    stats: { borrowed: 1, lent: 8, sold: 0 }
  },
  {
    id: "u_ananya",
    name: "Ananya D.",
    batch: "PGP 2026",
    role: "PGPM Analytics & Tech Specialist",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "ananya.d@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: true,
    bio: "Ex-McKinsey data analyst. Happy to trade Python/SQL tips, product metrics breakdown, or mock interview practice.",
    background: ["Analytics", "Engineering", "Product Management"],
    skills: ["Python for Data", "SQL & Dashboards", "Product Analytics", "A/B Testing"],
    interests: ["Product Management", "AI Tools", "Strategy"],
    rating: { up: 27, down: 0 },
    stats: { borrowed: 0, lent: 16, sold: 0 }
  },
  {
    id: "u_arjun",
    name: "Arjun Verma",
    batch: "PGP 2026",
    role: "PGPM (Product & Tech Club)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "arjun.v@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Building side projects on weekends. National finalist in 2 product teardown challenges. Let's team up for hackathons!",
    background: ["Engineering", "Product Management"],
    skills: ["PRD Writing", "Wireframing", "Product Metrics", "Tech Architecture"],
    interests: ["Consulting", "Finance", "Venture Capital"],
    rating: { up: 12, down: 0 },
    stats: { borrowed: 2, lent: 4, sold: 0 }
  },
  {
    id: "u_tanvi",
    name: "Tanvi Desai",
    batch: "PGP 2027",
    role: "PGPM 1st Year (Strategy & General Mgmt)",
    campus: "Great Lakes Institute of Management (GLIM Chennai)",
    email: "tanvi.d@greatlakes.edu.in",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    verified: true,
    isVerifiedSeller: false,
    bio: "Interested in corporate strategy and consulting case comps. Looking for study buddies for Term 2 midterm prep.",
    background: ["Consulting", "Strategy"],
    skills: ["Case Cracking", "Business Storytelling", "Framework Synthesis"],
    interests: ["Finance", "Marketing", "Consulting"],
    rating: { up: 8, down: 0 },
    stats: { borrowed: 3, lent: 1, sold: 0 }
  }
];

const MOCK_LISTINGS = [
  {
    id: "l1",
    title: "Navy Blue Formal Blazer (Size 40 / M)",
    category: "Formal Wear",
    mode: "share",
    status: "available",
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

// v2: Reverse "Need" Postings (Seeker Requests)
const MOCK_NEEDS = [
  {
    id: "n1",
    title: "Bluetooth Portable Speaker (JBL / Boat)",
    category: "Electronics",
    neededBy: "This Saturday, 7:00 PM",
    terms: "borrow-only", // "borrow-only" | "willing-to-pay" | "either"
    budget: null,
    seekerId: "u_vikram",
    location: "Hostel 4 Ground Floor",
    description: "Need a punchy speaker for our hostel block badminton celebration & terrace dinner this Saturday night. Will return clean Sunday morning!",
    status: "open",
    createdAt: "3 hours ago"
  },
  {
    id: "n2",
    title: "Formal Charcoal Grey / Navy Blazer (Size 38 / Small)",
    category: "Formal Wear",
    neededBy: "Tomorrow, 8:30 AM",
    terms: "either",
    budget: "₹200 / borrow",
    seekerId: "u_tanvi",
    location: "Hostel 1, Room 204",
    description: "Urgent! Selected for McKinsey guest case final tomorrow at 9 AM and left my main suit at home in Bangalore. Size 38 or Slim 40 works.",
    status: "open",
    createdAt: "4 hours ago"
  },
  {
    id: "n3",
    title: "Financial Calculator (TI-84 or Casio FC-200V)",
    category: "Electronics",
    neededBy: "Thursday (Midterm Week)",
    terms: "borrow-only",
    budget: null,
    seekerId: "u_arjun",
    location: "Hostel 3, Room 118",
    description: "My calculator screen has vertical dead lines right before the Corporate Valuation midterm. Need one for 3 days of revision & exam.",
    status: "open",
    createdAt: "1 day ago"
  },
  {
    id: "n4",
    title: "Macroeconomics Krugman & Wells Textbook (Hardcopy)",
    category: "Books & Notes",
    neededBy: "Friday evening",
    terms: "willing-to-pay",
    budget: "₹400",
    seekerId: "u_me",
    location: "Hostel 1 Common Area",
    description: "Looking to buy a 2nd hand physical copy with clean margins for Term 2 macro theory. UPI on instant pickup.",
    status: "open",
    createdAt: "1 day ago"
  },
  {
    id: "n5",
    title: "HDMI to USB-C Display Adapter Dongle",
    category: "Electronics",
    neededBy: "Today, 4:00 PM",
    terms: "borrow-only",
    budget: null,
    seekerId: "u_priya",
    location: "Auditorium Room B",
    description: "MacBook presentation at 4:30 PM in the auditorium. The podium cable is HDMI only. Need to borrow for 45 minutes!",
    status: "open",
    createdAt: "2 hours ago"
  },
  {
    id: "n6",
    title: "Wireless Presentation Clicker with Laser Pointer",
    category: "Electronics",
    neededBy: "Tomorrow, 2:00 PM",
    terms: "either",
    budget: null,
    seekerId: "u_rohan",
    location: "Hostel 3 Lobby",
    description: "For our live corporate sponsor deck pitch. Need a reliable clicker with USB receiver.",
    status: "open",
    createdAt: "2 days ago"
  },
  {
    id: "n7",
    title: "Yoga Mat or Exercise Foam Mat",
    category: "Sports Gear",
    neededBy: "This Sunday morning",
    terms: "borrow-only",
    budget: null,
    seekerId: "u_ananya",
    location: "Hostel 1, Room 310",
    description: "Campus sunrise yoga workshop on the football ground. Need an extra mat for my roommate.",
    status: "open",
    createdAt: "3 days ago"
  },
  {
    id: "n8",
    title: "Noise-Cancelling Over-Ear Headphones (Sony / Bose)",
    category: "Electronics",
    neededBy: "Exam Week (Mon - Thu)",
    terms: "willing-to-pay",
    budget: "₹300 fee",
    seekerId: "u_jean",
    location: "Hostel 2",
    description: "Need pure focus for CFA Level 2 study sprint. Willing to pay a rental fee or trade financial coaching!",
    status: "open",
    createdAt: "4 days ago"
  },
  {
    id: "n9",
    title: "Steam Iron / Garment Steamer",
    category: "Formal Wear",
    neededBy: "Today, 6:00 PM",
    terms: "borrow-only",
    budget: null,
    seekerId: "u_tanvi",
    location: "Hostel 1 Wing B",
    description: "Need to press my formal shirt and suit trousers before tomorrow's recruiter dinner. 20-minute borrow.",
    status: "open",
    createdAt: "5 hours ago"
  },
  {
    id: "n10",
    title: "DSLR Camera or Gimbal (Canon / Sony / DJI)",
    category: "Electronics",
    neededBy: "Next Friday (Cultural Fest)",
    terms: "either",
    budget: "₹500 / day",
    seekerId: "u_priya",
    location: "Campus Media Room",
    description: "Documenting our flagship annual management conclave. Seeking a reliable mirrorless camera or stabilizer gimbal.",
    status: "open",
    createdAt: "5 days ago"
  }
];

// v2: Community Board Posts (§3.3)
const MOCK_COMMUNITY_POSTS = [
  {
    id: "c1",
    type: "team-up", // "team-up" | "ask" | "announcement"
    title: "Need 1 more teammate for Tata Crucible Campus Edition 🏆",
    authorId: "u_rohan",
    description: "We are a 2-person team (Consulting + Marketing background) aiming for the regional finals. Looking for someone strong in Business Trivia, General Awareness, and Tech history. Prelims are this Sunday!",
    tags: ["Quiz", "Competition", "Consulting"],
    deadline: "2026-09-14",
    interested: ["u_ananya", "u_arjun", "u_tanvi"],
    reactions: { congrats: 8, thumbsUp: 14, fire: 6 },
    createdAt: "2 hours ago"
  },
  {
    id: "c2",
    type: "team-up",
    title: "Seeking 1 Finance Specialist for Bain & Co. Case Comp",
    authorId: "u_me",
    description: "Forming a 3-person team for Bain Case Challenge 2026. We have qualitative research and deck structuring locked down; need a teammate to handle DCF valuation modeling and financial synergies!",
    tags: ["Case Comp", "Finance", "Strategy"],
    deadline: "2026-09-18",
    interested: ["u_jean", "u_meera"],
    reactions: { congrats: 12, thumbsUp: 19, fire: 9 },
    createdAt: "5 hours ago"
  },
  {
    id: "c3",
    type: "ask",
    title: "Can someone review my Summer Internship SOP / Cover Letter? ✍️",
    authorId: "u_tanvi",
    description: "Applying for FMCG brand marketing roles. Drafted a 1-page statement of purpose and would love 15 minutes of feedback from a senior or marketing club member on tone and impact metrics.",
    tags: ["Resume", "SOP Review", "Marketing"],
    deadline: "Tonight, 11:00 PM",
    interested: ["u_priya", "u_me"],
    reactions: { congrats: 2, thumbsUp: 11, fire: 1 },
    createdAt: "1 day ago"
  },
  {
    id: "c4",
    type: "announcement",
    title: "Just launched 'The Hostel Desk' Podcast Ep. 1 🎙️",
    authorId: "u_priya",
    description: "Episode 1 is live on Spotify! Featuring alumni from BCG & Unilever sharing real unvarnished truths about summer placements, campus survival, and navigating MBA burn-out. Drop by and let us know what you think!",
    tags: ["Podcast", "Alumni", "Campus Initiative"],
    deadline: null,
    interested: [],
    reactions: { congrats: 34, thumbsUp: 28, fire: 19 },
    createdAt: "1 day ago"
  },
  {
    id: "c5",
    type: "team-up",
    title: "Product Hackathon: Need a UI/UX Designer & Wireframer",
    authorId: "u_arjun",
    description: "Entering the Unstop Product Strategy Challenge. We have backend tech logic and business model ready, need someone who loves Figma and user journey mapping to create slick interactive prototype slides.",
    tags: ["Product", "Hackathon", "UI/UX"],
    deadline: "2026-09-20",
    interested: ["u_priya"],
    reactions: { congrats: 5, thumbsUp: 15, fire: 4 },
    createdAt: "2 days ago"
  },
  {
    id: "c6",
    type: "ask",
    title: "Left my blue HydroFlask in Academic Block 2 (Room 201) 🔍",
    authorId: "u_vikram",
    description: "Has anyone seen a matte navy flask left behind after the 3 PM Decision Science lecture? Has my name sticker on bottom. Coffee on me if found!",
    tags: ["Lost & Found", "Campus Favor"],
    deadline: null,
    interested: [],
    reactions: { congrats: 0, thumbsUp: 7, fire: 0 },
    createdAt: "2 days ago"
  },
  {
    id: "c7",
    type: "announcement",
    title: "Peer Python Study Circle starts this Wednesday in Library Room 3 💻",
    authorId: "u_ananya",
    description: "Organizing an informal 4-week peer study group for non-engineers learning Python, Pandas, and data visualization for marketing analytics. Free for all batchmates, bring your laptop!",
    tags: ["Python", "Study Group", "Analytics"],
    deadline: "2026-09-16",
    interested: ["u_tanvi", "u_me", "u_jean", "u_rohan"],
    reactions: { congrats: 22, thumbsUp: 45, fire: 18 },
    createdAt: "3 days ago"
  },
  {
    id: "c8",
    type: "ask",
    title: "Need mock interview partner for Tier-1 Consulting SIP slots",
    authorId: "u_rohan",
    description: "Looking for someone to run 2 reciprocal cases (Market Entry & Profitability) under timed 45-min conditions with candid feedback.",
    tags: ["Consulting", "Mock Cases", "Interviews"],
    deadline: "This Weekend",
    interested: ["u_me", "u_tanvi"],
    reactions: { congrats: 4, thumbsUp: 16, fire: 3 },
    createdAt: "3 days ago"
  }
];

// v2: Curated Opportunities Radar (§3.4)
const MOCK_OPPORTUNITIES = [
  {
    id: "o1",
    title: "Unstop — National Product Case Challenge 2026",
    category: "Product Management",
    tags: ["Product Management", "Consulting", "Strategy"],
    deadline: "2026-09-11", // Within 4 days -> Closing Soon!
    source: "Unstop",
    organizer: "Flipkart & Swiggy",
    prizePool: "₹5,00,000 + PPI for APM Roles",
    eligibility: "1st & 2nd Year MBA / PGP Students",
    description: "Solve a real-world user retention problem for quick-commerce apps. Submit a 5-slide PRD deck covering user personas, wireframes, and business impact.",
    linkUrl: "https://unstop.com"
  },
  {
    id: "o2",
    title: "Tata Crucible Campus Quiz & Business Hackathon",
    category: "Competitions",
    tags: ["Strategy", "Marketing", "Consulting"],
    deadline: "2026-09-12", // Within 5 days -> Closing Soon!
    source: "Tata Group",
    organizer: "Tata Sons",
    prizePool: "₹2,50,000 + National Trophy",
    eligibility: "Full-time Post-Graduate Students",
    description: "India's highest-profile business quiz covering corporate history, brand wars, and disruptive market innovations.",
    linkUrl: "https://tatacrucible.com"
  },
  {
    id: "o3",
    title: "BCG Strategy Case Challenge (SIP Fast-Track)",
    category: "Case Competitions",
    tags: ["Consulting", "Finance", "Strategy"],
    deadline: "2026-09-15", // Within 8 days
    source: "BCG Campus",
    organizer: "Boston Consulting Group",
    prizePool: "Direct Final Interview Shortlists",
    eligibility: "Batch of 2026 (PGPM / PGP)",
    description: "A comprehensive ESG decarbonization case for a legacy steel manufacturer. Form teams of 3–4 with balanced analytical and strategic thinking.",
    linkUrl: "https://bcg.com/careers"
  },
  {
    id: "o4",
    title: "Aditya Birla Group Leadership Scholarship 2026",
    category: "Scholarships",
    tags: ["Finance", "Strategy", "General Mgmt"],
    deadline: "2026-09-13", // Within 6 days -> Closing Soon!
    source: "Campus Notice Board",
    organizer: "Aditya Birla Centre",
    prizePool: "₹1,75,000 Annual Tuition Grant",
    eligibility: "Top 25% Academic Rank in Term 1",
    description: "Recognizes emerging leaders with outstanding academic distinction, campus governance contributions, and ethical vision.",
    linkUrl: "https://adityabirlascholars.net"
  },
  {
    id: "o5",
    title: "Bain & Company True North Case Competition",
    category: "Case Competitions",
    tags: ["Consulting", "Finance", "Analytics"],
    deadline: "2026-09-22",
    source: "Unstop",
    organizer: "Bain & Co.",
    prizePool: "₹3,00,000 + Mentorship with Partners",
    eligibility: "Pre-Final Year Management Students",
    description: "High-impact private equity due diligence case on an omnichannel healthcare rollup. Evaluate revenue synergies and EBITDA multiples.",
    linkUrl: "https://bain.com"
  },
  {
    id: "o6",
    title: "Amazon ACE Challenge (Operations & Supply Chain)",
    category: "Competitions",
    tags: ["Operations", "Supply Chain", "Analytics"],
    deadline: "2026-09-24",
    source: "Unstop",
    organizer: "Amazon India",
    prizePool: "₹3,50,000 + Leadership PPIs",
    eligibility: "Open to 1st and 2nd Year MBA",
    description: "Optimize last-mile hub dispatch algorithms and electric vehicle fleet routing for tier-2 Indian logistics networks.",
    linkUrl: "https://amazon.jobs"
  },
  {
    id: "o7",
    title: "Goldman Sachs Global Investment Research Internship",
    category: "Internships",
    tags: ["Finance", "Investment Banking", "Analytics"],
    deadline: "2026-09-10", // Within 3 days -> Closing Soon!
    source: "LinkedIn Jobs",
    organizer: "Goldman Sachs India",
    prizePool: "Summer Analyst Stipend: ₹1,50,000/mo",
    eligibility: "Finance Majors & CFA Candidates",
    description: "Build financial models, track Asian equity markets, and draft initiation reports for renewable energy conglomerates.",
    linkUrl: "https://goldmansachs.com"
  },
  {
    id: "o8",
    title: "Google Summer APM (Associate Product Manager) Intern",
    category: "Internships",
    tags: ["Product Management", "AI Tools", "Analytics"],
    deadline: "2026-09-28",
    source: "LinkedIn Jobs",
    organizer: "Google India",
    prizePool: "Competitive Stipend + PPO Opportunity",
    eligibility: "MBA graduating in 2026 / 2027",
    description: "Drive product strategy for Gemini and Google Workspace. Lead user research, write technical specs, and partner with UX & ML engineers.",
    linkUrl: "https://careers.google.com"
  },
  {
    id: "o9",
    title: "L'Oréal Brandstorm 2026 Innovation Challenge",
    category: "Competitions",
    tags: ["Marketing", "Design", "Consumer Research"],
    deadline: "2026-10-05",
    source: "Unstop",
    organizer: "L'Oréal Global",
    prizePool: "3-Month Intrapreneurship Mission in Paris",
    eligibility: "Teams of 3 students under 30",
    description: "Reinvent the future of beauty tech through AI diagnostics, sustainable packaging, and hyper-personalized consumer journeys.",
    linkUrl: "https://brandstorm.loreal.com"
  },
  {
    id: "o10",
    title: "HUL L.I.M.E. (Leaders in Management Excellence) Season 17",
    category: "Case Competitions",
    tags: ["Marketing", "Strategy", "Consulting"],
    deadline: "2026-09-19",
    source: "Campus Notice Board",
    organizer: "Hindustan Unilever",
    prizePool: "₹10,00,000 + Global Finalist Seats",
    eligibility: "Select Premier B-Schools (GLIM, IIMs, XLRI)",
    description: "India's premier marketing case challenge. Tackle real FMCG market expansion dilemmas and present to the HUL Management Committee.",
    linkUrl: "https://hul.co.in"
  },
  {
    id: "o11",
    title: "OpNext — McKinsey Operations Excellence Challenge",
    category: "Case Competitions",
    tags: ["Operations", "Consulting", "Supply Chain"],
    deadline: "2026-09-30",
    source: "Unstop",
    organizer: "McKinsey & Company",
    prizePool: "Fast-track interview invitations",
    eligibility: "Operations & Tech-focused MBAs",
    description: "Digital manufacturing transformation case focusing on predictive maintenance and Industry 4.0 IoT deployment in automotive plants.",
    linkUrl: "https://mckinsey.com"
  },
  {
    id: "o12",
    title: "Sequoia Surge Fellowship for Campus Founders",
    category: "Scholarships",
    tags: ["Venture Capital", "Product Management", "Strategy"],
    deadline: "2026-10-15",
    source: "LinkedIn",
    organizer: "Peak XV Partners (Sequoia India)",
    prizePool: "$25,000 Non-Dilutive Grant + Mentorship",
    eligibility: "Student Founders building scalable tech",
    description: "Early-stage support for campus founders building SaaS, Consumer Tech, and AI agents. Direct access to Peak XV partners and founder network.",
    linkUrl: "https://peakxv.com"
  },
  {
    id: "o13",
    title: "FinShiksha Equity Valuation & Financial Modeling Contest",
    category: "Competitions",
    tags: ["Finance", "Analytics", "Investment Banking"],
    deadline: "2026-09-14", // Within 7 days -> Closing Soon!
    source: "Unstop",
    organizer: "FinShiksha",
    prizePool: "₹1,00,000 + Portfolio Review",
    eligibility: "All MBA students",
    description: "Build an institutional-grade DCF & Relative valuation model for a listed Indian EV battery manufacturer. Submit model sheet and 10-page report.",
    linkUrl: "https://finshiksha.com"
  },
  {
    id: "o14",
    title: "Kearney Digital Transformation Case Cup",
    category: "Case Competitions",
    tags: ["Consulting", "Strategy", "Analytics"],
    deadline: "2026-10-02",
    source: "Unstop",
    organizer: "Kearney India",
    prizePool: "₹2,00,000 + Associate PPIs",
    eligibility: "Teams of 3 management students",
    description: "Design a comprehensive omnichannel banking transformation strategy for a leading public sector bank in Southeast Asia.",
    linkUrl: "https://kearney.com"
  },
  {
    id: "o15",
    title: "CRED Product Design & Fintech Fellowship",
    category: "Internships",
    tags: ["Product Management", "Design", "Fintech"],
    deadline: "2026-09-25",
    source: "LinkedIn Jobs",
    organizer: "CRED India",
    prizePool: "Stipend: ₹1,20,000/mo + Housing",
    eligibility: "Product & Design thinkers",
    description: "Work directly with Kunal Shah and CRED product designers to craft high-trust consumer experiences in neo-banking and commerce.",
    linkUrl: "https://cred.club"
  }
];

// v2: Peer Pairing Simulated Matches (§3.2c)
const MOCK_PAIRINGS = [
  {
    partnerId: "u_meera",
    date: "Next Wednesday, Sep 16",
    sharedTopic: "Finance & Valuation Modeling",
    icebreaker: "You both listed 'Finance' as a mutual interest — ask Meera about her breakdown of the Bajaj Auto valuation case!",
    suggestedLocation: "Campus Amphitheatre Cafe or Discussion Room 2"
  },
  {
    partnerId: "u_arjun",
    date: "Next Friday, Sep 18",
    sharedTopic: "Product Teardowns & AI Tools",
    icebreaker: "Arjun is exploring Product Management and won 2 hackathons — ask him about wireframing his recent micro-app on Unstop!",
    suggestedLocation: "Library Foyer / Ground Floor Lounge"
  },
  {
    partnerId: "u_rohan",
    date: "Next Monday, Sep 21",
    sharedTopic: "Consulting Case Structuring",
    icebreaker: "Rohan has done 30+ mock cases for Bain & BCG — compare notes on MECE profitability trees!",
    suggestedLocation: "Hostel 3 Common Deck"
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
  ],
  n1: [
    { sender: "me", time: "04:15 PM", text: "Hey Vikram! Saw your Need post for a Bluetooth speaker for Saturday night 🎶" },
    { sender: "u_vikram", time: "04:16 PM", text: "Hey Haripriya! Yes, we have our block celebration. Do you have one we could borrow?" },
    { sender: "me", time: "04:18 PM", text: "Yes, I have a Boat Stone 1200 with great bass in Hostel 1 Room 108. You can pick it up Saturday afternoon!" },
    { sender: "u_vikram", time: "04:20 PM", text: "Lifesaver! I will pick it up at 3 PM and return it Sunday morning spotless 🙌" }
  ],
  u_meera: [
    { sender: "me", time: "11:20 AM", text: "Hi Meera! Saw your profile on Connect — I'm looking to brush up on DCF modeling before SIP season 👋" },
    { sender: "u_meera", time: "11:22 AM", text: "Hey Haripriya! Happy to help! We could grab coffee at the Amphitheatre cafe and walk through a clean 3-statement model template." },
    { sender: "me", time: "11:25 AM", text: "That would be incredible! Are you free tomorrow after 5 PM?" },
    { sender: "u_meera", time: "11:27 AM", text: "Yes, 5:30 PM works great. Bring your laptop with Excel! ☕" }
  ]
};

const MOCK_ROADMAP_ITEMS = [
  {
    phase: "Phase 1 (Current v2 Campus OS)",
    status: "Live in Prototype",
    items: [
      "Four Core Pillars Live: Things (Marketplace & Needs), Skills (Connect), Knowledge (Opportunities), Help (Community)",
      "Reverse 'Need' Postings with inline duplicate match nudges to surface hidden campus supply",
      "Connect Networking Rails: 'People like you' + 'People to learn from' with skill-overlap reasons",
      "Zero-Effort Peer Pairing ('Coffee Roulette') with instant simulation and icebreaker prompts",
      "Personalized Opportunities Radar with client-side interest tag matching and Closing-Soon badges",
      "Community Board for team-ups, peer favors, and announcements with instant interest tracking"
    ]
  },
  {
    phase: "Phase 2 (Post-Pilot / Production Scaling)",
    status: "Next Quarter",
    items: [
      "Scheduled Opportunities Ingestion: Automated daily scraper/API connectors (Unstop, Internshala, LinkedIn, Noticeboards)",
      "Production Peer Pairing Engine: Bi-weekly cohort matching algorithm with calendar invites",
      "Hostel Room Drop & Smart Locker Integration across residential campus wings",
      "Automated UPI Escrow & Security Deposit holds for high-value gear",
      "Batch WhatsApp / Telegram Bot notification bridges for instant handoff pings"
    ]
  },
  {
    phase: "Phase 3 (Inter-B-School Network)",
    status: "Future Vision",
    items: [
      "Multi-Campus Inter-B-School Network (IIMs, ISB, XLRI, GLIM) for national case comp team formation",
      "Integrated Skill Exchange Credit economy (earn hours by teaching, spend on borrowing)",
      "Alumni Knowledge & Mentorship Portal with verified corporate alumni badges",
      "Student Entrepreneur Storefronts for custom campus merchandise & merchandise presales"
    ]
  }
];
