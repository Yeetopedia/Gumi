import { Product } from "@/types";
import { getRandomGumiFriends } from "../mock-users";

function rg(): number {
  const r = [[50,500],[500,5000],[5000,50000],[50000,500000]];
  const x = r[Math.floor(Math.random()*r.length)];
  return Math.floor(Math.random()*(x[1]-x[0])+x[0]);
}
function rs(): number { return Math.floor(Math.random()*2000)+10; }

export const OUTDOORS_PRODUCTS: Product[] = [
  {
    id: "outdoors-1",
    title: "Wide Mouth Insulated Water Bottle 32oz",
    brand: "Hydro Flask",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
      alt: "Hydro Flask insulated water bottle in alpine green on rocky trail",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80",
        alt: "Hydro Flask insulated water bottle in alpine green on rocky trail",
      },
      {
        url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&q=80",
        alt: "Water bottle close-up showing double-wall vacuum insulation cap",
      },
    ],
    price: { min: 3495, max: 4495, currency: "USD" },
    rating: { average: 4.7, count: 4210 },
    buyUrl: "https://hydroflask.com",
    topFeatures: [
      "TempShield double-wall vacuum insulation",
      "Keeps drinks cold 24 hours, hot 12 hours",
      "BPA-free 18/8 stainless steel",
      "Powder-coated for grip and durability",
    ],
    description:
      "The bottle that launched a thousand trail selfies. Hydro Flask's 32oz wide mouth keeps ice frozen through a full day hike and doubles as a camp kitchen staple.",
    aspectRatio: 0.68,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-2",
    title: "Better Sweater Recycled Fleece Jacket",
    brand: "Patagonia",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80",
      alt: "Patagonia recycled fleece jacket in natural tan layered for cool weather",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&q=80",
        alt: "Patagonia recycled fleece jacket in natural tan layered for cool weather",
      },
      {
        url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
        alt: "Close-up of fleece texture showing soft recycled polyester knit",
      },
    ],
    price: { min: 10900, max: 13900, currency: "USD" },
    rating: { average: 4.6, count: 3870 },
    buyUrl: "https://patagonia.com",
    topFeatures: [
      "100% recycled polyester fleece",
      "Sweater-knit face with fleece interior",
      "Raglan sleeves for layering",
      "Zippered handwarmer pockets",
      "Fair Trade Certified sewn",
    ],
    description:
      "Patagonia's best-selling fleece looks polished enough for the coffee shop but performs on the mountain. Made entirely from recycled polyester, it's warm proof that sustainability doesn't sacrifice comfort.",
    aspectRatio: 0.78,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-3",
    title: "The Carry-On Aluminum Edition",
    brand: "Away",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
      alt: "Sleek aluminum carry-on suitcase standing in airport terminal",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
        alt: "Sleek aluminum carry-on suitcase standing in airport terminal",
      },
      {
        url: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=1200&q=80",
        alt: "Carry-on interior showing compression pad and organization pockets",
      },
      {
        url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200&q=80",
        alt: "Travel suitcase rolling through hotel lobby",
      },
    ],
    price: { min: 47500, max: 49500, currency: "USD" },
    rating: { average: 4.5, count: 1920 },
    buyUrl: "https://awaytravel.com",
    topFeatures: [
      "Anodized aluminum shell",
      "Leather-wrapped handles",
      "TSA-approved combination lock",
      "360° spinner wheels",
      "Interior compression system",
    ],
    description:
      "Away's aluminum carry-on is the suitcase frequent flyers never check. The unibody shell laughs at overhead bin abuse while the interior compression system fits a week into a weekend bag.",
    aspectRatio: 0.85,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-4",
    title: "Packing Cube Set — 5-Piece",
    brand: "Peak Design",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&q=80",
      alt: "Set of neatly organized packing cubes in various sizes on bed",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=1200&q=80",
        alt: "Set of neatly organized packing cubes in various sizes on bed",
      },
      {
        url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200&q=80",
        alt: "Packing cubes loaded into carry-on suitcase for travel",
      },
    ],
    price: { min: 5995, max: 7995, currency: "USD" },
    rating: { average: 4.8, count: 1540 },
    buyUrl: "https://peakdesign.com",
    topFeatures: [
      "100% recycled nylon ripstop",
      "Tear-away zipper for quick access",
      "5 sizes from small to extra-large",
      "Lays flat for easy packing",
    ],
    description:
      "Peak Design's packing cubes compress chaos into order. The tear-away zippers let you grab what you need without dismantling your entire suitcase, and the recycled nylon is nearly indestructible.",
    aspectRatio: 1.25,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-5",
    title: "Titanium Single Wall Mug 450ml",
    brand: "Snow Peak",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&q=80",
      alt: "Snow Peak titanium camping mug next to campfire under stars",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200&q=80",
        alt: "Snow Peak titanium camping mug next to campfire under stars",
      },
      {
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
        alt: "Camping scene with titanium cookware on portable stove",
      },
    ],
    price: { min: 3475, max: 4275, currency: "USD" },
    rating: { average: 4.8, count: 890 },
    buyUrl: "https://snowpeak.com",
    topFeatures: [
      "Ultra-lightweight titanium construction",
      "Foldable handles lock into place",
      "Direct-flame safe for heating water",
      "Nests with Snow Peak cookware system",
    ],
    description:
      "At just 2.8 ounces, this titanium mug is barely there in your pack but completely transforms camp mornings. Heat water directly over a flame, sip your coffee, and rinse — the ultralight trifecta.",
    aspectRatio: 0.92,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-6",
    title: "Nano Puff Packable Puffer Jacket",
    brand: "Patagonia",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
      alt: "Packable puffer jacket in navy stuffed into its own chest pocket",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
        alt: "Packable puffer jacket in navy stuffed into its own chest pocket",
      },
      {
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80",
        alt: "Puffer jacket worn layered over flannel on mountain overlook",
      },
      {
        url: "https://images.unsplash.com/photo-1581553680321-4fffff48f6e4?w=1200&q=80",
        alt: "Hiker wearing puffer jacket on ridgeline trail at dawn",
      },
    ],
    price: { min: 18900, max: 22900, currency: "USD" },
    rating: { average: 4.7, count: 4650 },
    buyUrl: "https://patagonia.com",
    topFeatures: [
      "PrimaLoft Gold Eco insulation",
      "Packs into internal chest pocket",
      "DWR water-repellent finish",
      "Windproof ripstop shell",
      "100% postconsumer recycled polyester",
    ],
    description:
      "The Nano Puff packs down smaller than a paperback and punches way above its weight in warmth. Patagonia's workhorse synthetic layer handles everything from unexpected cold snaps to last-minute red-eye flights.",
    aspectRatio: 0.75,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-7",
    title: "PhD Run Light Elite Micro Socks",
    brand: "Smartwool",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
      alt: "Technical merino hiking socks laid flat showing cushion zones",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80",
        alt: "Technical merino hiking socks laid flat showing cushion zones",
      },
      {
        url: "https://images.unsplash.com/photo-1581553680321-4fffff48f6e4?w=1200&q=80",
        alt: "Trail runner on mountain path with performance socks visible",
      },
    ],
    price: { min: 1995, max: 2395, currency: "USD" },
    rating: { average: 4.6, count: 2780 },
    buyUrl: "https://smartwool.com",
    topFeatures: [
      "Merino wool blend for temperature regulation",
      "Virtually Seamless toe for zero friction",
      "4 Degree elite fit system",
      "Light Elite cushioning underfoot",
    ],
    description:
      "Smartwool's PhD socks are the secret weapon against blisters on long trail days. The merino blend wicks faster than synthetics, regulates heat, and still feels fresh at mile twenty.",
    aspectRatio: 1.15,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-8",
    title: "Original Puffy Blanket",
    brand: "Rumpl",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1581553680321-4fffff48f6e4?w=600&q=80",
      alt: "Rumpl puffy blanket draped over camp chair at sunset campsite",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1581553680321-4fffff48f6e4?w=1200&q=80",
        alt: "Rumpl puffy blanket draped over camp chair at sunset campsite",
      },
      {
        url: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=1200&q=80",
        alt: "Campfire scene with insulated blanket wrapped around shoulders",
      },
      {
        url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
        alt: "Colorful puffy blanket on mountain overlook at golden hour",
      },
    ],
    price: { min: 9900, max: 12900, currency: "USD" },
    rating: { average: 4.7, count: 3210 },
    buyUrl: "https://rumpl.com",
    topFeatures: [
      "Post-consumer recycled polyester shell",
      "Synthetic down insulation",
      "DWR water-resistant treatment",
      "Machine washable",
      "Stuffs into attached cape clip",
    ],
    description:
      "Rumpl turned sleeping bag tech into the only blanket you'll ever want. Whether you're truck-bed stargazing or commandeering the couch, the Original Puffy keeps you wrapped in campfire-level warmth.",
    aspectRatio: 1.35,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-9",
    title: "Ultra-Sil Dry Bag 13L",
    brand: "Sea to Summit",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=600&q=80",
      alt: "Bright waterproof dry bag sealed and clipped to kayak deck",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=1200&q=80",
        alt: "Bright waterproof dry bag sealed and clipped to kayak deck",
      },
      {
        url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
        alt: "Dry bag packed with gear on riverbank before paddling trip",
      },
    ],
    price: { min: 2495, max: 3295, currency: "USD" },
    rating: { average: 4.5, count: 1640 },
    buyUrl: "https://seatosummit.com",
    topFeatures: [
      "30D Ultra-Sil siliconized nylon",
      "Hypalon roll-top closure",
      "Weighs only 1.8 oz",
      "Welded seams for waterproof protection",
    ],
    description:
      "Sea to Summit's Ultra-Sil is the dry bag ultralight backpackers trust with their electronics and down layers. At under two ounces, there's no excuse not to carry bombproof waterproofing.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-10",
    title: "Wash Pouch Travel Toiletry Kit",
    brand: "Fjallraven",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80",
      alt: "Fjallraven travel toiletry pouch in dusk blue with brass hardware",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
        alt: "Fjallraven travel toiletry pouch in dusk blue with brass hardware",
      },
      {
        url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80",
        alt: "Toiletry kit open showing interior pockets and hanging hook",
      },
    ],
    price: { min: 4500, max: 5500, currency: "USD" },
    rating: { average: 4.4, count: 680 },
    buyUrl: "https://fjallraven.com",
    topFeatures: [
      "G-1000 HeavyDuty Eco fabric",
      "Water-resistant waxed finish",
      "Detachable mirror and hanging hook",
      "Multiple interior mesh pockets",
    ],
    description:
      "Fjallraven's Wash Pouch is built from the same rugged G-1000 fabric as their legendary jackets. The hanging hook turns any bathroom door into organized base camp for your travel essentials.",
    aspectRatio: 1.1,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-11",
    title: "Atmos AG 65 Backpacking Pack",
    brand: "Osprey",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
      alt: "Osprey Atmos 65L backpacking pack leaning against alpine rock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80",
        alt: "Osprey Atmos 65L backpacking pack leaning against alpine rock",
      },
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
        alt: "Hiker on trail with fully loaded backpacking pack",
      },
      {
        url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&q=80",
        alt: "Backpack detail showing Anti-Gravity suspension mesh panel",
      },
    ],
    price: { min: 27000, max: 32000, currency: "USD" },
    rating: { average: 4.8, count: 2450 },
    buyUrl: "https://osprey.com",
    topFeatures: [
      "Anti-Gravity suspended mesh backpanel",
      "Fit-on-the-Fly hipbelt adjustment",
      "Integrated raincover included",
      "Stow-on-the-Go trekking pole attachment",
      "All Mighty Guarantee — lifetime repair",
    ],
    description:
      "Osprey's Atmos AG carries 40 pounds like it's 25 thanks to the Anti-Gravity suspension that floats the load off your back. Three-season thru-hikers and weekend warriors swear by it for good reason.",
    aspectRatio: 0.65,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-12",
    title: "Kaha 2 GTX Hiking Boots",
    brand: "Arc'teryx",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      alt: "Gore-Tex hiking boots on rocky mountain trail with valley backdrop",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
        alt: "Gore-Tex hiking boots on rocky mountain trail with valley backdrop",
      },
      {
        url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&q=80",
        alt: "Boot sole detail showing Vibram Megagrip outsole lugs",
      },
    ],
    price: { min: 24000, max: 28000, currency: "USD" },
    rating: { average: 4.7, count: 1120 },
    buyUrl: "https://arcteryx.com",
    topFeatures: [
      "GORE-TEX waterproof membrane",
      "Vibram Megagrip outsole",
      "Full-grain leather upper",
      "EVA midsole with TPU shanks",
      "Zero break-in period",
    ],
    description:
      "Arc'teryx engineered these boots to feel broken-in straight out of the box. The GORE-TEX liner keeps your feet dry through creek crossings while Vibram rubber grips wet granite like velcro.",
    aspectRatio: 1.3,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-13",
    title: "Merino 250 Base Layer Crew",
    brand: "Smartwool",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=600&q=80",
      alt: "Merino wool base layer crew in charcoal heather on wooden hanger",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&q=80",
        alt: "Merino wool base layer crew in charcoal heather on wooden hanger",
      },
      {
        url: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=1200&q=80",
        alt: "Skier wearing merino base layer under shell jacket",
      },
    ],
    price: { min: 8500, max: 10000, currency: "USD" },
    rating: { average: 4.6, count: 3540 },
    buyUrl: "https://smartwool.com",
    topFeatures: [
      "100% Merino wool 250g weight",
      "Naturally odor-resistant",
      "Flatlock seams prevent chafing",
      "Thumb loops for layering",
    ],
    description:
      "The 250-weight sweet spot: warm enough for January summit bids, breathable enough for high-output touring. Merino's natural odor resistance means you can go days without the laundry guilt.",
    aspectRatio: 0.82,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-14",
    title: "Spot 400 Headlamp",
    brand: "Black Diamond",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&q=80",
      alt: "Black Diamond headlamp illuminating campsite under night sky",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=1200&q=80",
        alt: "Black Diamond headlamp illuminating campsite under night sky",
      },
      {
        url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80",
        alt: "Headlamp beam cutting through forest darkness on night hike",
      },
    ],
    price: { min: 3995, max: 4995, currency: "USD" },
    rating: { average: 4.5, count: 4120 },
    buyUrl: "https://blackdiamondequipment.com",
    topFeatures: [
      "400 lumens on max brightness",
      "Red, green, and blue night vision modes",
      "IPX8 waterproof rated",
      "PowerTap dimming technology",
      "Runs on 3 AAA or rechargeable pack",
    ],
    description:
      "Black Diamond's Spot 400 is the headlamp that lives in every serious hiker's lid pocket. PowerTap lets you toggle brightness with a tap, and the red mode preserves your night vision for stargazing.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-15",
    title: "Hopper Flip 18 Soft Cooler",
    brand: "Yeti",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&q=80",
      alt: "Yeti soft cooler packed with ice and drinks at lake shore camp",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80",
        alt: "Yeti soft cooler packed with ice and drinks at lake shore camp",
      },
      {
        url: "https://images.unsplash.com/photo-1527004013197-933c4588cf2d?w=1200&q=80",
        alt: "Cooler detail showing HydroLok zipper and ColdCell insulation",
      },
    ],
    price: { min: 25000, max: 35000, currency: "USD" },
    rating: { average: 4.6, count: 2890 },
    buyUrl: "https://yeti.com",
    topFeatures: [
      "ColdCell closed-cell foam insulation",
      "HydroLok leak-proof zipper",
      "DryHide waterproof shell",
      "Wide-mouth opening for easy loading",
      "Carries 20 cans plus ice",
    ],
    description:
      "Yeti's Hopper Flip turns a day at the river into an all-day affair. The leak-proof HydroLok zipper means you can toss it in the truck bed sideways and still arrive with ice-cold drinks and dry gear.",
    aspectRatio: 1.2,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-16",
    title: "Universal Travel Adapter",
    brand: "Goal Zero",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1527004013197-933c4588cf2d?w=600&q=80",
      alt: "Compact universal travel adapter with multiple plug types extended",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1527004013197-933c4588cf2d?w=1200&q=80",
        alt: "Compact universal travel adapter with multiple plug types extended",
      },
      {
        url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1200&q=80",
        alt: "Travel adapter plugged into wall with phone charging via USB-C",
      },
    ],
    price: { min: 3995, max: 4995, currency: "USD" },
    rating: { average: 4.3, count: 1450 },
    buyUrl: "https://goalzero.com",
    topFeatures: [
      "Works in 200+ countries",
      "Dual USB-C PD ports (30W each)",
      "USB-A quick charge port",
      "Built-in safety shutters",
    ],
    description:
      "One adapter for every outlet on Earth. Goal Zero's universal adapter handles US, EU, UK, and AU plugs while the dual USB-C PD ports charge your laptop and phone simultaneously.",
    aspectRatio: 1.0,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-17",
    title: "Ultralight Single Hammock",
    brand: "Sea to Summit",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&q=80",
      alt: "Camping hammock strung between pine trees at misty lakeside site",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1200&q=80",
        alt: "Camping hammock strung between pine trees at misty lakeside site",
      },
      {
        url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200&q=80",
        alt: "Close-up of hammock suspension straps and buckle system",
      },
      {
        url: "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=1200&q=80",
        alt: "Hammock packed into stuff sack next to water bottle for scale",
      },
    ],
    price: { min: 7995, max: 10995, currency: "USD" },
    rating: { average: 4.7, count: 960 },
    buyUrl: "https://seatosummit.com",
    topFeatures: [
      "15D Parachute nylon fabric",
      "Holds up to 400 lbs",
      "Packs to the size of a grapefruit",
      "Quick-connect buckle suspension included",
      "Weighs only 7.4 oz with straps",
    ],
    description:
      "Sea to Summit shaved every possible gram from this hammock without touching the 400-pound weight rating. At 7.4 ounces with straps, it weighs less than your trail snacks and transforms any two trees into paradise.",
    aspectRatio: 1.45,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-18",
    title: "Crank Multi-Tool Kit",
    brand: "REI Co-op",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&q=80",
      alt: "Compact bike multi-tool with allen keys and chain breaker displayed",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200&q=80",
        alt: "Compact bike multi-tool with allen keys and chain breaker displayed",
      },
      {
        url: "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=1200&q=80",
        alt: "Multi-tool being used for trailside bike repair",
      },
    ],
    price: { min: 2495, max: 3495, currency: "USD" },
    rating: { average: 4.4, count: 720 },
    buyUrl: "https://rei.com",
    topFeatures: [
      "19 functions in one tool",
      "Includes chain breaker and spoke wrench",
      "CNC machined chrome vanadium steel",
      "Compact folding design",
    ],
    description:
      "REI Co-op's bike multi-tool covers every trailside emergency from a thrown chain to a loose headset. Nineteen tools fold into a package that fits in a jersey pocket — ride farther, worry less.",
    aspectRatio: 1.05,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-19",
    title: "Rambler 26oz Stackable Cup",
    brand: "Yeti",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=600&q=80",
      alt: "Yeti Rambler stackable cup in Nordic blue on camp table",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=1200&q=80",
        alt: "Yeti Rambler stackable cup in Nordic blue on camp table",
      },
      {
        url: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1200&q=80",
        alt: "Stackable cups nested together for compact storage",
      },
    ],
    price: { min: 3500, max: 4000, currency: "USD" },
    rating: { average: 4.7, count: 3650 },
    buyUrl: "https://yeti.com",
    topFeatures: [
      "Double-wall vacuum insulation",
      "MagSlider lid included",
      "Stackable design saves space",
      "Dishwasher safe",
    ],
    description:
      "Yeti solved the overlanding cup problem — the Rambler 26oz stacks neatly when you're packing out and keeps your cold brew glacial for hours when you're not. The MagSlider lid is splash-proof for washboard roads.",
    aspectRatio: 0.72,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-20",
    title: "Cotopaxi Del Día Batac 16L Daypack",
    brand: "Cotopaxi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=600&q=80",
      alt: "Colorful one-of-a-kind Cotopaxi daypack made from remnant fabrics",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1200&q=80",
        alt: "Colorful one-of-a-kind Cotopaxi daypack made from remnant fabrics",
      },
      {
        url: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=1200&q=80",
        alt: "Del Día pack showing unique color-block pattern from repurposed materials",
      },
      {
        url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80",
        alt: "Daypack worn on sunny trail hike through desert canyon",
      },
    ],
    price: { min: 5500, max: 7500, currency: "USD" },
    rating: { average: 4.5, count: 1830 },
    buyUrl: "https://cotopaxi.com",
    topFeatures: [
      "One-of-a-kind Del Día colorway",
      "Made from remnant factory fabrics",
      "16L perfect for day hikes and commutes",
      "Padded laptop sleeve",
      "B Corp and Climate Neutral certified",
    ],
    description:
      "Every Del Día Batac is unique because each one is sewn from leftover fabrics that would otherwise go to waste. Cotopaxi gives their makers creative freedom, so no two packs look the same — sustainable style you literally cannot copy.",
    aspectRatio: 0.78,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-21",
    title: "Venture 75 Solar Panel Kit",
    brand: "Goal Zero",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=600&q=80",
      alt: "Portable solar panel deployed at base camp with mountain backdrop",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=1200&q=80",
        alt: "Portable solar panel deployed at base camp with mountain backdrop",
      },
      {
        url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80",
        alt: "Solar panel connected to power station charging devices off-grid",
      },
    ],
    price: { min: 19995, max: 24995, currency: "USD" },
    rating: { average: 4.4, count: 560 },
    buyUrl: "https://goalzero.com",
    topFeatures: [
      "75W monocrystalline panel",
      "Foldable briefcase design",
      "Built-in kickstand for angle adjustment",
      "USB-C and 8mm output ports",
      "Charges Yeti power stations directly",
    ],
    description:
      "Goal Zero's Venture 75 unfolds into a serious power station on any sunny ridge. The monocrystalline cells squeeze maximum wattage from even overcast skies, keeping your devices and camp lights running indefinitely.",
    aspectRatio: 1.4,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-22",
    title: "Classic Everyday Backpack 20L",
    brand: "Herschel",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80",
      alt: "Herschel classic backpack in forest green with leather bottom panel",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80",
        alt: "Herschel classic backpack in forest green with leather bottom panel",
      },
      {
        url: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?w=1200&q=80",
        alt: "Backpack interior showing padded laptop sleeve and organizer pockets",
      },
    ],
    price: { min: 6999, max: 8999, currency: "USD" },
    rating: { average: 4.5, count: 4850 },
    buyUrl: "https://herschel.com",
    topFeatures: [
      "Signature striped fabric liner",
      "Padded 15-inch laptop sleeve",
      "Reinforced leather-look bottom panel",
      "Front pocket with key clip",
    ],
    description:
      "Herschel's Classic has the timeless silhouette of a heritage rucksack with the modern guts for daily carry. The padded laptop sleeve and internal organizers mean it transitions from commute to weekend trip without missing a beat.",
    aspectRatio: 0.88,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-23",
    title: "Kanken Original Backpack",
    brand: "Fjallraven",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?w=600&q=80",
      alt: "Fjallraven Kanken backpack in iconic Frost Green with red handles",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?w=1200&q=80",
        alt: "Fjallraven Kanken backpack in iconic Frost Green with red handles",
      },
      {
        url: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=1200&q=80",
        alt: "Kanken shown open from top revealing spacious main compartment",
      },
      {
        url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=80",
        alt: "Kanken backpack carried on trail through Swedish birch forest",
      },
    ],
    price: { min: 8000, max: 11000, currency: "USD" },
    rating: { average: 4.6, count: 5000 },
    buyUrl: "https://fjallraven.com",
    topFeatures: [
      "Vinylon F water-resistant fabric",
      "Dual carry — backpack or handles",
      "Removable foam seat pad",
      "Wide opening for easy packing",
      "Designed in Sweden since 1978",
    ],
    description:
      "The Kanken was designed in 1978 to save Swedish schoolchildren's backs and it's still going strong. The boxy silhouette and Vinylon F fabric have become iconic — equal parts practical and impossibly cool.",
    aspectRatio: 0.95,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-24",
    title: "PocketRocket Deluxe Backpacking Stove",
    brand: "MSR",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=600&q=80",
      alt: "MSR PocketRocket stove with pot boiling water at alpine camp",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=1200&q=80",
        alt: "MSR PocketRocket stove with pot boiling water at alpine camp",
      },
      {
        url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=80",
        alt: "Compact stove disassembled next to fuel canister and mug",
      },
    ],
    price: { min: 5495, max: 6495, currency: "USD" },
    rating: { average: 4.8, count: 3280 },
    buyUrl: "https://msrgear.com",
    topFeatures: [
      "Boils 1L in 3.5 minutes",
      "Weighs only 2.9 oz",
      "Pressure regulator for consistent flame",
      "Wind-resistant burner design",
      "Folds into a 2-inch puck",
    ],
    description:
      "MSR's PocketRocket Deluxe is the stove that made canister cooking mainstream. The pressure regulator maintains a steady flame even when the canister runs low, and the whole thing folds smaller than a hockey puck.",
    aspectRatio: 1.55,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
  {
    id: "outdoors-25",
    title: "Nalgene Wide Mouth Sustain 32oz",
    brand: "Nalgene",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80",
      alt: "Nalgene wide mouth water bottle in retro teal clipped to pack",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=80",
        alt: "Nalgene wide mouth water bottle in retro teal clipped to pack",
      },
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80",
        alt: "Nalgene bottle with measurement markings visible through clear body",
      },
    ],
    price: { min: 1299, max: 1599, currency: "USD" },
    rating: { average: 4.7, count: 4900 },
    buyUrl: "https://nalgene.com",
    topFeatures: [
      "Made from 50% certified recycled Tritan",
      "BPA/BPS-free and dishwasher safe",
      "Wide mouth fits ice cubes",
      "Virtually indestructible",
      "Graduated measurement markings",
    ],
    description:
      "The Nalgene is the cockroach of water bottles — it simply will not die. Now made from 50% recycled Tritan plastic, the wide mouth fits ice and a water filter alike. There's a reason every national park gift shop stocks them.",
    aspectRatio: 0.7,
    gumis: rg(),
    shares: rs(),
    gumiedByFriends: getRandomGumiFriends(),
  },
];
