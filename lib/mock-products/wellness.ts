import { Product } from "@/types";
import { getRandomGumiFriends } from "../mock-users";

function rg(): number {
  const r = [[50,500],[500,5000],[5000,50000],[50000,500000]];
  const x = r[Math.floor(Math.random()*r.length)];
  return Math.floor(Math.random()*(x[1]-x[0])+x[0]);
}
function rs(): number { return Math.floor(Math.random()*2000)+10; }

export const WELLNESS_PRODUCTS: Product[] = [
  {
    id: "wellness-1",
    title: "Weighted Bangles Set",
    brand: "Bala",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
      alt: "Bala weighted bangles in blush pink on yoga mat",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
        alt: "Bala weighted bangles in blush pink on yoga mat",
      },
      {
        url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80",
        alt: "Person wearing weighted bangles during workout",
      },
      {
        url: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1200&q=80",
        alt: "Weighted bangles detail shot on wrist",
      },
    ],
    price: { min: 4900, max: 6500, currency: "USD" },
    rating: { average: 4.6, count: 3120 },
    buyUrl: "https://shopbala.com",
    topFeatures: [
      "1 lb each wrist/ankle weight",
      "Recycled stainless steel bars",
      "Silicone wrapped for comfort",
      "Fits wrists and ankles",
    ],
    description:
      "The cult-favorite weighted bangles that redefined at-home fitness. Sleek enough for a walk around the block and stylish enough to forget you're working out. Each set adds a subtle 2 lb challenge to any movement.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-2",
    title: "Queen Silk Pillowcase",
    brand: "Slip",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80",
      alt: "Silk pillowcase in caramel on white bedding",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80",
        alt: "Silk pillowcase in caramel on white bedding",
      },
      {
        url: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1200&q=80",
        alt: "Close-up of mulberry silk texture",
      },
    ],
    price: { min: 8900, max: 10900, currency: "USD" },
    rating: { average: 4.8, count: 4850 },
    buyUrl: "https://slipsilk.com",
    topFeatures: [
      "22-momme pure mulberry silk",
      "Anti-aging and anti-sleep crease",
      "Reduces hair frizz and breakage",
      "Envelope closure design",
    ],
    description:
      "The original silk pillowcase trusted by dermatologists and hairstylists worldwide. Crafted from the highest grade long-fiber mulberry silk for noticeably smoother skin and hair by morning.",
    aspectRatio: 1.35,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-3",
    title: "Stone Diffuser",
    brand: "Vitruvi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=600&q=80",
      alt: "Vitruvi stone diffuser in white ceramic on shelf",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1200&q=80",
        alt: "Vitruvi stone diffuser in white ceramic on shelf",
      },
      {
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
        alt: "Stone diffuser misting essential oils in living room",
      },
      {
        url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
        alt: "Diffuser alongside essential oil bottles",
      },
    ],
    price: { min: 11900, max: 11900, currency: "USD" },
    rating: { average: 4.5, count: 1870 },
    buyUrl: "https://vitruvi.com",
    topFeatures: [
      "Hand-finished porcelain cover",
      "Ultrasonic technology",
      "Runs up to 7 hours",
      "BPA-free water tank",
      "Automatic shut-off",
    ],
    description:
      "A design-forward essential oil diffuser wrapped in hand-finished porcelain. Whisper-quiet ultrasonic technology disperses a fine cool mist that fills any room without overpowering it.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-4",
    title: "Crescent Meditation Cushion",
    brand: "Manduka",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
      alt: "Meditation cushion in sage green on hardwood floor",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
        alt: "Meditation cushion in sage green on hardwood floor",
      },
      {
        url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
        alt: "Person seated on meditation cushion in serene space",
      },
    ],
    price: { min: 5800, max: 6800, currency: "USD" },
    rating: { average: 4.7, count: 920 },
    buyUrl: "https://manduka.com",
    topFeatures: [
      "Organic cotton cover",
      "Buckwheat hull fill",
      "Crescent shape supports hip alignment",
      "Removable and washable cover",
    ],
    description:
      "A crescent-shaped meditation zafu designed to tilt the pelvis forward and support a natural spinal curve. Filled with organic buckwheat hulls that conform to your body and never go flat.",
    aspectRatio: 1.15,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-5",
    title: "Body Hero Daily Oil Wash",
    brand: "Nécessaire",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
      alt: "Nécessaire body oil wash in minimal bathroom setting",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
        alt: "Nécessaire body oil wash in minimal bathroom setting",
      },
      {
        url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80",
        alt: "Body oil wash lathering on skin",
      },
    ],
    price: { min: 2600, max: 2600, currency: "USD" },
    rating: { average: 4.5, count: 2780 },
    buyUrl: "https://necessaire.com",
    topFeatures: [
      "5 nourishing oils blend",
      "Vitamin-enriched formula",
      "Fragrance-free option available",
      "Dermatologist tested",
    ],
    description:
      "A luxurious oil-to-foam body wash that cleanses without stripping. Packed with five essential oils including marula, cacay, and meadowfoam seed to leave skin impossibly soft after every shower.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-6",
    title: "Acupressure Mat & Pillow Set",
    brand: "Higher Dose",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80",
      alt: "Acupressure mat in dusty rose laid out on floor",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80",
        alt: "Acupressure mat in dusty rose laid out on floor",
      },
      {
        url: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80",
        alt: "Person lying on acupressure mat for relaxation",
      },
    ],
    price: { min: 11500, max: 11500, currency: "USD" },
    rating: { average: 4.4, count: 1340 },
    buyUrl: "https://higherdose.com",
    topFeatures: [
      "6,210 acupressure points",
      "Includes neck pillow",
      "Organic linen cover",
      "Carry bag included",
      "Heat-responsive foam base",
    ],
    description:
      "An infrared-infused acupressure mat with thousands of precision points that stimulate blood flow and melt away tension. Fifteen minutes on this mat feels like an hour-long massage.",
    aspectRatio: 1.45,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-7",
    title: "Theragun Mini Percussive Therapy",
    brand: "Therabody",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=600&q=80",
      alt: "Theragun Mini massage device on gym bag",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80",
        alt: "Theragun Mini massage device on gym bag",
      },
      {
        url: "https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?w=1200&q=80",
        alt: "Using Theragun on shoulder muscles post-workout",
      },
      {
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80",
        alt: "Theragun Mini with carrying case",
      },
    ],
    price: { min: 19900, max: 19900, currency: "USD" },
    rating: { average: 4.7, count: 4210 },
    buyUrl: "https://therabody.com",
    topFeatures: [
      "3 speed settings up to 2400 PPM",
      "Ultra-portable design",
      "150-minute battery life",
      "QuietForce Technology",
    ],
    description:
      "The most portable percussive therapy device in the Therabody lineup. Small enough for a carry-on yet powerful enough to reach deep muscle tissue wherever tension lives.",
    aspectRatio: 0.9,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-8",
    title: "Mineral Soaking Bath Salts",
    brand: "Bathing Culture",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?w=600&q=80",
      alt: "Bath salts in glass jar beside drawn bath",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?w=1200&q=80",
        alt: "Bath salts in glass jar beside drawn bath",
      },
      {
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80",
        alt: "Mineral bath soak crystals close-up",
      },
    ],
    price: { min: 3200, max: 3200, currency: "USD" },
    rating: { average: 4.6, count: 870 },
    buyUrl: "https://bathingculture.com",
    topFeatures: [
      "Dead Sea mineral salts",
      "Essential oil infused",
      "Recyclable glass packaging",
      "Detoxifying magnesium blend",
    ],
    description:
      "A potent mineral soak harvested from the Dead Sea and blended with eucalyptus and hinoki essential oils. Dissolves into bathwater to draw out impurities and ease sore muscles from the day.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-9",
    title: "EKO Lite Cork Yoga Mat",
    brand: "Manduka",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80",
      alt: "Cork yoga mat rolled out in bright studio",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80",
        alt: "Cork yoga mat rolled out in bright studio",
      },
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
        alt: "Person practicing yoga on cork mat",
      },
      {
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
        alt: "Cork mat texture detail",
      },
    ],
    price: { min: 9200, max: 11000, currency: "USD" },
    rating: { average: 4.8, count: 1650 },
    buyUrl: "https://manduka.com",
    topFeatures: [
      "Natural cork top surface",
      "Non-toxic TPE base",
      "4mm cushioning",
      "Antimicrobial cork surface",
      "Grip improves with moisture",
    ],
    description:
      "A sustainably harvested cork yoga mat that actually grips better when your palms sweat. The natural antimicrobial surface stays fresh without chemical treatments and the TPE base provides joint-friendly cushion.",
    aspectRatio: 1.5,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-10",
    title: "High-Density Foam Roller",
    brand: "Therabody",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
      alt: "Textured foam roller on gym floor",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
        alt: "Textured foam roller on gym floor",
      },
      {
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
        alt: "Foam roller in use for back release",
      },
    ],
    price: { min: 3500, max: 5900, currency: "USD" },
    rating: { average: 4.5, count: 2100 },
    buyUrl: "https://therabody.com",
    topFeatures: [
      "5-speed vibration",
      "Bluetooth app connected",
      "Rechargeable lithium battery",
      "High-density EVA foam",
    ],
    description:
      "A vibrating foam roller that combines deep tissue percussion with classic myofascial release. Connect via Bluetooth to follow guided routines designed by sports therapists.",
    aspectRatio: 1.25,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-11",
    title: "Washable Silk Robe",
    brand: "Lunya",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
      alt: "Lunya silk robe draped over bedroom chair",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
        alt: "Lunya silk robe draped over bedroom chair",
      },
      {
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
        alt: "Silk robe detail showing piping and belt",
      },
    ],
    price: { min: 17800, max: 19800, currency: "USD" },
    rating: { average: 4.8, count: 3450 },
    buyUrl: "https://lunya.co",
    topFeatures: [
      "100% washable silk",
      "Above-the-knee length",
      "Interior tie and self-belt",
      "Contrast piping detail",
      "Machine washable",
    ],
    description:
      "The robe that broke the internet, now in a machine-washable silk that feels even more luxurious than it looks. Interior and exterior closures keep everything in place from bedroom to coffee run.",
    aspectRatio: 0.65,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-12",
    title: "Sleep Gummy Supplement",
    brand: "Olly",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
      alt: "Olly sleep gummies bottle on nightstand",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
        alt: "Olly sleep gummies bottle on nightstand",
      },
      {
        url: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&q=80",
        alt: "Bedside setup with sleep supplement",
      },
    ],
    price: { min: 1399, max: 1399, currency: "USD" },
    rating: { average: 4.3, count: 4920 },
    buyUrl: "https://olly.com",
    topFeatures: [
      "3mg melatonin per serving",
      "L-theanine and botanicals",
      "Blackberry zen flavor",
      "Gluten free and vegan",
    ],
    description:
      "A delicious blackberry-flavored gummy that combines melatonin with L-theanine and chamomile to ease you into deep, restful sleep. No groggy morning-after feeling, just calm, consistent rest.",
    aspectRatio: 0.8,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-13",
    title: "Magnesium Body Lotion",
    brand: "Agent Nateur",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=600&q=80",
      alt: "Agent Nateur magnesium lotion on marble surface",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&q=80",
        alt: "Agent Nateur magnesium lotion on marble surface",
      },
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80",
        alt: "Applying magnesium body lotion to skin",
      },
    ],
    price: { min: 5800, max: 5800, currency: "USD" },
    rating: { average: 4.6, count: 680 },
    buyUrl: "https://agentnateur.com",
    topFeatures: [
      "Transdermal magnesium chloride",
      "Organic shea butter base",
      "Calming lavender scent",
      "Supports muscle recovery",
    ],
    description:
      "A velvety body lotion infused with pharmaceutical-grade magnesium that absorbs through the skin to ease muscle cramps and promote deep relaxation. Apply before bed for noticeably better sleep.",
    aspectRatio: 1.1,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-14",
    title: "Sisal Dry Body Brush",
    brand: "Esker",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80",
      alt: "Natural bristle dry brush on linen towel",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80",
        alt: "Natural bristle dry brush on linen towel",
      },
      {
        url: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=1200&q=80",
        alt: "Dry brushing body ritual in bathroom",
      },
    ],
    price: { min: 2800, max: 2800, currency: "USD" },
    rating: { average: 4.4, count: 560 },
    buyUrl: "https://eskerbeauty.com",
    topFeatures: [
      "Natural sisal bristles",
      "Beechwood handle",
      "Stimulates lymphatic drainage",
      "Exfoliates dead skin cells",
    ],
    description:
      "A firm-bristled body brush carved from beechwood for the ancient practice of dry brushing. Sweep toward the heart before showering to boost circulation, exfoliate, and wake up every nerve ending.",
    aspectRatio: 0.95,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-15",
    title: "Weighted Neck Heating Pad",
    brand: "Ostrichpillow",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=600&q=80",
      alt: "Ostrichpillow heated neck wrap in midnight blue",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=1200&q=80",
        alt: "Ostrichpillow heated neck wrap in midnight blue",
      },
      {
        url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
        alt: "Wearing heated neck wrap while reading",
      },
    ],
    price: { min: 6500, max: 6500, currency: "USD" },
    rating: { average: 4.5, count: 1280 },
    buyUrl: "https://ostrichpillow.com",
    topFeatures: [
      "Microwaveable linseed fill",
      "Weighted for gentle pressure",
      "Soft velour cover",
      "Contoured neck shape",
    ],
    description:
      "A gently weighted neck wrap filled with linseed that you microwave for soothing warmth on demand. The ergonomic contour drapes over shoulders and neck to release tension exactly where it builds up.",
    aspectRatio: 1.3,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-16",
    title: "Lavender Eye Pillow",
    brand: "HAY",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
      alt: "Linen eye pillow in lavender shade on bed",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
        alt: "Linen eye pillow in lavender shade on bed",
      },
      {
        url: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1200&q=80",
        alt: "Eye pillow used during savasana",
      },
    ],
    price: { min: 2200, max: 2200, currency: "USD" },
    rating: { average: 4.3, count: 340 },
    buyUrl: "https://hay.dk",
    topFeatures: [
      "Organic flaxseed fill",
      "Dried French lavender",
      "Organic linen cover",
      "Light pressure blocks light",
    ],
    description:
      "A simple weighted eye pillow filled with organic flaxseed and dried French lavender. The gentle pressure on the eyelids triggers the relaxation response, making it perfect for meditation or savasana.",
    aspectRatio: 1.55,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-17",
    title: "The Five-Minute Gratitude Journal",
    brand: "Intelligent Change",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80",
      alt: "Gratitude journal open on desk with pen",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1200&q=80",
        alt: "Gratitude journal open on desk with pen",
      },
      {
        url: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?w=1200&q=80",
        alt: "Morning journaling ritual with coffee",
      },
    ],
    price: { min: 2900, max: 2900, currency: "USD" },
    rating: { average: 4.7, count: 3680 },
    buyUrl: "https://intelligentchange.com",
    topFeatures: [
      "Morning and evening prompts",
      "Guided format for beginners",
      "Linen-bound hardcover",
      "6-month daily practice",
    ],
    description:
      "A structured daily journal with morning and evening prompts that takes just five minutes to complete. Backed by positive psychology research, it rewires your brain to notice the good over six months of consistent practice.",
    aspectRatio: 0.72,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-18",
    title: "Restore Sunrise Alarm Clock",
    brand: "Hatch",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?w=600&q=80",
      alt: "Hatch Restore glowing softly on nightstand",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?w=1200&q=80",
        alt: "Hatch Restore glowing softly on nightstand",
      },
      {
        url: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=80",
        alt: "Sunrise alarm emitting warm dawn light",
      },
      {
        url: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=1200&q=80",
        alt: "Hatch Restore app sleep routine screen",
      },
    ],
    price: { min: 16999, max: 16999, currency: "USD" },
    rating: { average: 4.6, count: 2840 },
    buyUrl: "https://hatch.co",
    topFeatures: [
      "Customizable sunrise wake-up",
      "White noise and sleep sounds",
      "Wind-down light routines",
      "App-controlled via phone",
      "Soft reading light mode",
    ],
    description:
      "A smart sleep assistant that gently wakes you with a simulated sunrise and lulls you to sleep with curated soundscapes. Replace the harsh alarm with a gradual light that syncs with your circadian rhythm.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-19",
    title: "Calm Essential Oil Roller",
    brand: "Vitruvi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80",
      alt: "Vitruvi essential oil roller in pocket-size bottle",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=80",
        alt: "Vitruvi essential oil roller in pocket-size bottle",
      },
      {
        url: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=1200&q=80",
        alt: "Applying aromatherapy roller to wrist",
      },
    ],
    price: { min: 3200, max: 3200, currency: "USD" },
    rating: { average: 4.4, count: 920 },
    buyUrl: "https://vitruvi.com",
    topFeatures: [
      "Lavender and chamomile blend",
      "Jojoba oil carrier base",
      "Roll-on stainless steel ball",
      "Travel-friendly 10ml size",
    ],
    description:
      "A purse-sized aromatherapy roller blending lavender, roman chamomile, and frankincense in a jojoba carrier. Swipe on pulse points whenever anxiety creeps in for an instant reset.",
    aspectRatio: 0.68,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-20",
    title: "Collagen Peptides Powder",
    brand: "Moon Juice",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80",
      alt: "Moon Juice collagen powder jar on kitchen counter",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=1200&q=80",
        alt: "Moon Juice collagen powder jar on kitchen counter",
      },
      {
        url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80",
        alt: "Collagen powder being stirred into morning coffee",
      },
    ],
    price: { min: 4200, max: 4200, currency: "USD" },
    rating: { average: 4.5, count: 1560 },
    buyUrl: "https://moonjuice.com",
    topFeatures: [
      "Grass-fed bovine collagen",
      "Types I and III peptides",
      "Unflavored and dissolves instantly",
      "Supports skin, hair, nails, joints",
    ],
    description:
      "Hydrolyzed collagen peptides sourced from grass-fed, pasture-raised bovine. Stir into coffee, smoothies, or water daily for stronger nails, bouncier skin, and healthier joints within weeks.",
    aspectRatio: 1.2,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-21",
    title: "Reusable Organic Face Rounds",
    brand: "Dame",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80",
      alt: "Stack of reusable cotton face rounds on vanity",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80",
        alt: "Stack of reusable cotton face rounds on vanity",
      },
      {
        url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
        alt: "Using reusable face round with toner",
      },
    ],
    price: { min: 1800, max: 1800, currency: "USD" },
    rating: { average: 4.3, count: 720 },
    buyUrl: "https://dame.com",
    topFeatures: [
      "GOTS-certified organic cotton",
      "Set of 14 with laundry bag",
      "Dual-sided soft and textured",
      "Replaces 1,000+ disposable pads",
    ],
    description:
      "Fourteen ultra-soft organic cotton rounds that replace thousands of single-use pads. The dual-sided design offers a smooth side for toner and a textured side for gentle exfoliation.",
    aspectRatio: 1.05,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-22",
    title: "Healing Crystal Starter Set",
    brand: "Maude",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
      alt: "Curated crystal set with rose quartz and amethyst",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
        alt: "Curated crystal set with rose quartz and amethyst",
      },
      {
        url: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1200&q=80",
        alt: "Crystals arranged on meditation altar",
      },
    ],
    price: { min: 4800, max: 4800, currency: "USD" },
    rating: { average: 4.2, count: 380 },
    buyUrl: "https://getmaude.com",
    topFeatures: [
      "5 ethically sourced stones",
      "Rose quartz, amethyst, citrine, obsidian, selenite",
      "Cotton drawstring pouch",
      "Crystal guide booklet included",
    ],
    description:
      "A thoughtfully curated set of five essential crystals for beginners. Each stone is ethically sourced and hand-selected, accompanied by a guide explaining properties, cleansing rituals, and placement.",
    aspectRatio: 1.4,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-23",
    title: "Infrared PEMF Mat",
    brand: "Higher Dose",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&q=80",
      alt: "Higher Dose infrared mat laid out in wellness studio",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1200&q=80",
        alt: "Higher Dose infrared mat laid out in wellness studio",
      },
      {
        url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&q=80",
        alt: "Person relaxing on infrared PEMF mat",
      },
      {
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
        alt: "PEMF mat controller and settings",
      },
    ],
    price: { min: 99900, max: 99900, currency: "USD" },
    rating: { average: 4.7, count: 650 },
    buyUrl: "https://higherdose.com",
    topFeatures: [
      "Far infrared heat therapy",
      "PEMF frequency technology",
      "Amethyst and tourmaline crystals",
      "Low EMF certified",
      "Auto shut-off timer",
    ],
    description:
      "The at-home biohacking mat combining far infrared heat with pulsed electromagnetic field therapy. Layered with amethyst and tourmaline crystals to amplify healing frequencies and deepen recovery.",
    aspectRatio: 1.5,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-24",
    title: "Restorative Face Serum",
    brand: "Dr. Barbara Sturm",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
      alt: "Dr. Barbara Sturm serum bottle on minimalist vanity",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&q=80",
        alt: "Dr. Barbara Sturm serum bottle on minimalist vanity",
      },
      {
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
        alt: "Serum dropper dispensing product",
      },
    ],
    price: { min: 31000, max: 31000, currency: "USD" },
    rating: { average: 4.8, count: 520 },
    buyUrl: "https://drsturm.com",
    topFeatures: [
      "Hyaluronic acid complex",
      "Purslane extract anti-inflammatory",
      "Lightweight gel-serum texture",
      "Fragrance and dye free",
    ],
    description:
      "A clinical-grade face serum built on a potent hyaluronic acid complex and purslane, a powerful anti-inflammatory. Absorbs instantly to plump, hydrate, and calm reactive skin without any residue.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-25",
    title: "Washable Silk Sleep Set",
    brand: "Lunya",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
      alt: "Lunya silk sleep set in dusty rose on bed",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
        alt: "Lunya silk sleep set in dusty rose on bed",
      },
      {
        url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80",
        alt: "Close-up of silk fabric drape and stitching",
      },
      {
        url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=1200&q=80",
        alt: "Model wearing silk cami and shorts set",
      },
    ],
    price: { min: 17800, max: 22800, currency: "USD" },
    rating: { average: 4.9, count: 2100 },
    buyUrl: "https://lunya.co",
    topFeatures: [
      "100% washable silk charmeuse",
      "Camisole and shorts set",
      "Adjustable spaghetti straps",
      "Temperature regulating",
      "Machine wash cold",
    ],
    description:
      "The sleep set that feels like slipping into a cloud. Machine-washable silk charmeuse naturally regulates temperature so you stay cool all night. The camisole and shorts set is equal parts functional and beautiful.",
    aspectRatio: 0.82,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-26",
    title: "Neroli Hand & Body Wash",
    brand: "Homecourt",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
      alt: "Homecourt body wash bottle in modern bathroom",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80",
        alt: "Homecourt body wash bottle in modern bathroom",
      },
      {
        url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=1200&q=80",
        alt: "Lathering Homecourt hand wash at sink",
      },
    ],
    price: { min: 3800, max: 3800, currency: "USD" },
    rating: { average: 4.5, count: 1890 },
    buyUrl: "https://homecourt.co",
    topFeatures: [
      "Neroli and citrus fragrance",
      "Plant-derived cleansers",
      "Recyclable aluminum bottle",
      "Moisturizing formula",
    ],
    description:
      "Courtney Cox's line brings fine fragrance to everyday handwashing. The neroli and bergamot scent lingers just long enough to feel luxurious while plant-derived cleansers leave skin soft, never stripped.",
    aspectRatio: 0.88,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-27",
    title: "Bala Beam Yoga Block",
    brand: "Bala",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&q=80",
      alt: "Bala Beam weighted yoga block in charcoal",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=1200&q=80",
        alt: "Bala Beam weighted yoga block in charcoal",
      },
      {
        url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
        alt: "Using Bala Beam for overhead press",
      },
    ],
    price: { min: 6500, max: 6500, currency: "USD" },
    rating: { average: 4.6, count: 910 },
    buyUrl: "https://shopbala.com",
    topFeatures: [
      "6 lb weighted yoga block",
      "Soft-touch silicone exterior",
      "Functions as block, weight, or roller",
      "Recycled stainless steel core",
    ],
    description:
      "A reimagined yoga block that doubles as a dumbbell and foam roller. The 6-pound silicone-wrapped block supports poses, adds resistance to strength moves, and rolls out tight spots.",
    aspectRatio: 1.15,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-28",
    title: "Adaptogen Dust Blend",
    brand: "Moon Juice",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80",
      alt: "Moon Juice adaptogen dust jar with wooden spoon",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
        alt: "Moon Juice adaptogen dust jar with wooden spoon",
      },
      {
        url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=1200&q=80",
        alt: "Adaptogen dust blended into morning latte",
      },
    ],
    price: { min: 3800, max: 3800, currency: "USD" },
    rating: { average: 4.3, count: 1240 },
    buyUrl: "https://moonjuice.com",
    topFeatures: [
      "Ashwagandha, reishi, and maca blend",
      "Stress-response adaptogens",
      "Organic and sustainably sourced",
      "Mixes into any beverage",
    ],
    description:
      "A potent blend of ashwagandha, reishi, cordyceps, and maca designed to balance cortisol and combat the effects of chronic stress. Add a spoonful to your morning coffee or smoothie for sustained calm energy.",
    aspectRatio: 0.92,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-29",
    title: "Eucalyptus Shower Steamers",
    brand: "Bathing Culture",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80",
      alt: "Shower steamer tablets in kraft box on tile ledge",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=1200&q=80",
        alt: "Shower steamer tablets in kraft box on tile ledge",
      },
      {
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80",
        alt: "Shower steamer dissolving with steam rising",
      },
    ],
    price: { min: 1800, max: 1800, currency: "USD" },
    rating: { average: 4.4, count: 2340 },
    buyUrl: "https://bathingculture.com",
    topFeatures: [
      "Pure eucalyptus essential oil",
      "8-pack long-lasting tablets",
      "Activates with shower steam",
      "Vegan and cruelty-free",
    ],
    description:
      "Drop one of these effervescent tablets on the shower floor and let the steam release a cloud of pure eucalyptus. Clears sinuses, sharpens focus, and turns a basic shower into a spa moment.",
    aspectRatio: 1.35,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "wellness-30",
    title: "Theragun Elite Percussive Device",
    brand: "Therabody",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80",
      alt: "Theragun Elite with attachment heads on gym bench",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80",
        alt: "Theragun Elite with attachment heads on gym bench",
      },
      {
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
        alt: "Using Theragun Elite on leg muscles",
      },
      {
        url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80",
        alt: "Theragun Elite in hard carrying case",
      },
    ],
    price: { min: 39900, max: 39900, currency: "USD" },
    rating: { average: 4.8, count: 3650 },
    buyUrl: "https://therabody.com",
    topFeatures: [
      "5 built-in speeds up to 2400 PPM",
      "OLED screen with force meter",
      "120-minute battery life",
      "QuietForce Technology",
      "5 attachment heads included",
    ],
    description:
      "The professional-grade percussive therapy device with a built-in force meter that shows exactly how much pressure you're applying. Whisper-quiet engineering means you can use it during a Zoom call without anyone knowing.",
    aspectRatio: 1.08,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
];
