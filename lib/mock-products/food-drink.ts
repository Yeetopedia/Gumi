import { Product } from "@/types";
import { getRandomGumiFriends } from "../mock-users";

export const FOOD_DRINK_PRODUCTS: Product[] = [
  {
    id: "food-1",
    title: "Drizzle Extra Virgin Olive Oil (Squeeze Bottle)",
    brand: "Graza",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=600&q=80",
      alt: "Premium extra virgin olive oil in a bright squeeze bottle",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=1200&q=80",
        alt: "Premium extra virgin olive oil in a bright squeeze bottle",
      },
      {
        url: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=1200&q=80",
        alt: "Olive oil being drizzled over fresh salad",
      },
    ],
    price: { min: 1500, max: 3500, currency: "USD" },
    rating: { average: 4.8, count: 4230 },
    buyUrl: "https://grfranciscoaza.co",
    topFeatures: [
      "Single-origin Picual olives",
      "Cold-pressed within hours of harvest",
      "Squeezable bottle for easy drizzling",
      "Grassy, peppery finish",
    ],
    description:
      "The olive oil that broke the internet. Graza's Drizzle is a finishing oil made from early-harvest Picual olives, designed to go on everything from toast to ice cream.",
    aspectRatio: 0.75,
    gumis: 62000,
    shares: 7440,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-2",
    title: "Sichuan Chili Crisp",
    brand: "Fly By Jing",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=600&q=80",
      alt: "Jar of Sichuan chili crisp with vibrant red oil and crispy bits",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=1200&q=80",
        alt: "Jar of Sichuan chili crisp with vibrant red oil and crispy bits",
      },
      {
        url: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=1200&q=80",
        alt: "Chili crisp spooned over noodles in a ceramic bowl",
      },
    ],
    price: { min: 1000, max: 4000, currency: "USD" },
    rating: { average: 4.7, count: 3870 },
    buyUrl: "https://flybyjing.com",
    topFeatures: [
      "Tribute peppers from Chengdu",
      "No artificial preservatives",
      "Vegan and gluten-free",
      "Complex umami-forward heat",
      "Versatile on any dish",
    ],
    description:
      "Made with premium Sichuan tribute peppers and a proprietary blend of spices. This chili crisp delivers a tingly, numbing heat that elevates literally everything you put it on.",
    aspectRatio: 1.0,
    gumis: 84000,
    shares: 10080,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-3",
    title: "Le Spritz Non-Alcoholic Aperitivo",
    brand: "Ghia",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80",
      alt: "Elegant aperitivo spritz in a stemmed glass with citrus garnish",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=1200&q=80",
        alt: "Elegant aperitivo spritz in a stemmed glass with citrus garnish",
      },
      {
        url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80",
        alt: "Bottle of Ghia aperitivo on a marble countertop",
      },
    ],
    price: { min: 3300, max: 5000, currency: "USD" },
    rating: { average: 4.5, count: 1890 },
    buyUrl: "https://drinkghia.com",
    topFeatures: [
      "Zero alcohol, all flavor",
      "Mediterranean botanicals blend",
      "Under 40 calories per serving",
      "No added sugar",
    ],
    description:
      "A sophisticated non-alcoholic aperitivo made with Mediterranean botanicals. Bittersweet, herbal, and complex enough to hold its own at any cocktail hour.",
    aspectRatio: 0.68,
    gumis: 14500,
    shares: 1740,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-4",
    title: "Ceremonial Grade Single Origin Matcha",
    brand: "Brightland",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
      alt: "Vivid green matcha powder in a ceramic bowl with bamboo whisk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80",
        alt: "Vivid green matcha powder in a ceramic bowl with bamboo whisk",
      },
      {
        url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80",
        alt: "Frothy matcha latte in a handmade cup",
      },
    ],
    price: { min: 2800, max: 4500, currency: "USD" },
    rating: { average: 4.6, count: 1240 },
    buyUrl: "https://brightland.co",
    topFeatures: [
      "First-harvest shade-grown leaves",
      "Stone-ground in Uji, Kyoto",
      "Smooth with no bitterness",
      "Rich in L-theanine",
      "Vibrant emerald color",
    ],
    description:
      "Sourced from a single farm in Uji, Japan, this ceremonial grade matcha is shade-grown for 21 days to maximize chlorophyll and amino acids. Smooth, creamy, and impossibly green.",
    aspectRatio: 1.1,
    gumis: 11200,
    shares: 1344,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-5",
    title: "Raw Wildflower Honey",
    brand: "Mike's Hot Honey",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
      alt: "Golden raw honey dripping from a wooden dipper",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80",
        alt: "Golden raw honey dripping from a wooden dipper",
      },
      {
        url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80",
        alt: "Honey jar surrounded by wildflowers on a rustic table",
      },
    ],
    price: { min: 1000, max: 2000, currency: "USD" },
    rating: { average: 4.8, count: 4560 },
    buyUrl: "https://mikeshothoney.com",
    topFeatures: [
      "Infused with chili peppers",
      "Sweet heat flavor profile",
      "Perfect on pizza and cheese",
      "All-natural ingredients",
    ],
    description:
      "The original hot honey that started it all. A blend of pure wildflower honey and chili peppers that delivers a sweet heat perfect for drizzling on pizza, fried chicken, and everything in between.",
    aspectRatio: 0.85,
    gumis: 22000,
    shares: 2640,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-6",
    title: "Aromatic Cocktail Bitters Set",
    brand: "Acid League",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
      alt: "Set of artisan cocktail bitters in amber glass bottles",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80",
        alt: "Set of artisan cocktail bitters in amber glass bottles",
      },
      {
        url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&q=80",
        alt: "Cocktail being prepared with a dash of bitters",
      },
      {
        url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80",
        alt: "Bitters collection displayed on a bar shelf",
      },
    ],
    price: { min: 3200, max: 4800, currency: "USD" },
    rating: { average: 4.6, count: 870 },
    buyUrl: "https://acidleague.com",
    topFeatures: [
      "Three unique flavor profiles",
      "Small-batch fermented",
      "Living culture bitters",
      "Works in cocktails and cooking",
    ],
    description:
      "A trio of living-culture bitters fermented in small batches. Each bottle brings a different dimension to cocktails, from citrus-forward to deeply aromatic, herbaceous notes.",
    aspectRatio: 1.35,
    gumis: 4800,
    shares: 576,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-7",
    title: "Heirloom Sourdough Bread Mix",
    brand: "Partake",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
      alt: "Rustic sourdough bread loaf with beautiful scoring pattern",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&q=80",
        alt: "Rustic sourdough bread loaf with beautiful scoring pattern",
      },
      {
        url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80",
        alt: "Fresh bread sliced on a wooden cutting board",
      },
    ],
    price: { min: 1200, max: 1800, currency: "USD" },
    rating: { average: 4.4, count: 670 },
    buyUrl: "https://partakefoods.com",
    topFeatures: [
      "Heritage grain blend",
      "Includes dried sourdough starter",
      "Just add water",
      "Allergen-friendly",
    ],
    description:
      "Everything you need for bakery-quality sourdough at home. This kit includes heritage grain flour and a dried sourdough starter that produces tangy, chewy loaves with an incredible crust.",
    aspectRatio: 1.2,
    gumis: 3200,
    shares: 384,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-8",
    title: "Sea Salt Dark Chocolate Bar (72%)",
    brand: "Mast Brothers",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80",
      alt: "Artisan dark chocolate bar with sea salt crystals",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80",
        alt: "Artisan dark chocolate bar with sea salt crystals",
      },
      {
        url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=1200&q=80",
        alt: "Chocolate bar broken into pieces showing rich dark interior",
      },
    ],
    price: { min: 800, max: 1200, currency: "USD" },
    rating: { average: 4.7, count: 2190 },
    buyUrl: "https://mastbrothers.com",
    topFeatures: [
      "Bean-to-bar craft chocolate",
      "72% single-origin cacao",
      "Flaky Jacobsen sea salt",
      "Hand-wrapped in custom paper",
    ],
    description:
      "A bean-to-bar dark chocolate made from single-origin cacao, finished with flaky sea salt. Deep, fruity notes balanced by a perfect saline crunch on every bite.",
    aspectRatio: 0.65,
    gumis: 5600,
    shares: 672,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-9",
    title: "Hologram Single Origin Coffee Beans",
    brand: "Counter Culture Coffee",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80",
      alt: "Freshly roasted specialty coffee beans in a kraft bag",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=1200&q=80",
        alt: "Freshly roasted specialty coffee beans in a kraft bag",
      },
      {
        url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=1200&q=80",
        alt: "Pour-over coffee setup with beans and ceramic dripper",
      },
    ],
    price: { min: 1600, max: 2200, currency: "USD" },
    rating: { average: 4.8, count: 3450 },
    buyUrl: "https://counterculturecoffee.com",
    topFeatures: [
      "Rotating single-origin selection",
      "Roasted and shipped weekly",
      "Direct trade certified",
      "Tasting notes on every bag",
      "Whole bean for maximum freshness",
    ],
    description:
      "Counter Culture's flagship single origin, rotating seasonally to showcase the best coffees from around the world. Always bright, always complex, always ethically sourced.",
    aspectRatio: 0.9,
    gumis: 28000,
    shares: 3360,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-10",
    title: "Tahitian Vanilla Extract",
    brand: "Diaspora Co.",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80",
      alt: "Bottle of pure Tahitian vanilla extract with vanilla beans",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=1200&q=80",
        alt: "Bottle of pure Tahitian vanilla extract with vanilla beans",
      },
      {
        url: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=1200&q=80",
        alt: "Vanilla extract being measured into a baking bowl",
      },
    ],
    price: { min: 1800, max: 2800, currency: "USD" },
    rating: { average: 4.9, count: 890 },
    buyUrl: "https://diasporaco.com",
    topFeatures: [
      "Single-origin Tahitian beans",
      "Farmer-direct sourcing",
      "Floral and fruity aroma",
      "No synthetic vanillin",
    ],
    description:
      "Sourced directly from smallholder farmers, this Tahitian vanilla extract has an intoxicating floral aroma that transforms baked goods. Once you taste the real thing, you never go back.",
    aspectRatio: 0.72,
    gumis: 47000,
    shares: 5640,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-11",
    title: "The Truff Hot Sauce Variety Pack",
    brand: "Omsom",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&q=80",
      alt: "Collection of artisan hot sauce bottles in various colors",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=1200&q=80",
        alt: "Collection of artisan hot sauce bottles in various colors",
      },
      {
        url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&q=80",
        alt: "Hot sauce being poured over tacos",
      },
      {
        url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1200&q=80",
        alt: "Sauce bottles arranged on kitchen counter",
      },
    ],
    price: { min: 2400, max: 4200, currency: "USD" },
    rating: { average: 4.5, count: 1560 },
    buyUrl: "https://omsom.com",
    topFeatures: [
      "Three unique Southeast Asian flavors",
      "Starter-friendly heat levels",
      "No MSG or preservatives",
      "Bold, authentic recipes",
      "Ready in 15 minutes",
    ],
    description:
      "Three bold Southeast Asian sauce starters that bring restaurant-quality flavor home. Each sachet is packed with the aromatics, spices, and sauces you need for an incredible meal in minutes.",
    aspectRatio: 1.45,
    gumis: 18500,
    shares: 2220,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-12",
    title: "Fresh Pasta Kit with Bronze-Cut Shapes",
    brand: "Surely",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80",
      alt: "Artisan bronze-cut pasta shapes in rustic packaging",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&q=80",
        alt: "Artisan bronze-cut pasta shapes in rustic packaging",
      },
      {
        url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1200&q=80",
        alt: "Pasta being prepared in a kitchen with fresh ingredients",
      },
    ],
    price: { min: 2200, max: 3600, currency: "USD" },
    rating: { average: 4.3, count: 430 },
    buyUrl: "https://surely.wine",
    topFeatures: [
      "Bronze-die extruded for texture",
      "Slow-dried for 48 hours",
      "Heritage Italian grain varieties",
      "Includes signature sauce sachet",
    ],
    description:
      "Restaurant-quality bronze-cut pasta slow-dried over 48 hours for the perfect al dente texture. The rough surface grips sauce in a way mass-produced pasta simply cannot.",
    aspectRatio: 1.0,
    gumis: 2800,
    shares: 336,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-13",
    title: "Maple Pecan Granola",
    brand: "Partake",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80",
      alt: "Chunky granola clusters with pecans and maple glaze",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1200&q=80",
        alt: "Chunky granola clusters with pecans and maple glaze",
      },
      {
        url: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200&q=80",
        alt: "Granola served with yogurt and fresh berries",
      },
    ],
    price: { min: 800, max: 1400, currency: "USD" },
    rating: { average: 4.6, count: 2780 },
    buyUrl: "https://partakefoods.com",
    topFeatures: [
      "Gluten-free and vegan",
      "Big crunchy clusters",
      "Vermont maple syrup",
      "Top 9 allergen free",
    ],
    description:
      "Giant, crunchy clusters of oats, pecans, and real Vermont maple syrup baked to golden perfection. Free from the top 9 allergens but full of everything you actually want in a granola.",
    aspectRatio: 1.15,
    gumis: 3900,
    shares: 468,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-14",
    title: "Flaky Sea Salt",
    brand: "Jacobsen Salt Co.",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80",
      alt: "Flaky white sea salt crystals in a glass jar",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200&q=80",
        alt: "Flaky white sea salt crystals in a glass jar",
      },
      {
        url: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&q=80",
        alt: "Sea salt being pinched over a finished dish",
      },
    ],
    price: { min: 1200, max: 1800, currency: "USD" },
    rating: { average: 4.8, count: 3210 },
    buyUrl: "https://jacobsensalt.com",
    topFeatures: [
      "Hand-harvested from Netarts Bay, Oregon",
      "Bright, clean salinity",
      "Perfect finishing salt",
      "Delicate pyramid-shaped flakes",
    ],
    description:
      "Hand-harvested from the cold, pristine waters of Netarts Bay, Oregon. These delicate, pyramid-shaped flakes deliver a clean burst of salinity that elevates any dish from good to transcendent.",
    aspectRatio: 0.95,
    gumis: 16000,
    shares: 1920,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-15",
    title: "Loose Leaf Tea Discovery Set",
    brand: "Burlap & Barrel",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80",
      alt: "Collection of loose leaf teas in tins with dried botanicals",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&q=80",
        alt: "Collection of loose leaf teas in tins with dried botanicals",
      },
      {
        url: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80",
        alt: "Tea being steeped in a glass teapot",
      },
      {
        url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&q=80",
        alt: "Dried tea leaves and spices arranged on a wooden surface",
      },
    ],
    price: { min: 2800, max: 4200, currency: "USD" },
    rating: { average: 4.7, count: 640 },
    buyUrl: "https://burlapandbarrel.com",
    topFeatures: [
      "Five single-origin loose leaf teas",
      "Sourced directly from farmers",
      "Rare heirloom varieties",
      "Reusable tins included",
      "Tasting guide with brew times",
    ],
    description:
      "A curated journey through five single-origin teas sourced directly from small farms around the world. From a smoky Lapsang Souchong to a floral Darjeeling, each tin tells its own story.",
    aspectRatio: 1.3,
    gumis: 5100,
    shares: 612,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-16",
    title: "Cucumber Yuzu Sparkling Water (12-Pack)",
    brand: "Haus",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80",
      alt: "Sleek cans of sparkling water with botanical design",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80",
        alt: "Sleek cans of sparkling water with botanical design",
      },
      {
        url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&q=80",
        alt: "Sparkling water poured over ice with cucumber slices",
      },
    ],
    price: { min: 2400, max: 3200, currency: "USD" },
    rating: { average: 4.3, count: 1120 },
    buyUrl: "https://drink.haus",
    topFeatures: [
      "Real cucumber and yuzu essence",
      "Zero calories, zero sweeteners",
      "Aggressive carbonation",
      "Beautiful minimal can design",
    ],
    description:
      "A crisp, aggressively carbonated sparkling water infused with real cucumber and yuzu essence. Refreshing enough to replace your afternoon coffee, beautiful enough to bring to a dinner party.",
    aspectRatio: 0.7,
    gumis: 4200,
    shares: 504,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-17",
    title: "Non-Alcoholic Botanical Spirit",
    brand: "Ghia",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
      alt: "Elegant bottle of non-alcoholic botanical spirit",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&q=80",
        alt: "Elegant bottle of non-alcoholic botanical spirit",
      },
      {
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
        alt: "Spirit poured into a rocks glass over a large ice cube",
      },
      {
        url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
        alt: "Cocktail setup with botanical spirit and fresh herbs",
      },
    ],
    price: { min: 3500, max: 4800, currency: "USD" },
    rating: { average: 4.5, count: 980 },
    buyUrl: "https://drinkghia.com",
    topFeatures: [
      "All-natural botanical blend",
      "Bittersweet and herbaceous",
      "Mixes like a real spirit",
      "Under 5 calories per serving",
    ],
    description:
      "A concentrated botanical spirit designed to be mixed just like the real thing. Gentian root, yuzu, and rosemary create a bittersweet complexity that makes you forget it is alcohol-free.",
    aspectRatio: 0.78,
    gumis: 12800,
    shares: 1536,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-18",
    title: "Adaptogenic Super Latte Mix",
    brand: "Clevr",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
      alt: "Golden latte powder with adaptogenic mushrooms and spices",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
        alt: "Golden latte powder with adaptogenic mushrooms and spices",
      },
      {
        url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
        alt: "Frothy golden latte in a handmade ceramic mug",
      },
    ],
    price: { min: 2800, max: 3600, currency: "USD" },
    rating: { average: 4.4, count: 1670 },
    buyUrl: "https://clevr.com",
    topFeatures: [
      "Lion's mane and reishi mushrooms",
      "Oat milk powder included",
      "Just add hot water",
      "Supports focus and calm",
      "No jitters or crash",
    ],
    description:
      "Oprah's favorite latte mix, powered by adaptogenic mushrooms and oat milk. Just add hot water for a creamy, golden latte that supports focus without the caffeine crash.",
    aspectRatio: 1.4,
    gumis: 9700,
    shares: 1164,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-19",
    title: "Stone-Ground Tahini",
    brand: "Seed + Mill",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80",
      alt: "Creamy tahini in a glass jar with sesame seeds scattered around",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
        alt: "Creamy tahini in a glass jar with sesame seeds scattered around",
      },
      {
        url: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=1200&q=80",
        alt: "Tahini drizzled over roasted vegetables",
      },
    ],
    price: { min: 1200, max: 1800, currency: "USD" },
    rating: { average: 4.7, count: 1890 },
    buyUrl: "https://seedandmill.com",
    topFeatures: [
      "Ethiopian Humera sesame seeds",
      "Silky-smooth stone-ground texture",
      "Single ingredient, no additives",
      "Pourable right from the jar",
    ],
    description:
      "Made from a single ingredient: Ethiopian Humera sesame seeds, stone-ground to a silky, pourable consistency. This is the tahini that converts people who think they do not like tahini.",
    aspectRatio: 0.88,
    gumis: 6800,
    shares: 816,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-20",
    title: "Black Truffle Extra Virgin Olive Oil",
    brand: "Kosterina",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80",
      alt: "Dark bottle of truffle-infused olive oil with elegant label",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=1200&q=80",
        alt: "Dark bottle of truffle-infused olive oil with elegant label",
      },
      {
        url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=1200&q=80",
        alt: "Truffle oil being drizzled over fresh pasta",
      },
    ],
    price: { min: 2400, max: 3600, currency: "USD" },
    rating: { average: 4.6, count: 760 },
    buyUrl: "https://kosterina.com",
    topFeatures: [
      "Real black truffle pieces inside",
      "Cold-pressed Greek EVOO base",
      "No synthetic truffle flavor",
      "Rich, earthy aroma",
    ],
    description:
      "Real black truffle infused into cold-pressed Greek extra virgin olive oil. You can see the truffle pieces floating in the bottle. A few drops transform any dish into something extraordinary.",
    aspectRatio: 0.68,
    gumis: 3600,
    shares: 432,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-21",
    title: "Preserved Lemons",
    brand: "Acid League",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80",
      alt: "Jar of preserved lemons with visible spices and brine",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=1200&q=80",
        alt: "Jar of preserved lemons with visible spices and brine",
      },
      {
        url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&q=80",
        alt: "Preserved lemon being chopped for use in a tagine",
      },
    ],
    price: { min: 1400, max: 2000, currency: "USD" },
    rating: { average: 4.5, count: 520 },
    buyUrl: "https://acidleague.com",
    topFeatures: [
      "Naturally fermented 30+ days",
      "Intensely citrusy and umami",
      "Ready to use out of the jar",
      "Chef's secret ingredient",
    ],
    description:
      "Lemons salt-cured and fermented for over 30 days until they develop an intense, almost umami citrus flavor. The secret weapon professional chefs keep in their fridges at all times.",
    aspectRatio: 1.05,
    gumis: 2500,
    shares: 300,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-22",
    title: "Smoked Salmon Kit",
    brand: "Fishwife",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
      alt: "Beautifully packaged smoked salmon tins with retro design",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&q=80",
        alt: "Beautifully packaged smoked salmon tins with retro design",
      },
      {
        url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&q=80",
        alt: "Tinned fish arranged on a charcuterie board with crackers",
      },
    ],
    price: { min: 2400, max: 4800, currency: "USD" },
    rating: { average: 4.7, count: 1340 },
    buyUrl: "https://eatfishwife.com",
    topFeatures: [
      "Wild-caught Pacific salmon",
      "Slow-smoked over alderwood",
      "Ethically sourced and sustainable",
      "Beautiful collectible tin design",
      "High protein, low mercury",
    ],
    description:
      "Wild-caught Pacific salmon, slow-smoked over alderwood and packed in the most beautiful tins you have ever seen. Fishwife is single-handedly making tinned fish cool again.",
    aspectRatio: 1.55,
    gumis: 21000,
    shares: 2520,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-23",
    title: "Sizzle Extra Virgin Olive Oil (Cooking)",
    brand: "Graza",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
      alt: "Green squeeze bottle of everyday cooking olive oil",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&q=80",
        alt: "Green squeeze bottle of everyday cooking olive oil",
      },
      {
        url: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=1200&q=80",
        alt: "Olive oil being squeezed into a hot pan",
      },
      {
        url: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=1200&q=80",
        alt: "Vegetables being sauteed in olive oil",
      },
    ],
    price: { min: 1500, max: 3500, currency: "USD" },
    rating: { average: 4.7, count: 3980 },
    buyUrl: "https://grfranciscoaza.co",
    topFeatures: [
      "High smoke point for cooking",
      "Squeeze bottle prevents oxidation",
      "Mild, buttery flavor",
      "Perfect for everyday use",
    ],
    description:
      "The everyday cooking counterpart to Graza's Drizzle. Made from later-harvest olives with a higher smoke point and milder flavor, perfect for sauteing, roasting, and everything in between.",
    aspectRatio: 0.75,
    gumis: 55000,
    shares: 6600,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-24",
    title: "Single-Origin Spice Collection",
    brand: "Burlap & Barrel",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=600&q=80",
      alt: "Collection of single-origin spice jars with colorful contents",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=1200&q=80",
        alt: "Collection of single-origin spice jars with colorful contents",
      },
      {
        url: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=1200&q=80",
        alt: "Vibrant spices measured into small bowls for cooking",
      },
      {
        url: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=1200&q=80",
        alt: "Spice jars arranged on a wooden spice rack",
      },
    ],
    price: { min: 3200, max: 5800, currency: "USD" },
    rating: { average: 4.8, count: 920 },
    buyUrl: "https://burlapandbarrel.com",
    topFeatures: [
      "Six single-origin spices",
      "Sourced directly from farmers",
      "Exponentially fresher than grocery store",
      "Includes origin story cards",
      "Reusable glass jars",
    ],
    description:
      "Six single-origin spices sourced directly from smallholder farms, so fresh they will make your grocery store spices taste like sawdust. Each jar comes with the story of the farmer who grew it.",
    aspectRatio: 1.25,
    gumis: 7400,
    shares: 888,
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "food-25",
    title: "Instant Matcha Latte Sachets",
    brand: "Blank Street",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&q=80",
      alt: "Minimalist sachets of instant matcha latte powder",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=1200&q=80",
        alt: "Minimalist sachets of instant matcha latte powder",
      },
      {
        url: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=1200&q=80",
        alt: "Matcha latte being made by adding water to powder",
      },
    ],
    price: { min: 1800, max: 2800, currency: "USD" },
    rating: { average: 4.2, count: 780 },
    buyUrl: "https://blankstreet.com",
    topFeatures: [
      "Cafe-quality in 30 seconds",
      "Oat milk powder included",
      "Single-serve convenience",
      "No clumps, no whisk needed",
      "10 sachets per box",
    ],
    description:
      "Blank Street's cult-favorite matcha latte, now in single-serve sachets with oat milk powder built right in. Just add hot water, stir, and you have a cafe-quality matcha latte in 30 seconds flat.",
    aspectRatio: 0.82,
    gumis: 3100,
    shares: 372,
    gumiedByFriends: getRandomGumiFriends(),
  },
];
