/**
 * SAGE & CLAY — Core Client-Side Engine
 * 
 * Implements a stateful, interactive client-side Single Page Application (SPA)
 * with hash routing, persistent cart/wishlist, interactive quiz, checkout validation,
 * custom SVG illustration engine, and accessibility focus traps.
 */

// ==========================================
// 1. DATABASE / MOCK DATA
// ==========================================

const PRODUCTS_DB = [
  {
    id: 1,
    name: "Calming Sage Gel Cleanser",
    tagline: "Clarifies and calms blemish-prone skin.",
    price: 24.00,
    rating: 4.8,
    reviewsCount: 124,
    category: "Cleansers",
    concern: "Acne",
    skinTypes: ["Oily", "Sensitive", "Combination"],
    badges: ["Bestseller", "Cruelty-Free"],
    stock: 15,
    description: "A calming gel cleanser infused with organic Sage Extract and 1.5% Salicylic Acid to gently clarify blemishes, soothe irritation, and respect your skin's delicate moisture barrier.",
    ingredients: ["Aqua", "Sage Extract", "Salicylic Acid (1.5%)", "Glycerin", "Centella Asiatica", "Chamomile Extract", "Green Tea Extract"],
    keyIngredients: {
      "Sage Extract": "A botanical antioxidant that helps soothe skin redness and control excess sebum production.",
      "Salicylic Acid (1.5%)": "An oil-soluble beta-hydroxy acid (BHA) that penetrates deep into pores to clear blockages and prevent breakouts."
    },
    usage: "Massage 1-2 pumps onto damp skin. Rinse thoroughly with lukewarm water. Use morning and night. For Gen Z and acne-prone skin, follow with our Barrier Boost Serum.",
    caution: "Contains active acids. Always patch test before first use. If irritation occurs, reduce frequency.",
    colorAccent: "hsl(120, 10%, 40%)", // Sage
    colorBottle: "hsl(120, 15%, 85%)",
    volume: "150ml",
    image: "images/calming_sage_cleanser.png"
  },
  {
    id: 2,
    name: "Barrier Boost Ceramide Serum",
    tagline: "Restores hydration and rebuilds moisture barriers.",
    price: 38.00,
    rating: 4.9,
    reviewsCount: 248,
    category: "Serums",
    concern: "Sensitivity",
    skinTypes: ["Dry", "Sensitive", "Combination"],
    badges: ["New", "Cruelty-Free", "Low Stock"],
    stock: 3,
    description: "A rich, milky serum formulated with a 5-Ceramide complex and Hyaluronic Acid to intensely hydrate, lock in moisture, and rebuild compromised skin barriers.",
    ingredients: ["Aqua", "Ceramides (NP/AP/EOP)", "Hyaluronic Acid (2%)", "Niacinamide (4%)", "Squalane", "Panthenol", "Allantoin"],
    keyIngredients: {
      "Ceramides (NP/AP/EOP)": "Essential lipids that mimic the skin's natural barrier to lock in moisture and protect against environmental stressors.",
      "Hyaluronic Acid (2%)": "A powerful humectant that draws water into the skin, plumping fine lines and providing deep cellular hydration."
    },
    usage: "Apply 3-4 drops onto clean, damp face and neck. Gently press in. Follow with your favorite moisturizer.",
    caution: "None. Suitable for sensitive skin post-treatment.",
    colorAccent: "hsl(15, 35%, 45%)", // Terracotta
    colorBottle: "hsl(15, 25%, 90%)",
    volume: "50ml",
    image: "images/barrier_boost_serum.png"
  },
  {
    id: 3,
    name: "Terracotta Glow Moisturizer",
    tagline: "Nourishes skin for a warm, radiant finish.",
    price: 32.00,
    rating: 4.7,
    reviewsCount: 95,
    category: "Moisturizers",
    concern: "Dullness",
    skinTypes: ["Combination", "Dry", "Oily"],
    badges: ["Bestseller"],
    stock: 42,
    description: "A nourishing, vitamin C-infused gel cream that restores instant radiance, refines skin texture, and provides 24-hour hydration without heavy residue.",
    ingredients: ["Aqua", "Vitamin C (3-O-Ethyl Ascorbic Acid)", "Niacinamide (5%)", "Glycerin", "Jojoba Esters", "Licorice Root Extract", "Vitamin E"],
    keyIngredients: {
      "Vitamin C (3-O-Ethyl Ascorbic Acid)": "A highly stable, non-irritating vitamin C derivative that brightens dull skin, evens tone, and boosts collagen.",
      "Niacinamide (5%)": "Vitamin B3 that refines the appearance of pores, smooths texture, and strengthens the skin's surface."
    },
    usage: "Apply a nickel-sized amount evenly to face and neck as the final moisturizing step in your routine.",
    caution: "Always wear SPF during the day when using Vitamin C products.",
    colorAccent: "hsl(12, 75%, 52%)", // Clay/Coral
    colorBottle: "hsl(35, 20%, 93%)",
    volume: "60ml",
    image: "images/terracotta_glow_moisturizer.png"
  },
  {
    id: 4,
    name: "Mineral Shield SPF 50 Sunscreen",
    tagline: "Broad spectrum protection with zero white cast.",
    price: 28.00,
    rating: 4.6,
    reviewsCount: 180,
    category: "Sunscreen",
    concern: "Sensitivity",
    skinTypes: ["Sensitive", "Dry", "Oily", "Combination"],
    badges: ["Cruelty-Free"],
    stock: 24,
    description: "A lightweight, 100% mineral sunscreen containing Zinc Oxide and soothing botanicals. Leaves zero white cast and provides complete broad-spectrum UVA/UVB protection.",
    ingredients: ["Zinc Oxide (20%)", "Aqua", "Green Tea Extract", "Aloe Vera", "Squalane", "Tocopherol", "Bisabolol"],
    keyIngredients: {
      "Zinc Oxide (20%)": "A mineral UV filter that sits on top of the skin to reflect harmful solar rays. Gentle on highly sensitive skin.",
      "Green Tea Extract": "A botanical antioxidant that helps soothe skin and neutralize free radicals induced by UV exposure."
    },
    usage: "Apply generously as the final step of your morning routine at least 15 minutes before sun exposure.",
    caution: "Reapply every 2 hours if active or sweating.",
    colorAccent: "hsl(35, 18%, 86%)", // Sand
    colorBottle: "hsl(35, 25%, 95%)",
    volume: "75ml",
    image: "images/mineral_shield_sunscreen.png"
  },
  {
    id: 5,
    name: "AHA Clarifying Exfoliant Mask",
    tagline: "Resurfaces texture and absorbs excess oil.",
    price: 26.00,
    rating: 4.5,
    reviewsCount: 82,
    category: "Masks & Exfoliants",
    concern: "Acne",
    skinTypes: ["Oily", "Combination"],
    badges: ["New", "Sold Out"],
    stock: 0,
    description: "An intensive wash-off clay mask containing 8% Lactic and Glycolic acids combined with Bentonite clay to resurface texture and absorb excess oil.",
    ingredients: ["Bentonite Clay", "Lactic Acid (5%)", "Glycolic Acid (3%)", "Aqua", "Kaolin", "Colloidal Oatmeal", "Witch Hazel"],
    keyIngredients: {
      "Lactic Acid (5%)": "A gentle AHA that exfoliates surface skin cells while functioning as a natural humectant to draw in hydration.",
      "Glycolic Acid (3%)": "An exfoliating acid with small molecular size that deeply refines skin tone, texture, and dullness."
    },
    usage: "Apply an even layer to clean skin. Leave on for 8-10 minutes. Rinse thoroughly with warm water. Use 1-2 times weekly at night.",
    caution: "Contains alpha hydroxy acids (AHA) that may increase sun sensitivity. Age-sensitive active product: [NEEDS LEGAL REVIEW] not recommended for kids under 16 without parental guidance. Use SPF daily.",
    colorAccent: "hsl(120, 10%, 35%)", // Deep Sage
    colorBottle: "hsl(120, 5%, 80%)",
    volume: "50ml",
    image: "images/aha_exfoliant_mask.png"
  },
  {
    id: 6,
    name: "Restorative Peptide Eye Cream",
    tagline: "Softens fine lines and drains eye area puffiness.",
    price: 34.00,
    rating: 4.8,
    reviewsCount: 112,
    category: "Eye Care",
    concern: "Anti-Aging",
    skinTypes: ["Dry", "Sensitive", "Combination", "Oily"],
    badges: ["Bestseller", "Cruelty-Free"],
    stock: 35,
    description: "A specialized peptide-rich eye cream targeting fine lines, dark circles, and puffiness. Calms the delicate eye area with botanical comfort.",
    ingredients: ["Aqua", "Acetyl Hexapeptide-8", "Caffeine", "Glycerin", "Shea Butter", "Cucumber Extract", "Coenzyme Q10"],
    keyIngredients: {
      "Acetyl Hexapeptide-8": "A specialized peptide that relaxes facial micro-tension to visibly soften fine lines and crow's feet.",
      "Caffeine": "A natural vasoconstrictor that tightens skin tissue and drains excess puffiness for a refreshed, bright look."
    },
    usage: "Gently pat a pea-sized amount around the entire eye orbital area using your ring finger. Use morning and night.",
    caution: "Avoid direct contact with eyes.",
    colorAccent: "hsl(15, 35%, 45%)", // Terracotta
    colorBottle: "hsl(35, 20%, 94%)",
    volume: "15ml",
    image: "images/restorative_eye_cream.png"
  },
  {
    id: 7,
    name: "Gentle Oat Milk Cream Cleanser",
    tagline: "Melts away impurities without stripping.",
    price: 22.00,
    rating: 4.7,
    reviewsCount: 89,
    category: "Cleansers",
    concern: "Sensitivity",
    skinTypes: ["Dry", "Sensitive"],
    badges: ["New", "Cruelty-Free"],
    stock: 38,
    description: "A pillowy cream cleanser built on colloidal oat milk and glycerin that dissolves makeup and daily grime while actively comforting reactive, redness-prone skin.",
    ingredients: ["Aqua", "Colloidal Oatmeal", "Glycerin", "Squalane", "Oat Kernel Oil", "Panthenol", "Bisabolol"],
    keyIngredients: {
      "Colloidal Oatmeal": "A skin-protectant that forms a soothing film over the skin, easing itching, tightness, and visible redness.",
      "Squalane": "A skin-identical lipid that cushions the cleanse so skin never feels squeaky or stripped."
    },
    usage: "Massage onto dry or damp skin morning and night. Rinse with lukewarm water or remove with a soft cloth.",
    caution: "None. Formulated for highly reactive skin.",
    colorAccent: "hsl(35, 18%, 60%)", // Warm oat
    colorBottle: "hsl(35, 25%, 92%)",
    volume: "150ml",
    image: "images/gentle_oat_cleanser.png"
  },
  {
    id: 8,
    name: "Vitamin C Radiance Serum",
    tagline: "Visibly brightens and evens skin tone.",
    price: 42.00,
    rating: 4.8,
    reviewsCount: 203,
    category: "Serums",
    concern: "Brightening",
    skinTypes: ["Dry", "Combination", "Oily"],
    badges: ["Bestseller", "Cruelty-Free"],
    stock: 21,
    description: "A golden antioxidant serum pairing 10% stabilized Vitamin C with Ferulic Acid to fade dark spots, defend against pollution, and restore a lit-from-within glow.",
    ingredients: ["Aqua", "Ascorbic Acid (10%)", "Ferulic Acid", "Vitamin E", "Glycerin", "Sea Buckthorn Extract", "Sodium Hyaluronate"],
    keyIngredients: {
      "Ascorbic Acid (10%)": "Pure Vitamin C that interrupts excess pigment production to visibly fade dark spots and even tone.",
      "Ferulic Acid": "A plant-derived antioxidant that stabilizes Vitamin C and doubles its photo-protective power."
    },
    usage: "Apply 3-4 drops to clean, dry skin each morning before moisturizer. Follow with SPF.",
    caution: "Mild tingling on first uses is normal. Always wear SPF during the day when using Vitamin C products.",
    colorAccent: "hsl(30, 60%, 50%)", // Amber
    colorBottle: "hsl(30, 40%, 88%)",
    volume: "30ml",
    image: "images/vitamin_c_radiance_serum.png"
  },
  {
    id: 9,
    name: "Retinol Renewal Night Serum",
    tagline: "Smooths fine lines while you sleep.",
    price: 46.00,
    rating: 4.9,
    reviewsCount: 167,
    category: "Serums",
    concern: "Anti-Aging",
    skinTypes: ["Combination", "Dry"],
    badges: ["New"],
    stock: 12,
    description: "An encapsulated 0.3% retinol night serum cushioned in squalane and ceramides that resurfaces fine lines and refines pores with minimal irritation.",
    ingredients: ["Squalane", "Retinol (0.3%)", "Ceramides (NP/AP)", "Bakuchiol", "Vitamin E", "Jojoba Seed Oil", "Rosehip Extract"],
    keyIngredients: {
      "Retinol (0.3%)": "An encapsulated vitamin A derivative that accelerates cell turnover to smooth fine lines and refine texture with slow, gentle release.",
      "Bakuchiol": "A botanical retinol-partner that boosts collagen signaling while calming the irritation retinoids can cause."
    },
    usage: "Use at night only. Start 2 nights per week, building to nightly as tolerated. Apply 2-3 drops after cleansing, before moisturizer.",
    caution: "Contains Retinol. Do not combine with AHA/BHA exfoliants on the same night. Not recommended during pregnancy. Always apply SPF the following morning. [NEEDS LEGAL REVIEW]",
    colorAccent: "hsl(345, 30%, 45%)", // Plum
    colorBottle: "hsl(345, 25%, 88%)",
    volume: "30ml",
    image: "images/retinol_renewal_serum.png"
  },
  {
    id: 10,
    name: "Deep Hydration Night Cream",
    tagline: "Overnight moisture recovery for thirsty skin.",
    price: 36.00,
    rating: 4.7,
    reviewsCount: 141,
    category: "Moisturizers",
    concern: "Hydration",
    skinTypes: ["Dry", "Sensitive", "Combination"],
    badges: ["Cruelty-Free"],
    stock: 27,
    description: "A rich rose-toned sleeping cream that pairs 5-weight Hyaluronic Acid with shea butter and ceramides to replenish overnight water loss and seal it in until morning.",
    ingredients: ["Aqua", "Multi-Weight Hyaluronic Acid", "Shea Butter", "Ceramides (NP/EOP)", "Glycerin", "Evening Primrose Oil", "Allantoin"],
    keyIngredients: {
      "Multi-Weight Hyaluronic Acid": "Five molecular sizes of hyaluronic acid hydrate every layer of the skin, from surface dew to deep plumping.",
      "Shea Butter": "A lipid-rich botanical butter that seals hydration beneath an occlusive, breathable veil overnight."
    },
    usage: "Apply a generous layer as the final step of your evening routine. For an intensive mask, apply double thickness twice weekly.",
    caution: "None. Fragrance-free and suitable for sensitive skin.",
    colorAccent: "hsl(350, 35%, 60%)", // Dusty rose
    colorBottle: "hsl(350, 30%, 92%)",
    volume: "60ml",
    image: "images/deep_hydration_night_cream.png"
  },
  {
    id: 11,
    name: "Charcoal Detox Purifying Mask",
    tagline: "Draws out congestion and mattifies shine.",
    price: 27.00,
    rating: 4.6,
    reviewsCount: 74,
    category: "Masks & Exfoliants",
    concern: "Acne",
    skinTypes: ["Oily", "Combination"],
    badges: ["New", "Cruelty-Free"],
    stock: 18,
    description: "A creamy charcoal and kaolin mask that magnetizes deep-pore congestion, absorbs excess sebum, and rinses off without the tight, chalky after-feel.",
    ingredients: ["Aqua", "Activated Charcoal", "Kaolin", "Niacinamide (2%)", "Zinc PCA", "Glycerin", "Tea Tree Leaf Extract"],
    keyIngredients: {
      "Activated Charcoal": "A porous carbon that binds to oil, pollution, and pore congestion, lifting them out on rinse.",
      "Zinc PCA": "A mineral regulator that reduces excess sebum production and keeps shine in check between uses."
    },
    usage: "Apply an even layer to clean skin 1-2 times weekly. Leave on 10 minutes and rinse with warm water. Follow with moisturizer.",
    caution: "Avoid the immediate eye area. If skin feels tight after rinsing, reduce wear time.",
    colorAccent: "hsl(35, 5%, 35%)", // Charcoal
    colorBottle: "hsl(35, 5%, 80%)",
    volume: "60ml",
    image: "images/charcoal_detox_mask.png"
  },
  {
    id: 12,
    name: "Cucumber Hydra-Bright Eye Gel",
    tagline: "Cools, de-puffs, and brightens tired eyes.",
    price: 30.00,
    rating: 4.7,
    reviewsCount: 96,
    category: "Eye Care",
    concern: "Brightening",
    skinTypes: ["Oily", "Combination", "Sensitive", "Dry"],
    badges: ["Low Stock", "Cruelty-Free"],
    stock: 4,
    description: "A cooling cucumber gel with caffeine and niacinamide that instantly refreshes puffy morning eyes and brightens the look of dark circles over time.",
    ingredients: ["Aqua", "Cucumber Fruit Extract", "Caffeine", "Niacinamide (4%)", "Sodium Hyaluronate", "Aloe Vera", "Panthenol"],
    keyIngredients: {
      "Cucumber Fruit Extract": "A water-dense botanical that cools on contact and delivers soothing antioxidants to delicate eye-area skin.",
      "Caffeine": "A natural vasoconstrictor that tightens skin tissue and drains excess puffiness for a refreshed, bright look."
    },
    usage: "Pat a small amount around the orbital bone morning and night. Store in the fridge for an extra cooling de-puff effect.",
    caution: "Avoid direct contact with eyes.",
    colorAccent: "hsl(120, 20%, 55%)", // Cucumber green
    colorBottle: "hsl(120, 18%, 90%)",
    volume: "15ml",
    image: "images/hydra_bright_eye_gel.png"
  }
];

// Attach studio gallery frames to every product: the main shot plus
// two generated detail crops (closeup + texture) used by the PDP slider
// and product-card hover swap.
PRODUCTS_DB.forEach(p => {
  const base = p.image.replace(".png", "");
  p.gallery = [p.image, `${base}_closeup.png`, `${base}_texture.png`];
});

const JOURNAL_DB = [
  {
    id: 1,
    title: "The Truth About Your Skin Barrier: How to Heal Redness",
    date: "July 12, 2026",
    excerpt: "Redness, irritation, and stinging are key signs of a damaged barrier. Here is how to strip back your routine to recover clinical skin health.",
    category: "Routine Science",
    image: "images/blog_hero.png",
    imageOffsetX: "0%"
  },
  {
    id: 2,
    title: "Gen Z vs. Mature Skincare: Balancing Sebum and Peptides",
    date: "June 28, 2026",
    excerpt: "Different ages require different clinical signals. Learn why a 19-year-old and a 42-year-old require structurally distinct formulations.",
    category: "Age Philosophy",
    image: "images/blog_hero.png",
    imageOffsetX: "33.33%"
  },
  {
    id: 3,
    title: "Ingredient Glossary: Demystifying BHAs, AHAs, and Ceramides",
    date: "May 15, 2026",
    excerpt: "Our clinical team breaks down exactly how exfoliating acids interact with lipid barriers, explaining the science behind chemical bonds.",
    category: "Ingredient Science",
    image: "images/blog_hero.png",
    imageOffsetX: "66.66%"
  }
];

const TESTIMONIALS_DB = [
  {
    quote: "My skin barrier was completely ruined by over-exfoliating. The Barrier Boost Serum healed my redness in literally three days &mdash; I cannot live without this clinical formula.",
    name: "Sarah J., 28",
    skin: "Dry, Sensitive Skin",
    avatar: "images/avatar_sarah.png",
    product: "Barrier Boost Ceramide Serum",
    productId: 2
  },
  {
    quote: "At 42 I wanted results without irritation. The Retinol Renewal Serum visibly smoothed my fine lines in six weeks, and my skin never once flaked or stung.",
    name: "Maria L., 42",
    skin: "Mature, Combination Skin",
    avatar: "images/avatar_maria.png",
    product: "Retinol Renewal Night Serum",
    productId: 9
  },
  {
    quote: "The Vitamin C serum gave me the most even, luminous skin of my life. My dark spots faded and the glow is real &mdash; three friends asked what I changed.",
    name: "Aisha K., 34",
    skin: "Combination Skin",
    avatar: "images/avatar_aisha.png",
    product: "Vitamin C Radiance Serum",
    productId: 8
  }
];

