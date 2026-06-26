// ===================================================================
// GHARRAT product data layer.
// Architected so new categories (Tea, Rajma, Turmeric, Gift Boxes)
// can be added without touching component code — just append here.
// ===================================================================

export const categories = [
  {
    slug: "honey",
    name: "Honey",
    tagline: "Raw, single-origin honey from Kangra Valley",
    live: true,
  },
  {
    slug: "tea",
    name: "Tea",
    tagline: "High-altitude leaf, hand-picked",
    live: false,
  },
  {
    slug: "rajma",
    name: "Rajma",
    tagline: "Heirloom mountain kidney beans",
    live: false,
  },
  {
    slug: "turmeric",
    name: "Turmeric",
    tagline: "Stone-ground Himalayan haldi",
    live: false,
  },
  {
    slug: "gifting",
    name: "Gift Boxes",
    tagline: "Curated sets for thoughtful giving",
    live: false,
  },
];

export const products = [
  {
    id: "raw-himalayan-honey",
    slug: "raw-himalayan-honey",
    category: "honey",
    name: "Raw Himalayan Honey",
    shortDescription:
      "Unprocessed, single-origin honey from the multi-floral forests of Kangra Valley.",
    description:
      "Drawn from hives kept in the forests above Kangra Valley, this honey is never heated, never filtered fine, and never blended. What you get is what the bees made — shaped by whichever wildflowers were in bloom that season. It crystallises naturally, the way raw honey does, and softens again with a little warmth. Each batch is small, traceable to the apiary it came from, and bottled close to where it's harvested.",
    rating: 4.8,
    reviewCount: 312,
    badges: ["Raw & Unprocessed", "Single Origin", "Small Batch"],
    benefits: [
      {
        title: "Raw and unprocessed",
        text: "Never heated above hive temperature, so natural enzymes and pollen stay intact.",
      },
      {
        title: "Sustainably sourced",
        text: "Harvested in rotation with the bees' own cycles, never stripping a hive bare.",
      },
      {
        title: "Rich floral diversity",
        text: "Multi-floral forage from Kangra's forests gives each batch its own character.",
      },
      {
        title: "Small-batch production",
        text: "Bottled in limited runs, traceable to the apiary and the season it came from.",
      },
    ],
    variants: [
      { id: "250g", label: "250g", price: 399, comparePrice: 449, stock: 42 },
      { id: "500g", label: "500g", price: 699, comparePrice: 799, stock: 35 },
      { id: "1kg", label: "1kg", price: 1249, comparePrice: 1399, stock: 18 },
    ],
    images: ["honey-1", "honey-2", "honey-3", "honey-4"],
    origin: "Kangra Valley, Himachal Pradesh",
    harvest: "Spring & Autumn flow",
    batchPassport: {
      batchCode: "GH-KV-2025-A7",
      apiary: "Tilak Raj's apiary, Baijnath forests",
      beekeeper: "Tilak Raj",
      altitude: "1,340m above sea level",
      harvestDate: "March – April 2025",
      floralSource: "Wild rhododendron, plum blossom, wildflower mix",
      extraction: "Cold-extracted, coarse-strained only",
      bottledAt: "Palampur, Kangra Valley",
      jarCount: 214,
    },
    nutrition: {
      servingSize: "1 tbsp (21g)",
      calories: 64,
      carbs: "17g",
      sugars: "17g",
      protein: "0.1g",
    },
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug) {
  return products.filter((p) => p.category === categorySlug);
}
