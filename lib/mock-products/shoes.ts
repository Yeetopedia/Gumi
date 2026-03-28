import { Product } from "@/types";
import { getRandomGumiFriends } from "../mock-users";

function rg(): number {
  const r = [[50,500],[500,5000],[5000,50000],[50000,500000]];
  const x = r[Math.floor(Math.random()*r.length)];
  return Math.floor(Math.random()*(x[1]-x[0])+x[0]);
}
function rs(): number { return Math.floor(Math.random()*2000)+10; }

export const SHOES_PRODUCTS: Product[] = [
  {
    id: "shoes-1",
    title: "New Balance 550",
    brand: "New Balance",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      alt: "New Balance 550 white and green leather sneaker on neutral background",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
        alt: "New Balance 550 white and green leather sneaker on neutral background",
      },
      {
        url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80",
        alt: "New Balance 550 side profile showing retro basketball silhouette",
      },
    ],
    price: { min: 10999, max: 12999, currency: "USD" },
    rating: { average: 4.7, count: 3420 },
    buyUrl: "https://www.newbalance.com/pd/550/BB550.html",
    topFeatures: [
      "Premium leather upper with suede accents",
      "Retro basketball silhouette from the '80s archive",
      "C-CAP midsole cushioning for all-day comfort",
      "Rubber outsole with pivot circle traction",
    ],
    description:
      "The New Balance 550 is a heritage court classic that's become the defining sneaker of quiet luxury. Originally released in 1989, its clean leather build and understated lines make it the perfect everyday shoe for those who know.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-2",
    title: "Birkenstock Boston Clog",
    brand: "Birkenstock",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
      alt: "Birkenstock Boston suede clog in taupe on wooden surface",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80",
        alt: "Birkenstock Boston suede clog in taupe on wooden surface",
      },
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
        alt: "Birkenstock Boston showing adjustable buckle detail",
      },
    ],
    price: { min: 15500, max: 16500, currency: "USD" },
    rating: { average: 4.8, count: 4890 },
    buyUrl: "https://www.birkenstock.com/us/boston-suede-leather/boston-suede.html",
    topFeatures: [
      "Soft suede leather upper with adjustable buckle",
      "Legendary contoured cork-latex footbed",
      "EVA sole for lightweight shock absorption",
      "Breaks in to your unique foot shape over time",
    ],
    description:
      "The Birkenstock Boston has transcended its granola roots to become fashion's most coveted clog. Its molded cork footbed delivers orthopedic-grade support, while the buttery suede upper ages beautifully with every wear.",
    aspectRatio: 1.15,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-3",
    title: "Salomon XT-6",
    brand: "Salomon",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80",
      alt: "Salomon XT-6 trail running shoe in black and silver colorway",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&q=80",
        alt: "Salomon XT-6 trail running shoe in black and silver colorway",
      },
      {
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
        alt: "Salomon XT-6 showing aggressive Contagrip outsole tread",
      },
      {
        url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1200&q=80",
        alt: "Salomon XT-6 on feet styled with wide-leg trousers",
      },
    ],
    price: { min: 17500, max: 19000, currency: "USD" },
    rating: { average: 4.6, count: 1870 },
    buyUrl: "https://www.salomon.com/en-us/shop/product/xt-6.html",
    topFeatures: [
      "Advanced Chassis for stability on any terrain",
      "Dual-density EVA and SensiFit cradle",
      "Contagrip outsole with aggressive lug pattern",
      "Quicklace one-pull lacing system",
      "Anti-debris mesh construction",
    ],
    description:
      "Born from ultra-marathon racing DNA, the Salomon XT-6 has been adopted by the fashion world for its aggressive technical aesthetic. It's the trail shoe that looks equally at home on mountain singletrack and city sidewalks.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-4",
    title: "Common Projects Original Achilles Low",
    brand: "Common Projects",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
      alt: "Common Projects Achilles Low white leather minimalist sneaker",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
        alt: "Common Projects Achilles Low white leather minimalist sneaker",
      },
      {
        url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&q=80",
        alt: "Common Projects Achilles Low showing gold-stamped serial number",
      },
    ],
    price: { min: 41000, max: 43500, currency: "USD" },
    rating: { average: 4.5, count: 2340 },
    buyUrl: "https://www.commonprojects.com/products/original-achilles-low-white",
    topFeatures: [
      "Full-grain Italian Nappa leather upper",
      "Hand-stitched in Marche, Italy",
      "Gold foil serial number stamp detail",
      "Margom rubber sole made in Italy",
    ],
    description:
      "The sneaker that started the luxury minimalist movement. Common Projects' Achilles Low is crafted from butter-soft Italian leather with zero branding save for the iconic gold serial number. It's the platonic ideal of a white sneaker.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-5",
    title: "Adidas Samba OG",
    brand: "Adidas",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
      alt: "Adidas Samba OG in classic white with black stripes and gum sole",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1200&q=80",
        alt: "Adidas Samba OG in classic white with black stripes and gum sole",
      },
      {
        url: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=1200&q=80",
        alt: "Adidas Samba OG showing T-toe overlay and serrated Three Stripes",
      },
    ],
    price: { min: 10000, max: 12000, currency: "USD" },
    rating: { average: 4.8, count: 4560 },
    buyUrl: "https://www.adidas.com/us/samba-og-shoes/B75806.html",
    topFeatures: [
      "Full-grain leather upper with suede T-toe",
      "Iconic serrated Three Stripes and gold foil branding",
      "Gum rubber outsole for indoor court grip",
      "OrthoLite sockliner for step-in comfort",
    ],
    description:
      "Originally designed for frozen football pitches in 1950, the Adidas Samba has become the world's most-wanted sneaker. The OG colorway with gum sole is a masterclass in timeless design that pairs with literally everything.",
    aspectRatio: 1.35,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-6",
    title: "Nike Cortez",
    brand: "Nike",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600&q=80",
      alt: "Nike Cortez in white leather with red swoosh and blue heel tab",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=1200&q=80",
        alt: "Nike Cortez in white leather with red swoosh and blue heel tab",
      },
      {
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80",
        alt: "Nike Cortez herringbone rubber outsole detail",
      },
    ],
    price: { min: 8000, max: 9500, currency: "USD" },
    rating: { average: 4.6, count: 3210 },
    buyUrl: "https://www.nike.com/t/cortez-shoes/DN1791-100",
    topFeatures: [
      "Full-grain leather upper with classic colorblocking",
      "Nike's original waffle outsole design from 1972",
      "EVA foam midsole wedge for cushioned stride",
      "Herringbone tread pattern for versatile traction",
    ],
    description:
      "Bill Bowerman's first masterpiece and one of Nike's founding silhouettes. The Cortez is a cultural icon that transcends sport, fashion, and decades. Clean lines and a low-profile shape make it endlessly versatile.",
    aspectRatio: 0.9,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-7",
    title: "Veja Campo Chromefree",
    brand: "Veja",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
      alt: "Veja Campo white sneaker with green V logo on clean background",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80",
        alt: "Veja Campo white sneaker with green V logo on clean background",
      },
      {
        url: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=1200&q=80",
        alt: "Veja Campo showing ChromeFree leather and wild rubber sole",
      },
    ],
    price: { min: 14500, max: 16500, currency: "USD" },
    rating: { average: 4.4, count: 1890 },
    buyUrl: "https://www.veja-store.com/en_us/campo-chromefree-leather-extra-white-emeraude-cp0502485.html",
    topFeatures: [
      "ChromeFree tanned leather — zero chrome in processing",
      "Wild rubber sole sourced from Amazon rainforest",
      "Organic cotton lining and laces",
      "Sugar cane and rice waste insole",
      "Carbon-neutral certified production",
    ],
    description:
      "Veja proved that sustainability and style aren't mutually exclusive. The Campo uses ChromeFree leather and Amazonian wild rubber to create a sneaker that looks premium while keeping its environmental footprint to a minimum.",
    aspectRatio: 1.2,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-8",
    title: "Dr. Martens 1460 Boot",
    brand: "Dr. Martens",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&q=80",
      alt: "Dr. Martens 1460 boot in classic black smooth leather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=1200&q=80",
        alt: "Dr. Martens 1460 boot in classic black smooth leather",
      },
      {
        url: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1200&q=80",
        alt: "Dr. Martens 1460 showing iconic yellow stitching and AirWair sole",
      },
      {
        url: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=1200&q=80",
        alt: "Dr. Martens 1460 lace-up detail with grooved sidewall",
      },
    ],
    price: { min: 17000, max: 19000, currency: "USD" },
    rating: { average: 4.7, count: 4120 },
    buyUrl: "https://www.drmartens.com/us/en/1460-smooth-leather-lace-up-boots/11822006.html",
    topFeatures: [
      "Smooth polished leather upper — built to last decades",
      "Iconic yellow Z-welt stitching",
      "Air-cushioned Bouncing Sole with Goodyear welt",
      "Scripted AirWair heel loop",
      "Break-in period rewards you with a custom fit",
    ],
    description:
      "Six decades of counterculture credibility in one boot. The 1460 is Dr. Martens' original 8-eye silhouette, featuring the indestructible AirWair sole and yellow stitching that have become universal symbols of self-expression.",
    aspectRatio: 0.72,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-9",
    title: "Blundstone #500 Chelsea Boot",
    brand: "Blundstone",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&q=80",
      alt: "Blundstone Chelsea boot in stout brown leather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1200&q=80",
        alt: "Blundstone Chelsea boot in stout brown leather",
      },
      {
        url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1200&q=80",
        alt: "Blundstone #500 showing elastic side panel and pull tab",
      },
    ],
    price: { min: 19499, max: 21499, currency: "USD" },
    rating: { average: 4.7, count: 3670 },
    buyUrl: "https://www.blundstone.com/stout-brown-premium-leather-chelsea-boots-style-500",
    topFeatures: [
      "Premium water-resistant leather upper",
      "SPS Max Comfort shock absorption system",
      "Dual-density polyurethane outsole",
      "Elastic side panels for easy on/off",
      "XRD heel and toe comfort inserts",
    ],
    description:
      "Tasmania's toughest boot has been protecting feet since 1870. The #500 Chelsea is the perfect all-weather companion — slip it on for coffee runs, wear it through rainstorms, and let the patina tell your story.",
    aspectRatio: 1.45,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-10",
    title: "Suicoke MOTO-Cab Sandal",
    brand: "Suicoke",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
      alt: "Suicoke MOTO-Cab nylon strap sandal in black",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=1200&q=80",
        alt: "Suicoke MOTO-Cab nylon strap sandal in black",
      },
      {
        url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&q=80",
        alt: "Suicoke MOTO-Cab Vibram sole and neoprene footbed detail",
      },
    ],
    price: { min: 14500, max: 17500, currency: "USD" },
    rating: { average: 4.3, count: 870 },
    buyUrl: "https://suicoke.com/collections/moto-cab",
    topFeatures: [
      "Vibram rubber outsole for superior grip",
      "Neoprene-lined adjustable nylon straps",
      "Contoured EVA and latex footbed",
      "Hook-and-loop closure for custom fit",
    ],
    description:
      "Suicoke brought technical sandals from the outdoors to the runway. The MOTO-Cab features Vibram soles and a sculptural nylon strap system that delivers gorpcore credibility with genuine all-terrain performance.",
    aspectRatio: 1.1,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-11",
    title: "The Row Soft Loafer",
    brand: "The Row",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
      alt: "The Row Soft Loafer in butter-soft black calfskin leather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1200&q=80",
        alt: "The Row Soft Loafer in butter-soft black calfskin leather",
      },
      {
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80",
        alt: "The Row Soft Loafer showing unlined interior and stacked leather heel",
      },
    ],
    price: { min: 89000, max: 109000, currency: "USD" },
    rating: { average: 4.9, count: 640 },
    buyUrl: "https://www.therow.com/us/shoes/loafers",
    topFeatures: [
      "Unlined calfskin leather for a glove-like fit",
      "Hand-lasted on custom forms in Italy",
      "Blake-stitched leather sole",
      "Zero-branding exterior for stealth luxury",
    ],
    description:
      "The Olsen twins' masterclass in stealth wealth. The Row's Soft Loafer is unlined, unbranded, and unforgettable — crafted from calfskin so supple it folds like fabric. This is what happens when perfection is the only metric.",
    aspectRatio: 0.68,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-12",
    title: "Alaïa Mesh Ballet Flat",
    brand: "Alaïa",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      alt: "Alaïa ballet flat with signature laser-cut perforations in nude",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&q=80",
        alt: "Alaïa ballet flat with signature laser-cut perforations in nude",
      },
      {
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80",
        alt: "Alaïa Mesh ballet flat showing intricate leather detailing",
      },
    ],
    price: { min: 79000, max: 89000, currency: "USD" },
    rating: { average: 4.8, count: 320 },
    buyUrl: "https://www.maison-alaia.com/us/shoes/ballerinas",
    topFeatures: [
      "Signature laser-cut mesh leather upper",
      "Leather sole with rubber inlay for grip",
      "Grosgrain trim with bow detail",
      "Padded insole for all-day wearability",
    ],
    description:
      "Alaïa's fishnet-inspired ballet flat is the shoe that launched a thousand waitlists. The laser-cut perforations are engineered for both beauty and breathability, while the padded insole proves luxury and comfort aren't opposites.",
    aspectRatio: 1.5,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-13",
    title: "Converse Chuck 70 High Top",
    brand: "Converse",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      alt: "Converse Chuck 70 high top in parchment white canvas",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80",
        alt: "Converse Chuck 70 high top in parchment white canvas",
      },
      {
        url: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=1200&q=80",
        alt: "Converse Chuck 70 showing premium canvas weave and cushioned OrthoLite insole",
      },
    ],
    price: { min: 8500, max: 9500, currency: "USD" },
    rating: { average: 4.7, count: 4980 },
    buyUrl: "https://www.converse.com/shop/p/chuck-70-unisex-high-top-shoe/162053C.html",
    topFeatures: [
      "Premium heavyweight canvas — thicker than standard Chucks",
      "OrthoLite cushioned insole for improved comfort",
      "Higher rubber foxing with vintage stitching",
      "Egret midsole for an authentic retro look",
      "Cotton laces with metal eyelets",
    ],
    description:
      "The Chuck 70 is not your average Converse. It upgrades the classic All Star with heavyweight canvas, cushioned insoles, and that unmistakable vintage-tinged egret midsole. The sneaker your favorite designer wears to their own shows.",
    aspectRatio: 0.82,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-14",
    title: "Onitsuka Tiger Mexico 66",
    brand: "Onitsuka Tiger",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
      alt: "Onitsuka Tiger Mexico 66 in white with blue and red stripes",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80",
        alt: "Onitsuka Tiger Mexico 66 in white with blue and red stripes",
      },
      {
        url: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=1200&q=80",
        alt: "Onitsuka Tiger Mexico 66 showing slim profile and tiger stripe detail",
      },
    ],
    price: { min: 10000, max: 12000, currency: "USD" },
    rating: { average: 4.5, count: 2180 },
    buyUrl: "https://www.onitsukatiger.com/us/en-us/mexico-66/p/DL408.0146.html",
    topFeatures: [
      "Full leather upper with signature tiger stripe overlays",
      "Slim retro silhouette from the 1966 archive",
      "Padded collar and tongue for snug fit",
      "Flat rubber outsole for ground-feel",
    ],
    description:
      "Designed for the 1966 Olympics and made famous by Uma Thurman's Kill Bill appearance. The Mexico 66 is Japanese craftsmanship distilled into a razor-thin sneaker that epitomizes understated cool.",
    aspectRatio: 1.25,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-15",
    title: "Hoka Clifton 9",
    brand: "Hoka",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80",
      alt: "Hoka Clifton 9 running shoe in soft lilac colorway",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=1200&q=80",
        alt: "Hoka Clifton 9 running shoe in soft lilac colorway",
      },
      {
        url: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=1200&q=80",
        alt: "Hoka Clifton 9 showing maximal cushion midsole profile",
      },
    ],
    price: { min: 14500, max: 15500, currency: "USD" },
    rating: { average: 4.6, count: 3890 },
    buyUrl: "https://www.hoka.com/en/us/road/clifton-9/1127895.html",
    topFeatures: [
      "Compression-molded EVA midsole for marshmallow cushion",
      "Meta-Rocker geometry for smooth heel-to-toe transition",
      "Breathable engineered mesh upper",
      "Lightweight at only 7.2oz (men's)",
      "Extended rear crash pad",
    ],
    description:
      "Hoka's Clifton 9 is the max-cushion daily trainer that converted the fashion world to chunky running shoes. The pillowy midsole absorbs impact like nothing else, making every step feel like running on clouds.",
    aspectRatio: 0.95,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-16",
    title: "On Cloud 5",
    brand: "On Running",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&q=80",
      alt: "On Cloud 5 in all-white with signature CloudTec sole pods",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=1200&q=80",
        alt: "On Cloud 5 in all-white with signature CloudTec sole pods",
      },
      {
        url: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=1200&q=80",
        alt: "On Cloud 5 showing individual cloud pods and Speedboard",
      },
    ],
    price: { min: 14999, max: 15999, currency: "USD" },
    rating: { average: 4.5, count: 2760 },
    buyUrl: "https://www.on-running.com/en-us/products/cloud-5",
    topFeatures: [
      "CloudTec cushioning with hollow pods for soft landings",
      "Speedboard energy plate for propulsive toe-off",
      "Recycled polyester engineered mesh upper",
      "Speed-lacing system with tuck-away toggle",
      "Antimicrobial inner lining",
    ],
    description:
      "Swiss-engineered with a proprietary CloudTec sole that cushions on landing and propels on takeoff. The Cloud 5 is the shoe that made Silicon Valley its unofficial uniform — clean, technical, and effortlessly minimal.",
    aspectRatio: 1.4,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-17",
    title: "Madewell The Milo Boot",
    brand: "Madewell",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&q=80",
      alt: "Madewell Milo ankle boot in rich brown leather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=1200&q=80",
        alt: "Madewell Milo ankle boot in rich brown leather",
      },
      {
        url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&q=80",
        alt: "Madewell Milo boot showing side zip and stacked heel",
      },
    ],
    price: { min: 19800, max: 22800, currency: "USD" },
    rating: { average: 4.4, count: 1540 },
    buyUrl: "https://www.madewell.com/the-milo-ankle-boot-in-leather/",
    topFeatures: [
      "Responsibly sourced leather upper",
      "Inside zip for easy on/off",
      "Stacked leather heel with rubber cap",
      "Cushioned leather insole",
      "Goes-with-everything shaft height",
    ],
    description:
      "Madewell's Milo boot is the transitional ankle boot that works from September to May. Its slightly pointed toe and just-right heel height walk the line between refined and relaxed — exactly where Madewell lives.",
    aspectRatio: 0.78,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-18",
    title: "Cole Haan GrandPro Rally Sneaker",
    brand: "Cole Haan",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
      alt: "Cole Haan GrandPro Rally court sneaker in optic white",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=1200&q=80",
        alt: "Cole Haan GrandPro Rally court sneaker in optic white",
      },
      {
        url: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=1200&q=80",
        alt: "Cole Haan GrandPro Rally showing Grand.OS cushioning system",
      },
    ],
    price: { min: 11000, max: 15000, currency: "USD" },
    rating: { average: 4.3, count: 1890 },
    buyUrl: "https://www.colehaan.com/grandpro-rally-canvas-court-sneaker/W23420.html",
    topFeatures: [
      "Grand.OS energy foam cushioning system",
      "Premium leather upper with clean lines",
      "Lightweight EVA cupsole construction",
      "Textile lining with molded footbed",
    ],
    description:
      "Cole Haan bridges the gap between dressy and casual with the GrandPro Rally. Its proprietary Grand.OS cushioning delivers sneaker comfort in a package clean enough for client meetings and Friday nights alike.",
    aspectRatio: 1.05,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-19",
    title: "Stuart Weitzman Nudistcurve Sandal",
    brand: "Stuart Weitzman",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
      alt: "Stuart Weitzman Nudistcurve strappy heel sandal in beige suede",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&q=80",
        alt: "Stuart Weitzman Nudistcurve strappy heel sandal in beige suede",
      },
      {
        url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1200&q=80",
        alt: "Stuart Weitzman Nudistcurve showing curved heel and ankle strap",
      },
    ],
    price: { min: 39500, max: 45500, currency: "USD" },
    rating: { average: 4.6, count: 780 },
    buyUrl: "https://www.stuartweitzman.com/products/nudistcurve-100/",
    topFeatures: [
      "Sculpted 100mm curved heel for elegant posture",
      "Adjustable ankle strap with buckle closure",
      "Padded leather insole for event-night comfort",
      "Nude-tone suede for leg-lengthening effect",
    ],
    description:
      "The Nudistcurve is Stuart Weitzman's signature evening sandal, engineered to disappear on the foot while the sculptural heel does all the talking. A red-carpet staple beloved by stylists for its leg-lengthening silhouette.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-20",
    title: "Allbirds Tree Dasher 2",
    brand: "Allbirds",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&q=80",
      alt: "Allbirds Tree Dasher 2 in natural grey eucalyptus fiber",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=1200&q=80",
        alt: "Allbirds Tree Dasher 2 in natural grey eucalyptus fiber",
      },
      {
        url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1200&q=80",
        alt: "Allbirds Tree Dasher 2 showing SweetFoam sugarcane midsole",
      },
    ],
    price: { min: 13500, max: 14500, currency: "USD" },
    rating: { average: 4.3, count: 2340 },
    buyUrl: "https://www.allbirds.com/products/mens-tree-dasher-2",
    topFeatures: [
      "FSC-certified eucalyptus tree fiber upper",
      "SweetFoam midsole made from sugarcane",
      "Carbon-negative material sourcing",
      "Machine washable construction",
      "Moisture-wicking merino wool heel liner",
    ],
    description:
      "Allbirds' Tree Dasher 2 is the running shoe for people who care about their footprint — both on the trail and on the planet. Made from eucalyptus fiber and sugarcane foam, it proves performance footwear can be genuinely sustainable.",
    aspectRatio: 1.3,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-21",
    title: "Mango Leather Loafer",
    brand: "Mango",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
      alt: "Mango leather penny loafer in cognac with gold hardware",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1200&q=80",
        alt: "Mango leather penny loafer in cognac with gold hardware",
      },
      {
        url: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=1200&q=80",
        alt: "Mango leather loafer showing hand-stitched apron and leather sole",
      },
    ],
    price: { min: 7999, max: 9999, currency: "USD" },
    rating: { average: 4.2, count: 890 },
    buyUrl: "https://shop.mango.com/us/women/shoes-loafers/leather-loafer_17040227.html",
    topFeatures: [
      "Genuine leather upper with penny strap detail",
      "Leather-lined interior for breathability",
      "Stacked leather heel with rubber insert",
      "Versatile enough for office and weekend",
    ],
    description:
      "Mango delivers runway aesthetics at real-world prices with this polished penny loafer. The rich cognac leather develops a gorgeous patina over time, while the classic silhouette keeps it forever relevant.",
    aspectRatio: 0.88,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-22",
    title: "& Other Stories Leather Platform Sandal",
    brand: "& Other Stories",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
      alt: "& Other Stories leather platform sandal in cream with chunky sole",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1200&q=80",
        alt: "& Other Stories leather platform sandal in cream with chunky sole",
      },
      {
        url: "https://images.unsplash.com/photo-1612681621150-a67e5fb3e803?w=1200&q=80",
        alt: "& Other Stories sandal showing padded crossover straps",
      },
    ],
    price: { min: 8900, max: 11900, currency: "USD" },
    rating: { average: 4.3, count: 560 },
    buyUrl: "https://www.stories.com/en_usd/shoes/sandals.html",
    topFeatures: [
      "Soft leather crossover straps",
      "Chunky platform sole for height without heel pitch",
      "Adjustable buckle at ankle",
      "Leather-lined footbed with cushioning",
    ],
    description:
      "The platform sandal that dominated fashion TikTok. & Other Stories nails the balance between trending and timeless with this sculptural leather sandal that adds inches without sacrificing walkability.",
    aspectRatio: 1.55,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-23",
    title: "Nike Air Force 1 '07",
    brand: "Nike",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80",
      alt: "Nike Air Force 1 '07 in triple white leather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=1200&q=80",
        alt: "Nike Air Force 1 '07 in triple white leather",
      },
      {
        url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=1200&q=80",
        alt: "Nike Air Force 1 showing encapsulated Air cushioning and pivot traction",
      },
      {
        url: "https://images.unsplash.com/photo-1580480055002-4ecc3f78f50b?w=1200&q=80",
        alt: "Nike Air Force 1 '07 side profile showing chunky midsole",
      },
    ],
    price: { min: 11000, max: 12000, currency: "USD" },
    rating: { average: 4.8, count: 4990 },
    buyUrl: "https://www.nike.com/t/air-force-1-07-mens-shoes/CW2288-111",
    topFeatures: [
      "Full-grain leather upper with perforated toe box",
      "Encapsulated Nike Air cushioning unit",
      "Non-marking pivot-point rubber outsole",
      "Foam midsole for lightweight comfort",
      "Padded collar for ankle support",
    ],
    description:
      "The shoe that needs no introduction. Since 1982, the Air Force 1 has been the undisputed king of street culture. The triple-white '07 is the blank canvas that launched a million outfits and will launch a million more.",
    aspectRatio: 0.92,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-24",
    title: "Adidas Gazelle",
    brand: "Adidas",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1612681621150-a67e5fb3e803?w=600&q=80",
      alt: "Adidas Gazelle in collegiate navy suede with white stripes",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1612681621150-a67e5fb3e803?w=1200&q=80",
        alt: "Adidas Gazelle in collegiate navy suede with white stripes",
      },
      {
        url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1200&q=80",
        alt: "Adidas Gazelle showing pigskin suede and gold foil tongue logo",
      },
    ],
    price: { min: 10000, max: 11000, currency: "USD" },
    rating: { average: 4.7, count: 3740 },
    buyUrl: "https://www.adidas.com/us/gazelle-shoes/BB5478.html",
    topFeatures: [
      "Premium pigskin suede upper",
      "Contrast leather Three Stripes",
      "Trefoil-embossed rubber outsole",
      "Gold foil branding on tongue",
      "EVA midsole for streamlined cushioning",
    ],
    description:
      "The Adidas Gazelle is the terrace culture icon that refuses to fade. First laced up in 1966, its suede upper and low-slung profile have been adopted by everyone from Britpop bands to fashion editors. Always relevant, never trying too hard.",
    aspectRatio: 1.12,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-25",
    title: "New Balance 2002R",
    brand: "New Balance",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&q=80",
      alt: "New Balance 2002R in rain cloud grey with mesh and suede panels",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=1200&q=80",
        alt: "New Balance 2002R in rain cloud grey with mesh and suede panels",
      },
      {
        url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=1200&q=80",
        alt: "New Balance 2002R showing N-ERGY and ABZORB cushioning technology",
      },
      {
        url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=1200&q=80",
        alt: "New Balance 2002R medial side with layered paneling detail",
      },
    ],
    price: { min: 13999, max: 16999, currency: "USD" },
    rating: { average: 4.6, count: 2890 },
    buyUrl: "https://www.newbalance.com/pd/2002r/ML2002R.html",
    topFeatures: [
      "Pig suede and mesh upper with layered paneling",
      "N-ERGY cushioning at forefoot and heel",
      "ABZORB midsole for impact absorption",
      "Blown rubber outsole for durability",
      "Protective toe bumper",
    ],
    description:
      "The 2002R resurrects New Balance's early-2000s running tech with a pre-aged aesthetic that looks like it's been in your closet for years — in the best way. Dual cushioning systems make it a sneaker you can actually run errands in all day.",
    aspectRatio: 0.76,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-26",
    title: "The Row Billie Sneaker",
    brand: "The Row",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1580480055002-4ecc3f78f50b?w=600&q=80",
      alt: "The Row Billie low-top sneaker in off-white Nappa leather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1580480055002-4ecc3f78f50b?w=1200&q=80",
        alt: "The Row Billie low-top sneaker in off-white Nappa leather",
      },
      {
        url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&q=80",
        alt: "The Row Billie sneaker showing hand-stitched detail and zero branding",
      },
    ],
    price: { min: 79000, max: 95000, currency: "USD" },
    rating: { average: 4.8, count: 420 },
    buyUrl: "https://www.therow.com/us/shoes/sneakers",
    topFeatures: [
      "Italian Nappa leather with no visible branding",
      "Hand-stitched construction in Marche, Italy",
      "Natural rubber cupsole in tonal cream",
      "Ultra-minimal silhouette for quiet luxury",
    ],
    description:
      "The Row's Billie is what happens when a $900 sneaker actually justifies the price. Hand-stitched Italian Nappa leather, zero logos, and a shape so clean it makes every other white sneaker look overdone. Stealth wealth, foot edition.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-27",
    title: "Birkenstock Arizona Soft Footbed",
    brand: "Birkenstock",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80",
      alt: "Birkenstock Arizona two-strap sandal in oiled leather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1200&q=80",
        alt: "Birkenstock Arizona two-strap sandal in oiled leather",
      },
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
        alt: "Birkenstock Arizona showing contoured cork footbed and dual buckles",
      },
    ],
    price: { min: 14500, max: 16000, currency: "USD" },
    rating: { average: 4.8, count: 4670 },
    buyUrl: "https://www.birkenstock.com/us/arizona-oiled-leather/arizona-oiledleather.html",
    topFeatures: [
      "Oiled Nubuck leather straps with adjustable buckles",
      "Soft footbed with extra cushion layer",
      "Suede-lined contoured cork-latex footbed",
      "EVA sole for shock absorption",
      "Anatomically shaped arch support",
    ],
    description:
      "The sandal that conquered fashion by refusing to compromise on comfort. Birkenstock's Arizona Soft Footbed adds an extra layer of cushion to the legendary cork base, delivering a walking-on-clouds feel that converted a generation of skeptics.",
    aspectRatio: 1.48,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-28",
    title: "Nike Dunk Low Retro",
    brand: "Nike",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80",
      alt: "Nike Dunk Low Retro in panda black and white colorway",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=1200&q=80",
        alt: "Nike Dunk Low Retro in panda black and white colorway",
      },
      {
        url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80",
        alt: "Nike Dunk Low Retro showing padded collar and perforated toe",
      },
    ],
    price: { min: 11000, max: 12500, currency: "USD" },
    rating: { average: 4.7, count: 4230 },
    buyUrl: "https://www.nike.com/t/dunk-low-retro-mens-shoes/DD1391-100",
    topFeatures: [
      "Full leather upper with color-blocked overlays",
      "Padded low-cut collar for comfort",
      "Foam midsole for responsive cushioning",
      "Rubber cupsole with classic pivot traction",
      "Perforated toe for breathability",
    ],
    description:
      "Born on college basketball courts in 1985, the Dunk Low became the most hyped sneaker of the 2020s. The Panda colorway is the modern go-to — bold enough to make a statement, clean enough to wear every day.",
    aspectRatio: 0.83,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-29",
    title: "Common Projects BBall Low",
    brand: "Common Projects",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
      alt: "Common Projects BBall Low in white with contrasting black sole",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=1200&q=80",
        alt: "Common Projects BBall Low in white with contrasting black sole",
      },
      {
        url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&q=80",
        alt: "Common Projects BBall Low showing retro basketball paneling",
      },
    ],
    price: { min: 46500, max: 49500, currency: "USD" },
    rating: { average: 4.5, count: 980 },
    buyUrl: "https://www.commonprojects.com/products/bball-low-white-black",
    topFeatures: [
      "Italian Nappa leather with retro paneling",
      "Gold-stamped serial number on heel",
      "Margom sole with contrasting outsole",
      "Hand-finished in Italy",
    ],
    description:
      "Common Projects' BBall Low offers a sportier alternative to the Achilles, with vintage basketball-inspired paneling that adds visual depth without sacrificing the brand's signature minimalism. The gold serial number remains the only branding you need.",
    aspectRatio: 1.18,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "shoes-30",
    title: "Veja Recife Logo Sneaker",
    brand: "Veja",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
      alt: "Veja Recife velcro sneaker in white with green V logo",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&q=80",
        alt: "Veja Recife velcro sneaker in white with green V logo",
      },
      {
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
        alt: "Veja Recife showing triple velcro straps and wild rubber sole",
      },
    ],
    price: { min: 13500, max: 15500, currency: "USD" },
    rating: { average: 4.4, count: 1240 },
    buyUrl: "https://www.veja-store.com/en_us/recife-logo-chromefree-leather-extra-white-emeraude.html",
    topFeatures: [
      "ChromeFree leather upper — zero chrome processing",
      "Triple velcro strap closure for easy on/off",
      "Wild rubber sole from Amazon rubber tappers",
      "Organic cotton lining and insole",
      "B Corp certified brand",
    ],
    description:
      "Veja's Recife brings the environmental ethos into a retro velcro silhouette that's as fun to wear as it is to look at. The triple-strap design adds personality, while ChromeFree leather and wild rubber keep the planet in mind.",
    aspectRatio: 0.65,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
];