const FAQ_DB = [
  {
    q: "How do I know which products are right for my skin?",
    a: "Take our 60-second Skin Quiz &mdash; it maps your skin type, primary concern, and sensitivity level to a complete three-step ritual, and unlocks 10% off your first order. You can also filter the shop by skin type or concern."
  },
  {
    q: "Can I use the Retinol Serum and the AHA Mask together?",
    a: "Not on the same night. Alternate them &mdash; retinol on two or three evenings, the AHA mask once weekly on a retinol-free night &mdash; and always wear SPF the following morning. If you are pregnant or nursing, consult your physician before using retinoid products."
  },
  {
    q: "Are your products safe for sensitive skin?",
    a: "Every formula is dermatologist-tested and free from synthetic fragrance. Products flagged with active acids or retinoids carry a visible usage advisory &mdash; start slowly with those. Our Oat Milk Cleanser, Barrier Boost Serum, and Deep Hydration Night Cream are designed specifically for reactive skin."
  },
  {
    q: "How long does shipping take, and when is it free?",
    a: "Orders ship within 24 hours and typically arrive in 3&ndash;5 business days. Shipping is free on every order over $50 &mdash; the progress bar in your cart shows exactly how close you are."
  },
  {
    q: "What is your return policy?",
    a: "Every purchase is covered by a 30-day satisfaction guarantee with free return shipping &mdash; even on opened products. Start a return from the Request Return page with your order number and email; no account required."
  },
  {
    q: "Are you cruelty-free and vegan?",
    a: "Yes. We never test on animals at any stage, no supplier tests on our behalf, and every formulation is 100% vegan &mdash; built on botanical and biotechnology-derived ingredients."
  }
];

const QUIZ_QUESTIONS = [
  {
    step: 1,
    question: "What is your primary skin concern?",
    key: "concern",
    options: [
      { label: "Acne & breakouts", value: "Acne", icon: '<i class="fa-solid fa-bacteria"></i>' },
      { label: "Fine lines & aging", value: "Anti-Aging", icon: '<i class="fa-solid fa-clock-rotate-left"></i>' },
      { label: "Dullness & dark spots", value: "Dullness", icon: '<i class="fa-solid fa-sun"></i>' },
      { label: "Redness & sensitivity", value: "Sensitivity", icon: '<i class="fa-solid fa-shield-halved"></i>' }
    ]
  },
  {
    step: 2,
    question: "How does your skin feel in the afternoon?",
    key: "skinType",
    options: [
      { label: "Shiny or oily all over", value: "Oily", icon: '<i class="fa-solid fa-droplet"></i>' },
      { label: "Tight, dry, or flakey", value: "Dry", icon: '<i class="fa-solid fa-wind"></i>' },
      { label: "Oily in T-zone, dry on cheeks", value: "Combination", icon: '<i class="fa-solid fa-circle-half-stroke"></i>' },
      { label: "Easily flushed or reactive", value: "Sensitive", icon: '<i class="fa-solid fa-fire-flame-curved"></i>' }
    ]
  },
  {
    step: 3,
    question: "What is your age range?",
    key: "ageRange",
    options: [
      { label: "16 – 24 (Gen Z)", value: "GenZ", icon: '<i class="fa-solid fa-bolt"></i>' },
      { label: "25 – 35 (Millennial)", value: "Millennial", icon: '<i class="fa-solid fa-mug-hot"></i>' },
      { label: "36 – 45 (Mature)", value: "Mature", icon: '<i class="fa-solid fa-gem"></i>' }
    ]
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

const state = {
  cart: [],
  wishlist: [],
  orders: [],
  activeUser: null, // Initialized as null. Can log in/register.
  quizAnswers: {},
  activeQuizStep: 1,
  activeFilters: {
    category: [],
    skinType: [],
    concern: [],
    price: null
  },
  sortOption: "bestselling",
  recentlyViewed: []
};

// ==========================================
// 3. STORAGE & STATE PERSISTENCE
// ==========================================

function loadState() {
  const localCart = localStorage.getItem("sage_clay_cart");
  const localWishlist = localStorage.getItem("sage_clay_wishlist");
  const localOrders = localStorage.getItem("sage_clay_orders");
  const localUser = localStorage.getItem("sage_clay_user");
  const localViewed = localStorage.getItem("sage_clay_viewed");

  if (localCart) state.cart = JSON.parse(localCart);
  if (localWishlist) state.wishlist = JSON.parse(localWishlist);
  if (localOrders) state.orders = JSON.parse(localOrders);
  if (localUser) state.activeUser = JSON.parse(localUser);
  if (localViewed) state.recentlyViewed = JSON.parse(localViewed);
}

function saveState() {
  localStorage.setItem("sage_clay_cart", JSON.stringify(state.cart));
  localStorage.setItem("sage_clay_wishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("sage_clay_orders", JSON.stringify(state.orders));
  localStorage.setItem("sage_clay_viewed", JSON.stringify(state.recentlyViewed));
  if (state.activeUser) {
    localStorage.setItem("sage_clay_user", JSON.stringify(state.activeUser));
  } else {
    localStorage.removeItem("sage_clay_user");
  }
  updateBadges();
}

// ==========================================
// 4. DRAWERS & GLOBAL LAYOUT ACTIONS
// ==========================================

function setupGlobalEventListeners() {
  // Cart Drawer toggling
  const cartTrigger = document.getElementById("cart-trigger");
  const cartClose = document.getElementById("cart-close");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartDrawer = document.getElementById("cart-drawer");

  if (cartTrigger) cartTrigger.addEventListener("click", () => openDrawer(cartDrawer, cartOverlay));
  if (cartClose) cartClose.addEventListener("click", () => closeDrawer(cartDrawer, cartOverlay));
  if (cartOverlay) cartOverlay.addEventListener("click", () => closeDrawer(cartDrawer, cartOverlay));

  // Wishlist Drawer toggling
  const wishlistTrigger = document.getElementById("wishlist-trigger");
  const wishlistClose = document.getElementById("wishlist-close");
  const wishlistOverlay = document.getElementById("wishlist-overlay");
  const wishlistDrawer = document.getElementById("wishlist-drawer");

  if (wishlistTrigger) wishlistTrigger.addEventListener("click", () => openDrawer(wishlistDrawer, wishlistOverlay));
  if (wishlistClose) wishlistClose.addEventListener("click", () => closeDrawer(wishlistDrawer, wishlistOverlay));
  if (wishlistOverlay) wishlistOverlay.addEventListener("click", () => closeDrawer(wishlistDrawer, wishlistOverlay));

  // Mobile navigation drawer (below 992px)
  const mobileNavTrigger = document.getElementById("mobile-nav-trigger");
  const mobileNavClose = document.getElementById("mobile-nav-close");
  const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");

  const closeMobileNav = () => {
    closeDrawer(mobileNavDrawer, mobileNavOverlay);
    if (mobileNavTrigger) mobileNavTrigger.setAttribute("aria-expanded", "false");
  };

  if (mobileNavTrigger) mobileNavTrigger.addEventListener("click", () => {
    openDrawer(mobileNavDrawer, mobileNavOverlay);
    mobileNavTrigger.setAttribute("aria-expanded", "true");
  });
  if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener("click", closeMobileNav);

  // Any navigation from inside the drawer closes it
  window.addEventListener("hashchange", () => {
    if (mobileNavDrawer && mobileNavDrawer.classList.contains("open")) closeMobileNav();
  });

  // Resizing up to desktop must never leave the mobile drawer open
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992 && mobileNavDrawer && mobileNavDrawer.classList.contains("open")) {
      closeMobileNav();
    }
  });

  // Announcement bar: auto-rotating messages
  const annSlides = document.querySelectorAll(".announcement-slide");
  if (annSlides.length > 1 && !prefersReducedMotion()) {
    let annIndex = 0;
    setInterval(() => {
      annSlides[annIndex].classList.remove("active");
      annIndex = (annIndex + 1) % annSlides.length;
      annSlides[annIndex].classList.add("active");
    }, 4500);
  }

  // Shop accordion inside the drawer
  const mobileShopToggle = document.getElementById("mobile-shop-toggle");
  const mobileShopPanel = document.getElementById("mobile-shop-panel");
  if (mobileShopToggle && mobileShopPanel) {
    mobileShopToggle.addEventListener("click", () => {
      const isOpen = mobileShopPanel.classList.toggle("open");
      mobileShopToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Mobile drawer search mirrors the header search
  const mobileSearchInput = document.getElementById("mobile-search-input");
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = mobileSearchInput.value.trim();
        if (query) {
          window.location.hash = `#search?q=${encodeURIComponent(query)}`;
          closeMobileNav();
        }
      }
    });
  }

  // Search input actions
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.hash = `#search?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // Newsletter signup
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("newsletter-email").value.trim();
      showToast(`Thank you! 10% discount code SAGE10 sent to ${email}`, "success");
      newsletterForm.reset();
    });
  }

  // Drawer accessibility: Escape closes, Tab cycles within the open drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer(cartDrawer, cartOverlay);
      closeDrawer(wishlistDrawer, wishlistOverlay);
      if (mobileNavDrawer) closeMobileNav();
    }

    if (e.key === "Tab") {
      const openDrawerEl = document.querySelector(".drawer.open");
      if (!openDrawerEl) return;
      const focusable = [...openDrawerEl.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]')]
        .filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!openDrawerEl.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Shrink header on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // Abandoned Cart (exit-intent) check
  let exitIntentTriggered = false;
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY < 0 && !exitIntentTriggered && state.cart.length > 0) {
      exitIntentTriggered = true;
      showToast("<i class='fa-solid fa-cart-shopping' style='margin-right:6px;'></i>Did you forget something? Secure your ritual with 10% off using code SAGE10. Your items are waiting.", "info");
    }
  });
}

function openDrawer(drawer, overlay) {
  overlay.classList.add("open");
  drawer.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (drawer && drawer.id === "filter-sidebar") {
    document.body.classList.add("filter-drawer-open");
  }

  // Trap focus
  const focusable = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
  if (focusable.length > 0) {
    focusable[0].focus();
  }
}

function closeDrawer(drawer, overlay) {
  overlay.classList.remove("open");
  drawer.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (drawer && drawer.id === "filter-sidebar") {
    document.body.classList.remove("filter-drawer-open");
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-msg">${message}</span>
    <button class="toast-close" aria-label="Dismiss message">&times;</button>
  `;

  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.style.animation = "fadeOut 0.2s forwards";
    setTimeout(() => toast.remove(), 200);
  });

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = "fadeOut 0.2s forwards";
      setTimeout(() => toast.remove(), 200);
    }
  }, 4000);
}

function updateBadges() {
  const cartBadge = document.getElementById("cart-badge");
  const wishlistBadge = document.getElementById("wishlist-badge");

  const totalCartQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalCartQty;
  }

  if (wishlistBadge) {
    if (state.wishlist.length > 0) {
      wishlistBadge.textContent = state.wishlist.length;
      wishlistBadge.style.display = "flex";
    } else {
      wishlistBadge.style.display = "none";
    }
  }

  renderCartDrawerContents();
  renderWishlistDrawerContents();
}

// ==========================================
// 5. PACKAGING ILLUSTRATION ENGINE (SVGs)
// ==========================================

/**
 * Generates dynamic vector graphics representing product bottles or jars
 * using inline HSL tokens matching the design system guidelines.
 */
function renderProductSVG(product, size = 180) {
  if (product && product.image) {
    return `<img src="${product.image}" alt="${product.name}" class="product-real-image product-card-img" style="width:${size}px; height:${size}px; max-width:100%; max-height:100%; object-fit:cover; aspect-ratio: 1; border-radius: var(--radius-sm); transition: transform var(--transition-normal);" />`;
  }

  const accentColor = product.colorAccent;
  const bottleColor = product.colorBottle;
  const isJar = product.category === "Moisturizers" || product.category === "Eye Care";
  const isSqueeze = product.category === "Sunscreen" || product.category === "Masks & Exfoliants";

  let graphicHtml = "";

  if (isJar) {
    // Elegant jar visual
    graphicHtml = `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${product.name} jar illustration">
        <!-- Shadow -->
        <ellipse cx="50" cy="85" rx="30" ry="6" fill="rgba(35, 30, 25, 0.08)" />
        <!-- Jar Body -->
        <rect x="22" y="42" width="56" height="38" rx="6" fill="${bottleColor}" stroke="rgba(35, 30, 25, 0.15)" stroke-width="1"/>
        <rect x="23" y="43" width="54" height="24" fill="rgba(255,255,255,0.2)"/>
        <!-- Jar Cap -->
        <rect x="20" y="32" width="60" height="10" rx="3" fill="${accentColor}" />
        <line x1="20" y1="37" x2="80" y2="37" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <!-- Jar Label -->
        <rect x="28" y="52" width="44" height="20" fill="white" rx="2" stroke="rgba(35, 30, 25, 0.05)"/>
        <line x1="32" y1="58" x2="48" y2="58" stroke="${accentColor}" stroke-width="2"/>
        <line x1="32" y1="64" x2="64" y2="64" stroke="rgba(35, 30, 25, 0.3)" stroke-width="1"/>
        <line x1="32" y1="68" x2="52" y2="68" stroke="rgba(35, 30, 25, 0.3)" stroke-width="1"/>
      </svg>
    `;
  } else if (isSqueeze) {
    // Squeeze tube visual
    graphicHtml = `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${product.name} squeeze tube illustration">
        <!-- Shadow -->
        <ellipse cx="50" cy="88" rx="22" ry="4" fill="rgba(35, 30, 25, 0.08)" />
        <!-- Tube Body -->
        <path d="M28 20 C28 20, 26 78, 38 82 C38 82, 40 82, 50 82 C60 82, 62 82, 62 82 C74 78, 72 20, 72 20 Z" fill="${bottleColor}" stroke="rgba(35, 30, 25, 0.15)" stroke-width="1"/>
        <path d="M29 21 L71 21 L69 35 L31 35 Z" fill="rgba(255,255,255,0.2)"/>
        <!-- Tube Seal crimp -->
        <rect x="28" y="16" width="44" height="5" fill="rgba(35,30,25,0.15)" rx="1"/>
        <!-- Tube Cap -->
        <rect x="42" y="82" width="16" height="6" rx="1" fill="${accentColor}" />
        <!-- Tube Label -->
        <rect x="34" y="38" width="32" height="34" fill="white" rx="2" stroke="rgba(35, 30, 25, 0.05)"/>
        <line x1="38" y1="46" x2="50" y2="46" stroke="${accentColor}" stroke-width="2"/>
        <line x1="38" y1="52" x2="62" y2="52" stroke="rgba(35, 30, 25, 0.3)" stroke-width="1"/>
        <line x1="38" y1="56" x2="58" y2="56" stroke="rgba(35, 30, 25, 0.3)" stroke-width="1"/>
      </svg>
    `;
  } else {
    // Dropper / Pump bottle visual
    graphicHtml = `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${product.name} dropper pump bottle illustration">
        <!-- Shadow -->
        <ellipse cx="50" cy="88" rx="24" ry="5" fill="rgba(35, 30, 25, 0.08)" />
        <!-- Pump nozzle structure -->
        <path d="M46 22 L54 22 L54 27 L46 27 Z" fill="rgba(35,30,25,0.2)"/>
        <path d="M47 18 L50 18 L50 22 L47 22 Z" fill="rgba(35,30,25,0.3)"/>
        <path d="M40 18 L48 18 C50 18, 50 15, 50 15 L43 14" stroke="rgba(35,30,25,0.3)" stroke-width="2" stroke-linecap="round"/>
        <!-- Bottle Collar -->
        <rect x="36" y="27" width="28" height="6" fill="${accentColor}" rx="1"/>
        <!-- Bottle Body -->
        <rect x="30" y="33" width="40" height="50" rx="8" fill="${bottleColor}" stroke="rgba(35, 30, 25, 0.15)" stroke-width="1" />
        <rect x="31" y="34" width="38" height="28" fill="rgba(255,255,255,0.2)" />
        <!-- Label -->
        <rect x="34" y="44" width="32" height="30" fill="white" rx="2" stroke="rgba(35, 30, 25, 0.05)"/>
        <line x1="38" y1="50" x2="50" y2="50" stroke="${accentColor}" stroke-width="2"/>
        <line x1="38" y1="56" x2="62" y2="56" stroke="rgba(35, 30, 25, 0.3)" stroke-width="1"/>
        <line x1="38" y1="60" x2="58" y2="60" stroke="rgba(35, 30, 25, 0.3)" stroke-width="1"/>
      </svg>
    `;
  }

  return graphicHtml;
}

// ==========================================
// 6. SHARED COMPONENT RENDERERS
// ==========================================

function getStarsHtml(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let html = '<div class="stars-rating">';
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '<span class="star"><i class="fa-solid fa-star"></i></span>';
    } else if (i === fullStars + 1 && halfStar) {
      html += '<span class="star"><i class="fa-solid fa-star-half-stroke"></i></span>';
    } else {
      html += '<span class="star star-empty"><i class="fa-regular fa-star"></i></span>';
    }
  }
  html += '</div>';
  return html;
}

function getBadgesHtml(badges) {
  let html = '<div class="pdp-tags" style="gap: 4px;">';
  badges.forEach(b => {
    let badgeClass = "badge-cruelty-free";
    if (b === "Bestseller") badgeClass = "badge-bestseller";
    if (b === "New") badgeClass = "badge-new";
    if (b === "Low Stock") badgeClass = "badge-low-stock";
    if (b === "Sold Out") badgeClass = "badge-sold-out";
    html += `<span class="badge ${badgeClass}">${b}</span>`;
  });
  html += '</div>';
  return html;
}

