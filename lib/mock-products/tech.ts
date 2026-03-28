import { Product } from "@/types";
import { getRandomGumiFriends } from "../mock-users";

function rg(): number {
  const r = [[50,500],[500,5000],[5000,50000],[50000,500000]];
  const x = r[Math.floor(Math.random()*r.length)];
  return Math.floor(Math.random()*(x[1]-x[0])+x[0]);
}
function rs(): number { return Math.floor(Math.random()*2000)+10; }

export const TECH_PRODUCTS: Product[] = [
  {
    id: "tech-1",
    title: "AirPods Max",
    brand: "Apple",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      alt: "Apple AirPods Max over-ear headphones in silver",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=80",
        alt: "Apple AirPods Max over-ear headphones in silver",
      },
      {
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1200&q=80",
        alt: "AirPods Max earcup detail showing mesh canopy",
      },
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
        alt: "AirPods Max resting on marble desk surface",
      },
    ],
    price: { min: 54900, max: 54900, currency: "USD" },
    rating: { average: 4.7, count: 4230 },
    buyUrl: "https://apple.com",
    topFeatures: [
      "Active Noise Cancellation with Transparency mode",
      "Spatial Audio with dynamic head tracking",
      "Computational audio via Apple H1 chip",
      "Knit-mesh canopy for breathability",
      "Digital Crown for precise volume control",
    ],
    description:
      "Apple's statement headphone combines computational audio with premium materials. The anodized aluminum cups and stainless steel frame feel substantial, while the knit-mesh canopy distributes weight so you forget they're there. ANC is best-in-class.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-2",
    title: "Q1 HE Wireless Mechanical Keyboard",
    brand: "Keychron",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
      alt: "Keychron mechanical keyboard with warm backlight on wooden desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1200&q=80",
        alt: "Keychron mechanical keyboard with warm backlight on wooden desk",
      },
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
        alt: "Side profile showing gasket mount construction",
      },
      {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80",
        alt: "Close-up of double-shot PBT keycaps with RGB lighting",
      },
    ],
    price: { min: 19900, max: 23900, currency: "USD" },
    rating: { average: 4.8, count: 1870 },
    buyUrl: "https://keychron.com",
    topFeatures: [
      "75% layout with gasket mount design",
      "Hot-swappable Gateron Jupiter switches",
      "Double-shot PBT keycaps",
      "2.4 GHz / Bluetooth / USB-C tri-mode",
      "1000 Hz polling rate wireless",
    ],
    description:
      "The Q1 HE brings hall-effect switches to Keychron's premium aluminum chassis. The gasket mount typing feel is bouncy and forgiving, and tri-mode connectivity means one keyboard for every device. Hot-swap sockets let you fine-tune every key.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-3",
    title: "Walnut Desk Shelf",
    brand: "Grovemade",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      alt: "Grovemade walnut desk shelf elevating a monitor on a clean desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
        alt: "Grovemade walnut desk shelf elevating a monitor on a clean desk",
      },
      {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80",
        alt: "Detail of solid walnut wood grain and steel bracket",
      },
    ],
    price: { min: 18000, max: 22000, currency: "USD" },
    rating: { average: 4.9, count: 612 },
    buyUrl: "https://grovemade.com",
    topFeatures: [
      "Solid domestic hardwood (walnut or maple)",
      "Steel bracket system hides cables beneath",
      "Raises monitor to ergonomic eye level",
      "Built-in shelf for keyboard storage",
    ],
    description:
      "A beautifully simple monitor riser machined from a single slab of American walnut. The steel legs create a hidden compartment for your keyboard or notebook, keeping the desk surface clear. Ages gracefully with a natural patina over time.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-4",
    title: "Merino Wool Desk Mat",
    brand: "Ugmonk",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
      alt: "Large wool felt desk mat in charcoal covering a modern desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80",
        alt: "Large wool felt desk mat in charcoal covering a modern desk",
      },
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=80",
        alt: "Close-up of the pressed wool felt texture",
      },
    ],
    price: { min: 6500, max: 8500, currency: "USD" },
    rating: { average: 4.6, count: 943 },
    buyUrl: "https://ugmonk.com",
    topFeatures: [
      "100% merino wool felt, 3 mm thick",
      "Naturally sound-dampening surface",
      "Full-desk coverage (900 x 400 mm)",
      "Resists stains and repels liquids",
    ],
    description:
      "A full-desk mat made from dense merino wool felt that softens every keystroke and mouse movement. The natural fiber stays cool in summer and warm in winter. It doubles as a giant mousepad with pixel-perfect tracking.",
    aspectRatio: 0.65,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-5",
    title: "Nest Leather Cable Organizer",
    brand: "Orbitkey",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      alt: "Orbitkey Nest organizer with cables and tech accessories neatly arranged",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=80",
        alt: "Orbitkey Nest organizer with cables and tech accessories neatly arranged",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
        alt: "Interior compartments showing cable organization system",
      },
    ],
    price: { min: 5990, max: 5990, currency: "USD" },
    rating: { average: 4.5, count: 1280 },
    buyUrl: "https://orbitkey.com",
    topFeatures: [
      "Top-grain leather shell with magnetic closure",
      "Integrated wireless charging pad",
      "Flexible interior dividers",
      "Fits AirPods, cables, dongles, and USB sticks",
    ],
    description:
      "A deceptively compact leather valet that holds every cable and dongle you carry. The magnetic lid opens to reveal flexible dividers, and the built-in Qi pad charges your earbuds while they sit inside. Closes flat for travel.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-6",
    title: "Monitor Light Bar Pro",
    brand: "Elgato",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      alt: "Elgato light bar mounted on top of ultrawide monitor illuminating desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
        alt: "Elgato light bar mounted on top of ultrawide monitor illuminating desk",
      },
      {
        url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80",
        alt: "Light bar casting warm asymmetric glow across workspace",
      },
    ],
    price: { min: 12999, max: 12999, currency: "USD" },
    rating: { average: 4.7, count: 3150 },
    buyUrl: "https://elgato.com",
    topFeatures: [
      "Asymmetric light pattern eliminates screen glare",
      "2700 K - 6500 K adjustable color temperature",
      "Wireless dial controller included",
      "Fits monitors up to 45 mm thick",
    ],
    description:
      "An asymmetric LED bar that clips onto your monitor and bathes the desk in even light without any glare on screen. The wireless puck controller sits on the desk for instant brightness and temperature adjustments. A game-changer for late-night work.",
    aspectRatio: 0.68,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-7",
    title: "Linen Mousepad",
    brand: "Grovemade",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80",
      alt: "Grovemade linen mousepad in natural on a walnut desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80",
        alt: "Grovemade linen mousepad in natural on a walnut desk",
      },
      {
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&q=80",
        alt: "Close-up of linen weave surface texture",
      },
    ],
    price: { min: 8000, max: 10000, currency: "USD" },
    rating: { average: 4.6, count: 478 },
    buyUrl: "https://grovemade.com",
    topFeatures: [
      "Belgian linen surface with cork base",
      "Natural rubber non-slip underside",
      "Stitched edge prevents fraying",
      "Compatible with all mouse sensors",
    ],
    description:
      "A mousepad that actually looks good on your desk. Belgian linen stretched over a cork core gives a smooth, controlled glide with a warmth that synthetic pads can't match. The stitched border keeps its shape for years.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-8",
    title: "USB-C Multiport Adapter V3",
    brand: "Satechi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
      alt: "Satechi USB-C hub in space gray connected to a MacBook",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&q=80",
        alt: "Satechi USB-C hub in space gray connected to a MacBook",
      },
      {
        url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&q=80",
        alt: "All seven ports visible on the hub's edge",
      },
    ],
    price: { min: 7999, max: 7999, currency: "USD" },
    rating: { average: 4.5, count: 2610 },
    buyUrl: "https://satechi.net",
    topFeatures: [
      "7-in-1: HDMI 4K 60 Hz, USB-A 3.0 x2, SD/microSD, USB-C PD 100 W",
      "Aluminum housing matches MacBook finish",
      "Plug-and-play, no drivers needed",
    ],
    description:
      "The hub Apple should have shipped in the box. Seven ports in an aluminum shell that color-matches your MacBook perfectly. HDMI pushes 4K at 60 Hz, and 100 W pass-through keeps your laptop charged while everything is connected.",
    aspectRatio: 0.9,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-9",
    title: "PowerCore III Elite 25600",
    brand: "Anker",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
      alt: "Anker portable charger on a table next to a phone and earbuds",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&q=80",
        alt: "Anker portable charger on a table next to a phone and earbuds",
      },
      {
        url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80",
        alt: "LED display showing battery percentage",
      },
    ],
    price: { min: 6599, max: 6599, currency: "USD" },
    rating: { average: 4.7, count: 4850 },
    buyUrl: "https://anker.com",
    topFeatures: [
      "25,600 mAh capacity — charges a MacBook Air once",
      "87 W USB-C Power Delivery output",
      "Charges three devices simultaneously",
      "LED display for exact battery percentage",
    ],
    description:
      "Enough juice to charge a MacBook Air from zero, plus your phone twice over. The 87 W PD port means your laptop charges at full speed even on the go. Surprisingly compact for the capacity — fits in a jacket pocket.",
    aspectRatio: 1.1,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-10",
    title: "Era 100 Wireless Speaker",
    brand: "Sonos",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
      alt: "Sonos Era 100 speaker in white on a shelf",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80",
        alt: "Sonos Era 100 speaker in white on a shelf",
      },
      {
        url: "https://images.unsplash.com/photo-1580910051074-3eb694886571?w=1200&q=80",
        alt: "Close-up of speaker grille and touch controls",
      },
      {
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=80",
        alt: "Sonos Era 100 pair in stereo configuration on bookshelf",
      },
    ],
    price: { min: 24900, max: 24900, currency: "USD" },
    rating: { average: 4.8, count: 3620 },
    buyUrl: "https://sonos.com",
    topFeatures: [
      "Trueplay tuning adapts to room acoustics",
      "Bluetooth 5.0 and Wi-Fi 6 connectivity",
      "Stereo pair for immersive sound",
      "AirPlay 2, Alexa, and Sonos app control",
    ],
    description:
      "Sonos re-engineered their entry speaker from the ground up. Wider stereo separation from dual tweeters fills a room in a way the old One never could. Trueplay auto-tunes to your space, and Bluetooth means guests can play music instantly.",
    aspectRatio: 1.2,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-11",
    title: "WF-1000XM5 Wireless Earbuds",
    brand: "Sony",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1580910051074-3eb694886571?w=600&q=80",
      alt: "Sony WF-1000XM5 earbuds in charging case on desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1580910051074-3eb694886571?w=1200&q=80",
        alt: "Sony WF-1000XM5 earbuds in charging case on desk",
      },
      {
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=80",
        alt: "Single earbud showing driver and tip detail",
      },
    ],
    price: { min: 29800, max: 29800, currency: "USD" },
    rating: { average: 4.7, count: 2890 },
    buyUrl: "https://sony.com",
    topFeatures: [
      "Industry-leading ANC with V2 processor",
      "Hi-Res Audio Wireless (LDAC)",
      "24-hour total battery with case",
      "IPX4 water resistance",
      "Speak-to-chat auto pauses music",
    ],
    description:
      "Sony's flagship earbuds are 25% smaller than the XM4 and somehow sound even better. The V2 processor cancels more noise while drawing less power. LDAC codec support means lossless streaming from any Android phone.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-12",
    title: "Echo Show 15 Smart Display",
    brand: "Amazon",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      alt: "Smart home display mounted on wall showing calendar and widgets",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=80",
        alt: "Smart home display mounted on wall showing calendar and widgets",
      },
      {
        url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1200&q=80",
        alt: "Display in landscape mode on a kitchen counter",
      },
    ],
    price: { min: 24999, max: 24999, currency: "USD" },
    rating: { average: 4.3, count: 1540 },
    buyUrl: "https://amazon.com",
    topFeatures: [
      "15.6-inch Full HD display",
      "Customizable widget home screen",
      "Visual ID recognizes family members",
      "Wall-mount or countertop stand",
    ],
    description:
      "A 15-inch smart display that becomes the command center of your home. Pin calendars, shopping lists, and sticky notes as widgets, and Visual ID personalizes the view for each family member who walks by. Works as a photo frame when idle.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-13",
    title: "Kindle Paperwhite Signature Edition",
    brand: "Amazon",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80",
      alt: "Kindle Paperwhite e-reader resting on a linen blanket",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1200&q=80",
        alt: "Kindle Paperwhite e-reader resting on a linen blanket",
      },
      {
        url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=80",
        alt: "Reading in direct sunlight with glare-free display",
      },
    ],
    price: { min: 18999, max: 18999, currency: "USD" },
    rating: { average: 4.8, count: 4100 },
    buyUrl: "https://amazon.com",
    topFeatures: [
      "6.8-inch 300 ppi glare-free display",
      "Wireless charging and auto-adjusting light",
      "32 GB storage for thousands of books",
      "IPX8 waterproof — reads in the bath",
      "Up to 10 weeks of battery life",
    ],
    description:
      "The best e-reader ever made, and it's not close. The warm-light display disappears in your hands, and 10-week battery life means you never think about charging. Wireless charging via Qi keeps the USB-C port free for travel.",
    aspectRatio: 1.35,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-14",
    title: "Facecam Pro 4K Webcam",
    brand: "Elgato",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
      alt: "Elgato Facecam Pro mounted on monitor looking sharp",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=80",
        alt: "Elgato Facecam Pro mounted on monitor looking sharp",
      },
      {
        url: "https://images.unsplash.com/photo-1558089687-f282d8cbef78?w=1200&q=80",
        alt: "Webcam comparison showing 4K clarity vs built-in camera",
      },
    ],
    price: { min: 29999, max: 29999, currency: "USD" },
    rating: { average: 4.6, count: 890 },
    buyUrl: "https://elgato.com",
    topFeatures: [
      "True 4K 60 fps via USB-C",
      "Sony STARVIS sensor for low-light excellence",
      "Fixed-focus glass lens — no autofocus hunting",
      "On-camera image processing, no software needed",
    ],
    description:
      "Finally, a webcam that makes you look as good on Zoom as you do in person. The Sony STARVIS sensor handles dim rooms gracefully, and 4K resolution means you can crop and reframe without losing sharpness. Plug in and go — zero configuration.",
    aspectRatio: 0.95,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-15",
    title: "Dyson Solarcycle Morph Desk Lamp",
    brand: "Dyson",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1558089687-f282d8cbef78?w=600&q=80",
      alt: "Dyson desk lamp in copper/silver illuminating a workspace",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558089687-f282d8cbef78?w=1200&q=80",
        alt: "Dyson desk lamp in copper/silver illuminating a workspace",
      },
      {
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=80",
        alt: "Lamp morphed into ambient lighting position",
      },
    ],
    price: { min: 64999, max: 64999, currency: "USD" },
    rating: { average: 4.5, count: 320 },
    buyUrl: "https://dyson.com",
    topFeatures: [
      "Tracks local daylight to match color and brightness",
      "Four lighting modes: task, indirect, feature, ambient",
      "60-year LED lifespan via heat-pipe cooling",
      "Optical head pivots 360 degrees",
    ],
    description:
      "Dyson's most ambitious lamp dynamically matches your local daylight throughout the day. In the morning it's cool and bright; at night it shifts to a warm amber. The heat-pipe technology means the LEDs will literally outlast the desk underneath them.",
    aspectRatio: 1.45,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-16",
    title: "Curve Laptop Stand",
    brand: "Twelve South",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
      alt: "Twelve South Curve stand holding a MacBook at ergonomic height",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=80",
        alt: "Twelve South Curve stand holding a MacBook at ergonomic height",
      },
      {
        url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&q=80",
        alt: "Side view showing ventilation gap beneath laptop",
      },
    ],
    price: { min: 5999, max: 5999, currency: "USD" },
    rating: { average: 4.7, count: 2100 },
    buyUrl: "https://twelvesouth.com",
    topFeatures: [
      "Matte black aluminum matches any desk",
      "Raises screen 6 inches for neck-friendly viewing",
      "Open-air design for passive cooling",
      "Padded silicone cradle protects finish",
    ],
    description:
      "A single piece of bent aluminum that raises your laptop to eye level and looks like a piece of modern sculpture. The open-air design keeps the laptop cool, and the silicone contact points prevent scratches. Folds flat for travel.",
    aspectRatio: 0.9,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-17",
    title: "MagSafe StandBy Charger",
    brand: "Twelve South",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
      alt: "iPhone on MagSafe stand in landscape StandBy mode on nightstand",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&q=80",
        alt: "iPhone on MagSafe stand in landscape StandBy mode on nightstand",
      },
      {
        url: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200&q=80",
        alt: "Charger with iPhone and Apple Watch charging simultaneously",
      },
    ],
    price: { min: 7999, max: 7999, currency: "USD" },
    rating: { average: 4.5, count: 1580 },
    buyUrl: "https://twelvesouth.com",
    topFeatures: [
      "MagSafe 15 W fast charge + Apple Watch charger",
      "Triggers iOS StandBy mode automatically",
      "Weighted base with vegan leather finish",
      "Landscape and portrait orientations",
    ],
    description:
      "Drop your iPhone on the magnetic puck and it immediately enters StandBy mode — turning your phone into a beautiful bedside clock. The Apple Watch charger on the back means one less cable on the nightstand. Weighted base stays planted.",
    aspectRatio: 1.15,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-18",
    title: "Cable Management Tray",
    brand: "Grovemade",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80",
      alt: "Under-desk cable tray in walnut holding power strip and cables",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200&q=80",
        alt: "Under-desk cable tray in walnut holding power strip and cables",
      },
      {
        url: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=1200&q=80",
        alt: "Before and after showing cables hidden inside the tray",
      },
    ],
    price: { min: 12000, max: 15000, currency: "USD" },
    rating: { average: 4.6, count: 415 },
    buyUrl: "https://grovemade.com",
    topFeatures: [
      "Solid walnut or maple shell",
      "Holds full-size power strip and cables",
      "Tool-free magnetic mounting brackets",
      "Open ends for easy cable routing",
    ],
    description:
      "The difference between a messy desk and a clean one is where the cables go. This under-desk tray hides your power strip, chargers, and every cable in a beautiful walnut shell. Magnetic brackets attach in seconds with no drilling required.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-19",
    title: "T7 Shield Portable SSD 2TB",
    brand: "Samsung",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80",
      alt: "Samsung T7 Shield portable SSD in indigo blue on desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=1200&q=80",
        alt: "Samsung T7 Shield portable SSD in indigo blue on desk",
      },
      {
        url: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=1200&q=80",
        alt: "SSD next to a coin for size comparison",
      },
    ],
    price: { min: 16999, max: 16999, currency: "USD" },
    rating: { average: 4.8, count: 3200 },
    buyUrl: "https://samsung.com",
    topFeatures: [
      "Up to 1,050 MB/s read, 1,000 MB/s write",
      "IP65 water and dust resistant",
      "Rubberized shell survives 3-meter drops",
      "AES 256-bit hardware encryption",
    ],
    description:
      "Two terabytes in a drive the size of a credit card. The rubberized armor makes it waterproof and drop-proof, so it goes anywhere your laptop goes. Transfer speeds hit a gigabyte per second — you can copy a full-length film in under five seconds.",
    aspectRatio: 1.05,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-20",
    title: "Mini Smart Plug (4-Pack)",
    brand: "Anker",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=600&q=80",
      alt: "Compact smart plug inserted into a wall outlet",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=1200&q=80",
        alt: "Compact smart plug inserted into a wall outlet",
      },
      {
        url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
        alt: "App interface showing energy monitoring and schedules",
      },
    ],
    price: { min: 2799, max: 2799, currency: "USD" },
    rating: { average: 4.6, count: 4500 },
    buyUrl: "https://anker.com",
    topFeatures: [
      "15 A rated — handles space heaters and window ACs",
      "Energy monitoring built into each plug",
      "Works with Alexa, Google Home, and HomeKit",
      "Compact design doesn't block adjacent outlets",
    ],
    description:
      "The smallest smart plugs that still support energy monitoring. Each one tracks watts in real-time and works with every major voice assistant. The compact profile means you can stack two on a single duplex outlet without overlap.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-21",
    title: "Beoplay H100 Over-Ear Headphones",
    brand: "Bang & Olufsen",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
      alt: "Bang & Olufsen Beoplay H100 headphones in timber finish",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
        alt: "Bang & Olufsen Beoplay H100 headphones in timber finish",
      },
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        alt: "Detail of lambskin ear cushions and aluminum hinges",
      },
      {
        url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&q=80",
        alt: "Headphones folded flat inside carrying case",
      },
    ],
    price: { min: 159900, max: 159900, currency: "USD" },
    rating: { average: 4.8, count: 210 },
    buyUrl: "https://bang-olufsen.com",
    topFeatures: [
      "EarSense auto-detects on-head / off-head",
      "Replaceable lambskin ear cushions",
      "40-hour battery with ANC on",
      "Adaptive ANC adjusts to environment in real-time",
      "Qi wireless charging built in",
    ],
    description:
      "Bang & Olufsen's flagship headphone is an exercise in modular luxury. Every part — cushions, headband, battery — is user-replaceable, so these are headphones you keep for a decade. The sound signature is warm, detailed, and effortlessly wide.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-22",
    title: "Marshall Stanmore III Bluetooth Speaker",
    brand: "Marshall",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
      alt: "Marshall Stanmore III speaker in classic black with brass details",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        alt: "Marshall Stanmore III speaker in classic black with brass details",
      },
      {
        url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&q=80",
        alt: "Top-down view of analog control knobs",
      },
      {
        url: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=1200&q=80",
        alt: "Speaker filling a living room with sound",
      },
    ],
    price: { min: 37999, max: 37999, currency: "USD" },
    rating: { average: 4.7, count: 1950 },
    buyUrl: "https://marshall.com",
    topFeatures: [
      "Iconic rock-and-roll design with Bluetooth 5.2",
      "Analog bass, treble, and volume knobs",
      "Dynamic Loudness for rich sound at any volume",
      "Multi-host pairing for seamless device switching",
    ],
    description:
      "The Stanmore III looks like a piece of music history and sounds like one too. Real analog knobs let you dial in bass and treble without an app, and Dynamic Loudness keeps the low end punchy even at whisper volumes. A conversation piece that happens to sound incredible.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-23",
    title: "OB-4 Magic Radio",
    brand: "Teenage Engineering",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80",
      alt: "Teenage Engineering OB-4 portable speaker with retro dial interface",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&q=80",
        alt: "Teenage Engineering OB-4 portable speaker with retro dial interface",
      },
      {
        url: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=1200&q=80",
        alt: "OB-4 in portable mode leaning against a wall",
      },
    ],
    price: { min: 59900, max: 59900, currency: "USD" },
    rating: { average: 4.4, count: 380 },
    buyUrl: "https://teenage.engineering",
    topFeatures: [
      "FM radio + Bluetooth with ortho-line driver",
      "Infinite looper records and plays back audio",
      "Motorized scroll wheel for tactile control",
      "72-hour battery life",
    ],
    description:
      "Part speaker, part instrument, part art object. The OB-4 has an FM radio that loops and layers what it hears into generative soundscapes. The motorized wheel scrubs through your own audio timeline. Nothing else on the market feels remotely like it.",
    aspectRatio: 0.8,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-24",
    title: "Ear (2) Wireless Earbuds",
    brand: "Nothing",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=600&q=80",
      alt: "Nothing Ear 2 transparent earbuds in clear case",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=1200&q=80",
        alt: "Nothing Ear 2 transparent earbuds in clear case",
      },
      {
        url: "https://images.unsplash.com/photo-1610465299993-e6675c9f99db?w=1200&q=80",
        alt: "Single earbud showing transparent stem design",
      },
    ],
    price: { min: 14900, max: 14900, currency: "USD" },
    rating: { average: 4.5, count: 2340 },
    buyUrl: "https://nothing.tech",
    topFeatures: [
      "Transparent design with red-white dot accents",
      "Hi-Res Audio certified with LHDC 5.0",
      "Personalized ANC adapts to ear canal shape",
      "36-hour total battery with case",
    ],
    description:
      "Nothing's transparent design language extends to earbuds that people will actually ask you about. The LHDC 5.0 codec delivers near-lossless audio, and personalized ANC scans your ear canal for a perfect seal. Style and substance in equal measure.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-25",
    title: "TS4 Thunderbolt Station",
    brand: "CalDigit",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1610465299993-e6675c9f99db?w=600&q=80",
      alt: "CalDigit TS4 dock with multiple cables connected on a desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1610465299993-e6675c9f99db?w=1200&q=80",
        alt: "CalDigit TS4 dock with multiple cables connected on a desk",
      },
      {
        url: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&q=80",
        alt: "Rear panel showing 18 ports",
      },
      {
        url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=1200&q=80",
        alt: "Single cable from TS4 powering and connecting entire desk setup",
      },
    ],
    price: { min: 39999, max: 39999, currency: "USD" },
    rating: { average: 4.8, count: 1120 },
    buyUrl: "https://caldigit.com",
    topFeatures: [
      "18 ports including 3x Thunderbolt 4",
      "98 W laptop charging over single cable",
      "2.5 Gb Ethernet and SD 4.0 UHS-II",
      "Supports dual 6K displays simultaneously",
    ],
    description:
      "The definitive Thunderbolt dock for power users. One cable from TS4 to your MacBook and you get 18 ports, 98 W of charging, and dual 6K display support. The vertical form factor barely takes up desk space. Every professional reviewer recommends this for a reason.",
    aspectRatio: 1.3,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-26",
    title: "Key Light Mini",
    brand: "Elgato",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=80",
      alt: "Elgato Key Light Mini portable LED panel on desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&q=80",
        alt: "Elgato Key Light Mini portable LED panel on desk",
      },
      {
        url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=1200&q=80",
        alt: "Mini panel backlighting a monitor for video calls",
      },
    ],
    price: { min: 9999, max: 9999, currency: "USD" },
    rating: { average: 4.6, count: 760 },
    buyUrl: "https://elgato.com",
    topFeatures: [
      "Rechargeable battery lasts up to 4 hours",
      "Wi-Fi and Bluetooth control via Stream Deck app",
      "2900 K - 7000 K color temperature range",
      "Built-in 1/4-inch mount and magnetic base",
    ],
    description:
      "A tiny LED panel that makes any video call look professionally lit. The rechargeable battery means no cables cluttering your desk, and the magnetic base sticks to any metal surface. Adjust brightness and color wirelessly from your phone or Stream Deck.",
    aspectRatio: 1.1,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-27",
    title: "Bellroy Tech Kit Compact",
    brand: "Bellroy",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=600&q=80",
      alt: "Bellroy Tech Kit in charcoal with cables and adapters peeking out",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=1200&q=80",
        alt: "Bellroy Tech Kit in charcoal with cables and adapters peeking out",
      },
      {
        url: "https://images.unsplash.com/photo-1625245488600-d610c6b04012?w=1200&q=80",
        alt: "Interior organization showing elastic loops and mesh pocket",
      },
    ],
    price: { min: 5900, max: 5900, currency: "USD" },
    rating: { average: 4.7, count: 1340 },
    buyUrl: "https://bellroy.com",
    topFeatures: [
      "Recycled woven fabric exterior",
      "Clamshell opening for full visibility",
      "Elastic cable loops and zippered mesh pocket",
      "Fits charger, mouse, dongles, and earbuds",
    ],
    description:
      "A pouch that keeps your cable chaos contained. The clamshell design opens flat so you see everything at a glance — no more digging. Elastic loops pin cables in place, and the recycled woven fabric wipes clean. Small enough for a tote, big enough for everything.",
    aspectRatio: 0.9,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-28",
    title: "QuietComfort Ultra Headphones",
    brand: "Bose",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1625245488600-d610c6b04012?w=600&q=80",
      alt: "Bose QuietComfort Ultra headphones in black over-ear design",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1625245488600-d610c6b04012?w=1200&q=80",
        alt: "Bose QuietComfort Ultra headphones in black over-ear design",
      },
      {
        url: "https://images.unsplash.com/photo-1618329340733-12a2c78d3d40?w=1200&q=80",
        alt: "Headphones folded for travel in slim carrying case",
      },
      {
        url: "https://images.unsplash.com/photo-1592899677112-8b637e8cb1ea?w=1200&q=80",
        alt: "Touch controls on the right earcup",
      },
    ],
    price: { min: 42900, max: 42900, currency: "USD" },
    rating: { average: 4.7, count: 3580 },
    buyUrl: "https://bose.com",
    topFeatures: [
      "CustomTune ANC personalizes to your ears",
      "Immersive Bose Spatial Audio",
      "24-hour battery with ANC on",
      "Multipoint connects to two devices simultaneously",
      "Plush protein leather cushions",
    ],
    description:
      "Bose redefined their iconic QC line with spatial audio that puts you inside the recording. CustomTune plays a brief tone when you put them on and calibrates ANC and EQ to your exact ear shape. The result is noise cancellation that feels almost eerie.",
    aspectRatio: 0.95,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-29",
    title: "MX Master 3S Wireless Mouse",
    brand: "Logitech",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1618329340733-12a2c78d3d40?w=600&q=80",
      alt: "Logitech MX Master 3S ergonomic mouse in graphite on desk",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1618329340733-12a2c78d3d40?w=1200&q=80",
        alt: "Logitech MX Master 3S ergonomic mouse in graphite on desk",
      },
      {
        url: "https://images.unsplash.com/photo-1592899677112-8b637e8cb1ea?w=1200&q=80",
        alt: "Mouse next to keyboard showing matching design language",
      },
      {
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=80",
        alt: "Thumb wheel and gesture buttons close-up",
      },
    ],
    price: { min: 9999, max: 9999, currency: "USD" },
    rating: { average: 4.8, count: 4700 },
    buyUrl: "https://logitech.com",
    topFeatures: [
      "MagSpeed scroll wheel — 1000 lines per second",
      "8K DPI optical sensor tracks on glass",
      "Quiet clicks (90% less noise)",
      "USB-C quick charge — 3 hours from 1 minute",
      "Flow lets you work across 3 computers",
    ],
    description:
      "The gold standard of productivity mice, now whisper-quiet. The MagSpeed wheel scrolls through a 100-page doc in a single flick, and the 8K sensor tracks on literally any surface including glass. Flow software lets you drag files between computers like magic.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "tech-30",
    title: "Desk Mat Pro (Leather)",
    brand: "Bellroy",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1592899677112-8b637e8cb1ea?w=600&q=80",
      alt: "Bellroy leather desk mat in tan with keyboard and mouse arranged on top",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1592899677112-8b637e8cb1ea?w=1200&q=80",
        alt: "Bellroy leather desk mat in tan with keyboard and mouse arranged on top",
      },
      {
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=80",
        alt: "Close-up of vegetable-tanned leather patina developing over time",
      },
      {
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1200&q=80",
        alt: "Desk mat rolled up for portability",
      },
    ],
    price: { min: 8900, max: 10900, currency: "USD" },
    rating: { average: 4.6, count: 680 },
    buyUrl: "https://bellroy.com",
    topFeatures: [
      "Vegetable-tanned leather develops unique patina",
      "Non-slip microfiber backing",
      "Full-desk size (800 x 400 mm)",
      "Rolled edge prevents curling",
      "Certified B Corp and environmentally rated gold",
    ],
    description:
      "A leather desk mat that gets better with age. The vegetable-tanned surface starts smooth and develops a rich patina unique to how you use it. The microfiber backing grips the desk without any adhesive, and the rolled edges stay perfectly flat.",
    aspectRatio: 0.65,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
];
