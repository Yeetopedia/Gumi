import { Product } from "@/types";
import { getRandomGumiFriends } from "../mock-users";

function rg(): number {
  const r = [[50,500],[500,5000],[5000,50000],[50000,500000]];
  const x = r[Math.floor(Math.random()*r.length)];
  return Math.floor(Math.random()*(x[1]-x[0])+x[0]);
}
function rs(): number { return Math.floor(Math.random()*2000)+10; }

export const PLANTS_PRODUCTS: Product[] = [
  {
    id: "plants-1",
    title: "Fiddle Leaf Fig Tree",
    brand: "Bloomscape",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
      alt: "Tall fiddle leaf fig tree in a modern living room setting",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
        alt: "Tall fiddle leaf fig tree in a modern living room setting",
      },
      {
        url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
        alt: "Close-up of fiddle leaf fig's large glossy leaves",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Fiddle leaf fig in decorative ceramic planter by window",
      },
    ],
    price: { min: 15000, max: 19500, currency: "USD" },
    rating: { average: 4.6, count: 1842 },
    buyUrl: "https://bloomscape.com",
    topFeatures: [
      "3-4 feet tall at delivery",
      "Arrives in eco-friendly pot with saucer",
      "Detailed care guide included",
      "30-day happiness guarantee",
    ],
    description:
      "The statement plant that transformed a million apartments. Bloomscape ships this fiddle leaf fig healthy and ready to thrive, so you skip the garden center gamble entirely.",
    aspectRatio: 0.72,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-2",
    title: "Monstera Deliciosa",
    brand: "The Sill",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
      alt: "Lush monstera deliciosa with fenestrated leaves",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200&q=80",
        alt: "Lush monstera deliciosa with fenestrated leaves",
      },
      {
        url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
        alt: "Monstera plant styled on a wooden plant stand",
      },
    ],
    price: { min: 6500, max: 12000, currency: "USD" },
    rating: { average: 4.8, count: 3210 },
    buyUrl: "https://thesill.com",
    topFeatures: [
      "Signature split-leaf fenestrations",
      "Available in multiple pot colors",
      "Low to medium indirect light",
      "Ships nationwide with care card",
    ],
    description:
      "The Swiss cheese plant that took over Instagram and never left. The Sill's monstera arrives with dramatic fenestrations and enough personality to anchor any room.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-3",
    title: "Trailing Golden Pothos",
    brand: "Rooted",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
      alt: "Golden pothos with cascading variegated vines",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Golden pothos with cascading variegated vines",
      },
      {
        url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
        alt: "Pothos trailing from a hanging macrame planter",
      },
      {
        url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=1200&q=80",
        alt: "Close-up of pothos heart-shaped leaves with golden marbling",
      },
    ],
    price: { min: 2200, max: 3800, currency: "USD" },
    rating: { average: 4.7, count: 4120 },
    buyUrl: "https://rooted.com",
    topFeatures: [
      "Virtually unkillable for beginners",
      "Thrives in low light conditions",
      "Air-purifying NASA-rated plant",
      "Fast-growing trailing vines",
    ],
    description:
      "The plant even your most neglectful friend can keep alive. Golden pothos trails elegantly from shelves and hangers while quietly purifying your air.",
    aspectRatio: 1.15,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-4",
    title: "Sansevieria Zeylanica",
    brand: "Plants.com",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80",
      alt: "Tall snake plant with striking dark green banded leaves",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
        alt: "Tall snake plant with striking dark green banded leaves",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Snake plant in minimalist white ceramic pot",
      },
    ],
    price: { min: 3500, max: 6500, currency: "USD" },
    rating: { average: 4.8, count: 2890 },
    buyUrl: "https://plants.com",
    topFeatures: [
      "Converts CO2 to oxygen at night",
      "Tolerates low light and drought",
      "Architectural upright growth habit",
      "Pet-safe variety available",
    ],
    description:
      "The bedroom plant that works the night shift. Snake plants release oxygen while you sleep and demand almost nothing in return — water every few weeks and you're golden.",
    aspectRatio: 0.68,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-5",
    title: "Dried Eucalyptus Bundle",
    brand: "Terrain",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
      alt: "Dried eucalyptus bundle with silvery blue-green leaves",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&q=80",
        alt: "Dried eucalyptus bundle with silvery blue-green leaves",
      },
      {
        url: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&q=80",
        alt: "Eucalyptus stems arranged in a terracotta vase",
      },
      {
        url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=1200&q=80",
        alt: "Dried eucalyptus hanging in a sunlit bathroom",
      },
    ],
    price: { min: 1800, max: 3200, currency: "USD" },
    rating: { average: 4.5, count: 1560 },
    buyUrl: "https://shopterrain.com",
    topFeatures: [
      "Naturally preserved silver dollar variety",
      "Subtle aromatic scent lasts months",
      "No water or maintenance required",
      "Pairs with fresh or dried arrangements",
    ],
    description:
      "The effortless botanical that makes every shelf look curated. Terrain's dried eucalyptus holds its silvery color for months and fills the room with a subtle, spa-like fragrance.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-6",
    title: "Matte Stoneware Planter",
    brand: "East Fork",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
      alt: "Handmade matte ceramic planter in warm sand glaze",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Handmade matte ceramic planter in warm sand glaze",
      },
      {
        url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=1200&q=80",
        alt: "East Fork planter with drainage hole detail",
      },
    ],
    price: { min: 4800, max: 7800, currency: "USD" },
    rating: { average: 4.9, count: 890 },
    buyUrl: "https://eastfork.com",
    topFeatures: [
      "Hand-thrown in Asheville, NC",
      "Built-in drainage hole with saucer",
      "Lead-free matte stoneware glaze",
      "Fits 4-6 inch nursery pots",
    ],
    description:
      "The planter that makes you feel something. East Fork's stoneware vessels are hand-thrown by artisans in Asheville, each one carrying subtle variations that mass production could never replicate.",
    aspectRatio: 1.05,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-7",
    title: "Self-Watering Ceramic Pot",
    brand: "JOMO Studio",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=600&q=80",
      alt: "Modern self-watering ceramic pot in matte white",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=1200&q=80",
        alt: "Modern self-watering ceramic pot in matte white",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Cross-section showing self-watering reservoir system",
      },
      {
        url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
        alt: "Self-watering pot with thriving plant on windowsill",
      },
    ],
    price: { min: 3500, max: 5500, currency: "USD" },
    rating: { average: 4.6, count: 1240 },
    buyUrl: "https://jomostudio.com",
    topFeatures: [
      "Wicking system waters from below",
      "Water reservoir lasts up to 2 weeks",
      "Removable inner liner for repotting",
      "Available in 5 matte colorways",
    ],
    description:
      "For people who love plants but forget everything. JOMO's self-watering system uses a cotton wick to pull moisture from a hidden reservoir, keeping roots perfectly hydrated for weeks.",
    aspectRatio: 0.92,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-8",
    title: "Glass Propagation Station",
    brand: "Areaware",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80",
      alt: "Minimalist glass propagation station with plant cuttings",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&q=80",
        alt: "Minimalist glass propagation station with plant cuttings",
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Close-up of roots growing in glass propagation tubes",
      },
    ],
    price: { min: 2800, max: 4200, currency: "USD" },
    rating: { average: 4.5, count: 760 },
    buyUrl: "https://areaware.com",
    topFeatures: [
      "Solid walnut base with 3 glass tubes",
      "Watch roots develop in real time",
      "Works with pothos, philodendron, and more",
      "Desktop or windowsill size",
    ],
    description:
      "Turn one plant into many and watch it happen. Areaware's propagation station lets you root cuttings in glass tubes, turning the science of plant multiplication into living decor.",
    aspectRatio: 1.35,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-9",
    title: "Italian Herb Garden Kit",
    brand: "Planted Detroit",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
      alt: "Kitchen herb garden kit with basil, rosemary, and thyme seedlings",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Kitchen herb garden kit with basil, rosemary, and thyme seedlings",
      },
      {
        url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1200&q=80",
        alt: "Herb garden on sunny kitchen windowsill",
      },
      {
        url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
        alt: "Fresh herbs being snipped for cooking",
      },
    ],
    price: { min: 3800, max: 4800, currency: "USD" },
    rating: { average: 4.4, count: 980 },
    buyUrl: "https://planteddetroit.com",
    topFeatures: [
      "Includes basil, rosemary, thyme, and oregano",
      "Organic heirloom seeds",
      "Self-watering bamboo planter box",
      "Sprouts in 7-14 days",
    ],
    description:
      "Grow your dinner's finishing touch on the windowsill. This all-in-one herb kit comes with heirloom seeds, organic soil, and a self-watering planter — no green thumb required.",
    aspectRatio: 1.45,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-10",
    title: "Desert Terrarium Kit",
    brand: "Plant Circle",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
      alt: "Glass terrarium with succulents, sand layers, and decorative stones",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Glass terrarium with succulents, sand layers, and decorative stones",
      },
      {
        url: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&q=80",
        alt: "Hands assembling a desert terrarium with tweezers",
      },
    ],
    price: { min: 4500, max: 6500, currency: "USD" },
    rating: { average: 4.6, count: 620 },
    buyUrl: "https://plantcircle.com",
    topFeatures: [
      "Hand-blown glass vessel included",
      "3 live succulents with colored sand",
      "Decorative stones and activated charcoal",
      "Step-by-step assembly guide",
    ],
    description:
      "A tiny desert ecosystem you build yourself. Plant Circle's terrarium kit includes everything from the hand-blown glass to the colored sand layers, making a meditative weekend project.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-11",
    title: "Japanese Juniper Bonsai Starter",
    brand: "Greenery Unlimited",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
      alt: "Young juniper bonsai in traditional ceramic training pot",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
        alt: "Young juniper bonsai in traditional ceramic training pot",
      },
      {
        url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=1200&q=80",
        alt: "Bonsai tool kit with pruning shears and wire",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Bonsai displayed on wooden stand near window",
      },
    ],
    price: { min: 5500, max: 8500, currency: "USD" },
    rating: { average: 4.3, count: 450 },
    buyUrl: "https://greeneryunlimited.com",
    topFeatures: [
      "4-year-old pre-trained juniper",
      "Includes ceramic bonsai pot and tray",
      "Pruning shears and training wire",
      "Comprehensive care booklet",
      "Live arrival guarantee",
    ],
    description:
      "An ancient art form, simplified for modern beginners. This pre-trained juniper arrives with everything you need to start shaping your own miniature tree — patience sold separately.",
    aspectRatio: 0.88,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-12",
    title: "Macrame Plant Hanger",
    brand: "Terrain",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80",
      alt: "Hand-knotted macrame plant hanger holding a trailing plant",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
        alt: "Hand-knotted macrame plant hanger holding a trailing plant",
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Three macrame hangers at staggered heights by window",
      },
    ],
    price: { min: 2800, max: 4500, currency: "USD" },
    rating: { average: 4.7, count: 1870 },
    buyUrl: "https://shopterrain.com",
    topFeatures: [
      "Hand-knotted 100% cotton rope",
      "Holds pots up to 8 inches",
      "Adjustable hanging length",
      "Ceiling hook included",
    ],
    description:
      "The fastest way to add dimension to a room without furniture. Terrain's hand-knotted macrame hanger turns any trailing plant into a floating sculptural moment.",
    aspectRatio: 0.65,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-13",
    title: "Brass Plant Mister",
    brand: "Haws",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&q=80",
      alt: "Polished brass plant mister with fine spray nozzle",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1200&q=80",
        alt: "Polished brass plant mister with fine spray nozzle",
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Brass mister being used on fern leaves",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Haws brass mister displayed among potted plants",
      },
    ],
    price: { min: 4000, max: 5800, currency: "USD" },
    rating: { average: 4.8, count: 1340 },
    buyUrl: "https://hfraws.co.uk",
    topFeatures: [
      "Solid brass construction",
      "Ultra-fine mist spray pattern",
      "300ml capacity",
      "Develops beautiful patina over time",
    ],
    description:
      "A plant care tool beautiful enough to leave on the shelf. Haws has been crafting brass misters in England since 1886, and this one produces the finest mist your ferns will ever feel.",
    aspectRatio: 0.78,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-14",
    title: "Premium Garden Tool Set",
    brand: "Sophie Conran",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&q=80",
      alt: "Elegant garden tool set with ergonomic beech handles",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1200&q=80",
        alt: "Elegant garden tool set with ergonomic beech handles",
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Garden tools laid out on potting bench with soil",
      },
    ],
    price: { min: 5500, max: 7800, currency: "USD" },
    rating: { average: 4.7, count: 670 },
    buyUrl: "https://burgonandball.com",
    topFeatures: [
      "FSC-certified beech wood handles",
      "Stainless steel heads won't rust",
      "Ergonomic grip reduces hand fatigue",
      "Includes trowel, fork, and transplanter",
      "Gift box packaging",
    ],
    description:
      "Garden tools that feel like they belong in a gallery. Sophie Conran's set pairs FSC-certified beech handles with mirror-polished stainless steel — built to last decades of weekend potting sessions.",
    aspectRatio: 1.25,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-15",
    title: "Organic Seed Starter Kit",
    brand: "Planted Detroit",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
      alt: "Seed starter tray with sprouting seedlings under grow light",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Seed starter tray with sprouting seedlings under grow light",
      },
      {
        url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1200&q=80",
        alt: "Biodegradable seed pods ready for planting",
      },
      {
        url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
        alt: "Young seedlings being transplanted to garden bed",
      },
    ],
    price: { min: 2400, max: 3600, currency: "USD" },
    rating: { average: 4.4, count: 1150 },
    buyUrl: "https://planteddetroit.com",
    topFeatures: [
      "72-cell biodegradable starter tray",
      "Organic potting mix included",
      "12 varieties of heirloom seeds",
      "Humidity dome for germination",
      "Transplant directly — no plastic waste",
    ],
    description:
      "Everything you need to start a garden from scratch, minus the overwhelm. Biodegradable cells go straight into the ground when seedlings are ready, so there's zero plastic waste.",
    aspectRatio: 1.42,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-16",
    title: "Live Succulent Arrangement",
    brand: "Lively Root",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80",
      alt: "Curated succulent arrangement in a low concrete bowl",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&q=80",
        alt: "Curated succulent arrangement in a low concrete bowl",
      },
      {
        url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
        alt: "Overhead view of colorful succulent rosettes",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Succulent arrangement on coffee table in bright room",
      },
    ],
    price: { min: 4200, max: 6800, currency: "USD" },
    rating: { average: 4.6, count: 2340 },
    buyUrl: "https://livelyroot.com",
    topFeatures: [
      "5-7 hand-selected succulents",
      "Concrete planter with drainage",
      "Pre-arranged and ready to display",
      "Water once every 2-3 weeks",
    ],
    description:
      "A living centerpiece that practically takes care of itself. Lively Root hand-selects each succulent for color and texture, creating an arrangement that looks professionally styled from day one.",
    aspectRatio: 1.2,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-17",
    title: "White Orchid in Ceramic Pot",
    brand: "Urban Stems",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80",
      alt: "Elegant white phalaenopsis orchid in glazed ceramic pot",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
        alt: "Elegant white phalaenopsis orchid in glazed ceramic pot",
      },
      {
        url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&q=80",
        alt: "Orchid blooms in soft window light",
      },
    ],
    price: { min: 7500, max: 11000, currency: "USD" },
    rating: { average: 4.7, count: 1680 },
    buyUrl: "https://urbanstems.com",
    topFeatures: [
      "Double-stem phalaenopsis",
      "Hand-selected for bloom quality",
      "Artisan-glazed ceramic cachepot",
      "Blooms last 6-8 weeks",
    ],
    description:
      "The gift that outclasses every bouquet. Urban Stems' double-stem phalaenopsis arrives in a glazed ceramic pot, ready to bloom for months — far outlasting any cut flowers.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-18",
    title: "Geometric Air Plant Display",
    brand: "Areaware",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80",
      alt: "Tillandsia air plants in brass geometric display frames",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&q=80",
        alt: "Tillandsia air plants in brass geometric display frames",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Air plant display on floating shelf with books",
      },
      {
        url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
        alt: "Close-up of tillandsia in brass himmeli frame",
      },
    ],
    price: { min: 2400, max: 3800, currency: "USD" },
    rating: { average: 4.5, count: 540 },
    buyUrl: "https://areaware.com",
    topFeatures: [
      "Set of 3 brass himmeli frames",
      "Includes 3 live tillandsia plants",
      "No soil needed — mist weekly",
      "Wall-mount or freestanding",
    ],
    description:
      "Plants that float in midair — almost. These brass geometric frames cradle living tillandsia that need nothing but a weekly mist, making them the lowest-maintenance decor you'll ever own.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-19",
    title: "Heritage Copper Watering Can",
    brand: "Haws",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&q=80",
      alt: "Handmade copper watering can with brass rose attachment",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1200&q=80",
        alt: "Handmade copper watering can with brass rose attachment",
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
        alt: "Copper watering can on garden potting bench",
      },
    ],
    price: { min: 6500, max: 8500, currency: "USD" },
    rating: { average: 4.9, count: 420 },
    buyUrl: "https://haws.co.uk",
    topFeatures: [
      "Hand-spun copper body",
      "Detachable brass rose for gentle rain",
      "1-liter indoor capacity",
      "Develops unique patina over years",
      "Made in England since 1886",
    ],
    description:
      "The watering can your great-grandchildren will fight over. Haws has been hand-spinning copper in England for over a century, and each can develops a one-of-a-kind patina that only gets better with age.",
    aspectRatio: 1.1,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "plants-20",
    title: "Mid-Century Plant Stand",
    brand: "Greenery Unlimited",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=600&q=80",
      alt: "Walnut mid-century plant stand with tapered legs",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=1200&q=80",
        alt: "Walnut mid-century plant stand with tapered legs",
      },
      {
        url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
        alt: "Plant stand holding a large monstera in living room corner",
      },
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
        alt: "Detail of walnut wood grain and brass-tipped legs",
      },
    ],
    price: { min: 8500, max: 14500, currency: "USD" },
    rating: { average: 4.8, count: 780 },
    buyUrl: "https://greeneryunlimited.com",
    topFeatures: [
      "Solid American walnut construction",
      "Brass-tipped tapered legs",
      "Holds pots up to 12 inches",
      "Adjustable leveling feet",
      "Ships flat, assembles in 5 minutes",
    ],
    description:
      "Elevate your favorite plant — literally. This walnut stand lifts floor plants to eye level with mid-century lines and brass details that nod to the furniture icons of the 1950s.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
];