function renderProductCard(product) {
  const isWishlisted = state.wishlist.includes(product.id);
  const isSoldOut = product.stock === 0;

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-img-container">
        <!-- Full-bleed studio shot with detail-crop hover swap -->
        <a href="#product?id=${product.id}" style="display:block; width:100%; height:100%;">
          ${product.image
      ? `<img src="${product.image}" alt="${product.name}" class="product-card-img product-real-image" loading="lazy" />`
      : renderProductSVG(product, 140)}
          ${product.gallery && product.gallery[1] ? `
            <img src="${product.gallery[1]}" alt="" aria-hidden="true" class="product-card-img product-card-img-hover" loading="lazy" />
          ` : ""}
        </a>
        <div class="product-card-badge">
          ${product.badges.length > 0 ? getBadgesHtml([product.badges[0]]) : ""}
        </div>
        <button class="product-card-wishlist ${isWishlisted ? "active" : ""}" data-id="${product.id}" aria-label="${isWishlisted ? "Remove from wishlist" : "Add to wishlist"}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="product-card-content">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-title">
          <a href="#product?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-card-rating">
          ${getStarsHtml(product.rating)}
          <span class="reviews-count">(${product.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <span class="product-card-price">$${product.price.toFixed(2)}</span>
          ${isSoldOut ? `
            <span class="badge badge-sold-out">Sold Out</span>
          ` : `
            <button class="product-card-quick-add" data-id="${product.id}">Add +</button>
          `}
        </div>
      </div>
    </article>
  `;
}

// ==========================================
// 7. CART & WISHLIST DRAWERS RENDERERS
// ==========================================

function renderCartDrawerContents() {
  const itemsContainer = document.getElementById("cart-drawer-items");
  const footerContainer = document.getElementById("cart-drawer-footer");
  const shippingText = document.getElementById("cart-shipping-text");
  const shippingBar = document.getElementById("cart-shipping-bar");

  if (!itemsContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-state" style="box-shadow: none; padding: var(--spacing-md) 0; margin: auto 0;">
        <div class="empty-state-icon"><i class="fa-solid fa-bag-shopping"></i></div>
        <p>Your cart is empty.</p>
        <a href="#shop" class="btn btn-primary" id="cart-shop-btn">Start Shopping</a>
      </div>
    `;
    if (footerContainer) footerContainer.style.display = "none";
    if (shippingText) shippingText.innerHTML = "Add products to calculate <span>Free Shipping</span>";
    if (shippingBar) shippingBar.style.width = "0%";
    return;
  }

  if (footerContainer) footerContainer.style.display = "block";

  let subtotal = 0;
  let itemsHtml = "";

  state.cart.forEach((item, index) => {
    const product = PRODUCTS_DB.find(p => p.id === item.productId);
    if (!product) return;

    const basePrice = item.priceOverride || product.price;
    const itemPrice = item.purchaseOption === "subscribe" ? basePrice * 0.9 : basePrice;
    const itemTotal = itemPrice * item.quantity;
    subtotal += itemTotal;

    itemsHtml += `
      <div class="drawer-item" data-index="${index}">
        ${renderProductSVG(product, 60)}
        <div class="drawer-item-info">
          <div class="drawer-item-title-row">
            <h4 class="drawer-item-title">${product.name}</h4>
            <span class="drawer-item-price">$${itemPrice.toFixed(2)}</span>
          </div>
          <span class="drawer-item-variant">${item.size || product.volume} | ${item.purchaseOption === "subscribe" ? "Subscribe & Save 10%" : "One-time purchase"}</span>
          <div class="drawer-item-actions">
            <div class="qty-stepper">
              <button class="qty-btn dec" data-index="${index}" aria-label="Decrease quantity">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn inc" data-index="${index}" aria-label="Increase quantity">+</button>
            </div>
            <button class="drawer-item-remove" data-index="${index}">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  itemsContainer.innerHTML = itemsHtml;

  // Free Shipping Threshold ($50)
  const threshold = 50;
  if (subtotal >= threshold) {
    if (shippingText) shippingText.innerHTML = "<i class='fa-solid fa-circle-check' style='margin-right:5px;color:var(--color-success);'></i>Congratulations! You have unlocked <span>Free Shipping</span>!";
    if (shippingBar) {
      shippingBar.style.width = "100%";
      shippingBar.className = "shipping-progress-bar-fg free";
    }
  } else {
    const diff = threshold - subtotal;
    if (shippingText) shippingText.innerHTML = `You are only <span>$${diff.toFixed(2)}</span> away from <span>Free Shipping</span>`;
    if (shippingBar) {
      const pct = (subtotal / threshold) * 100;
      shippingBar.style.width = `${pct}%`;
      shippingBar.className = "shipping-progress-bar-fg";
    }
  }

  // Footer Subtotals
  const shippingCost = subtotal >= threshold ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const subtotalEl = document.getElementById("cart-drawer-subtotal");
  const shippingEl = document.getElementById("cart-drawer-shipping");
  const totalEl = document.getElementById("cart-drawer-total");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

  // Attach event handlers inside Drawer
  itemsContainer.querySelectorAll(".qty-btn.dec").forEach(btn => {
    btn.addEventListener("click", () => updateCartQuantity(parseInt(btn.dataset.index), -1));
  });
  itemsContainer.querySelectorAll(".qty-btn.inc").forEach(btn => {
    btn.addEventListener("click", () => updateCartQuantity(parseInt(btn.dataset.index), 1));
  });
  itemsContainer.querySelectorAll(".drawer-item-remove").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(parseInt(btn.dataset.index)));
  });

  const checkoutBtn = document.getElementById("cart-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      closeDrawer(document.getElementById("cart-drawer"), document.getElementById("cart-overlay"));
      window.location.hash = "#checkout";
    };
  }
}

function renderWishlistDrawerContents() {
  const wishlistContainer = document.getElementById("wishlist-drawer-body");
  if (!wishlistContainer) return;

  if (state.wishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="empty-state" style="box-shadow: none; padding: var(--spacing-md) 0; margin: 0;">
        <div class="empty-state-icon">❤️</div>
        <p>Your wishlist is empty.</p>
        <a href="#shop" class="btn btn-secondary" id="wishlist-shop-btn">Browse Shop</a>
      </div>
    `;
    return;
  }

  let html = "";
  state.wishlist.forEach((id) => {
    const product = PRODUCTS_DB.find(p => p.id === id);
    if (!product) return;

    const isSoldOut = product.stock === 0;

    html += `
      <div class="drawer-item">
        ${renderProductSVG(product, 60)}
        <div class="drawer-item-info">
          <div class="drawer-item-title-row">
            <h4 class="drawer-item-title"><a href="#product?id=${product.id}">${product.name}</a></h4>
            <span class="drawer-item-price">$${product.price.toFixed(2)}</span>
          </div>
          <span class="drawer-item-variant">${product.volume}</span>
          <div class="drawer-item-actions">
            <button class="drawer-item-remove wl-remove" data-id="${product.id}">Remove</button>
            ${isSoldOut ? `
              <span class="badge badge-sold-out" style="padding: 2px 6px;">Sold Out</span>
            ` : `
              <button class="btn btn-primary wl-add-cart" data-id="${product.id}" style="padding: 6px 12px; font-size: 11px;">Add to Cart</button>
            `}
          </div>
        </div>
      </div>
    `;
  });

  wishlistContainer.innerHTML = html;

  wishlistContainer.querySelectorAll(".wl-remove").forEach(btn => {
    btn.addEventListener("click", () => toggleWishlist(parseInt(btn.dataset.id)));
  });

  wishlistContainer.querySelectorAll(".wl-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(parseInt(btn.dataset.id));
      toggleWishlist(parseInt(btn.dataset.id)); // Remove from wishlist on add to cart
      showToast("Moved item to cart", "success");
    });
  });
}

// ==========================================
// 8. CART & WISHLIST ACTION HANDLERS
// ==========================================

function addToCart(productId, quantity = 1, purchaseOption = "once") {
  const product = PRODUCTS_DB.find(p => p.id === productId);
  if (!product) return;

  if (product.stock === 0) {
    showToast("This item is currently sold out.", "error");
    return;
  }

  const existingItem = state.cart.find(item => item.productId === productId && item.purchaseOption === purchaseOption);

  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      showToast(`Cannot add more. Only ${product.stock} items left in stock.`, "error");
      existingItem.quantity = product.stock;
    } else {
      existingItem.quantity += quantity;
      showToast(`Updated ${product.name} quantity in cart.`, "success");
    }
  } else {
    state.cart.push({
      productId,
      quantity,
      purchaseOption
    });
    showToast(`Added ${product.name} to cart.`, "success");
  }

  saveState();
  openDrawer(document.getElementById("cart-drawer"), document.getElementById("cart-overlay"));
}

function updateCartQuantity(index, delta) {
  const item = state.cart[index];
  if (!item) return;

  const product = PRODUCTS_DB.find(p => p.id === item.productId);
  if (!product) return;

  const newQty = item.quantity + delta;

  if (newQty <= 0) {
    removeFromCart(index);
    return;
  }

  if (newQty > product.stock) {
    showToast(`Sorry, only ${product.stock} units are currently in stock.`, "error");
    item.quantity = product.stock;
  } else {
    item.quantity = newQty;
  }

  saveState();
}

function removeFromCart(index) {
  const item = state.cart[index];
  if (item) {
    const product = PRODUCTS_DB.find(p => p.id === item.productId);
    state.cart.splice(index, 1);
    showToast(`Removed ${product ? product.name : "item"} from cart.`, "info");
    saveState();
  }
}

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = PRODUCTS_DB.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed ${product ? product.name : "item"} from wishlist.`, "info");
  } else {
    state.wishlist.push(productId);
    showToast(`Added ${product ? product.name : "item"} to wishlist.`, "success");
  }

  saveState();

  // Re-render active product card wishlist buttons if they exist
  document.querySelectorAll(`.product-card-wishlist[data-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle("active");
    const fillState = state.wishlist.includes(productId) ? "currentColor" : "none";
    btn.querySelector("svg").setAttribute("fill", fillState);
  });

  // PDP Wishlist check
  const pdpWishBtn = document.querySelector(`.pdp-wishlist-btn[data-id="${productId}"]`);
  if (pdpWishBtn) {
    pdpWishBtn.classList.toggle("active");
  }
}

// Attach quick-add handlers dynamically using event delegation
document.addEventListener("click", (e) => {
  const quickAdd = e.target.closest(".product-card-quick-add");
  if (quickAdd) {
    const id = parseInt(quickAdd.dataset.id);
    addToCart(id, 1, "once");
  }

  const wishlistBtn = e.target.closest(".product-card-wishlist");
  if (wishlistBtn) {
    const id = parseInt(wishlistBtn.dataset.id);
    toggleWishlist(id);
  }
});

// ==========================================
// 9. CLIENT-SIDE ROUTER ENGINE
// ==========================================

function getRouteParams() {
  const hash = window.location.hash || "#home";
  const parts = hash.split("?");
  const route = parts[0];
  const params = {};

  if (parts[1]) {
    parts[1].split("&").forEach(p => {
      const pair = p.split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    });
  }

  return { route, params };
}

function router() {
  const { route, params } = getRouteParams();
  const main = document.getElementById("app-view");
  if (!main) return;

  // Scroll to top on route change
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });

  // Kill any auto-advance timers from a previous view
  if (testimonialAutoTimer) {
    clearInterval(testimonialAutoTimer);
    testimonialAutoTimer = null;
  }
  mobileCarouselTimers.forEach(clearInterval);
  mobileCarouselTimers = [];

  // Update active nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === route) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Handle routes
  switch (route) {
    case "#home":
    case "":
      renderHome(main);
      break;
    case "#shop":
      renderShop(main, params);
      break;
    case "#product":
      renderPDP(main, parseInt(params.id));
      break;
    case "#quiz":
      renderQuiz(main);
      break;
    case "#cart":
      renderCartPage(main);
      break;
    case "#wishlist":
      renderWishlistPage(main, params);
      break;
    case "#checkout":
      renderCheckout(main);
      break;
    case "#thank-you":
      renderThankYou(main, params.order);
      break;
    case "#account":
      renderAccount(main);
      break;
    case "#journal":
      renderJournal(main);
      break;
    case "#about":
      renderAbout(main);
      break;
    case "#returns":
      renderReturns(main);
      break;
    case "#legal":
      renderLegal(main, params.page || "privacy");
      break;
    case "#track":
      renderTrackOrder(main, params.orderNumber, params.email);
      break;
    case "#search":
      renderSearch(main, params.q);
      break;
    default:
      render404(main);
  }

  // Animate freshly rendered view content into place on scroll
  initScrollReveal(main);

  // 3D depth parallax on large photos (no-op on views without them)
  initParallax(main);
}

// --- Motion helpers (scroll-reveal + reduced-motion) ---
const REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");

function prefersReducedMotion() {
  return REDUCED_MOTION_QUERY.matches;
}

// Auto-advance timer for the home testimonial slider; cleared on every
// route change so it never keeps firing on a torn-down view
let testimonialAutoTimer = null;

function initTestimonialSlider() {
  const slider = document.getElementById("testimonial-slider");
  if (!slider) return;

  const track = document.getElementById("testimonial-track");
  const slides = track.querySelectorAll(".testimonial-slide");
  const dots = slider.querySelectorAll(".testimonial-dot");
  let current = 0;

  function goTo(index) {
    current = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", i === current ? "false" : "true");
      slide.querySelectorAll("a, button").forEach(el => { el.tabIndex = i === current ? 0 : -1; });
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  function stopAuto() {
    if (testimonialAutoTimer) {
      clearInterval(testimonialAutoTimer);
      testimonialAutoTimer = null;
    }
  }

  function startAuto() {
    if (prefersReducedMotion()) return; // no auto-motion for reduced-motion users
    stopAuto();
    testimonialAutoTimer = setInterval(() => goTo(current + 1), 6000);
  }

  document.getElementById("testimonial-prev").addEventListener("click", () => { goTo(current - 1); startAuto(); });
  document.getElementById("testimonial-next").addEventListener("click", () => { goTo(current + 1); startAuto(); });
  dots.forEach(dot => dot.addEventListener("click", () => { goTo(parseInt(dot.dataset.dot)); startAuto(); }));

  // Pause while the user is reading or interacting
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);
  slider.addEventListener("focusin", stopAuto);
  slider.addEventListener("focusout", startAuto);

  startAuto();
}

// Scroll-parallax for large photos (3D depth). One window listener,
// re-registered per route so torn-down views never leak handlers.
let parallaxHandler = null;

function initParallax(scope) {
  if (parallaxHandler) {
    window.removeEventListener("scroll", parallaxHandler);
    parallaxHandler = null;
  }
  if (prefersReducedMotion()) return;

  const layers = [
    { el: scope.querySelector(".hero-panel-img"), speed: 0.06 },
    { el: scope.querySelector(".quiz-banner-bg"), speed: 0.07 },
  ].filter(l => l.el);
  if (!layers.length) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    layers.forEach(({ el, speed }) => {
      const rect = el.parentElement.getBoundingClientRect();
      const raw = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      const offset = Math.max(-28, Math.min(28, raw)); // clamp so overscan hides edges
      el.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    });
  };

  parallaxHandler = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", parallaxHandler, { passive: true });
  update();
}

