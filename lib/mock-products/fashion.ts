import { Product } from "@/types";
import { getRandomGumiFriends } from "../mock-users";

function rg(): number {
  const r = [[50,500],[500,5000],[5000,50000],[50000,500000]];
  const x = r[Math.floor(Math.random()*r.length)];
  return Math.floor(Math.random()*(x[1]-x[0])+x[0]);
}
function rs(): number { return Math.floor(Math.random()*2000)+10; }

export const FASHION_PRODUCTS: Product[] = [
  {
    id: "fashion-1",
    title: "Cashmere Crew Neck Sweater",
    brand: "Naadam",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      alt: "Soft cashmere crew neck sweater in oatmeal draped over chair",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80",
        alt: "Soft cashmere crew neck sweater in oatmeal draped over chair",
      },
      {
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
        alt: "Close-up texture of cashmere knit fabric",
      },
      {
        url: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=1200&q=80",
        alt: "Cashmere sweater folded neatly on white surface",
      },
    ],
    price: { min: 7500, max: 9800, currency: "USD" },
    rating: { average: 4.7, count: 2340 },
    buyUrl: "https://naadam.co",
    topFeatures: [
      "Grade-A Mongolian cashmere",
      "Relaxed crew neck fit",
      "Ribbed cuffs and hem",
      "Sustainably sourced fiber",
    ],
    description:
      "Impossibly soft Grade-A Mongolian cashmere in a timeless crew silhouette. The kind of sweater you reach for every single morning without thinking.",
    aspectRatio: 0.8,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-2",
    title: "Oversized Double-Breasted Blazer",
    brand: "The Row",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a20?w=600&q=80",
      alt: "Oversized tailored blazer in charcoal wool",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a20?w=1200&q=80",
        alt: "Oversized tailored blazer in charcoal wool",
      },
      {
        url: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=1200&q=80",
        alt: "Blazer detail showing lapel and buttons",
      },
    ],
    price: { min: 249000, max: 319000, currency: "USD" },
    rating: { average: 4.9, count: 187 },
    buyUrl: "https://therow.com",
    topFeatures: [
      "Italian virgin wool",
      "Oversized shoulder silhouette",
      "Double-breasted horn buttons",
      "Fully lined in silk",
      "Welt pockets",
    ],
    description:
      "An architectural masterpiece in Italian virgin wool. The Row's signature oversized blazer redefines modern tailoring with a silhouette that's both commanding and effortless.",
    aspectRatio: 0.72,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-3",
    title: "AGOLDE '90s Pinch Waist Jean",
    brand: "AGOLDE",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
      alt: "High-waisted straight leg denim in medium wash",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80",
        alt: "High-waisted straight leg denim in medium wash",
      },
      {
        url: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=1200&q=80",
        alt: "Denim detail showing wash and stitching",
      },
      {
        url: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=1200&q=80",
        alt: "Full length view of relaxed straight leg jean",
      },
    ],
    price: { min: 17800, max: 19800, currency: "USD" },
    rating: { average: 4.6, count: 4120 },
    buyUrl: "https://agolde.com",
    topFeatures: [
      "Organic cotton denim",
      "High-rise pinch waist",
      "'90s relaxed straight leg",
      "Button fly closure",
      "Broken-in medium wash",
    ],
    description:
      "The internet's favorite jean for a reason. AGOLDE's pinch waist delivers that effortless vintage silhouette with a modern rise that flatters everyone.",
    aspectRatio: 0.68,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-4",
    title: "Silk Midi Slip Dress",
    brand: "Reformation",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80",
      alt: "Flowing silk slip dress in champagne",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=80",
        alt: "Flowing silk slip dress in champagne",
      },
      {
        url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80",
        alt: "Silk dress detail showing bias cut drape",
      },
    ],
    price: { min: 24800, max: 27800, currency: "USD" },
    rating: { average: 4.5, count: 1890 },
    buyUrl: "https://reformation.com",
    topFeatures: [
      "100% silk charmeuse",
      "Bias-cut midi length",
      "Adjustable spaghetti straps",
      "V-neckline with cowl back",
    ],
    description:
      "The dress that works for literally everything. Reformation's silk midi glides over the body in a bias cut that feels as good as it looks. Date night, wedding guest, Tuesday.",
    aspectRatio: 0.65,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-5",
    title: "Classic Cotton Crew Tee",
    brand: "Lady White Co.",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=600&q=80",
      alt: "Clean white cotton crew neck t-shirt",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=1200&q=80",
        alt: "Clean white cotton crew neck t-shirt",
      },
      {
        url: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=1200&q=80",
        alt: "Side view showing relaxed tee silhouette",
      },
      {
        url: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=1200&q=80",
        alt: "Cotton tee fabric texture close-up",
      },
    ],
    price: { min: 5500, max: 6500, currency: "USD" },
    rating: { average: 4.8, count: 3670 },
    buyUrl: "https://ladywhiteco.com",
    topFeatures: [
      "2-pack USA-made tubular knit",
      "6.5oz heavyweight cotton",
      "Shrink-resistant pre-washed",
      "Reinforced collar band",
    ],
    description:
      "The perfect white tee actually exists. Lady White Co. crafts each one in LA from heavyweight tubular cotton that gets softer with every wash and never loses its shape.",
    aspectRatio: 1.1,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-6",
    title: "Silk Satin Camisole",
    brand: "Staud",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      alt: "Delicate silk satin camisole in blush pink",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80",
        alt: "Delicate silk satin camisole in blush pink",
      },
      {
        url: "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=1200&q=80",
        alt: "Close-up of silk satin fabric sheen",
      },
    ],
    price: { min: 14500, max: 16500, currency: "USD" },
    rating: { average: 4.4, count: 892 },
    buyUrl: "https://stfrockstaud.com",
    topFeatures: [
      "100% silk satin",
      "Delicate lace trim",
      "Adjustable straps",
      "Relaxed boxy fit",
    ],
    description:
      "Staud's silk camisole walks the line between lingerie and ready-to-wear. Layer under a blazer for the office or wear solo for evening with effortless sophistication.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-7",
    title: "Wool Tailored Trousers",
    brand: "Theory",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&q=80",
      alt: "Tailored wool trousers in navy with pressed crease",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=1200&q=80",
        alt: "Tailored wool trousers in navy with pressed crease",
      },
      {
        url: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=1200&q=80",
        alt: "Full length trouser on model walking",
      },
    ],
    price: { min: 27500, max: 34500, currency: "USD" },
    rating: { average: 4.6, count: 1456 },
    buyUrl: "https://theory.com",
    topFeatures: [
      "Traceable Italian wool",
      "Tailored straight leg",
      "Pressed center crease",
      "Side zip closure",
      "Dry clean only",
    ],
    description:
      "Theory's signature trouser in Italian stretch wool sits perfectly at the waist with a clean pressed crease. The trouser that makes everything else in your closet look better.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-8",
    title: "Recycled Cashmere Cardigan",
    brand: "Everlane",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
      alt: "Oversized cashmere cardigan in heather grey",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80",
        alt: "Oversized cashmere cardigan in heather grey",
      },
      {
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80",
        alt: "Cardigan draped open showing relaxed silhouette",
      },
    ],
    price: { min: 13800, max: 16800, currency: "USD" },
    rating: { average: 4.5, count: 2780 },
    buyUrl: "https://everlane.com",
    topFeatures: [
      "100% recycled cashmere",
      "Oversized boyfriend fit",
      "Ribbed shawl collar",
      "Patch pockets",
      "Transparent pricing",
    ],
    description:
      "Everlane took post-consumer cashmere scraps and turned them into the coziest cardigan you'll ever own. Same luxurious softness, fraction of the environmental impact.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-9",
    title: "Structured Wool Overcoat",
    brand: "Toteme",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1544022613-e10091c39da4?w=600&q=80",
      alt: "Structured wool overcoat in camel",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1544022613-e10091c39da4?w=1200&q=80",
        alt: "Structured wool overcoat in camel",
      },
      {
        url: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=1200&q=80",
        alt: "Overcoat rear view showing tailored seams",
      },
    ],
    price: { min: 79000, max: 99000, currency: "USD" },
    rating: { average: 4.8, count: 342 },
    buyUrl: "https://toteme-studio.com",
    topFeatures: [
      "Double-faced Italian wool",
      "Minimal Scandinavian design",
      "Single-breasted closure",
      "Below-knee length",
      "Unlined construction",
    ],
    description:
      "Toteme's definitive overcoat in double-faced Italian wool. Perfectly balanced between minimal and monumental, this is the coat that anchors your entire cold-weather wardrobe.",
    aspectRatio: 0.67,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-10",
    title: "Pleated Wide-Leg Trousers",
    brand: "COS",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
      alt: "Pleated wide-leg trousers in black",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80",
        alt: "Pleated wide-leg trousers in black",
      },
      {
        url: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=1200&q=80",
        alt: "Trouser detail showing pleats at waist",
      },
    ],
    price: { min: 8900, max: 11500, currency: "USD" },
    rating: { average: 4.4, count: 1980 },
    buyUrl: "https://cos.com",
    topFeatures: [
      "Elasticated back waist",
      "Deep front pleats",
      "Wide relaxed leg",
      "ECOVERO viscose blend",
    ],
    description:
      "COS delivers architectural volume in these flowing wide-leg trousers. Deep pleats create a sculptural drape that moves beautifully, blurring the line between tailoring and ease.",
    aspectRatio: 1.3,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-11",
    title: "Linen Button-Down Shirt",
    brand: "Club Monaco",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      alt: "Relaxed linen button-down in white",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80",
        alt: "Relaxed linen button-down in white",
      },
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80",
        alt: "Linen shirt fabric texture and drape",
      },
    ],
    price: { min: 10900, max: 12900, currency: "USD" },
    rating: { average: 4.3, count: 1240 },
    buyUrl: "https://clubmonaco.com",
    topFeatures: [
      "100% European linen",
      "Relaxed boyfriend fit",
      "Mother of pearl buttons",
      "Back box pleat",
    ],
    description:
      "The quintessential summer staple in crisp European linen. Club Monaco nails the balance between polished and undone with a relaxed fit that looks effortlessly put together.",
    aspectRatio: 0.92,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-12",
    title: "Stretch Rib Knit Dress",
    brand: "Skims",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80",
      alt: "Fitted ribbed knit midi dress in taupe",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1200&q=80",
        alt: "Fitted ribbed knit midi dress in taupe",
      },
      {
        url: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=1200&q=80",
        alt: "Ribbed knit dress showing body-hugging fit",
      },
    ],
    price: { min: 7800, max: 8800, currency: "USD" },
    rating: { average: 4.6, count: 4560 },
    buyUrl: "https://skims.com",
    topFeatures: [
      "Buttery soft rib knit",
      "Body-hugging midi silhouette",
      "Built-in bra support",
      "Machine washable",
      "Available in 9 colors",
    ],
    description:
      "The Skims dress that broke the internet. Their signature soft rib knit sculpts and skims the body in a midi length that's equal parts comfortable and head-turning.",
    aspectRatio: 0.66,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-13",
    title: "Merino Wool Knit Vest",
    brand: "COS",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
      alt: "Chunky merino wool knit vest in cream",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80",
        alt: "Chunky merino wool knit vest in cream",
      },
      {
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80",
        alt: "Vest layered over white button-down",
      },
    ],
    price: { min: 6900, max: 8900, currency: "USD" },
    rating: { average: 4.5, count: 890 },
    buyUrl: "https://cos.com",
    topFeatures: [
      "100% merino wool",
      "Chunky ribbed knit",
      "Deep V-neck",
      "Oversized layering fit",
    ],
    description:
      "COS's answer to the knit vest trend is a study in proportion. Oversized in chunky merino with a deep V-neck that layers perfectly over everything from tees to button-downs.",
    aspectRatio: 1.15,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-14",
    title: "Satin Wrap Midi Skirt",
    brand: "&Other Stories",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      alt: "Satin wrap midi skirt in olive green",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80",
        alt: "Satin wrap midi skirt in olive green",
      },
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
        alt: "Skirt detail showing wrap tie and drape",
      },
    ],
    price: { min: 7900, max: 8900, currency: "USD" },
    rating: { average: 4.3, count: 670 },
    buyUrl: "https://stories.com",
    topFeatures: [
      "Recycled satin fabric",
      "Wrap-front closure",
      "Adjustable tie waist",
      "Midi length with side slit",
    ],
    description:
      "Fluid recycled satin wraps and ties at the waist for an adjustable, flattering fit. The subtle side slit adds movement while the olive hue works across all seasons.",
    aspectRatio: 0.78,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-15",
    title: "Cashmere Lounge Set",
    brand: "Jenni Kayne",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
      alt: "Cashmere lounge set in soft caramel",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1200&q=80",
        alt: "Cashmere lounge set in soft caramel",
      },
      {
        url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&q=80",
        alt: "Close-up of cashmere lounge pants with elastic waist",
      },
    ],
    price: { min: 39500, max: 49500, currency: "USD" },
    rating: { average: 4.8, count: 560 },
    buyUrl: "https://jennikayne.com",
    topFeatures: [
      "Matching top and bottom set",
      "Grade-A Mongolian cashmere",
      "Relaxed wide-leg pant",
      "Crewneck pullover top",
      "Gift box included",
    ],
    description:
      "Jenni Kayne's cashmere lounge set is the ultimate luxury at home. Sold as a matching set in the softest Mongolian cashmere that makes sweatpants feel like a downgrade.",
    aspectRatio: 1.45,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-16",
    title: "Lightweight Cashmere Wrap",
    brand: "The Row",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      alt: "Oversized cashmere wrap scarf in ivory",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80",
        alt: "Oversized cashmere wrap scarf in ivory",
      },
      {
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
        alt: "Cashmere wrap draped elegantly over shoulders",
      },
    ],
    price: { min: 89000, max: 119000, currency: "USD" },
    rating: { average: 4.9, count: 98 },
    buyUrl: "https://therow.com",
    topFeatures: [
      "Featherweight cashmere gauze",
      "Generously oversized 80x200cm",
      "Raw edge finish",
      "Hand-finished in Italy",
    ],
    description:
      "Weightless cashmere gauze that drapes like a whisper. The Row's wrap is impossibly light yet warm, finished by hand in Italy with raw edges that give it a quiet, lived-in feel.",
    aspectRatio: 1.55,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-17",
    title: "Organic Cotton Poplin Shirt",
    brand: "Everlane",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      alt: "Crisp organic cotton poplin shirt in light blue",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=80",
        alt: "Crisp organic cotton poplin shirt in light blue",
      },
      {
        url: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=1200&q=80",
        alt: "Shirt detail showing collar and placket",
      },
    ],
    price: { min: 5800, max: 6800, currency: "USD" },
    rating: { average: 4.4, count: 3120 },
    buyUrl: "https://everlane.com",
    topFeatures: [
      "100% organic cotton poplin",
      "Classic fit with tailored darts",
      "Corozo nut buttons",
      "Transparent factory pricing",
    ],
    description:
      "Everlane stripped the classic oxford down to its essentials and rebuilt it in organic cotton poplin with corozo buttons. Clean, crisp, and transparently priced at $58.",
    aspectRatio: 0.95,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-18",
    title: "Sculpt Bodysuit",
    brand: "Skims",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      alt: "Seamless sculpting bodysuit in sienna",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80",
        alt: "Seamless sculpting bodysuit in sienna",
      },
      {
        url: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=1200&q=80",
        alt: "Bodysuit showing smooth sculpting compression",
      },
    ],
    price: { min: 6200, max: 6800, currency: "USD" },
    rating: { average: 4.7, count: 4890 },
    buyUrl: "https://skims.com",
    topFeatures: [
      "Smoothing sculpt knit",
      "Bonded seamless construction",
      "Snap closure",
      "Available in 9 shades",
      "Size-inclusive XXS-5X",
    ],
    description:
      "The bodysuit that launched a billion-dollar empire. Skims' sculpting fabric smooths without squeezing, in a shade range that actually matches real skin tones.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-19",
    title: "Wool-Cashmere Wrap Dress",
    brand: "Vince",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1577900232427-18219b9daa25?w=600&q=80",
      alt: "Elegant wool-cashmere wrap dress in burgundy",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1577900232427-18219b9daa25?w=1200&q=80",
        alt: "Elegant wool-cashmere wrap dress in burgundy",
      },
      {
        url: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=1200&q=80",
        alt: "Wrap dress detail showing tie waist and drape",
      },
    ],
    price: { min: 36500, max: 42500, currency: "USD" },
    rating: { average: 4.6, count: 445 },
    buyUrl: "https://vince.com",
    topFeatures: [
      "Wool-cashmere blend",
      "True wrap construction",
      "Self-tie waist belt",
      "Midi length with movement",
      "Dry clean recommended",
    ],
    description:
      "Vince masters the art of understated luxury with this wool-cashmere wrap dress. The true wrap construction creates a universally flattering silhouette that transitions seamlessly from office to evening.",
    aspectRatio: 0.73,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-20",
    title: "Quilted Liner Vest",
    brand: "Aritzia",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      alt: "Lightweight quilted vest in forest green",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
        alt: "Lightweight quilted vest in forest green",
      },
      {
        url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80",
        alt: "Vest styled with layering pieces",
      },
    ],
    price: { min: 11800, max: 14800, currency: "USD" },
    rating: { average: 4.5, count: 2340 },
    buyUrl: "https://aritzia.com",
    topFeatures: [
      "Diamond quilted nylon",
      "Recycled down fill",
      "Snap button closure",
      "Stand collar",
      "Two welt pockets",
    ],
    description:
      "Aritzia's bestselling quilted vest is the ultimate layering piece for transitional weather. Recycled down fill keeps you warm without bulk, and the diamond quilting adds understated texture.",
    aspectRatio: 1.2,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-21",
    title: "Ribbed Cotton Tank",
    brand: "Madewell",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
      alt: "Classic ribbed cotton tank top in black",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80",
        alt: "Classic ribbed cotton tank top in black",
      },
      {
        url: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=1200&q=80",
        alt: "Ribbed tank in multiple colors",
      },
    ],
    price: { min: 2450, max: 2850, currency: "USD" },
    rating: { average: 4.3, count: 4230 },
    buyUrl: "https://madewell.com",
    topFeatures: [
      "Organic cotton rib",
      "Slim-fitting silhouette",
      "Scoop neck",
      "Machine washable",
    ],
    description:
      "The everyday tank elevated. Madewell's ribbed cotton has just enough stretch to hug without clinging, and the organic cotton gets more comfortable every time you wash it.",
    aspectRatio: 1.05,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-22",
    title: "Cropped Wool Jacket",
    brand: "Sezane",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1523381294911-8d3cead13b03?w=600&q=80",
      alt: "Cropped boucle wool jacket in powder blue",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1523381294911-8d3cead13b03?w=1200&q=80",
        alt: "Cropped boucle wool jacket in powder blue",
      },
      {
        url: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=1200&q=80",
        alt: "Jacket detail showing boucle texture and gold buttons",
      },
    ],
    price: { min: 21500, max: 25500, currency: "USD" },
    rating: { average: 4.7, count: 678 },
    buyUrl: "https://sezane.com",
    topFeatures: [
      "Italian boucle wool",
      "Cropped collarless cut",
      "Gold-tone metal buttons",
      "Fully silk lined",
      "French atelier finishing",
    ],
    description:
      "Sezane channels Parisian je ne sais quoi in this cropped boucle jacket. Gold buttons and a collarless silhouette give it a vintage charm that pairs with everything from jeans to midi skirts.",
    aspectRatio: 0.88,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-23",
    title: "Stretch Ponte Legging",
    brand: "Eileen Fisher",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
      alt: "High-waisted stretch ponte legging in black",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80",
        alt: "High-waisted stretch ponte legging in black",
      },
      {
        url: "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=1200&q=80",
        alt: "Legging on model showing sculpted fit",
      },
    ],
    price: { min: 14800, max: 16800, currency: "USD" },
    rating: { average: 4.5, count: 3450 },
    buyUrl: "https://eileenfisher.com",
    topFeatures: [
      "Organic cotton ponte knit",
      "Wide comfort waistband",
      "Ankle length",
      "Wash and wear",
      "Responsible manufacturing",
    ],
    description:
      "Eileen Fisher's system-dressing staple in organic cotton ponte. The wide waistband never digs, the ponte holds its shape all day, and the ankle length works with every shoe in your closet.",
    aspectRatio: 0.69,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-24",
    title: "Aime Leon Dore Uniform Hoodie",
    brand: "Aime Leon Dore",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
      alt: "Heavyweight fleece hoodie in forest green",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80",
        alt: "Heavyweight fleece hoodie in forest green",
      },
      {
        url: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=1200&q=80",
        alt: "Hoodie detail showing embroidered logo",
      },
    ],
    price: { min: 15500, max: 17500, currency: "USD" },
    rating: { average: 4.8, count: 1890 },
    buyUrl: "https://aimeleondore.com",
    topFeatures: [
      "14oz heavyweight fleece",
      "Made in Canada",
      "Embroidered chest logo",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
    ],
    description:
      "The hoodie that elevated streetwear to luxury. ALD's uniform hoodie in 14oz Canadian-made fleece is the gold standard: heavyweight, perfectly boxy, and built to last decades.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-25",
    title: "Silk Charmeuse Blouse",
    brand: "Vince",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
      alt: "Draped silk charmeuse blouse in ivory",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80",
        alt: "Draped silk charmeuse blouse in ivory",
      },
      {
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80",
        alt: "Silk fabric detail showing lustrous sheen",
      },
    ],
    price: { min: 28500, max: 34500, currency: "USD" },
    rating: { average: 4.5, count: 678 },
    buyUrl: "https://vince.com",
    topFeatures: [
      "100% silk charmeuse",
      "Relaxed draped fit",
      "Concealed button placket",
      "French seam construction",
    ],
    description:
      "Vince's silk charmeuse blouse drapes with an effortless fluidity that only real silk delivers. French seam construction ensures a clean interior, and the concealed placket keeps the focus on the fabric.",
    aspectRatio: 0.82,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-26",
    title: "Elevated Sweatpant",
    brand: "Aime Leon Dore",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      alt: "Tapered fleece sweatpant in heather grey",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
        alt: "Tapered fleece sweatpant in heather grey",
      },
      {
        url: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=1200&q=80",
        alt: "Sweatpant detail showing tapered leg and cuff",
      },
    ],
    price: { min: 13500, max: 15500, currency: "USD" },
    rating: { average: 4.7, count: 2120 },
    buyUrl: "https://aimeleondore.com",
    topFeatures: [
      "14oz reverse weave fleece",
      "Tapered athletic fit",
      "Elastic waist with drawcord",
      "Made in Canada",
      "Ribbed ankle cuffs",
    ],
    description:
      "The sweatpant that you can actually wear outside. ALD's tapered silhouette in reverse-weave fleece sits perfectly between athletic and refined, with a weight that holds its structure season after season.",
    aspectRatio: 1.35,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-27",
    title: "Cotton Poplin Midi Dress",
    brand: "Sezane",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      alt: "Tiered cotton midi dress in sage green",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80",
        alt: "Tiered cotton midi dress in sage green",
      },
      {
        url: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=1200&q=80",
        alt: "Dress detail showing tiered skirt movement",
      },
    ],
    price: { min: 17500, max: 20500, currency: "USD" },
    rating: { average: 4.6, count: 1230 },
    buyUrl: "https://sezane.com",
    topFeatures: [
      "Organic cotton poplin",
      "Tiered midi skirt",
      "Smocked bodice",
      "Puff sleeves",
      "Side pockets",
    ],
    description:
      "Sezane channels effortless French summer in this tiered cotton midi. The smocked bodice and puff sleeves feel romantic without being precious, and yes, it has pockets.",
    aspectRatio: 0.76,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-28",
    title: "Tailored Bermuda Short",
    brand: "Theory",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&q=80",
      alt: "Tailored Bermuda shorts in sand linen blend",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=1200&q=80",
        alt: "Tailored Bermuda shorts in sand linen blend",
      },
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
        alt: "Bermuda short detail showing pressed crease",
      },
    ],
    price: { min: 19500, max: 23500, currency: "USD" },
    rating: { average: 4.4, count: 560 },
    buyUrl: "https://theory.com",
    topFeatures: [
      "Linen-cotton blend",
      "Above-knee tailored length",
      "Pressed center crease",
      "Tab waist closure",
      "Slash pockets",
    ],
    description:
      "Theory proves that shorts can be refined. These tailored Bermudas in a linen-cotton blend hit at the knee with a pressed crease that brings suiting polish to warm-weather dressing.",
    aspectRatio: 1.4,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-29",
    title: "Alpaca Blend Turtleneck",
    brand: "Toteme",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c8?w=600&q=80",
      alt: "Oversized alpaca turtleneck in charcoal",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c8?w=1200&q=80",
        alt: "Oversized alpaca turtleneck in charcoal",
      },
      {
        url: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=1200&q=80",
        alt: "Turtleneck texture close-up showing soft fuzzy knit",
      },
    ],
    price: { min: 49000, max: 59000, currency: "USD" },
    rating: { average: 4.8, count: 234 },
    buyUrl: "https://toteme-studio.com",
    topFeatures: [
      "Baby alpaca wool blend",
      "Oversized cocoon silhouette",
      "Folded turtleneck",
      "Dropped shoulders",
      "Ribbed hem and cuffs",
    ],
    description:
      "Toteme's alpaca turtleneck is a masterclass in Scandinavian minimalism. The baby alpaca blend creates a halo-like softness with an oversized silhouette that feels like wearing a cloud.",
    aspectRatio: 0.9,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-30",
    title: "Drapey Satin Jogger",
    brand: "Aritzia",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&q=80",
      alt: "Satin finish jogger pants in champagne",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=1200&q=80",
        alt: "Satin finish jogger pants in champagne",
      },
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80",
        alt: "Jogger fabric detail showing satin sheen",
      },
    ],
    price: { min: 8800, max: 11000, currency: "USD" },
    rating: { average: 4.4, count: 3210 },
    buyUrl: "https://aritzia.com",
    topFeatures: [
      "Satin-finish twill",
      "Elastic waist with drawcord",
      "Tapered leg",
      "Side pockets",
      "Versatile day-to-night wear",
    ],
    description:
      "Aritzia blurs the line between loungewear and going-out pants with this satin jogger. The liquid drape catches the light beautifully while the elastic waist keeps things comfortable.",
    aspectRatio: 0.71,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-31",
    title: "Organic Cotton Canvas Tote",
    brand: "Madewell",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      alt: "Heavyweight canvas tote bag in natural",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
        alt: "Heavyweight canvas tote bag in natural",
      },
      {
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80",
        alt: "Tote bag styled with outfit showing capacity",
      },
    ],
    price: { min: 4800, max: 5800, currency: "USD" },
    rating: { average: 4.2, count: 5000 },
    buyUrl: "https://madewell.com",
    topFeatures: [
      "Heavyweight organic canvas",
      "Reinforced leather handles",
      "Interior zip pocket",
      "Fits a 15-inch laptop",
    ],
    description:
      "The everyday tote that replaces all your other totes. Madewell's heavyweight organic canvas gets better with age, and the reinforced leather handles can take whatever you throw in it.",
    aspectRatio: 1.5,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-32",
    title: "Fluid Crepe Wide-Leg Pant",
    brand: "Eileen Fisher",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
      alt: "Flowing crepe wide-leg pants in black",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
        alt: "Flowing crepe wide-leg pants in black",
      },
      {
        url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&q=80",
        alt: "Wide-leg pant showing fluid drape in movement",
      },
    ],
    price: { min: 21800, max: 25800, currency: "USD" },
    rating: { average: 4.6, count: 1670 },
    buyUrl: "https://eileenfisher.com",
    topFeatures: [
      "Silk georgette crepe",
      "Pull-on elastic waist",
      "Full wide-leg silhouette",
      "Fully lined",
      "Responsible silk certified",
    ],
    description:
      "Eileen Fisher's crepe wide-leg pant moves like water. The pull-on elastic waist disappears under tops while the full-width leg creates an elegant column of fluid drape.",
    aspectRatio: 0.86,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-33",
    title: "Twisted Seam Midi Skirt",
    brand: "Toteme",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80",
      alt: "Architectural midi skirt in sand cotton",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200&q=80",
        alt: "Architectural midi skirt in sand cotton",
      },
      {
        url: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=1200&q=80",
        alt: "Skirt detail showing twisted seam construction",
      },
    ],
    price: { min: 39000, max: 45000, currency: "USD" },
    rating: { average: 4.7, count: 189 },
    buyUrl: "https://toteme-studio.com",
    topFeatures: [
      "Structured organic cotton",
      "Signature twisted seam detail",
      "High-waisted A-line cut",
      "Concealed side zip",
      "Midi length",
    ],
    description:
      "Toteme's twisted seam skirt is functional sculpture. The signature spiraling seam creates visual movement around a clean A-line silhouette in structured organic cotton.",
    aspectRatio: 0.77,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-34",
    title: "Pima Cotton Relaxed Tee",
    brand: "Everlane",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80",
      alt: "Relaxed Pima cotton tee in washed black",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1200&q=80",
        alt: "Relaxed Pima cotton tee in washed black",
      },
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
        alt: "Tee detail showing fabric weight and drape",
      },
    ],
    price: { min: 3000, max: 3800, currency: "USD" },
    rating: { average: 4.5, count: 4780 },
    buyUrl: "https://everlane.com",
    topFeatures: [
      "100% Pima cotton",
      "Relaxed drop-shoulder fit",
      "Pre-shrunk garment",
      "Transparent pricing at $30",
    ],
    description:
      "Everlane proves a great tee doesn't need to cost a fortune. Pima cotton gives this relaxed tee a buttery handfeel that outperforms shirts three times the price.",
    aspectRatio: 1.25,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "fashion-35",
    title: "Wool Flannel Pleated Trouser",
    brand: "The Row",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1603344204980-4edb0ea63148?w=600&q=80",
      alt: "High-waisted pleated wool flannel trousers in grey",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1603344204980-4edb0ea63148?w=1200&q=80",
        alt: "High-waisted pleated wool flannel trousers in grey",
      },
      {
        url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1200&q=80",
        alt: "Trouser detail showing single-pleat construction",
      },
      {
        url: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=1200&q=80",
        alt: "Full-length view of wide-leg trouser silhouette",
      },
    ],
    price: { min: 149000, max: 189000, currency: "USD" },
    rating: { average: 4.9, count: 124 },
    buyUrl: "https://therow.com",
    topFeatures: [
      "Japanese wool flannel",
      "Single front pleat",
      "High-rise wide leg",
      "Side satin stripe detail",
      "Made in Italy",
    ],
    description:
      "The Row's ultimate trouser statement in Japanese wool flannel. A single pleat creates volume that falls into a wide leg with quiet authority. The kind of pant that makes people ask where it's from.",
    aspectRatio: 0.74,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
];