function initFaqAccordion(scope) {
  const items = scope.querySelectorAll(".faq-item");
  items.forEach(item => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Accordion behavior: only one answer open at a time
      items.forEach(other => {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initCountUp(scope) {
  const counters = scope.querySelectorAll(".stat-count");
  if (!counters.length) return;

  const formatValue = (el, value) => {
    const decimals = parseInt(el.dataset.decimals || "0");
    el.textContent = value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    counters.forEach(el => formatValue(el, parseFloat(el.dataset.target)));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const duration = 1200;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        formatValue(el, target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function initScrollReveal(scope) {
  const targets = scope.querySelectorAll("[data-reveal]:not(.revealed)");
  if (!targets.length) return;

  // Accessibility: no motion for users who opted out (and old browsers)
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => observer.observe(el));
}

// ==========================================
// 10. PAGES & VIEWS GENERATION
// ==========================================

// --- Home Page ---
function renderHome(container) {
  document.title = "SAGE & CLAY | Clinical Skincare with Sensorial Warmth";

  const bestsellers = PRODUCTS_DB.filter(p => p.badges.includes("Bestseller"));

  container.innerHTML = `
    <!-- Hero Section: full-width panel, text left, blended product photo right -->
    <section class="hero-section view-section">
      <div class="container">
        <div class="hero-panel">
          <div class="hero-panel-content hero-stagger">
            <span class="hero-subtitle" style="display:block;">Clinical Confidence &nbsp;&bull;&nbsp; Sensorial Warmth</span>
            <h1 class="hero-title">Pure care for<br>everyday glow.</h1>
            <p class="hero-description">
              Discover dermatologist-tested rituals crafted with nature-inspired active ingredients for healthier skin, stronger confidence, and everyday self-care.
            </p>
            <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
              <a href="#shop" class="btn btn-primary btn-pill">Shop Collection</a>
              <a href="#quiz" class="btn btn-secondary btn-pill">Build My Routine</a>
            </div>
          </div>
          <div class="hero-panel-media">
            <img src="images/vitamin_c_radiance_serum.png" alt="Vitamin C Radiance Serum dropper bottle glowing in warm golden light on soft sand" class="hero-panel-img hero-img-kenburns" />
          </div>
        </div>
      </div>
    </section>

    <!-- Value Props: infinite marquee strip -->
    <section class="value-props-strip" aria-label="Why choose SAGE &amp; CLAY">
      <div class="container marquee-container">
      <div class="marquee-track">
        ${[0, 1].map(copy => `
          <div class="marquee-group" ${copy === 1 ? `aria-hidden="true"` : ""}>
            ${[
      { icon: "fa-paw", color: "var(--color-sage)", title: "Cruelty Free & Vegan", desc: "Never tested on animals. 100% plant and biotechnology formulations." },
      { icon: "fa-stethoscope", color: "var(--color-terracotta)", title: "Clinical Trust", desc: "Dermatologist formulated and tested. Free from synthetic fragrances." },
      { icon: "fa-leaf", color: "var(--color-sage)", title: "Sensorial Warmth", desc: "Tactile textures and skin-soothing botanical bases." },
      { icon: "fa-arrow-rotate-left", color: "var(--color-terracotta)", title: "30-Day Free Returns", desc: "Love it or send it back for a full, hassle-free refund." },
      { icon: "fa-truck-fast", color: "var(--color-sage)", title: "Free Shipping Over $50", desc: "Fast dispatch within 24 hours, carbon-neutral delivery." },
    ].map(v => `
              <div class="value-prop-item">
                <span class="value-prop-icon"><i class="fa-solid ${v.icon}" style="color:${v.color};" aria-hidden="true"></i></span>
                <div>
                  <h4 class="value-prop-title">${v.title}</h4>
                  <p class="value-prop-desc">${v.desc}</p>
                </div>
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
      </div>
    </section>

    <!-- Shop by Category visual tiles -->
    <section class="container view-section">
      <h2 style="text-align: center; margin-bottom: var(--spacing-lg);" data-reveal>Shop by Ritual Step</h2>
      <div class="category-grid mobile-carousel" id="home-category-carousel">
        ${[
      { cat: "Cleansers", label: "Cleansers", img: "images/calming_sage_cleanser.png", alt: "Calming Sage Cleanser bottle styled with fresh sage leaves" },
      { cat: "Serums", label: "Serums", img: "images/barrier_boost_serum.png", alt: "Barrier Boost Serum dropper bottle on a warm sand backdrop" },
      { cat: "Moisturizers", label: "Moisturizers", img: "images/terracotta_glow_moisturizer.png", alt: "Terracotta Glow Moisturizer jar with a soft cream swatch" },
      { cat: "Sunscreen", label: "Sunscreen", img: "images/mineral_shield_sunscreen.png", alt: "Mineral Shield Sunscreen tube in warm natural sunlight" },
      { cat: "Masks & Exfoliants", label: "Masks", img: "images/aha_exfoliant_mask.png", alt: "AHA Exfoliant Mask jar with a textured clay smear" },
      { cat: "Eye Care", label: "Eye Care", img: "images/restorative_eye_cream.png", alt: "Restorative Eye Cream jar resting on a smooth stone" },
    ].map((c, i) => `
          <a href="#shop?category=${c.cat}" class="category-tile" data-reveal style="--reveal-delay: ${i * 80}ms;">
            <span class="category-tile-img-wrap">
              <img src="${c.img}" alt="${c.alt}" class="category-tile-img" loading="lazy" />
              <span class="category-tile-arrow" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span>
            </span>
            <span class="category-tile-step">Step ${String(i + 1).padStart(2, "0")}</span>
            <span class="category-tile-title">${c.label}</span>
          </a>
        `).join("")}
      </div>
      <div class="carousel-nav">
        <button class="carousel-arrow" data-carousel-target="#home-category-carousel" data-dir="prev" aria-label="Scroll categories backward"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
        <button class="carousel-arrow" data-carousel-target="#home-category-carousel" data-dir="next" aria-label="Scroll categories forward"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </div>
    </section>

    <!-- Bestseller Carousel -->
    <section class="container view-section">
      <div class="section-header-row" data-reveal>
        <h2>Our Award-Winning Bestsellers</h2>
        <a href="#shop" class="btn-ghost btn" style="text-transform:none; font-weight:600; padding:8px 16px;">View All <i class="fa-solid fa-arrow-right" style="margin-left:4px;"></i></a>
      </div>
      <div class="product-grid mobile-carousel" id="home-bestseller-carousel">
        ${bestsellers.map((p, i) => `<div data-reveal style="--reveal-delay: ${i * 80}ms;">${renderProductCard(p)}</div>`).join("")}
      </div>
      <div class="carousel-nav">
        <button class="carousel-arrow" data-carousel-target="#home-bestseller-carousel" data-dir="prev" aria-label="Scroll bestsellers backward"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
        <button class="carousel-arrow" data-carousel-target="#home-bestseller-carousel" data-dir="next" aria-label="Scroll bestsellers forward"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </div>
    </section>

    <!-- Skin Quiz Banner -->
    <section class="container view-section">
      <div class="quiz-banner quiz-banner-photo" data-reveal>
        <img src="images/about_hero.png" alt="" aria-hidden="true" class="quiz-banner-bg" loading="lazy" />
        <div class="quiz-banner-overlay" aria-hidden="true"></div>
        <div class="quiz-banner-content">
          <h2 class="quiz-banner-title">Build your personalized skincare routine in 60 seconds.</h2>
          <p class="quiz-banner-desc">Take our dermatologist-backed skin quiz to isolate your concerns and unlock a tailored ritual with 10% off your purchase.</p>
          <a href="#quiz" class="btn btn-primary" style="background-color: var(--color-accent-cta);">Start Skin Quiz</a>
        </div>
      </div>
    </section>

    <!-- Concern Collections -->
    <section class="container view-section">
      <h2 style="text-align: center; margin-bottom: var(--spacing-lg);" data-reveal>Target Your Skin Concerns</h2>
      <div class="concern-grid">
        ${[
      { concern: "Acne", title: "Acne & Blemishes", subtitle: "Clarify & Refine", img: "images/concern_acne.png", alt: "Young woman with clear, calm skin smiling after her clarifying routine" },
      { concern: "Anti-Aging", title: "Lines & Aging", subtitle: "Smooth & Firm", img: "images/concern_aging.png", alt: "Woman in her forties with smooth, firm, radiant skin" },
      { concern: "Hydration", title: "Dehydration", subtitle: "Plump & Hydrate", img: "images/hero_lifestyle.png", alt: "Woman with dewy, hydrated skin applying serum in natural light" },
      { concern: "Sensitivity", title: "Redness & Irritation", subtitle: "Soothe & Calm", img: "images/concern_sensitivity.png", alt: "Woman with soothed, even-toned skin free of redness" },
    ].map((c, i) => `
          <div class="concern-card" onclick="window.location.hash='#shop?concern=${c.concern}'" data-reveal style="--reveal-delay: ${i * 80}ms;">
            <img src="${c.img}" alt="${c.alt}" class="concern-card-img" loading="lazy" />
            <div class="concern-card-overlay">
              <h3 class="concern-card-title">${c.title}</h3>
              <span class="concern-card-subtitle">${c.subtitle}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Clinical Proof: animated stats + testimonial slider -->
    <!-- [NEEDS LEGAL REVIEW] consumer-trial percentage claims below require substantiation before launch -->
    <section class="container view-section">
      <h2 style="text-align: center; margin-bottom: var(--spacing-xs);" data-reveal>Clinical Proof, Real Results</h2>
      <p style="text-align:center; color:var(--color-text-muted); font-size:15px; max-width:520px; margin: 0 auto var(--spacing-lg);" data-reveal>Independent 8-week consumer trials, verified-purchase reviews, and dermatologist oversight behind every formula.</p>
      <div class="proof-grid">
        <div class="proof-stats">
          <div class="proof-stat-card" data-reveal>
            <span class="proof-stat-number"><span class="stat-count" data-target="94">0</span>%</span>
            <span class="proof-stat-label">reported calmer, less reactive skin within 14 days</span>
          </div>
          <div class="proof-stat-card" data-reveal style="--reveal-delay: 80ms;">
            <span class="proof-stat-number"><span class="stat-count" data-target="4.8" data-decimals="1">0</span>/5</span>
            <span class="proof-stat-label">average rating across all rituals</span>
          </div>
          <div class="proof-stat-card" data-reveal style="--reveal-delay: 160ms;">
            <span class="proof-stat-number"><span class="stat-count" data-target="12400">0</span>+</span>
            <span class="proof-stat-label">verified customer reviews</span>
          </div>
          <div class="proof-stat-card" data-reveal style="--reveal-delay: 240ms;">
            <span class="proof-stat-number"><span class="stat-count" data-target="87">0</span>%</span>
            <span class="proof-stat-label">repurchase their ritual within 3 months</span>
          </div>
        </div>
        <div class="testimonial-slider" id="testimonial-slider" role="group" aria-roledescription="carousel" aria-label="Customer testimonials" data-reveal style="--reveal-delay: 120ms;">
          <div class="testimonial-viewport">
          <div class="testimonial-track" id="testimonial-track">
            ${TESTIMONIALS_DB.map((t, i) => `
              <figure class="testimonial-slide" aria-hidden="${i === 0 ? "false" : "true"}">
                ${getStarsHtml(5)}
                <blockquote class="testimonial-quote">&ldquo;${t.quote}&rdquo;</blockquote>
                <figcaption class="testimonial-meta">
                  <img src="${t.avatar}" alt="Portrait of ${t.name.split(",")[0]}" class="testimonial-avatar" loading="lazy" />
                  <span>
                    <span class="testimonial-name">${t.name}</span>
                    <span class="testimonial-skin">${t.skin} &nbsp;&bull;&nbsp; Verified Buyer</span>
                  </span>
                  <a href="#product?id=${t.productId}" class="testimonial-product-chip" ${i === 0 ? "" : `tabindex="-1"`}>${t.product}</a>
                </figcaption>
              </figure>
            `).join("")}
          </div>
          </div>
          <div class="testimonial-controls">
            <button class="testimonial-arrow" id="testimonial-prev" aria-label="Previous testimonial"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
            <div class="testimonial-dots">
              ${TESTIMONIALS_DB.map((t, i) => `<button class="testimonial-dot ${i === 0 ? "active" : ""}" data-dot="${i}" aria-label="Go to testimonial ${i + 1} of ${TESTIMONIALS_DB.length}"></button>`).join("")}
            </div>
            <button class="testimonial-arrow" id="testimonial-next" aria-label="Next testimonial"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="container view-section">
      <div class="faq-header" data-reveal>
        <span class="faq-eyebrow">Support</span>
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about our formulas, shipping, and rituals.</p>
      </div>
      <div class="faq-list">
        ${FAQ_DB.map((f, i) => `
          <div class="faq-item" data-reveal style="--reveal-delay: ${i * 60}ms;">
            <button class="faq-question" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">
              <span>${f.q}</span>
              <span class="faq-icon" aria-hidden="true"><i class="fa-solid fa-plus"></i></span>
            </button>
            <div class="faq-answer" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
              <div class="faq-answer-inner"><p>${f.a}</p></div>
            </div>
          </div>
        `).join("")}
      </div>
      <p class="faq-footer" data-reveal>Still have questions? <a href="#legal?page=shipping-returns">Read our policies</a> or <a href="#track">track your order</a>.</p>
    </section>
  `;

  // Wire up the proof section (auto-advancing slider + count-up stats) and FAQ
  initTestimonialSlider();
  initCountUp(container);
  initFaqAccordion(container);
  initMobileCarousels(container);
}

// Arrow controls + mobile auto-slide for horizontal carousels
let mobileCarouselTimers = [];

function initMobileCarousels(scope) {
  mobileCarouselTimers.forEach(clearInterval);
  mobileCarouselTimers = [];

  scope.querySelectorAll("[data-carousel-target]").forEach(btn => {
    btn.addEventListener("click", () => {
      const track = scope.querySelector(btn.dataset.carouselTarget);
      if (!track || !track.firstElementChild) return;
      const step = track.firstElementChild.getBoundingClientRect().width + 16;
      track.scrollBy({
        left: btn.dataset.dir === "prev" ? -step : step,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      });
    });
  });

  // Auto-slide while the grids are carousels (mobile only, motion allowed)
  if (prefersReducedMotion()) return;
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  scope.querySelectorAll(".mobile-carousel").forEach(track => {
    let paused = false;
    ["touchstart", "mouseenter", "focusin", "pointerdown"].forEach(ev =>
      track.addEventListener(ev, () => { paused = true; }, { passive: true }));
    ["touchend", "mouseleave", "focusout"].forEach(ev =>
      track.addEventListener(ev, () => { paused = false; }, { passive: true }));

    const timer = setInterval(() => {
      if (paused || !mobileQuery.matches || !track.firstElementChild) return;
      const step = track.firstElementChild.getBoundingClientRect().width + 16;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" }); // loop back to start
      } else {
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);
    mobileCarouselTimers.push(timer);
  });
}

// --- Shop Page ---
function renderShop(container, filterParams = {}) {
  document.title = "Shop Clinical Formulations | SAGE & CLAY";

  // Set filters based on params
  if (filterParams.category) {
    state.activeFilters.category = [filterParams.category];
  } else if (!filterParams.keep) {
    state.activeFilters.category = [];
  }

  if (filterParams.concern) {
    state.activeFilters.concern = [filterParams.concern];
  } else if (!filterParams.keep) {
    state.activeFilters.concern = [];
  }

  if (filterParams.skinType) {
    state.activeFilters.skinType = [filterParams.skinType];
  } else if (!filterParams.keep) {
    state.activeFilters.skinType = [];
  }

  // Categories
  const categories = [...new Set(PRODUCTS_DB.map(p => p.category))];
  const concerns = ["Acne", "Anti-Aging", "Hydration", "Brightening", "Sensitivity"];
  const skinTypes = ["Oily", "Dry", "Combination", "Sensitive"];

  // Render Skeleton sidebar and layouts
  container.innerHTML = `
    <div class="container view-section shop-view-section" style="margin-top: var(--spacing-md);">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="font-size: 12px; color: var(--color-text-muted); margin-bottom: var(--spacing-sm);">
        <a href="#home">Home</a> &nbsp;/&nbsp; <span style="color: var(--color-text);">Shop All</span>
      </nav>

      <div class="shop-header">
        <div>
          <h1 style="font-size: 32px; font-family: var(--font-serif); margin-bottom: var(--spacing-xxs);">Clinical Skincare Formulations</h1>
          <p style="font-size: 14px; color: var(--color-text-muted);">Dermatologist-tested skincare solutions matching active efficacy with botanical safety.</p>
           <!-- Sort container with Mobile Filter trigger -->
        <div class="sort-container">
          <button class="btn btn-secondary filter-mobile-trigger" id="filter-mobile-trigger" aria-label="Toggle filters" style="gap:6px; font-size:12px; font-weight:600; align-items:center;">
            <i class="fa-solid fa-sliders"></i> Filter
          </button>
          <select id="sort-select" class="sort-select" aria-label="Sort products">
            <option value="bestselling" ${state.sortOption === "bestselling" ? "selected" : ""}>Bestselling</option>
            <option value="price-asc" ${state.sortOption === "price-asc" ? "selected" : ""}>Price: Low to High</option>
            <option value="price-desc" ${state.sortOption === "price-desc" ? "selected" : ""}>Price: High to Low</option>
            <option value="rating" ${state.sortOption === "rating" ? "selected" : ""}>Customer Rating</option>
          </select>
        </div>
      </div>
 
      <!-- Shop Layout -->
      <div class="shop-layout">
        <!-- Sidebar Filters Overlay -->
        <div class="drawer-overlay filter-sidebar-overlay" id="filter-sidebar-overlay" aria-hidden="true"></div>
        <!-- Sidebar Filters -->
        <aside class="drawer drawer-left filter-sidebar" id="filter-sidebar" role="dialog" aria-modal="true" aria-hidden="true">
          <div class="drawer-header">
            <h3 style="font-family:var(--font-sans); font-size:16px; font-weight:700; text-transform:uppercase; margin: 0;">Filters</h3>
            <div style="display:flex; align-items:center; gap:var(--spacing-sm);">
              <button id="clear-filters-btn" class="btn-ghost" style="font-size:12px; text-decoration:underline; font-weight:600;">Clear All</button>
              <button id="filter-close-btn" class="drawer-close" aria-label="Close Filters">&times;</button>
            </div>
          </div>
          
          <div class="drawer-body filter-drawer-body" style="padding: var(--spacing-md); display: flex; flex-direction: column; gap: var(--spacing-md); overflow-y: auto; height: calc(100% - 60px);">
            <!-- Category filter -->
            <div class="filter-widget">
              <h4 class="filter-widget-title">Category</h4>
              <ul class="filter-list">
                ${categories.map(c => `
                  <li>
                    <label class="filter-checkbox-label">
                      <input type="checkbox" class="filter-category-chk" value="${c}" ${state.activeFilters.category.includes(c) ? "checked" : ""}>
                      <span>${c}</span>
                    </label>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Skin concern filter -->
            <div class="filter-widget">
              <h4 class="filter-widget-title">Concern</h4>
              <ul class="filter-list">
                ${concerns.map(c => `
                  <li>
                    <label class="filter-checkbox-label">
                      <input type="checkbox" class="filter-concern-chk" value="${c}" ${state.activeFilters.concern.includes(c) ? "checked" : ""}>
                      <span>${c}</span>
                    </label>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Skin type filter -->
            <div class="filter-widget">
              <h4 class="filter-widget-title">Skin Type</h4>
              <ul class="filter-list">
                ${skinTypes.map(st => `
                  <li>
                    <label class="filter-checkbox-label">
                      <input type="checkbox" class="filter-skin-chk" value="${st}" ${state.activeFilters.skinType.includes(st) ? "checked" : ""}>
                      <span>${st}</span>
                    </label>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Price filter widget -->
            <div class="filter-widget" style="border:none;">
              <h4 class="filter-widget-title">Max Price</h4>
              <div style="display:flex; align-items:center; gap:var(--spacing-xs);">
                <input type="range" id="price-range" min="15" max="50" step="5" value="${state.activeFilters.price || 50}" style="flex:1; accent-color:var(--color-terracotta);" aria-label="Max Price">
                <span id="price-range-val" style="font-size:14px; font-weight:600; width:40px;">$${state.activeFilters.price || 50}</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Product Grid view -->
        <div>
          <div id="shop-product-grid" class="product-grid">
            <!-- Populated dynamically -->
          </div>
          <div id="shop-empty-state" style="display:none;"></div>
        </div>
      </div>
    </div>
  `;

  // Attach filter event listeners
  const grid = document.getElementById("shop-product-grid");
  const empty = document.getElementById("shop-empty-state");
  const sortSel = document.getElementById("sort-select");
  const clearBtn = document.getElementById("clear-filters-btn");
  const priceRng = document.getElementById("price-range");
  const priceVal = document.getElementById("price-range-val");

  function applyFiltersAndRender() {
    let filtered = [...PRODUCTS_DB];

    // Filter by category
    if (state.activeFilters.category.length > 0) {
      filtered = filtered.filter(p => state.activeFilters.category.includes(p.category));
    }

    // Filter by concern
    if (state.activeFilters.concern.length > 0) {
      filtered = filtered.filter(p => state.activeFilters.concern.includes(p.concern));
    }

    // Filter by Skin Type
    if (state.activeFilters.skinType.length > 0) {
      filtered = filtered.filter(p => p.skinTypes.some(st => state.activeFilters.skinType.includes(st)));
    }

    // Filter by Price
    if (state.activeFilters.price) {
      filtered = filtered.filter(p => p.price <= state.activeFilters.price);
    }

    // Sort
    if (state.sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: bestsellers first
      filtered.sort((a, b) => {
        const aBest = a.badges.includes("Bestseller") ? 1 : 0;
        const bBest = b.badges.includes("Bestseller") ? 1 : 0;
        return bBest - aBest;
      });
    }

    // Render results
    if (filtered.length === 0) {
      grid.style.display = "none";
      empty.style.display = "block";
      empty.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h2>No formulations match these filters.</h2>
          <p>Try clearing your active filters or selecting different skin concerns.</p>
          <button class="btn btn-primary" id="empty-clear-btn">Clear All Filters</button>
        </div>
      `;
      const emptyClearBtn = document.getElementById("empty-clear-btn");
      if (emptyClearBtn) {
        emptyClearBtn.onclick = () => {
          resetFilters();
          applyFiltersAndRender();
        };
      }
    } else {
      grid.style.display = "grid";
      empty.style.display = "none";
      grid.innerHTML = filtered.map(p => renderProductCard(p)).join("");
    }
  }

  function resetFilters() {
    state.activeFilters = { category: [], skinType: [], concern: [], price: null };
    state.sortOption = "bestselling";

    // Reset checkboxes
    document.querySelectorAll(".filter-category-chk, .filter-concern-chk, .filter-skin-chk").forEach(chk => chk.checked = false);
    if (sortSel) sortSel.value = "bestselling";
    if (priceRng) {
      priceRng.value = 50;
      priceVal.textContent = "$50";
    }
  }

  // Mobile responsive filter drawer toggles
  const filterTrigger = document.getElementById("filter-mobile-trigger");
  const filterClose = document.getElementById("filter-close-btn");
  const filterSidebar = document.getElementById("filter-sidebar");
  const filterOverlay = document.getElementById("filter-sidebar-overlay");

  if (filterTrigger && filterSidebar && filterOverlay) {
    filterTrigger.onclick = () => {
      openDrawer(filterSidebar, filterOverlay);
    };
  }

  const closeFilterDrawer = () => {
    if (filterSidebar && filterOverlay) {
      closeDrawer(filterSidebar, filterOverlay);
    }
  };

  if (filterClose) filterClose.onclick = closeFilterDrawer;
  if (filterOverlay) filterOverlay.onclick = closeFilterDrawer;

  // Wire UI events to state updates
  if (sortSel) {
    sortSel.onchange = () => {
      state.sortOption = sortSel.value;
      applyFiltersAndRender();
    };
  }

  if (clearBtn) {
    clearBtn.onclick = () => {
      resetFilters();
      applyFiltersAndRender();
    };
  }

  if (priceRng) {
    priceRng.oninput = () => {
      state.activeFilters.price = parseInt(priceRng.value);
      priceVal.textContent = `$${priceRng.value}`;
      applyFiltersAndRender();
    };
  }

  document.querySelectorAll(".filter-category-chk").forEach(chk => {
    chk.onchange = () => {
      if (chk.checked) {
        state.activeFilters.category.push(chk.value);
      } else {
        const index = state.activeFilters.category.indexOf(chk.value);
        if (index > -1) state.activeFilters.category.splice(index, 1);
      }
      applyFiltersAndRender();
    };
  });

  document.querySelectorAll(".filter-concern-chk").forEach(chk => {
    chk.onchange = () => {
      if (chk.checked) {
        state.activeFilters.concern.push(chk.value);
      } else {
        const index = state.activeFilters.concern.indexOf(chk.value);
        if (index > -1) state.activeFilters.concern.splice(index, 1);
      }
      applyFiltersAndRender();
    };
  });

  document.querySelectorAll(".filter-skin-chk").forEach(chk => {
    chk.onchange = () => {
      if (chk.checked) {
        state.activeFilters.skinType.push(chk.value);
      } else {
        const index = state.activeFilters.skinType.indexOf(chk.value);
        if (index > -1) state.activeFilters.skinType.splice(index, 1);
      }
      applyFiltersAndRender();
    };
  });

  // Initial execution
  applyFiltersAndRender();
}

// --- Product Details Page (PDP) ---
function renderPDP(container, productId) {
  const product = PRODUCTS_DB.find(p => p.id === productId);

  if (!product) {
    render404(container);
    return;
  }

  // Track recently viewed
  if (!state.recentlyViewed) state.recentlyViewed = [];
  const rvIndex = state.recentlyViewed.indexOf(productId);
  if (rvIndex > -1) {
    state.recentlyViewed.splice(rvIndex, 1);
  }
  state.recentlyViewed.unshift(productId);
  if (state.recentlyViewed.length > 4) {
    state.recentlyViewed.pop();
  }
  saveState();

  document.title = `${product.name} | SAGE & CLAY`;

  const isSoldOut = product.stock === 0;
  const isWishlisted = state.wishlist.includes(product.id);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isAgeSensitive = product.ingredients.some(ing => /Glycolic Acid|Lactic Acid|Retinol/.test(ing));

  // Variant details
  let selectedVolume = product.volume;
  let currentPrice = product.price;

  container.innerHTML = `
    <div class="container view-section" style="margin-top: var(--spacing-md); position: relative;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="font-size: 12px; color: var(--color-text-muted); margin-bottom: var(--spacing-md);">
        <a href="#home">Home</a> &nbsp;/&nbsp; <a href="#shop">Shop</a> &nbsp;/&nbsp; <a href="#shop?category=${product.category}">${product.category}</a> &nbsp;/&nbsp; <span style="color: var(--color-text);">${product.name}</span>
      </nav>

      <!-- PDP Grid -->
      <div class="pdp-grid">
        
        <!-- Gallery Column: image slider with hover zoom -->
        <div class="pdp-gallery">
          <div class="pdp-main-img-wrap pdp-slider" id="pdp-slider" role="group" aria-roledescription="carousel" aria-label="${product.name} image gallery" tabindex="0">
            <img src="${product.gallery[0]}" alt="${product.name} — full studio shot" class="pdp-main-img" id="pdp-main-img" />
            <button class="pdp-slider-arrow pdp-slider-prev" id="pdp-slider-prev" aria-label="Previous image">
              <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button class="pdp-slider-arrow pdp-slider-next" id="pdp-slider-next" aria-label="Next image">
              <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>
            <span class="pdp-slider-counter" id="pdp-slider-counter" aria-live="polite">1 / ${product.gallery.length}</span>
            <span class="pdp-zoom-hint"><i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i> Hover to zoom</span>
          </div>
          <div class="pdp-thumbs">
            ${product.gallery.map((imgSrc, i) => `
              <button class="pdp-thumb-btn ${i === 0 ? "active" : ""}" data-slide-index="${i}" aria-label="Show image ${i + 1} of ${product.gallery.length}">
                <img src="${imgSrc}" alt="" class="pdp-thumb-img" loading="lazy" />
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Info Column -->
        <div class="pdp-info">
          <div>
            <span class="pdp-brand">Sage & Clay Rituals</span>
            <h1 class="pdp-title" style="margin-top:var(--spacing-xxs);">${product.name}</h1>
            <p style="font-size:16px; font-style:italic; color:var(--color-text-muted); margin-top:2px;">${product.tagline}</p>
          </div>

          <div class="pdp-meta-row">
            <span class="pdp-price" id="pdp-price-display">$${currentPrice.toFixed(2)}</span>
            <div>
              ${getStarsHtml(product.rating)}
              <span class="reviews-count">${product.rating} / 5.0 (${product.reviewsCount} reviews)</span>
            </div>
          </div>

          <p style="font-size: 14px;">${product.description}</p>

          <div style="display:flex; align-items:center; gap:var(--spacing-xs); flex-wrap:wrap; margin:var(--spacing-xs) 0;">
            <span style="font-size:12px; font-weight:600; text-transform:uppercase; color:var(--color-text-muted);">Skin type / concern tags:</span>
            <div class="pdp-tags" style="display:flex; align-items:center; gap:4px;">
              ${product.skinTypes.map(st => `
                <span class="badge badge-cruelty-free" style="border-radius:4px; font-size:9px; display:inline-flex; align-items:center; gap:3px;">
                  ${renderIcon(st.toLowerCase(), 10)} ${st}
                </span>
              `).join("")}
              <span class="badge badge-bestseller" style="border-radius:4px; font-size:9px; display:inline-flex; align-items:center; gap:3px;">
                ${renderIcon(product.concern.toLowerCase(), 10)} ${product.concern}
              </span>
            </div>
          </div>

          <!-- Return policy short note -->
          <div style="font-size:12px; display:flex; align-items:center; gap:4px; color:var(--color-success); font-weight:600; margin-bottom:var(--spacing-xxs);">
            <i class="fa-solid fa-shield-halved" style="margin-right:6px;color:var(--color-sage);"></i>100% Satisfaction Guarantee. Free return shipping within 30 days.
          </div>

          <!-- Purchase form card -->
          <div class="pdp-purchase-card">
            <!-- Variant size selector -->
            <div style="margin-bottom: var(--spacing-sm);">
              <span class="form-label" style="display:block; margin-bottom:var(--spacing-xxs);">Select Size:</span>
              <div style="display:flex; gap:var(--spacing-xs);">
                <button class="btn btn-secondary pdp-size-btn active" data-size="standard" data-vol="${product.volume}" data-price="${product.price}">
                  ${product.volume} (Standard)
                </button>
                <button class="btn btn-secondary pdp-size-btn" data-size="large" data-vol="${product.category === "Eye Care" ? "30ml" : "150ml"}" data-price="${product.price * 1.6}">
                  ${product.category === "Eye Care" ? "30ml" : "150ml"} (Value Size - Save 20%)
                </button>
              </div>
            </div>

            <!-- One time purchase -->
            <label class="purchase-option active" id="option-once-label">
              <span class="purchase-option-header">
                <input type="radio" name="purchase-option" id="purchase-once" value="once" checked>
                One-time Purchase
              </span>
              <span class="purchase-option-desc">Buy single item today.</span>
            </label>

            <!-- Subscribe option -->
            <label class="purchase-option" id="option-sub-label">
              <span class="purchase-option-header">
                <input type="radio" name="purchase-option" id="purchase-subscribe" value="subscribe">
                Subscribe & Save 10% (<span id="pdp-sub-price-display">$${(currentPrice * 0.9).toFixed(2)}</span>)
              </span>
              <span class="purchase-option-desc">Delivered automatically every 30 days. Cancel anytime.</span>
            </label>

            <!-- Quantity select and checkout actions -->
            <div class="pdp-actions">
              <div class="qty-stepper">
                <button class="qty-btn" id="pdp-qty-dec" aria-label="Decrease quantity">-</button>
                <span class="qty-val" id="pdp-qty-val">1</span>
                <button class="qty-btn" id="pdp-qty-inc" aria-label="Increase quantity">+</button>
              </div>

              ${isSoldOut ? `
                <button class="btn btn-disabled" style="flex:1;">Sold Out</button>
              ` : `
                <button class="btn btn-primary pdp-add-to-cart" id="pdp-add-cart" style="flex:1;">Add to Cart</button>
              `}

              <button class="pdp-wishlist-btn ${isWishlisted ? "active" : ""}" id="pdp-wish-toggle" data-id="${product.id}" aria-label="Add to wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>

            <!-- Stock notices -->
            <div class="pdp-stock-notice">
              ${isSoldOut ? `
                <div style="color:var(--color-error); font-weight:600;">
                  <i class="fa-solid fa-ban" style="margin-right:5px;color:var(--color-error);"></i>Out of Stock. 
                  <div style="margin-top:var(--spacing-xs); display:flex; gap:var(--spacing-xs);">
                    <input type="email" id="back-in-stock-email" placeholder="Your email" class="form-control" style="padding:6px 12px; width:200px; display:inline-block;" aria-label="Email for restock notification">
                    <button class="btn btn-secondary" id="back-in-stock-btn" style="padding:6px 12px;">Notify Me</button>
                  </div>
                </div>
              ` : isLowStock ? `
                <span style="color:var(--color-error); font-weight:600;"><i class="fa-solid fa-triangle-exclamation" style="margin-right:5px;"></i>Urgency Warning: Only ${product.stock} units left in stock!</span>
              ` : `
                <span style="color:var(--color-success); font-weight:600;"><i class="fa-solid fa-circle-check" style="margin-right:5px;"></i>In Stock: Ready to ship within 24 hours.</span>
              `}
            </div>

            <!-- Caution Age-sensitive flag for Lactic/Glycolic Exfoliant -->
            ${isAgeSensitive ? `
              <div style="margin-top: var(--spacing-sm); padding:var(--spacing-xs); border: 1px solid var(--color-terracotta); border-radius: var(--radius-sm); font-size:12px; color:var(--color-terracotta); background-color: var(--color-terracotta-light); font-weight:500;">
                <i class="fa-solid fa-triangle-exclamation" style="margin-right:5px;color:var(--color-terracotta);"></i><strong>Usage Advisory:</strong> Product contains concentrated active ingredients (exfoliating acids and/or retinoids). ${product.caution} Not recommended for users under 16 years of age without adult guidance. Always apply SPF daily. [NEEDS LEGAL REVIEW]
              </div>
            ` : ""}

            <div style="font-size:12px; color:var(--color-text-muted); margin-top:var(--spacing-sm); text-align:center;">
              <i class="fa-solid fa-truck-fast" style="margin-right:5px;color:var(--color-sage);"></i>Estimated Delivery: <strong>${getDeliveryRangeText()}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs (Description | Ingredients | Reviews) -->
      <div class="pdp-tabs-container">
        <div class="pdp-tabs-nav" role="tablist">
          <button class="pdp-tab-btn active" id="tab-desc-btn" role="tab" aria-selected="true" aria-controls="tab-desc">Description</button>
          <button class="pdp-tab-btn" id="tab-ingredients-btn" role="tab" aria-selected="false" aria-controls="tab-ingredients">Key Ingredients</button>
          <button class="pdp-tab-btn" id="tab-howtouse-btn" role="tab" aria-selected="false" aria-controls="tab-howtouse">How to Use</button>
          <button class="pdp-tab-btn" id="tab-reviews-btn" role="tab" aria-selected="false" aria-controls="tab-reviews">Reviews (${product.reviewsCount})</button>
        </div>

        <button class="pdp-accordion-toggle open" data-tab="tab-desc" aria-expanded="true">Description <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
        <div class="pdp-tab-content active mobile-open" id="tab-desc" role="tabpanel">
          <p style="margin-bottom:var(--spacing-sm);">${product.description}</p>
          <h4 style="margin-bottom:var(--spacing-xxs);">Full Ingredient List:</h4>
          <p style="font-size:13px; color:var(--color-text-muted); font-family:var(--font-sans); line-height:1.5;">
            ${product.ingredients.join(", ")}
          </p>
        </div>

        <button class="pdp-accordion-toggle" data-tab="tab-ingredients" aria-expanded="false">Key Ingredients <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
        <div class="pdp-tab-content" id="tab-ingredients" role="tabpanel">
          <p style="margin-bottom:var(--spacing-md);">Hover over underlined key ingredients for clinical definitions:</p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:var(--spacing-sm);">
            ${Object.entries(product.keyIngredients).map(([name, desc]) => `
              <li style="font-size:15px; border-bottom:1px solid var(--color-border); padding-bottom:var(--spacing-xs);">
                <span class="ingredient-tooltip-trigger" data-tooltip="${desc}">${name}</span> &mdash; ${desc}
              </li>
            `).join("")}
          </ul>
        </div>

        <button class="pdp-accordion-toggle" data-tab="tab-howtouse" aria-expanded="false">How to Use <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
        <div class="pdp-tab-content" id="tab-howtouse" role="tabpanel">
          <h4 style="margin-bottom:var(--spacing-xxs);">Method of Use:</h4>
          <p style="margin-bottom:var(--spacing-sm);">${product.usage}</p>
          <h4 style="margin-bottom:var(--spacing-xxs); color:var(--color-error);">Caution Advisory:</h4>
          <p>${product.caution}</p>
        </div>

        <button class="pdp-accordion-toggle" data-tab="tab-reviews" aria-expanded="false">Reviews (${product.reviewsCount}) <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
        <div class="pdp-tab-content" id="tab-reviews" role="tabpanel">
          ${(() => {
            const dist = product.rating >= 4.8 ? [82, 12, 4, 1, 1]
                      : product.rating >= 4.6 ? [72, 17, 7, 2, 2]
                      : [63, 21, 10, 3, 3];
            const reviews = [
              { avatar: "images/avatar_sarah.png", name: "Sarah J.", meta: "Combination Skin", date: "June 2026", stars: 5, title: "Absolutely transformed my dry areas!", text: `I have dry patches on my cheeks that wouldn't budge. After using the ${product.name} daily, my face is visibly hydrated and radiant. The packaging looks incredibly premium on my vanity!`, photos: [product.gallery[1]] },
              { avatar: "images/avatar_maria.png", name: "Maria L.", meta: "Mature, Combination Skin", date: "May 2026", stars: 5, title: "Visible results in six weeks.", text: `Gentle enough for nightly use but genuinely effective. The texture of the ${product.name} absorbs beautifully with zero pilling under my morning SPF.`, photos: [product.gallery[2]] },
              { avatar: "images/avatar_aisha.png", name: "Aisha K.", meta: "Sensitive Skin", date: "April 2026", stars: 4, title: "Clean ingredients, minimal scent.", text: "I appreciate that there is no synthetic fragrance. Smells purely like clean clinical ingredients. Soft texture. Excellent absorption.", photos: [] },
            ];
            return `
            <div class="reviews-layout">
              <aside class="reviews-summary">
                <span class="reviews-score">${product.rating}</span>
                ${getStarsHtml(product.rating)}
                <span class="reviews-count-label">Based on ${product.reviewsCount} verified reviews</span>
                <div class="rating-bars">
                  ${dist.map((pct, i) => `
                    <div class="rating-bar-row">
                      <span class="rating-bar-label">${5 - i}<i class="fa-solid fa-star" aria-hidden="true"></i></span>
                      <div class="rating-bar-bg"><div class="rating-bar-fg" style="width: ${pct}%;"></div></div>
                      <span class="rating-bar-pct">${pct}%</span>
                    </div>
                  `).join("")}
                </div>
                <button class="btn btn-secondary btn-pill" id="pdp-write-review" style="width:100%;">Write a Review</button>
              </aside>
              <div class="reviews-list">
                ${reviews.map(r => `
                  <article class="review-card">
                    <header class="review-card-header">
                      <img src="${r.avatar}" alt="Portrait of ${r.name}" class="review-avatar" loading="lazy" />
                      <div class="review-meta">
                        <span class="review-name">${r.name} <span class="review-verified"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Verified Buyer</span></span>
                        <span class="review-skin">${r.meta} &nbsp;&bull;&nbsp; ${r.date}</span>
                      </div>
                      ${getStarsHtml(r.stars)}
                    </header>
                    <h4 class="review-title">${r.title}</h4>
                    <p class="review-text">"${r.text}"</p>
                    ${r.photos.length ? `
                      <div class="review-photos">
                        ${r.photos.map(ph => `<img src="${ph}" alt="Customer photo of ${product.name}" loading="lazy" />`).join("")}
                      </div>
                    ` : ""}
                  </article>
                `).join("")}
              </div>
            </div>`;
          })()}
        </div>
      </div>

      <!-- Recently Viewed Carousel -->
      ${renderRecentlyViewedHtml()}

      <!-- Pairs Well With Cross-Sell -->
      <div style="margin-top:var(--spacing-xl);">
        <h2 style="margin-bottom:var(--spacing-lg);">Pairs Well With...</h2>
        <div class="product-grid">
          ${PRODUCTS_DB.filter(p => p.id !== product.id).slice(0, 3).map(p => renderProductCard(p)).join("")}
        </div>
      </div>
    </div>

    <!-- PDP Sticky Add Bar on Scroll -->
    <div class="sticky-add-bar" id="pdp-sticky-bar">
      <div class="sticky-add-bar-info">
        ${renderProductSVG(product, 40)}
        <div>
          <span class="sticky-add-bar-title">${product.name}</span>
          <br>
          <span class="sticky-add-bar-price" id="pdp-sticky-price">$${product.price.toFixed(2)}</span>
        </div>
      </div>
      ${isSoldOut ? `
        <button class="btn btn-disabled" style="padding:10px 20px; font-size:12px;">Sold Out</button>
      ` : `
        <button class="btn btn-primary" id="pdp-sticky-add-btn" style="padding:10px 20px; font-size:12px;">Add to Cart</button>
      `}
    </div>
  `;

  // --- Gallery slider with hover zoom ---
  const slideLabels = ["full studio shot", "close-up detail", "texture detail"];
  const sliderWrap = document.getElementById("pdp-slider");
  const mainImg = document.getElementById("pdp-main-img");
  const slideCounter = document.getElementById("pdp-slider-counter");
  const thumbBtns = container.querySelectorAll(".pdp-thumb-btn");
  let currentSlide = 0;

  function goToSlide(index) {
    const total = product.gallery.length;
    currentSlide = ((index % total) + total) % total;
    mainImg.src = product.gallery[currentSlide];
    mainImg.alt = `${product.name} — ${slideLabels[currentSlide] || `image ${currentSlide + 1}`}`;
    slideCounter.textContent = `${currentSlide + 1} / ${total}`;
    thumbBtns.forEach((btn, i) => btn.classList.toggle("active", i === currentSlide));
    if (!prefersReducedMotion()) {
      mainImg.classList.remove("slide-in");
      void mainImg.offsetWidth; // restart the animation
      mainImg.classList.add("slide-in");
    }
  }

  // Drop the slide-in class once it finishes so its fill-mode transform
  // doesn't override the hover-zoom scale
  mainImg.addEventListener("animationend", () => mainImg.classList.remove("slide-in"));

  document.getElementById("pdp-slider-prev").addEventListener("click", () => goToSlide(currentSlide - 1));
  document.getElementById("pdp-slider-next").addEventListener("click", () => goToSlide(currentSlide + 1));
  thumbBtns.forEach(btn => btn.addEventListener("click", () => goToSlide(parseInt(btn.dataset.slideIndex))));
  sliderWrap.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goToSlide(currentSlide - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); goToSlide(currentSlide + 1); }
  });

  // Hover zoom: magnify toward the cursor (pointer devices only, motion allowed)
  if (window.matchMedia("(hover: hover)").matches && !prefersReducedMotion()) {
    sliderWrap.classList.add("zoom-enabled");
    sliderWrap.addEventListener("mousemove", e => {
      const rect = sliderWrap.getBoundingClientRect();
      const ox = ((e.clientX - rect.left) / rect.width) * 100;
      const oy = ((e.clientY - rect.top) / rect.height) * 100;
      mainImg.style.transformOrigin = `${ox}% ${oy}%`;
    });
    sliderWrap.addEventListener("mouseenter", () => mainImg.classList.add("zoomed"));
    sliderWrap.addEventListener("mouseleave", () => {
      mainImg.classList.remove("zoomed");
      mainImg.style.transformOrigin = "center center";
    });
  }

  // Mobile-only accordion toggles for the info tabs (independent open/close)
  container.querySelectorAll(".pdp-accordion-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.dataset.tab);
      const isOpen = panel.classList.toggle("mobile-open");
      btn.setAttribute("aria-expanded", String(isOpen));
      btn.classList.toggle("open", isOpen);
    });
  });

  // Write-a-review CTA (form not yet implemented)
  const writeReviewBtn = document.getElementById("pdp-write-review");
  if (writeReviewBtn) {
    writeReviewBtn.addEventListener("click", () => {
      showToast("Thanks for your interest! Review submissions are coming soon.", "info");
    });
  }

  // Attach size selector listeners
  const priceDisp = document.getElementById("pdp-price-display");
  const subPriceDisp = document.getElementById("pdp-sub-price-display");
  const stickyPriceDisp = document.getElementById("pdp-sticky-price");
  const sizeBtns = container.querySelectorAll(".pdp-size-btn");

  sizeBtns.forEach(btn => {
    btn.onclick = () => {
      sizeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      selectedVolume = btn.dataset.vol;
      currentPrice = parseFloat(btn.dataset.price);

      if (priceDisp) priceDisp.textContent = `$${currentPrice.toFixed(2)}`;
      if (subPriceDisp) subPriceDisp.textContent = `$${(currentPrice * 0.9).toFixed(2)}`;
      if (stickyPriceDisp) stickyPriceDisp.textContent = `$${currentPrice.toFixed(2)}`;
    };
  });

  // Attach stepper actions
  const qtyVal = document.getElementById("pdp-qty-val");
  let currentQty = 1;

  const decBtn = document.getElementById("pdp-qty-dec");
  const incBtn = document.getElementById("pdp-qty-inc");

  if (decBtn) {
    decBtn.onclick = () => {
      if (currentQty > 1) {
        currentQty--;
        qtyVal.textContent = currentQty;
      }
    };
  }

  if (incBtn) {
    incBtn.onclick = () => {
      if (product.stock > 0 && currentQty < product.stock) {
        currentQty++;
        qtyVal.textContent = currentQty;
      } else {
        showToast(`Only ${product.stock} items left in stock.`, "error");
      }
    };
  }

  // Radio active styles toggling
  const radioOnce = document.getElementById("purchase-once");
  const radioSub = document.getElementById("purchase-subscribe");
  const optOnceLabel = document.getElementById("option-once-label");
  const optSubLabel = document.getElementById("option-sub-label");

  if (radioOnce && radioSub) {
    radioOnce.onclick = () => {
      optOnceLabel.classList.add("active");
      optSubLabel.classList.remove("active");
    };
    radioSub.onclick = () => {
      optSubLabel.classList.add("active");
      optOnceLabel.classList.remove("active");
    };
  }

  // Add to cart click
  const addCartBtn = document.getElementById("pdp-add-cart");
  if (addCartBtn) {
    addCartBtn.onclick = () => {
      const option = document.querySelector('input[name="purchase-option"]:checked').value;
      addToCartWithDetails(product.id, currentQty, option, selectedVolume, currentPrice);
    };
  }

  // Sticky add cart button
  const stickyAddBtn = document.getElementById("pdp-sticky-add-btn");
  if (stickyAddBtn) {
    stickyAddBtn.onclick = () => {
      addToCartWithDetails(product.id, 1, "once", selectedVolume, currentPrice);
    };
  }

  // Wishlist toggle click
  const wishToggleBtn = document.getElementById("pdp-wish-toggle");
  if (wishToggleBtn) {
    wishToggleBtn.onclick = () => {
      toggleWishlist(product.id);
    };
  }

  // Back in stock notification trigger
  const backStockBtn = document.getElementById("back-in-stock-btn");
  if (backStockBtn) {
    backStockBtn.onclick = () => {
      const email = document.getElementById("back-in-stock-email").value.trim();
      if (email && email.includes("@")) {
        showToast(`Notification registered! We will email ${email} when restocked.`, "success");
        document.getElementById("back-in-stock-email").value = "";
      } else {
        showToast("Please enter a valid email address.", "error");
      }
    };
  }

  // Tab switching
  const tabs = ["desc", "ingredients", "howtouse", "reviews"];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-${tab}-btn`);
    if (btn) {
      btn.onclick = () => {
        tabs.forEach(t => {
          document.getElementById(`tab-${t}-btn`).classList.remove("active");
          document.getElementById(`tab-${t}-btn`).setAttribute("aria-selected", "false");
          document.getElementById(`tab-${t}`).classList.remove("active");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        document.getElementById(`tab-${tab}`).classList.add("active");
      };
    }
  });

  // Sticky Add Bar scroll listener
  const stickyBar = document.getElementById("pdp-sticky-bar");
  const scrollListener = () => {
    if (window.location.hash.startsWith("#product")) {
      const thresholdY = 600;
      if (window.scrollY > thresholdY) {
        stickyBar.classList.add("visible");
      } else {
        stickyBar.classList.remove("visible");
      }
    } else {
      window.removeEventListener("scroll", scrollListener);
    }
  };
  window.addEventListener("scroll", scrollListener);
}

// Add to cart with custom size details
function addToCartWithDetails(productId, quantity, purchaseOption, size, priceOverride) {
  const product = PRODUCTS_DB.find(p => p.id === productId);
  if (!product) return;

  if (product.stock === 0) {
    showToast("This item is currently sold out.", "error");
    return;
  }

  const existingItem = state.cart.find(item =>
    item.productId === productId &&
    item.purchaseOption === purchaseOption &&
    item.size === size
  );

  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      showToast(`Cannot add more. Only ${product.stock} items left in stock.`, "error");
      existingItem.quantity = product.stock;
    } else {
      existingItem.quantity += quantity;
      showToast(`Updated ${product.name} quantity in cart.`, "success");
    }
  } else {
    state.cart.push({
      productId,
      quantity,
      purchaseOption,
      size,
      priceOverride
    });
    showToast(`Added ${product.name} (${size}) to cart.`, "success");
  }

  saveState();
  openDrawer(document.getElementById("cart-drawer"), document.getElementById("cart-overlay"));
}

// --- Skin Quiz Wizard ---
function renderQuiz(container) {
  document.title = "Personalized Skincare Routine Quiz | SAGE & CLAY";
  state.activeQuizStep = 1;
  state.quizAnswers = {};

  function renderStep() {
    const questionData = QUIZ_QUESTIONS.find(q => q.step === state.activeQuizStep);

    if (!questionData) {
      renderQuizResults();
      return;
    }

    const progressPct = ((state.activeQuizStep - 1) / QUIZ_QUESTIONS.length) * 100;

    container.innerHTML = `
      <div class="container view-section" style="margin-top: var(--spacing-lg);">
        <div class="quiz-wizard">
          <div class="quiz-progress-bg">
            <div class="quiz-progress-fg" style="width: ${progressPct}%;"></div>
          </div>
          
          <span style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-terracotta); text-align:center; display:block; margin-bottom:var(--spacing-xxs);">
            Step ${state.activeQuizStep} of ${QUIZ_QUESTIONS.length}
          </span>
          <h2 class="quiz-step-title">${questionData.question}</h2>

          <div class="quiz-options-grid">
            ${questionData.options.map(opt => {
      const isSelected = state.quizAnswers[questionData.key] === opt.value;
      return `
                <div class="quiz-option ${isSelected ? "selected" : ""}" data-val="${opt.value}">
                  <span class="quiz-option-icon">${opt.icon}</span>
                  <span class="quiz-option-label">${opt.label}</span>
                </div>
              `;
    }).join("")}
          </div>

          <div class="quiz-nav-row">
            <button class="btn btn-ghost" id="quiz-prev-btn" ${state.activeQuizStep === 1 ? "style='opacity:0; pointer-events:none;'" : ""}>
              <i class="fa-solid fa-arrow-left" style="margin-right:5px;"></i>Back
            </button>
            <button class="btn btn-primary" id="quiz-next-btn" style="background-color: var(--color-accent-cta);">
              ${state.activeQuizStep === QUIZ_QUESTIONS.length ? 'Build Routine' : 'Next Step <i class="fa-solid fa-arrow-right" style="margin-left:5px;"></i>'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Attach step actions
    const prevBtn = document.getElementById("quiz-prev-btn");
    const nextBtn = document.getElementById("quiz-next-btn");

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (state.activeQuizStep > 1) {
          state.activeQuizStep--;
          renderStep();
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (!state.quizAnswers[questionData.key]) {
          showToast("Please select an option to proceed.", "error");
          return;
        }
        state.activeQuizStep++;
        renderStep();
      };
    }

    container.querySelectorAll(".quiz-option").forEach(card => {
      card.onclick = () => {
        container.querySelectorAll(".quiz-option").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        state.quizAnswers[questionData.key] = card.dataset.val;
      };
    });
  }

  function renderQuizResults() {
    const concern = state.quizAnswers.concern;
    const skinType = state.quizAnswers.skinType;
    const ageRange = state.quizAnswers.ageRange;

    // Filter recommended products based on concern and skinType
    let recommendations = PRODUCTS_DB.filter(p => p.concern === concern || p.skinTypes.includes(skinType));
    if (recommendations.length === 0) recommendations = PRODUCTS_DB.slice(0, 2);

    container.innerHTML = `
      <div class="container view-section" style="margin-top:var(--spacing-md);">
        <div style="text-align:center; max-width:600px; margin:0 auto var(--spacing-xl);">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--color-sage);">Dermatologist Formulated</span>
          <h1 style="font-family:var(--font-serif); font-size:36px; margin: var(--spacing-xxs) 0;">Your Tailored Clinical Ritual</h1>
          <p style="font-size:15px; color:var(--color-text-muted);">
            Based on your concern (<strong>${concern}</strong>) and skin profile (<strong>${skinType}</strong>, age <strong>${ageRange}</strong>), our clinical experts recommend this step-by-step skincare routine:
          </p>
        </div>

        <div class="product-grid" style="margin-bottom: var(--spacing-xl);">
          ${recommendations.map(p => renderProductCard(p)).join("")}
        </div>

        <div style="background-color:var(--color-white); border:1px solid var(--color-border); padding:var(--spacing-md); border-radius:var(--radius-lg); text-align:center; box-shadow:var(--shadow-sm); max-width:500px; margin: 0 auto;">
          <h3 style="margin-bottom:var(--spacing-xxs);">Unlock 10% Off This Routine</h3>
          <p style="font-size:13px; color:var(--color-text-muted); margin-bottom:var(--spacing-sm);">Use code <strong style="color:var(--color-terracotta); font-size:16px;">SAGE10</strong> at checkout to claim your customized discount.</p>
          <button class="btn btn-primary" id="quiz-add-all-btn" style="background-color: var(--color-accent-cta);">Add Full Routine to Cart</button>
        </div>
      </div>
    `;

    const addAllBtn = document.getElementById("quiz-add-all-btn");
    if (addAllBtn) {
      addAllBtn.onclick = () => {
        recommendations.forEach(p => {
          if (p.stock > 0) {
            state.cart.push({ productId: p.id, quantity: 1, purchaseOption: "once" });
          }
        });
        saveState();
        showToast("Full routine added to cart. Code SAGE10 applied!", "success");
        openDrawer(document.getElementById("cart-drawer"), document.getElementById("cart-overlay"));
      };
    }
  }

  renderStep();
}

// --- Checkout Page ---
function renderCheckout(container) {
  document.title = "Checkout | SAGE & CLAY";

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="container view-section" style="text-align:center;">
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fa-solid fa-bag-shopping"></i></div>
          <h2>Your cart is empty.</h2>
          <p>Please add products to your cart before proceeding to checkout.</p>
          <a href="#shop" class="btn btn-primary">Go to Shop</a>
        </div>
      </div>
    `;
    return;
  }

  let subtotal = 0;
  let cartItemsHtml = "";
  let discountMultiplier = 1.0;
  let appliedCode = "";

  state.cart.forEach(item => {
    const product = PRODUCTS_DB.find(p => p.id === item.productId);
    if (!product) return;
    const price = item.purchaseOption === "subscribe" ? product.price * 0.9 : product.price;
    subtotal += price * item.quantity;

    cartItemsHtml += `
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; margin-bottom:var(--spacing-xs); padding-bottom:var(--spacing-xs); border-bottom:1px solid var(--color-border);">
        <span>${product.name} (x${item.quantity})</span>
        <span style="font-weight:600;">$${(price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  });

  const shippingCost = subtotal >= 50 ? 0 : 5.99;
  let tax = subtotal * 0.08;
  let total = subtotal + shippingCost + tax;

  // Track retry count for simulating failure
  let isSimulatedFailure = true;

  container.innerHTML = `
    <div class="container view-section" style="margin-top:var(--spacing-md);">
      <h1 style="font-family:var(--font-serif); font-size:32px; margin-bottom:var(--spacing-md); text-align:center;">Safe & Secure Checkout</h1>
      
      <div class="checkout-layout">
        
        <!-- Forms Column -->
        <div>
          <!-- Steps Navigation -->
          <div class="checkout-steps-nav">
            <span class="checkout-step-nav-item active" id="step-shipping-nav">1. Shipping Info</span>
            <span class="checkout-step-nav-item" id="step-payment-nav">2. Payment details</span>
          </div>

          <!-- Alert for error fallback -->
          <div id="checkout-alert" style="display:none; margin-bottom:var(--spacing-sm); padding:var(--spacing-sm); border-radius:var(--radius-sm); font-size:13px; font-weight:600;"></div>

          <!-- Guest login note -->
          <div style="background-color:var(--color-sand-light); border:1px solid var(--color-border); padding:var(--spacing-sm); border-radius:var(--radius-sm); font-size:13px; margin-bottom:var(--spacing-md); display:flex; justify-content:space-between; align-items:center;">
            <span>Checking out as Guest. Have an account?</span>
            <button class="btn-ghost" style="text-decoration:underline; font-size:12px; font-weight:700;" onclick="window.location.hash='#account'">Log In</button>
          </div>

          <!-- Step 1: Shipping Form -->
          <form id="shipping-form" novalidate>
            <h3 style="margin-bottom:var(--spacing-sm);">Shipping Address</h3>
            <div class="grid-12">
              <div class="grid-6-fraction form-group" id="group-fname">
                <label class="form-label" for="ship-fname">First Name</label>
                <input type="text" id="ship-fname" class="form-control" required>
                <span class="form-feedback">First name is required.</span>
              </div>
              <div class="grid-6-fraction form-group" id="group-lname">
                <label class="form-label" for="ship-lname">Last Name</label>
                <input type="text" id="ship-lname" class="form-control" required>
                <span class="form-feedback">Last name is required.</span>
              </div>
              <div class="grid-12-fraction form-group" id="group-email">
                <label class="form-label" for="ship-email">Email Address (for order tracking)</label>
                <input type="email" id="ship-email" class="form-control" required>
                <span class="form-feedback">A valid email address is required.</span>
              </div>
              <div class="grid-12-fraction form-group" id="group-address">
                <label class="form-label" for="ship-address">Street Address</label>
                <input type="text" id="ship-address" class="form-control" placeholder="Apt, Suite, Room, etc" required>
                <span class="form-feedback">Street address is required.</span>
              </div>
              <div class="grid-4-fraction form-group" id="group-city">
                <label class="form-label" for="ship-city">City</label>
                <input type="text" id="ship-city" class="form-control" required>
                <span class="form-feedback">City is required.</span>
              </div>
              <div class="grid-4-fraction form-group" id="group-state">
                <label class="form-label" for="ship-state">State</label>
                <input type="text" id="ship-state" class="form-control" required>
                <span class="form-feedback">State is required.</span>
              </div>
              <div class="grid-4-fraction form-group" id="group-zip">
                <label class="form-label" for="ship-zip">Zip Code</label>
                <input type="text" id="ship-zip" class="form-control" required>
                <span class="form-feedback">Zip code is required.</span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:var(--spacing-md);">Continue to Payment</button>
          </form>

          <!-- Step 2: Payment Form (Initially Hidden) -->
          <form id="payment-form" style="display:none;" novalidate>
            <h3 style="margin-bottom:var(--spacing-sm);">Payment Details</h3>
            <div class="payment-method-selector">
              <div class="payment-method-btn active" id="pay-card-btn"><i class="fa-regular fa-credit-card" style="margin-right:6px;"></i>Credit Card</div>
              <div class="payment-method-btn" id="pay-paypal-btn"><i class="fa-brands fa-paypal" style="margin-right:6px;"></i>PayPal</div>
            </div>

            <div class="grid-12">
              <div class="grid-12-fraction form-group" id="group-cardname">
                <label class="form-label" for="card-name">Cardholder Name</label>
                <input type="text" id="card-name" class="form-control" required>
                <span class="form-feedback">Card name is required.</span>
              </div>
              <div class="grid-12-fraction form-group" id="group-cardnumber">
                <label class="form-label" for="card-number">Card Number</label>
                <input type="text" id="card-number" class="form-control" placeholder="1234 5678 1234 5678" required>
                <span class="form-feedback">Please enter a valid 16-digit card number.</span>
              </div>
              <div class="grid-6-fraction form-group" id="group-cardexpiry">
                <label class="form-label" for="card-expiry">Expiry Date</label>
                <input type="text" id="card-expiry" class="form-control" placeholder="MM/YY" required>
                <span class="form-feedback">Required (MM/YY).</span>
              </div>
              <div class="grid-6-fraction form-group" id="group-cardcvv">
                <label class="form-label" for="card-cvv">CVV</label>
                <input type="password" id="card-cvv" class="form-control" placeholder="3 digits" required>
                <span class="form-feedback">CVV (3 digits) required.</span>
              </div>
            </div>

            <div style="margin:var(--spacing-md) 0; font-size:12px; color:var(--color-text-muted);">
              <i class="fa-solid fa-shield-halved" style="margin-right:6px; color:var(--color-sage);"></i>All transactions are secure and encrypted. Card data is never saved.
            </div>

            <div style="display:flex; gap:var(--spacing-xs);">
              <button type="button" class="btn btn-secondary" id="payment-back-btn" style="flex:1;">Back</button>
              <button type="submit" class="btn btn-primary" id="payment-submit-btn" style="flex:2; background-color: var(--color-accent-cta);">Place Order</button>
            </div>
          </form>
        </div>

        <!-- Sidebar Summary Column -->
        <aside class="order-summary">
          <h3 style="margin-bottom:var(--spacing-sm); border-bottom: 2px solid var(--color-border); padding-bottom:var(--spacing-xs);">Order Summary</h3>
          <div id="checkout-summary-items">
            ${cartItemsHtml}
          </div>

          <!-- Promo input -->
          <div style="margin:var(--spacing-md) 0; display:flex; gap:var(--spacing-xs);">
            <input type="text" id="promo-code-input" class="form-control" style="padding:8px 12px;" placeholder="Promo Code" aria-label="Promo Code">
            <button class="btn btn-secondary" id="promo-apply-btn" style="padding:8px 16px;">Apply</button>
          </div>
          <div id="promo-feedback" style="font-size:12px; font-weight:600; margin-top:-10px; margin-bottom:var(--spacing-xs); display:none;"></div>

          <div class="summary-row">
            <span>Subtotal</span>
            <span id="checkout-subtotal">$${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span id="checkout-shipping">${shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div class="summary-row" id="checkout-discount-row" style="display:none; color:var(--color-success); font-weight:600;">
            <span>Discount (SAGE10)</span>
            <span id="checkout-discount">-$0.00</span>
          </div>
          <div class="summary-row">
            <span>Estimated Taxes (8%)</span>
            <span id="checkout-tax">$${tax.toFixed(2)}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span id="checkout-total" style="color:var(--color-terracotta);">$${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  `;

  // Forms references
  const shipForm = document.getElementById("shipping-form");
  const payForm = document.getElementById("payment-form");
  const alertBox = document.getElementById("checkout-alert");

  // Navigation elements
  const shipNav = document.getElementById("step-shipping-nav");
  const payNav = document.getElementById("step-payment-nav");
  const payBack = document.getElementById("payment-back-btn");

  // Shipping details state
  let shippingDetails = {};

  // Form Validation Handlers
  function validateField(inputEl, condition) {
    const group = inputEl.closest(".form-group");
    if (!group) return false;
    if (condition) {
      group.classList.remove("error");
      group.classList.add("success");
      return true;
    } else {
      group.classList.remove("success");
      group.classList.add("error");
      return false;
    }
  }

  // --- Promo code application ---
  const promoInput = document.getElementById("promo-code-input");
  const promoApply = document.getElementById("promo-apply-btn");
  const promoFeedback = document.getElementById("promo-feedback");
  const discountRow = document.getElementById("checkout-discount-row");
  const discVal = document.getElementById("checkout-discount");
  const subVal = document.getElementById("checkout-subtotal");
  const taxVal = document.getElementById("checkout-tax");
  const totalVal = document.getElementById("checkout-total");

  if (promoApply) {
    promoApply.onclick = () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === "SAGE10") {
        discountMultiplier = 0.9;
        appliedCode = "SAGE10";
        promoFeedback.style.display = "block";
        promoFeedback.style.color = "var(--color-success)";
        promoFeedback.textContent = "Code SAGE10 (10% Off) applied!";

        // Recalculate totals
        const discountAmt = subtotal * 0.1;
        const newSub = subtotal - discountAmt;
        const newTax = newSub * 0.08;
        const newTotal = newSub + shippingCost + newTax;

        if (discountRow) discountRow.style.display = "flex";
        if (discVal) discVal.textContent = `-$${discountAmt.toFixed(2)}`;
        if (taxVal) taxVal.textContent = `$${newTax.toFixed(2)}`;
        if (totalVal) totalVal.textContent = `$${newTotal.toFixed(2)}`;

        tax = newTax;
        total = newTotal;
        showToast("10% Promo discount code applied!", "success");
      } else {
        promoFeedback.style.display = "block";
        promoFeedback.style.color = "var(--color-error)";
        promoFeedback.textContent = "Invalid promo code.";
      }
    };
  }

  // Step 1 Shipping submit
  if (shipForm) {
    shipForm.onsubmit = (e) => {
      e.preventDefault();

      const fname = document.getElementById("ship-fname");
      const lname = document.getElementById("ship-lname");
      const email = document.getElementById("ship-email");
      const address = document.getElementById("ship-address");
      const city = document.getElementById("ship-city");
      const stateVal = document.getElementById("ship-state");
      const zip = document.getElementById("ship-zip");

      let valid = true;
      valid = validateField(fname, fname.value.trim() !== "") && valid;
      valid = validateField(lname, lname.value.trim() !== "") && valid;
      valid = validateField(email, email.value.trim() !== "" && email.value.includes("@")) && valid;
      valid = validateField(address, address.value.trim() !== "") && valid;
      valid = validateField(city, city.value.trim() !== "") && valid;
      valid = validateField(stateVal, stateVal.value.trim() !== "") && valid;
      valid = validateField(zip, zip.value.trim() !== "") && valid;

      if (valid) {
        shippingDetails = {
          firstName: fname.value.trim(),
          lastName: lname.value.trim(),
          email: email.value.trim(),
          address: address.value.trim(),
          city: city.value.trim(),
          state: stateVal.value.trim(),
          zip: zip.value.trim()
        };

        // Go to payment step
        shipForm.style.display = "none";
        payForm.style.display = "block";
        shipNav.classList.remove("active");
        payNav.classList.add("active");
        alertBox.style.display = "none";
      } else {
        showToast("Please correct the form fields before proceeding.", "error");
      }
    };
  }

  // Back from payment to shipping
  if (payBack) {
    payBack.onclick = () => {
      payForm.style.display = "none";
      shipForm.style.display = "block";
      payNav.classList.remove("active");
      shipNav.classList.add("active");
    };
  }

  // Step 2 Payment submit (with failure simulation retry)
  if (payForm) {
    payForm.onsubmit = (e) => {
      e.preventDefault();

      const cardName = document.getElementById("card-name");
      const cardNumber = document.getElementById("card-number");
      const cardExpiry = document.getElementById("card-expiry");
      const cardCvv = document.getElementById("card-cvv");

      let valid = true;
      valid = validateField(cardName, cardName.value.trim() !== "") && valid;
      valid = validateField(cardNumber, cardNumber.value.trim().length >= 15) && valid;
      valid = validateField(cardExpiry, cardExpiry.value.trim().length >= 4) && valid;
      valid = validateField(cardCvv, cardCvv.value.trim().length >= 3) && valid;

      if (!valid) {
        showToast("Please enter valid card details.", "error");
        return;
      }

      // Simulate network wait
      const submitBtn = document.getElementById("payment-submit-btn");
      submitBtn.textContent = "Processing Securely...";
      submitBtn.disabled = true;

      setTimeout(() => {
        // Stress test requirement: checkout must support payment failure retry state, preserving input data
        if (isSimulatedFailure) {
          isSimulatedFailure = false; // Next retry succeeds
          submitBtn.textContent = "Place Order";
          submitBtn.disabled = false;

          alertBox.style.display = "block";
          alertBox.style.border = "1px solid var(--color-error)";
          alertBox.style.backgroundColor = "var(--color-error-bg)";
          alertBox.style.color = "var(--color-error)";
          alertBox.innerHTML = `
            <strong>Payment Failure Alert:</strong> The payment processor returned code DECLINED. 
            Your card was not charged. Please review your details and retry.
          `;
          showToast("Payment failed. Please retry with the same card.", "error");
        } else {
          // Success Path!
          const orderNum = Math.floor(Math.random() * 900000) + 100000;
          const newOrder = {
            orderNumber: orderNum.toString(),
            shippingAddress: shippingDetails,
            items: [...state.cart],
            subtotal: subtotal,
            shippingCost: shippingCost,
            total: total,
            deliveryEstimate: getDeliveryRangeText(),
            email: shippingDetails.email,
            date: new Date().toLocaleDateString()
          };

          // Save order to guest/history lists
          state.orders.push(newOrder);

          // Clear Cart
          state.cart = [];
          saveState();

          // Redirect to Thank You page
          window.location.hash = `#thank-you?order=${orderNum}`;
        }
      }, 1500);
    };
  }
}

// Helper to get delivery estimate range
function getDeliveryRangeText() {
  const options = { month: 'short', day: 'numeric' };
  const d1 = new Date();
  const d2 = new Date();
  d1.setDate(d1.getDate() + 3);
  d2.setDate(d2.getDate() + 6);
  return `${d1.toLocaleDateString('en-US', options)} - ${d2.toLocaleDateString('en-US', options)}, 2026`;
}

// --- Thank You / Order Confirmation ---
function renderThankYou(container, orderNumber) {
  document.title = "Order Confirmed | SAGE & CLAY";

  const order = state.orders.find(o => o.orderNumber === orderNumber);

  container.innerHTML = `
    <div class="container view-section" style="max-width:640px; margin:0 auto; text-align:center;">
      <span style="font-size:48px; display:block; margin-bottom:var(--spacing-xs);"><i class="fa-solid fa-circle-check" style="color:var(--color-success);"></i></span>
      <h1 style="font-family:var(--font-serif); font-size:36px; margin-bottom:var(--spacing-xxs);">Your skin thanks you.</h1>
      <p style="font-size:16px; color:var(--color-success); font-weight:600; margin-bottom:var(--spacing-md);">Order Confirmed: #${orderNumber || "120394"}</p>

      <div class="account-card" style="text-align:left; margin-bottom:var(--spacing-lg);">
        <h3 style="margin-bottom:var(--spacing-xs); border-bottom:1px solid var(--color-border); padding-bottom:4px;">Delivery Summary</h3>
        <p style="font-size:14px; margin-bottom:var(--spacing-xxs);">A confirmation email and tracking link have been dispatched to <strong>${order ? order.email : "your email"}</strong>.</p>
        <p style="font-size:14px; margin-bottom:var(--spacing-xs);">Estimated Arrival: <strong>${order ? order.deliveryEstimate : "3-6 business days"}</strong></p>

        <h4 style="font-size:13px; margin-bottom:var(--spacing-xxs);">Shipping Address:</h4>
        <p style="font-size:13px; color:var(--color-text-muted);">
          ${order ? `
            ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}
          ` : "Guest Address"}
        </p>
      </div>

      <!-- Guest to register block (data merging capability) -->
      <div style="background-color:var(--color-sand-light); border:1px solid var(--color-border); padding:var(--spacing-md); border-radius:var(--radius-lg); margin-bottom:var(--spacing-lg); text-align:left;">
        <h3 style="margin-bottom:var(--spacing-xxs); font-family:var(--font-sans); font-size:16px; font-weight:700;">Save your ritual history</h3>
        <p style="font-size:13px; color:var(--color-text-muted); margin-bottom:var(--spacing-sm);">Create a password to merge your guest order history, track shipping easily, and save custom routine schedules.</p>
        <div style="display:flex; gap:var(--spacing-xs);">
          <input type="password" id="confirm-pwd" class="form-control" style="padding:8px 12px;" placeholder="Create Password" aria-label="Create Password">
          <button class="btn btn-primary" id="confirm-register-btn" style="padding:8px 16px; font-size:12px; white-space:nowrap; background-color: var(--color-accent-cta);">Create Account</button>
        </div>
      </div>

      <!-- Referral block -->
      <div style="padding:var(--spacing-md); border:1.5px dashed var(--color-sage); border-radius:var(--radius-md); margin-bottom:var(--spacing-xl);">
        <h3 style="font-family:var(--font-serif); font-size:18px; color:var(--color-sage); margin-bottom:2px;">Refer a Friend, Get 15% Off</h3>
        <p style="font-size:13px; color:var(--color-text-muted); margin-bottom:var(--spacing-sm);">Give your friends 10% off their first routine and secure a 15% credit on your next purchase.</p>
        <button class="btn btn-secondary" onclick="showToast('Referral link copied to clipboard!', 'success')" style="padding:8px 16px; font-size:11px;">Copy Invite Link</button>
      </div>

      <div style="display:flex; justify-content:center; gap:var(--spacing-sm);">
        <a href="#shop" class="btn btn-primary">Continue Shopping</a>
        <a href="#track?orderNumber=${orderNumber}&email=${order ? order.email : ''}" class="btn btn-secondary">Track Package</a>
      </div>
    </div>
  `;

  // Merge Account button click
  const regBtn = document.getElementById("confirm-register-btn");
  if (regBtn) {
    regBtn.onclick = () => {
      const pwd = document.getElementById("confirm-pwd").value.trim();
      if (pwd.length < 6) {
        showToast("Password must be at least 6 characters.", "error");
        return;
      }

      // Merge guest logic
      state.activeUser = {
        email: order ? order.email : "guest@example.com",
        firstName: order ? order.shippingAddress.firstName : "User",
        lastName: order ? order.shippingAddress.lastName : "",
        orders: [...state.orders]
      };
      saveState();

      showToast("Account created successfully! Order history merged.", "success");
      window.location.hash = "#account";
    };
  }

  // Post-purchase review request simulation (delayed toast after 15s)
  setTimeout(() => {
    showToast("Post-purchase Notice: How is your skin feeling? We would love to hear your feedback. Write a review for SAGE & CLAY.", "info");
  }, 15000);
}

// --- Account / Logged in Dashboard ---
function renderAccount(container) {
  document.title = "My Account | SAGE & CLAY";

  // Login handler helper
  function handleLogin(email, pwd) {
    if (email && pwd) {
      state.activeUser = {
        email: email,
        firstName: "Sarah",
        lastName: "Connor",
        orders: state.orders.filter(o => o.email === email)
      };
      saveState();
      showToast("Welcome back, Sarah!", "success");
      renderDashboard();
    }
  }

  function renderDashboard() {
    container.innerHTML = `
      <div class="container view-section" style="margin-top:var(--spacing-md);">
        <h1 style="font-family:var(--font-serif); font-size:32px; margin-bottom:var(--spacing-md);">Welcome, ${state.activeUser.firstName}</h1>
        
        <div class="account-layout">
          <!-- Sidebar Nav tabs -->
          <aside class="account-nav">
            <button class="account-nav-btn active" id="acc-history-nav">Order History</button>
            <button class="account-nav-btn" id="acc-routine-nav">Saved Routine</button>
            <button class="account-nav-btn" id="acc-details-nav">Account Details</button>
            <button class="account-nav-btn" id="acc-logout-btn" style="color:var(--color-error);">Log Out</button>
          </aside>

          <!-- Panels container -->
          <div>
            <!-- Order History Panel -->
            <div id="panel-history" class="account-card">
              <h3 style="margin-bottom:var(--spacing-md); border-bottom:1px solid var(--color-border); padding-bottom:var(--spacing-xs);">Your Purchases</h3>
              
              ${state.activeUser.orders.length === 0 ? `
                <p style="font-size:14px; color:var(--color-text-muted); text-align:center; padding:var(--spacing-lg) 0;">You haven't placed any orders yet.</p>
              ` : state.activeUser.orders.map(o => `
                <div style="border:1px solid var(--color-border); border-radius:var(--radius-sm); padding:var(--spacing-sm); margin-bottom:var(--spacing-sm); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--spacing-sm);">
                  <div>
                    <strong style="color:var(--color-terracotta);">Order #${o.orderNumber}</strong><br>
                    <span style="font-size:12px; color:var(--color-text-muted);">Placed on ${o.date}</span>
                  </div>
                  <div style="font-size:14px;">
                    Total: <strong>$${o.total.toFixed(2)}</strong>
                  </div>
                  <div>
                    <a href="#track?orderNumber=${o.orderNumber}&email=${o.email}" class="btn btn-secondary" style="padding:6px 12px; font-size:11px;">Track Package</a>
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- Saved Routine Panel (Initially Hidden) -->
            <div id="panel-routine" class="account-card" style="display:none;">
              <h3 style="margin-bottom:var(--spacing-sm); border-bottom:1px solid var(--color-border); padding-bottom:var(--spacing-xs);">My Saved Skincare Ritual</h3>
              <p style="font-size:14px; color:var(--color-text-muted); margin-bottom:var(--spacing-md);">Your recommended daily routine matching active clinical solutions:</p>
              
              <div style="display:grid; grid-template-columns:1fr; gap:var(--spacing-md);">
                <div style="border-left:3px solid var(--color-sage); padding-left:var(--spacing-sm);">
                  <strong style="text-transform:uppercase; font-size:12px; color:var(--color-sage);">Morning Ritual: Cleanse & Shield</strong>
                  <p style="font-size:14px; margin-top:2px;">1. Calming Sage Gel Cleanser<br>2. Mineral Shield SPF 50 Sunscreen</p>
                </div>
                <div style="border-left:3px solid var(--color-terracotta); padding-left:var(--spacing-sm);">
                  <strong style="text-transform:uppercase; font-size:12px; color:var(--color-terracotta);">Evening Ritual: Restructure & Hydrate</strong>
                  <p style="font-size:14px; margin-top:2px;">1. Calming Sage Gel Cleanser<br>2. Barrier Boost Ceramide Serum<br>3. Terracotta Glow Moisturizer</p>
                </div>
              </div>
            </div>

            <!-- Account Details Panel (Initially Hidden) -->
            <div id="panel-details" class="account-card" style="display:none;">
              <h3 style="margin-bottom:var(--spacing-sm); border-bottom:1px solid var(--color-border); padding-bottom:var(--spacing-xs);">Contact Information</h3>
              <p style="font-size:14px; margin-bottom:var(--spacing-xxs);">Name: <strong>Sarah Connor</strong></p>
              <p style="font-size:14px; margin-bottom:var(--spacing-md);">Registered Email: <strong>${state.activeUser.email}</strong></p>
              <button class="btn btn-secondary" onclick="showToast('Edit addresses feature coming soon.', 'info')" style="padding:8px 16px; font-size:12px;">Edit Details</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Dashboard nav handlers
    const navHistory = document.getElementById("acc-history-nav");
    const navRoutine = document.getElementById("acc-routine-nav");
    const navDetails = document.getElementById("acc-details-nav");
    const navLogout = document.getElementById("acc-logout-btn");

    const pnlHistory = document.getElementById("panel-history");
    const pnlRoutine = document.getElementById("panel-routine");
    const pnlDetails = document.getElementById("panel-details");

    const tabsList = [
      { nav: navHistory, pnl: pnlHistory },
      { nav: navRoutine, pnl: pnlRoutine },
      { nav: navDetails, pnl: pnlDetails }
    ];

    tabsList.forEach(item => {
      if (item.nav) {
        item.nav.onclick = () => {
          tabsList.forEach(t => {
            t.nav.classList.remove("active");
            t.pnl.style.display = "none";
          });
          item.nav.classList.add("active");
          item.pnl.style.display = "block";
        };
      }
    });

    if (navLogout) {
      navLogout.onclick = () => {
        state.activeUser = null;
        saveState();
        showToast("Logged out successfully.", "info");
        router();
      };
    }
  }

  // Render Login Form if guest
  if (!state.activeUser) {
    container.innerHTML = `
      <div class="container view-section" style="max-width:440px; margin:0 auto;">
        <div class="account-card">
          <h1 style="font-family:var(--font-serif); font-size:28px; margin-bottom:var(--spacing-xs); text-align:center;">Client Portal</h1>
          <p style="font-size:14px; color:var(--color-text-muted); text-align:center; margin-bottom:var(--spacing-md);">Log in to track orders, schedule refills, or retrieve saved routines.</p>
          
          <form id="login-form">
            <div class="form-group">
              <label class="form-label" for="login-email">Email Address</label>
              <input type="email" id="login-email" class="form-control" required value="sarah@example.com">
            </div>
            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <input type="password" id="login-password" class="form-control" required value="******">
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:var(--spacing-sm);">Sign In</button>
          </form>
        </div>
      </div>
    `;

    const logForm = document.getElementById("login-form");
    if (logForm) {
      logForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        handleLogin(email, "password");
      };
    }
  } else {
    renderDashboard();
  }
}

// --- Order Tracking lookup (no login required) ---
function renderTrackOrder(container, orderNumParam = "", emailParam = "") {
  document.title = "Order Tracking | SAGE & CLAY";

  container.innerHTML = `
    <div class="container view-section" style="max-width:500px; margin:0 auto;">
      <div class="account-card">
        <h1 style="font-family:var(--font-serif); font-size:32px; text-align:center; margin-bottom:var(--spacing-xs);">Track Your Package</h1>
        <p style="font-size:14px; color:var(--color-text-muted); text-align:center; margin-bottom:var(--spacing-md);">Enter your order number and contact email to look up live logistics status.</p>
        
        <form id="tracking-lookup-form">
          <div class="form-group">
            <label class="form-label" for="track-order-num">Order Number</label>
            <input type="text" id="track-order-num" class="form-control" value="${orderNumParam}" required placeholder="e.g. 120394">
          </div>
          <div class="form-group">
            <label class="form-label" for="track-email">Contact Email</label>
            <input type="email" id="track-email" class="form-control" value="${emailParam}" required placeholder="e.g. sarah@example.com">
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:var(--spacing-sm);">Track Order</button>
        </form>
      </div>

      <div id="tracking-result" style="display:none; margin-top:var(--spacing-md);"></div>
    </div>
  `;

  const trackForm = document.getElementById("tracking-lookup-form");
  const resultBox = document.getElementById("tracking-result");

  function processLookup(orderNumber, email) {
    const matched = state.orders.find(o => o.orderNumber === orderNumber && o.email === email);

    resultBox.style.display = "block";
    if (matched) {
      resultBox.innerHTML = `
        <div class="account-card" style="border-left: 4px solid var(--color-success);">
          <span style="font-size:11px; font-weight:700; color:var(--color-success); text-transform:uppercase;"><i class="fa-solid fa-truck" style="margin-right:4px;"></i>Package In Transit</span>
          <h3 style="font-size:20px; margin-top:4px;">Order #${orderNumber}</h3>
          <p style="font-size:14px; margin-top:var(--spacing-xs);">Est. Delivery: <strong>${matched.deliveryEstimate}</strong></p>
          
          <div style="margin-top:var(--spacing-sm); border-top:1px solid var(--color-border); padding-top:var(--spacing-sm);">
            <h4 style="font-size:12px; text-transform:uppercase;">Tracking History:</h4>
            <ul style="font-size:13px; color:var(--color-text-muted); list-style:none; display:flex; flex-direction:column; gap:4px; margin-top:4px;">
              <li><i class="fa-solid fa-truck" style="margin-right:5px; color:var(--color-sage);"></i>[In Transit] Dispatched from regional sorting facility.</li>
              <li><i class="fa-solid fa-box" style="margin-right:5px; color:var(--color-terracotta);"></i>[Processed] Packaging completed at S&C Lab.</li>
              <li><i class="fa-solid fa-circle-check" style="margin-right:5px; color:var(--color-success);"></i>[Confirmed] Order received.</li>
            </ul>
          </div>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="account-card" style="border-left: 4px solid var(--color-error);">
          <span style="font-size:11px; font-weight:700; color:var(--color-error); text-transform:uppercase;"><i class="fa-solid fa-circle-exclamation" style="margin-right:4px;"></i>Not Found</span>
          <h3 style="font-size:18px; margin-top:4px;">No records matched</h3>
          <p style="font-size:14px; color:var(--color-text-muted); margin-top:2px;">
            Please double-check the order number and email. For guest orders placed recently, sync may take 5 minutes.
          </p>
        </div>
      `;
    }
  }

  if (trackForm) {
    trackForm.onsubmit = (e) => {
      e.preventDefault();
      const num = document.getElementById("track-order-num").value.trim();
      const mail = document.getElementById("track-email").value.trim();
      processLookup(num, mail);
    };

    // Auto trigger if params passed in URL hash
    if (orderNumParam && emailParam) {
      processLookup(orderNumParam, emailParam);
    }
  }
}

// --- Search Results ---
function renderSearch(container, query = "") {
  document.title = `Search Results: "${query}" | SAGE & CLAY`;

  const cleanQuery = query.toLowerCase().trim();
  const results = PRODUCTS_DB.filter(p =>
    p.name.toLowerCase().includes(cleanQuery) ||
    p.category.toLowerCase().includes(cleanQuery) ||
    p.concern.toLowerCase().includes(cleanQuery)
  );

  container.innerHTML = `
    <div class="container view-section" style="margin-top:var(--spacing-md);">
      <h1 style="font-family:var(--font-serif); font-size:32px; margin-bottom:var(--spacing-sm);">Search Results</h1>
      <p style="font-size:14px; color:var(--color-text-muted); margin-bottom:var(--spacing-lg);">Showing results for query: "<strong>${query}</strong>"</p>
      
      ${results.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h2>No matching formulations found.</h2>
          <p>Try searching for "serum", "cleaner", or specific skin concerns like "Acne".</p>
          <a href="#shop" class="btn btn-primary">Browse All Products</a>
        </div>
      ` : `
        <div class="product-grid">
          ${results.map(p => renderProductCard(p)).join("")}
        </div>
      `}
    </div>
  `;
}

// --- Journal / Blog ---
function renderJournal(container) {
  document.title = "Skin Journal & Ingredient Philosophy | SAGE & CLAY";

  container.innerHTML = `
    <div class="container view-section" style="margin-top:var(--spacing-md);">
      <div style="text-align:center; max-width:600px; margin:0 auto var(--spacing-xl);">
        <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--color-terracotta);">Editorial Journal</span>
        <h1 style="font-family:var(--font-serif); font-size:40px; margin:var(--spacing-xxs) 0;">The Skin Science Diary</h1>
        <p style="font-size:15px; color:var(--color-text-muted);">Insights into dermal science, ingredient combinations, and skincare routines written by clinical research coordinators.</p>
      </div>

      <div class="blog-grid">
        ${JOURNAL_DB.map(post => `
          <article class="blog-card">
            <div style="width:100%; height:200px; overflow:hidden; border-radius:var(--radius-sm) var(--radius-sm) 0 0;">
              <img src="${post.image}" alt="${post.title}" style="width:300%; height:100%; object-fit:cover; object-position:${post.imageOffsetX} center; display:block;" />
            </div>
            <div class="blog-card-content">
              <span class="blog-card-date">${post.category} &bull; ${post.date}</span>
              <h3 class="blog-card-title">${post.title}</h3>
              <p class="blog-card-excerpt">${post.excerpt}</p>
              <button class="blog-card-link" onclick="showToast('Full articles feature coming soon as part of seasonal catalog releases.', 'info')">Read Article <i class="fa-solid fa-arrow-right"></i></button>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

// --- Philosophy / About ---
function renderAbout(container) {
  document.title = "Our Philosophy | SAGE & CLAY";

  container.innerHTML = `
    <div class="container view-section">
      <div class="editorial-container">
        <h1 class="editorial-title">Clinical Efficacy Meets Sensorial Warmth</h1>
        <div class="editorial-meta">SAGE & CLAY PHILOSOPHY</div>

        <img src="images/about_hero.png" alt="SAGE & CLAY botanical lab &mdash; our philosophy" style="width:100%; height:280px; object-fit:cover; border-radius:var(--radius-lg); margin-bottom:var(--spacing-lg);" />

        <div class="editorial-body">
          <p>
            Welcome to SAGE & CLAY. We believe that clinical skincare does not need to feel cold, sterile, or clinical. By blending dermatologist-approved active components (like salicylic acid, ceramides, and vitamin C) with calming, earthy botanical compounds (such as sage, tea tree, and aloe), we engineer products that deliver visible results while respecting the skin barrier.
          </p>

          <h2>Our Core Pillars</h2>
          <p>
            <strong>1. Barrier First:</strong> We do not formulate stripping solutions. Every active acid or peeling agent in our laboratory is matched with soothing compounds to maintain pH balance.
          </p>
          <p>
            <strong>2. Radically Transparent:</strong> We disclose active concentrations and full key ingredient sources openly on our product labels.
          </p>
          <p>
            <strong>3. Inclusive Sustainability:</strong> Cruelty-free, vegan-certified, and packaged in glass containers designed to lock out sun degradation.
          </p>
        </div>
      </div>
    </div>
  `;
}

// --- Legal Pages ---
function renderLegal(container, page) {
  let title = "Privacy Policy";
  let contentHtml = "";

  if (page === "terms") {
    title = "Terms of Service";
    contentHtml = `
      <h2>1. Terms of Use</h2>
      <p>By browsing this e-commerce site, you agree to comply with standard customer conduct guidelines. Purchases must be for personal use only.</p>
      <h2>2. Product Guarantees</h2>
      <p>We guarantee 30-day satisfaction returns. Actives advisory is posted on respective product details.</p>
    `;
  } else if (page === "shipping-returns") {
    title = "Shipping & Returns Policy";
    contentHtml = `
      <h2>1. Domestic Shipping</h2>
      <p>Free standard shipping is triggered on orders over $50. Standard deliveries average 3 to 6 business days. Orders ship within 24 business hours.</p>
      <h2>2. Returns Procedure</h2>
      <p>We provide a 30-day trial period. If a formulation does not suit your skin type, email support@sageandclay.com for a free pre-paid return label. Complete refund is issued upon package scan.</p>
    `;
  } else {
    contentHtml = `
      <h2>1. Data Protection</h2>
      <p>We care about your privacy. Guest checkouts and contact details are fully encrypted and only used for order processing and tracking updates.</p>
      <h2>2. Cookies Policy</h2>
      <p>We use standard client-side state memory to store cart contents, wishlists, and user configurations.</p>
    `;
  }

  document.title = `${title} | SAGE & CLAY`;

  container.innerHTML = `
    <div class="container view-section">
      <div class="editorial-container">
        <h1 class="editorial-title">${title}</h1>
        <div class="editorial-meta">Last Updated: July 2026</div>
        <div class="editorial-body">
          ${contentHtml}
        </div>
      </div>
    </div>
  `;
}

// --- Cart Page View ---
function renderCartPage(container) {
  document.title = "Shopping Cart | SAGE & CLAY";

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="container view-section">
        <div class="empty-state">
          <div class="empty-state-icon">👜</div>
          <h2>Your cart is empty.</h2>
          <p>Browse our dermatologist-tested collections to build your custom ritual.</p>
          <a href="#shop" class="btn btn-primary">Browse Shop</a>
        </div>
      </div>
    `;
    return;
  }

  let subtotal = 0;
  let cartRows = "";

  state.cart.forEach((item, index) => {
    const product = PRODUCTS_DB.find(p => p.id === item.productId);
    if (!product) return;

    const basePrice = item.priceOverride || product.price;
    const itemPrice = item.purchaseOption === "subscribe" ? basePrice * 0.9 : basePrice;
    const itemTotal = itemPrice * item.quantity;
    subtotal += itemTotal;

    cartRows += `
      <div class="cart-item-row" data-index="${index}">
        ${renderProductSVG(product, 80)}
        <div class="cart-item-row-info">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <h3 class="cart-item-row-title"><a href="#product?id=${product.id}">${product.name}</a></h3>
              <span class="cart-item-row-price">$${itemPrice.toFixed(2)}</span>
            </div>
            <p style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">
              Size: ${item.size || product.volume} | ${item.purchaseOption === "subscribe" ? "Subscribe & Save 10%" : "One-time Purchase"}
            </p>
          </div>
          <div class="cart-item-row-actions">
            <div class="qty-stepper">
              <button class="qty-btn dec" data-index="${index}">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn inc" data-index="${index}">+</button>
            </div>
            <div style="display:flex; gap:16px;">
              <button class="btn-ghost move-to-wishlist-btn" data-id="${product.id}" data-index="${index}" style="font-size:12px; text-decoration:underline;">Save to Wishlist</button>
              <button class="btn-ghost remove-item-btn" data-index="${index}" style="font-size:12px; text-decoration:underline; color:var(--color-error);">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  const threshold = 50;
  const shippingCost = subtotal >= threshold ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const pct = Math.min((subtotal / threshold) * 100, 100);
  const diff = threshold - subtotal;

  container.innerHTML = `
    <div class="container view-section" style="margin-top:var(--spacing-md);">
      <h1 style="font-family:var(--font-serif); font-size:32px; margin-bottom:var(--spacing-md);">Shopping Cart</h1>
      
      <div class="cart-layout">
        <!-- Items List -->
        <div>
          <!-- Shipping progress bar -->
          <div class="shipping-progress-container" style="background-color:var(--color-white); border:1px solid var(--color-border); padding:var(--spacing-sm); border-radius:var(--radius-md); margin-bottom:var(--spacing-sm); box-shadow:var(--shadow-sm);">
            <div class="shipping-progress-text" style="font-size:13px; font-weight:600;">
              ${subtotal >= threshold ? "<i class='fa-solid fa-circle-check' style='margin-right:5px; color:var(--color-success);'></i>Congratulations! You have unlocked <strong>Free Standard Shipping</strong>." : `You are only <strong>$${diff.toFixed(2)}</strong> away from <strong>Free Standard Shipping</strong>.`}
            </div>
            <div class="shipping-progress-bar-bg" style="margin-top:8px;">
              <div class="shipping-progress-bar-fg ${subtotal >= threshold ? "free" : ""}" style="width:${pct}%;"></div>
            </div>
            <span style="font-size:11px; color:var(--color-text-muted); display:block; margin-top:6px;"><i class="fa-solid fa-clock" style="margin-right:4px;"></i>Standard delivery: 3 to 6 business days.</span>
          </div>

          <div class="cart-items-list">
            ${cartRows}
          </div>
          
          <div style="margin-top:var(--spacing-md); display:flex; justify-content:space-between;">
            <a href="#shop" class="btn btn-secondary" style="font-size:12px;"><i class="fa-solid fa-arrow-left" style="margin-right:5px;"></i>Continue Shopping</a>
          </div>
        </div>

        <!-- Checkout Summary -->
        <div class="order-summary">
          <h3 style="margin-bottom:var(--spacing-sm); border-bottom:2px solid var(--color-border); padding-bottom:4px;">Order Summary</h3>
          
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>${shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div class="summary-row">
            <span>Estimated Taxes (8%)</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="summary-row total" style="margin-bottom:var(--spacing-md);">
            <span>Estimated Total</span>
            <span style="color:var(--color-terracotta);">$${total.toFixed(2)}</span>
          </div>

          <a href="#checkout" class="btn btn-primary" style="width:100%; display:block; margin-bottom:var(--spacing-sm);">Proceed to Checkout</a>
          <span style="font-size:11px; color:var(--color-text-muted); display:block; text-align:center;">Secure checkout processed. Returns are always free.</span>

          <!-- Cart page cross sell -->
          <div style="margin-top:var(--spacing-lg); border-top:1px solid var(--color-border); padding-top:var(--spacing-md);">
            <h4 style="font-size:12px; text-transform:uppercase; margin-bottom:var(--spacing-xs);">Complete Your Ritual (Travel Size)</h4>
            <div style="display:flex; gap:var(--spacing-xs); background-color:var(--color-bg); padding:var(--spacing-xs); border-radius:var(--radius-sm); border:1px solid var(--color-border);">
              ${renderProductSVG(PRODUCTS_DB[0], 40)}
              <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">
                <span style="font-size:11px; font-weight:700;">Calming Sage Cleanser (Mini &mdash; 30ml)</span>
                <span style="font-size:11px; color:var(--color-terracotta); font-weight:600;">$12.00</span>
                <button class="btn btn-primary add-mini-btn" style="padding:4px 8px; font-size:9px; align-self:flex-start; margin-top:4px;">Add +</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers inside Cart Page
  container.querySelectorAll(".qty-btn.dec").forEach(btn => {
    btn.onclick = () => {
      updateCartQuantity(parseInt(btn.dataset.index), -1);
      renderCartPage(container);
    };
  });

  container.querySelectorAll(".qty-btn.inc").forEach(btn => {
    btn.onclick = () => {
      updateCartQuantity(parseInt(btn.dataset.index), 1);
      renderCartPage(container);
    };
  });

  container.querySelectorAll(".remove-item-btn").forEach(btn => {
    btn.onclick = () => {
      removeFromCart(parseInt(btn.dataset.index));
      renderCartPage(container);
    };
  });

  container.querySelectorAll(".move-to-wishlist-btn").forEach(btn => {
    btn.onclick = () => {
      const pId = parseInt(btn.dataset.id);
      toggleWishlist(pId);
      removeFromCart(parseInt(btn.dataset.index));
      renderCartPage(container);
    };
  });

  const addMini = container.querySelector(".add-mini-btn");
  if (addMini) {
    addMini.onclick = () => {
      addToCartWithDetails(1, 1, "once", "30ml", 12.00);
      renderCartPage(container);
    };
  }
}

// --- Wishlist Page View ---
function renderWishlistPage(container, params = {}) {
  document.title = "My Wishlist | SAGE & CLAY";

  // Check if items are passed in the params (gifting use case from shared URL!)
  if (params.items) {
    const ids = params.items.split(",").map(i => parseInt(i)).filter(i => !isNaN(i));
    ids.forEach(id => {
      if (!state.wishlist.includes(id)) {
        state.wishlist.push(id);
      }
    });
    saveState();
    showToast("Shared wishlist items loaded successfully!", "success");
    // Clear URL parameters to prevent repeated merges
    window.history.replaceState(null, "", window.location.pathname + window.location.hash.split("?")[0]);
  }

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="container view-section">
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fa-solid fa-heart" style="color:var(--color-terracotta);"></i></div>
          <h2>Your wishlist is empty.</h2>
          <p>Explore our premium clinical products to save items to your custom routine.</p>
          <a href="#shop" class="btn btn-primary">Go to Shop</a>
        </div>
      </div>
    `;
    return;
  }

  let wishlistItemsHtml = "";

  state.wishlist.forEach(id => {
    const product = PRODUCTS_DB.find(p => p.id === id);
    if (!product) return;

    const isSoldOut = product.stock === 0;

    wishlistItemsHtml += `
      <div style="background-color:var(--color-white); border:1px solid var(--color-border); padding:var(--spacing-md); border-radius:var(--radius-md); box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:var(--spacing-xs);">
        <div style="position:relative; aspect-ratio:1; background-color:var(--color-sand-light); border-radius:var(--radius-sm); display:flex; justify-content:center; align-items:center; overflow:hidden;">
          <a href="#product?id=${product.id}" style="display:block; width:100%; height:100%;">
            ${product.image
        ? `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" />`
        : renderProductSVG(product, 120)}
          </a>
          <button class="product-card-wishlist active wl-remove-item" data-id="${product.id}" aria-label="Remove from wishlist" style="top:8px; right:8px;">
            &times;
          </button>
        </div>
        <span style="font-size:10px; font-weight:600; text-transform:uppercase; color:var(--color-text-muted);">${product.category}</span>
        <h3 style="font-size:15px; font-family:var(--font-sans); font-weight:600;"><a href="#product?id=${product.id}">${product.name}</a></h3>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; border-top:1px solid var(--color-border); padding-top:var(--spacing-xs);">
          <span style="font-weight:700; color:var(--color-terracotta); font-size:16px;">$${product.price.toFixed(2)}</span>
          ${isSoldOut ? `
            <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-end;">
              <span class="badge badge-sold-out">Sold Out</span>
              <button class="btn btn-secondary wl-notify-btn" data-id="${product.id}" style="padding:4px 8px; font-size:9px;">Notify Me</button>
            </div>
          ` : `
            <button class="btn btn-primary wl-add-btn" data-id="${product.id}" style="padding:6px 12px; font-size:11px;">Add to Cart</button>
          `}
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="container view-section" style="margin-top:var(--spacing-md);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--spacing-md); flex-wrap:wrap; gap:var(--spacing-sm);">
        <div>
          <h1 style="font-family:var(--font-serif); font-size:32px;">My Wishlist</h1>
          <p style="font-size:14px; color:var(--color-text-muted);">Save clinical items to buy later or share with family.</p>
        </div>
        <!-- Gifting Share link -->
        <button class="btn btn-secondary" id="wishlist-share-btn" style="display:inline-flex; align-items:center; gap:6px; font-size:12px;">
          <i class="fa-solid fa-share-nodes" style="margin-right:6px;"></i>Share Wishlist (Gift Link)
        </button>
      </div>

      <div class="product-grid">
        ${wishlistItemsHtml}
      </div>
    </div>
  `;

  // Attach event handlers inside Wishlist Page
  container.querySelectorAll(".wl-remove-item").forEach(btn => {
    btn.onclick = () => {
      toggleWishlist(parseInt(btn.dataset.id));
      renderWishlistPage(container);
    };
  });

  container.querySelectorAll(".wl-add-btn").forEach(btn => {
    btn.onclick = () => {
      const pId = parseInt(btn.dataset.id);
      addToCart(pId, 1, "once");
      toggleWishlist(pId); // Move to cart
      renderWishlistPage(container);
    };
  });

  container.querySelectorAll(".wl-notify-btn").forEach(btn => {
    btn.onclick = () => {
      showToast("You will be notified when this item is back in stock!", "success");
    };
  });

  const shareBtn = document.getElementById("wishlist-share-btn");
  if (shareBtn) {
    shareBtn.onclick = () => {
      const cleanUrl = window.location.href.split("?")[0].split("#")[0];
      const shareUrl = `${cleanUrl}#wishlist?items=${state.wishlist.join(",")}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast("Wishlist link copied to clipboard! Share it for gifting.", "success");
      }).catch(() => {
        showToast("Unable to copy. Link is: " + shareUrl, "info");
      });
    };
  }
}

// --- Returns Portal View ---
function renderReturns(container) {
  document.title = "Returns & Exchanges Request Flow | SAGE & CLAY";

  container.innerHTML = `
    <div class="container view-section" style="max-width:600px; margin:0 auto;">
      <div class="account-card">
        <h1 style="font-family:var(--font-serif); font-size:32px; text-align:center; margin-bottom:var(--spacing-xs);">Return & Exchange Portal</h1>
        <p style="font-size:14px; color:var(--color-text-muted); text-align:center; margin-bottom:var(--spacing-md);">Enter your order lookup number to start a refund or product exchange request.</p>

        <!-- Lookup form -->
        <form id="returns-lookup-form">
          <div class="form-group">
            <label class="form-label" for="ret-order-num">Order Number</label>
            <input type="text" id="ret-order-num" class="form-control" required placeholder="e.g. 120394" value="${state.orders.length > 0 ? state.orders[0].orderNumber : ""}">
          </div>
          <div class="form-group">
            <label class="form-label" for="ret-email">Email Address</label>
            <input type="email" id="ret-email" class="form-control" required placeholder="e.g. sarah@example.com" value="${state.orders.length > 0 ? state.orders[0].email : ""}">
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:var(--spacing-sm);">Lookup Order</button>
        </form>
      </div>

      <!-- Action Panel (Initially Hidden) -->
      <div id="returns-action-panel" class="account-card" style="display:none; margin-top:var(--spacing-md);">
        <h3 style="margin-bottom:var(--spacing-sm); border-bottom:1px solid var(--color-border); padding-bottom:var(--spacing-xs);">Request Return / Exchange</h3>
        <form id="returns-request-form">
          <div class="form-group">
            <label class="form-label" for="ret-product-select">Select formulation to return:</label>
            <select id="ret-product-select" class="form-control">
              <option value="1">Calming Sage Gel Cleanser</option>
              <option value="2">Barrier Boost Ceramide Serum</option>
              <option value="3">Terracotta Glow Moisturizer</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="ret-reason">Reason for return:</label>
            <select id="ret-reason" class="form-control" required>
              <option value="">-- Choose a reason --</option>
              <option value="allergy">Skin irritation/allergic reaction</option>
              <option value="unsatisfied">Didn't meet clinical expectations</option>
              <option value="incorrect">Incorrect shade match/volume</option>
              <option value="damaged">Formulation arrived damaged</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="ret-comments">Customer Feedback (Comments)</label>
            <textarea id="ret-comments" class="form-control" style="height:80px; resize:none;" placeholder="Tell us about your skin reaction or expectation gap..."></textarea>
          </div>

          <!-- Drag and Drop Photo Box -->
          <div class="form-group">
            <label class="form-label">Upload progress photo (required for shade-match verification):</label>
            <div class="photo-upload-box" id="drag-drop-box">
              <span style="font-size:48px; display:block; margin-bottom:4px;"><i class="fa-solid fa-camera" style="color:var(--color-terracotta);"></i></span>
              <span style="font-size:12px; font-weight:600; text-transform:uppercase;">Click or drag progress photo here</span>
              <span style="font-size:10px; color:var(--color-text-muted); display:block; margin-top:2px;">Supports JPG, PNG up to 5MB</span>
              <input type="file" id="ret-file-input" style="display:none;" accept="image/*">
            </div>
            <div id="file-uploaded-msg" style="font-size:12px; color:var(--color-success); font-weight:600; display:none; margin-top:4px;"></div>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:var(--spacing-md); background-color: var(--color-accent-cta);">Submit Return Request</button>
        </form>
      </div>

      <!-- Success Panel (Initially Hidden) -->
      <div id="returns-success-panel" class="account-card" style="display:none; margin-top:var(--spacing-md); border-left:4px solid var(--color-success);">
        <span style="font-size:11px; font-weight:700; color:var(--color-success); text-transform:uppercase;">✓ Request Submitted</span>
        <h3 style="font-size:20px; margin-top:4px;">Return Authorization Generated</h3>
        <p style="font-size:14px; margin-top:var(--spacing-xs);">Your Return Authorization code is <strong>#RA-182749</strong>.</p>
        <p style="font-size:14px; margin-top:var(--spacing-xxs);">A pre-paid USPS shipping label has been dispatched to your email address.</p>
        <p style="font-size:13px; color:var(--color-text-muted); margin-top:var(--spacing-sm);">Drop the package at any US post office. A full refund will be processed upon label scan.</p>
      </div>
    </div>
  `;

  // Lookup validation and submit
  const lookupForm = document.getElementById("returns-lookup-form");
  const actionPanel = document.getElementById("returns-action-panel");
  const successPanel = document.getElementById("returns-success-panel");
  const dragBox = document.getElementById("drag-drop-box");
  const fileInput = document.getElementById("ret-file-input");
  const fileMsg = document.getElementById("file-uploaded-msg");
  const reqForm = document.getElementById("returns-request-form");

  if (lookupForm) {
    lookupForm.onsubmit = (e) => {
      e.preventDefault();
      const oNum = document.getElementById("ret-order-num").value.trim();
      const mail = document.getElementById("ret-email").value.trim();

      if (oNum && mail) {
        lookupForm.closest(".account-card").style.display = "none";
        actionPanel.style.display = "block";
        showToast("Order found! Please fill return details.", "success");
      }
    };
  }

  // File upload click trigger
  if (dragBox && fileInput) {
    dragBox.onclick = () => fileInput.click();
    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        fileMsg.style.display = "block";
        fileMsg.textContent = `✓ Uploaded: ${fileInput.files[0].name} (${(fileInput.files[0].size / 1024).toFixed(1)} KB)`;
        showToast("Photo uploaded successfully!", "success");
      }
    };
  }

  // Return request submit
  if (reqForm) {
    reqForm.onsubmit = (e) => {
      e.preventDefault();
      const reason = document.getElementById("ret-reason").value;

      if (!reason) {
        showToast("Please choose a reason for return.", "error");
        return;
      }

      actionPanel.style.display = "none";
      successPanel.style.display = "block";
      showToast("Return authorization generated!", "success");
    };
  }
}

// --- 404 View (Improved) ---
function render404(container) {
  document.title = "Page Not Found | SAGE & CLAY";

  container.innerHTML = `
    <div class="container view-section notfound-container">
      <span class="notfound-title" style="font-size:120px; font-family:var(--font-serif); color:var(--color-terracotta); line-height:1;">404</span>
      <h2 style="font-family:var(--font-sans); font-size:24px; font-weight:700; margin-top:-20px;">Formulation Not Found</h2>
      <p class="notfound-desc" style="margin-bottom:var(--spacing-md);">The page or sitemap node you requested does not exist or has been archived.</p>
      
      <!-- Persistent Search on 404 -->
      <div style="display:flex; gap:8px; margin-bottom:var(--spacing-xl); max-width:400px; width:100%;">
        <input type="text" id="notfound-search" class="form-control" style="padding:10px 14px;" placeholder="Search other steps (e.g. Cleanser)..." aria-label="Search on 404">
        <button class="btn btn-primary" id="notfound-search-btn" style="padding:10px 20px; background-color: var(--color-accent-cta);">Search</button>
      </div>

      <!-- Carousel/List Bestsellers -->
      <div style="width:100%; border-top:1px solid var(--color-border); padding-top:var(--spacing-lg);">
        <h3 style="margin-bottom:var(--spacing-md); text-align:center;">Shop Our Customer Bestsellers</h3>
        <div class="product-grid">
          ${PRODUCTS_DB.filter(p => p.badges.includes("Bestseller")).slice(0, 4).map(p => renderProductCard(p)).join("")}
        </div>
      </div>
    </div>
  `;

  // Attach search triggers
  const sfInput = document.getElementById("notfound-search");
  const sfBtn = document.getElementById("notfound-search-btn");

  if (sfBtn && sfInput) {
    const triggerSearch = () => {
      const q = sfInput.value.trim();
      if (q) window.location.hash = `#search?q=${encodeURIComponent(q)}`;
    };

    sfBtn.onclick = triggerSearch;
    sfInput.onkeypress = (e) => {
      if (e.key === "Enter") triggerSearch();
    };
  }
}

// --- Icons SVG Generator Helper ---
function renderIcon(name, size = 16) {
  const icons = {
    oily: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"></path><path d="M12 15a3 3 0 0 0 0-6"></path></svg>`,
    dry: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    combination: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20" stroke-dasharray="3 3"></path><path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor" opacity="0.15"></path></svg>`,
    sensitive: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    acne: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.3-6.3l-.7.7M6.7 17.3l-.7.7m12.6 0l-.7-.7M6.7 6.7l-.7-.7"></path><circle cx="12" cy="12" r="4"></circle></svg>`,
    "anti-aging": `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h14M5 22h14M19 2v6c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4V2M5 22v-6c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v6"></path></svg>`,
    hydration: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"></path></svg>`,
    brightening: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    sensitivity: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    dullness: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    aging: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h14M5 22h14M19 2v6c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4V2M5 22v-6c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v6"></path></svg>`
  };
  return icons[name] || "";
}

// --- Recently Viewed Carousel HTML Generator ---
function renderRecentlyViewedHtml() {
  if (!state.recentlyViewed || state.recentlyViewed.length <= 1) return "";

  const { route, params } = getRouteParams();
  const currentId = route === "#product" ? parseInt(params.id) : null;
  const filteredIds = state.recentlyViewed.filter(id => id !== currentId);

  if (filteredIds.length === 0) return "";

  return `
    <div style="margin-top:var(--spacing-xl); border-top:1px solid var(--color-border); padding-top:var(--spacing-lg);">
      <h2 style="margin-bottom:var(--spacing-sm);">Recently Viewed</h2>
      <div class="carousel-wrap">
        ${filteredIds.map(id => {
    const p = PRODUCTS_DB.find(prod => prod.id === id);
    if (!p) return "";
    return `
            <div class="carousel-item">
              ${renderProductCard(p)}
            </div>
          `;
  }).join("")}
      </div>
    </div>
  `;
}

// ==========================================
// 11. INITIALIZATION
// ==========================================

function init() {
  loadState();
  setupGlobalEventListeners();
  updateBadges();

  // Listen to hash changes for SPA router
  window.addEventListener("hashchange", router);

  // Initial routing triggers
  router();

  // Highlight default demo discount code in announcement bar
  setTimeout(() => {
    showToast("Welcome to SAGE & CLAY! Use quiz code SAGE10 to save 10% on your first order.", "info");
  }, 1000);
}

// Start app
window.addEventListener("DOMContentLoaded", init);
