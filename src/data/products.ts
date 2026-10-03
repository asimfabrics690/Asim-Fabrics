export interface Product {
  id: string;
  name: string;
  category:
    | 'Single Bedsheets'
    | 'Double Bedsheets'
    | 'King Size Bedsheets'
    | 'Cotton Fabric'
    | 'Printed Fabric'
    | 'Home Textile Articles'
    | 'Home Decor Products';
  price: number; // PKR
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  quality: string; // e.g. "Export Quality Cotton 76×68"
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  threadDensity: string; // "76×68 Cotton"
  image: string;
  alternateImages?: string[];
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  wholesaleEligible: boolean;
  wholesaleMinQty?: number;
  wholesalePrice?: number;
  availableSizes?: string[];
  colors?: { name: string; hex: string }[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: string;
  featuredBadge?: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'king-bedsheets',
    name: 'King Size Bedsheets',
    slug: 'king-size-bedsheets',
    description: 'Grand master suite bedding crafted from fine 76×68 combed export cotton with matching pillowcases.',
    itemCount: 18,
    image: '/src/assets/images/product_maroon_jacquard_set_1791034172611.jpg',
    featuredBadge: 'Most Popular',
  },
  {
    id: 'double-bedsheets',
    name: 'Double Bedsheets',
    slug: 'double-bedsheets',
    description: 'Balanced comfort & daily durability for guest rooms and family suites in contemporary prints.',
    itemCount: 24,
    image: '/src/assets/images/category_bedsheets_showcase_1791034139014.jpg',
  },
  {
    id: 'single-bedsheets',
    name: 'Single Bedsheets',
    slug: 'single-bedsheets',
    description: 'Crisp, breathable pure cotton single bedsheets tailored for youth bedrooms and hostels.',
    itemCount: 14,
    image: '/src/assets/images/category_bedsheets_showcase_1791034139014.jpg',
  },
  {
    id: 'cotton-fabric',
    name: 'Cotton Fabric',
    slug: 'cotton-fabric',
    description: 'Certified 76×68 greige & dyed export quality cotton rolls sold per meter or bulk commercial bolts.',
    itemCount: 32,
    image: '/src/assets/images/category_cotton_fabric_rolls_1791034153002.jpg',
    featuredBadge: 'Wholesale Ready',
  },
  {
    id: 'printed-fabric',
    name: 'Printed Fabric',
    slug: 'printed-fabric',
    description: 'Colorfast reactive rotary prints featuring heritage motifs, floral vines, and contemporary geometrics.',
    itemCount: 26,
    image: '/src/assets/images/category_cotton_fabric_rolls_1791034153002.jpg',
  },
  {
    id: 'home-textile-articles',
    name: 'Home Textile Articles',
    slug: 'home-textile-articles',
    description: 'Quilted bedcovers, lightweight dohars, plush duvet shells, and luxury waffle blankets.',
    itemCount: 16,
    image: '/src/assets/images/hero_luxury_bedroom_1791034123929.jpg',
  },
  {
    id: 'home-decor',
    name: 'Home Decor Products',
    slug: 'home-decor-products',
    description: 'Embroidered decorative cushion covers, luxury table runners, and artisanal linen drapery.',
    itemCount: 19,
    image: '/src/assets/images/product_maroon_jacquard_set_1791034172611.jpg',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'af-k01',
    name: 'Royal Maroon Embroidered King Bedset',
    category: 'King Size Bedsheets',
    price: 4950,
    originalPrice: 6200,
    rating: 4.9,
    reviewsCount: 142,
    quality: 'Export Quality Cotton 76×68',
    description:
      'Our flagship master suite bedset crafted in royal deep maroon with gold corded embroidery borders. Made with authentic 76×68 combed cotton construction for unmatched softness and year-round breathability.',
    features: [
      '100% Fine Combed Cotton',
      'Certified 76×68 Thread Density',
      'Includes 1 King Sheet + 2 Pillow Shams',
      'Colorfast Reactive Dyeing',
      'Mercerized Silk-Smooth Finish',
    ],
    dimensions: 'King Sheet: 96" × 102" | 2 Pillow Covers: 19" × 29"',
    material: '100% Export Grade Cotton',
    threadDensity: '76×68 Export Standard',
    image: '/src/assets/images/product_maroon_jacquard_set_1791034172611.jpg',
    alternateImages: [
      '/src/assets/images/hero_luxury_bedroom_1791034123929.jpg',
      '/src/assets/images/category_bedsheets_showcase_1791034139014.jpg',
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 25,
    wholesalePrice: 3800,
    availableSizes: ['King Size (96"x102")', 'Super King (108"x108")'],
    colors: [
      { name: 'Royal Maroon', hex: '#6B001A' },
      { name: 'Champagne Beige', hex: '#EFE7DA' },
      { name: 'Warm Ivory', hex: '#F8F5EF' },
    ],
  },
  {
    id: 'af-d02',
    name: 'Ivory Floral Heritage Double Bedsheet',
    category: 'Double Bedsheets',
    price: 3650,
    originalPrice: 4500,
    rating: 4.8,
    reviewsCount: 88,
    quality: 'Export Quality Cotton 76×68',
    description:
      'Warm ivory canvas embellished with intricate heritage botanicals and subtle gold piping. Breathable everyday luxury designed to stay soft after hundreds of wash cycles.',
    features: [
      'High Thread Density 76×68',
      'Includes 1 Flat Double Sheet + 2 Pillowcases',
      'Pre-shrunk fabric construction',
      'Non-pilling and anti-wrinkle weave',
    ],
    dimensions: 'Double Sheet: 90" × 95" | 2 Pillow Covers: 19" × 29"',
    material: '100% Export Quality Cotton',
    threadDensity: '76×68 Pure Cotton',
    image: '/src/assets/images/category_bedsheets_showcase_1791034139014.jpg',
    alternateImages: [
      '/src/assets/images/hero_luxury_bedroom_1791034123929.jpg',
      '/src/assets/images/product_maroon_jacquard_set_1791034172611.jpg',
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 30,
    wholesalePrice: 2850,
    availableSizes: ['Double Size (90"x95")', 'Queen Size (90"x100")'],
    colors: [
      { name: 'Warm Ivory', hex: '#F8F5EF' },
      { name: 'Soft Sage', hex: '#8F9779' },
      { name: 'Deep Maroon', hex: '#6B001A' },
    ],
  },
  {
    id: 'af-s03',
    name: 'Classic Crisp Pure Cotton Single Bedsheet',
    category: 'Single Bedsheets',
    price: 2450,
    originalPrice: 3100,
    rating: 4.7,
    reviewsCount: 64,
    quality: 'Export Quality Cotton 76×68',
    description:
      'Engineered for everyday durability and restorative sleep. Our single bedsheet offers crisp hotel-quality softness woven with 76×68 cotton threads.',
    features: [
      'Export Quality 76×68 Cotton',
      'Includes 1 Single Flat Sheet + 1 Pillowcase',
      'Hypoallergenic & skin-friendly finish',
      'Reinforced double-stitched hems',
    ],
    dimensions: 'Single Sheet: 60" × 95" | 1 Pillow Cover: 19" × 29"',
    material: '100% Cotton Weave',
    threadDensity: '76×68 Export Standard',
    image: '/src/assets/images/category_bedsheets_showcase_1791034139014.jpg',
    alternateImages: ['/src/assets/images/product_maroon_jacquard_set_1791034172611.jpg'],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 50,
    wholesalePrice: 1900,
    availableSizes: ['Single Size (60"x95")'],
    colors: [
      { name: 'Champagne Beige', hex: '#EFE7DA' },
      { name: 'Warm Ivory', hex: '#F8F5EF' },
      { name: 'Charcoal Grey', hex: '#2A2A2A' },
    ],
  },
  {
    id: 'af-cf04',
    name: '76×68 Export Cotton Fabric (Per Meter / Roll)',
    category: 'Cotton Fabric',
    price: 680, // PKR per meter
    originalPrice: 850,
    rating: 5.0,
    reviewsCount: 210,
    quality: 'Export Quality Cotton 76×68',
    description:
      'Direct mill-woven export quality 76×68 cotton fabric. Ideal for tailored bedding, hospitality linen, and home upholstery projects. Available in retail cut meterage and wholesale 100-meter commercial rolls.',
    features: [
      'Standard 76×68 Warp & Weft Density',
      'Width: 96-Inch Extra-Wide Seamless Loom',
      'Pre-washed and calendared',
      'High tensile strength & zero chemical odor',
      'Direct mill wholesale pricing available',
    ],
    dimensions: 'Width: 96 inches (Seamless) | Sold per meter or per roll',
    material: '100% Raw/Dyed Pakistani Cotton',
    threadDensity: '76×68 Precision Weave',
    image: '/src/assets/images/category_cotton_fabric_rolls_1791034153002.jpg',
    alternateImages: [
      '/src/assets/images/textile_craftsmanship_workshop_1791034188258.jpg',
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 100, // meters
    wholesalePrice: 490, // PKR per meter
    availableSizes: ['Per Meter (Cut Length)', '50 Meter Bolt', '100 Meter Full Roll'],
    colors: [
      { name: 'Natural Greige', hex: '#E7CF9B' },
      { name: 'Bleached White', hex: '#FFFFFF' },
      { name: 'Deep Maroon', hex: '#6B001A' },
      { name: 'Luxury Gold', hex: '#D4B36A' },
    ],
  },
  {
    id: 'af-pf05',
    name: 'Artisan Rotary Printed Cotton Fabric (Gold & Maroon)',
    category: 'Printed Fabric',
    price: 790,
    originalPrice: 980,
    rating: 4.9,
    reviewsCount: 95,
    quality: 'Export Quality Cotton 76×68',
    description:
      'High-definition rotary screen printed cotton featuring ASIM FABRICS signature geometric fretwork and floral arabesques in rich maroon and luxury gold accents.',
    features: [
      'Reactive rotary printing (wash-fast guaranteed)',
      '76×68 cotton construction',
      'Smooth drape and tactile softness',
      'Export grade finishing for curtains and bed covers',
    ],
    dimensions: 'Width: 94 inches | Sold per meter',
    material: '100% Cotton Printed Fabric',
    threadDensity: '76×68 Export Standard',
    image: '/src/assets/images/category_cotton_fabric_rolls_1791034153002.jpg',
    alternateImages: [
      '/src/assets/images/category_bedsheets_showcase_1791034139014.jpg',
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 50,
    wholesalePrice: 580,
    availableSizes: ['Per Meter', '25 Meter Roll', '100 Meter Roll'],
    colors: [
      { name: 'Maroon & Gold Print', hex: '#6B001A' },
      { name: 'Ivory Floral', hex: '#F8F5EF' },
    ],
  },
  {
    id: 'af-ht06',
    name: 'Luxury Quilted Master Quilt & Sham Ensemble',
    category: 'Home Textile Articles',
    price: 8850,
    originalPrice: 11200,
    rating: 4.9,
    reviewsCount: 74,
    quality: 'Export Quality Cotton 76×68 Outer',
    description:
      'Plush, cloud-soft quilted bedcover filled with micro-fine conjugated siliconized fiber, encased in breathable 76×68 cotton fabric with ornate cross-stitch border motifs.',
    features: [
      'Outer Fabric: 76×68 Combed Cotton',
      'Filling: 350 GSM Hypoallergenic Microfiber',
      'Includes 1 Quilted Bedcover + 2 Matching Quilted Shams',
      'Box-stitch construction prevents filling displacement',
    ],
    dimensions: 'King Quilt: 98" × 104" | 2 Pillow Shams: 20" × 30"',
    material: '100% Cotton Shell with Microfiber Core',
    threadDensity: '76×68 Shell Fabric',
    image: '/src/assets/images/hero_luxury_bedroom_1791034123929.jpg',
    alternateImages: [
      '/src/assets/images/product_maroon_jacquard_set_1791034172611.jpg',
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 15,
    wholesalePrice: 6900,
    availableSizes: ['King Size (98"x104")'],
    colors: [
      { name: 'Deep Maroon Velvet Border', hex: '#6B001A' },
      { name: 'Champagne Beige', hex: '#EFE7DA' },
    ],
  },
  {
    id: 'af-hd07',
    name: 'Heritage Cross-Stitch Embroidered Cushion Trio',
    category: 'Home Decor Products',
    price: 2950,
    originalPrice: 3800,
    rating: 4.8,
    reviewsCount: 112,
    quality: 'Export Quality Heavy Cotton & Linen',
    description:
      'A set of three handcrafted decorative cushion covers featuring the authentic ASIM FABRICS 8-point cross-stitch medallion embroidered in silk-finish gold and deep maroon threads.',
    features: [
      'Set of 3 Matching Covers',
      'Concealed zipper enclosure',
      'Heavy 76×68 woven base fabric',
      'Contrast gold cord piping on all edges',
    ],
    dimensions: '18" × 18" (Standard Square)',
    material: 'Heavy Weight Cotton Blend',
    threadDensity: 'Custom Heavy Decor Weave',
    image: '/src/assets/images/product_maroon_jacquard_set_1791034172611.jpg',
    alternateImages: [
      '/src/assets/images/hero_luxury_bedroom_1791034123929.jpg',
    ],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 20,
    wholesalePrice: 2150,
    availableSizes: ['Set of 3 (18"x18")'],
    colors: [
      { name: 'Deep Maroon & Gold', hex: '#6B001A' },
      { name: 'Warm Ivory', hex: '#F8F5EF' },
    ],
  },
  {
    id: 'af-k08',
    name: 'Champagne Gold Jacquard King Bedsheet',
    category: 'King Size Bedsheets',
    price: 5200,
    originalPrice: 6600,
    rating: 4.9,
    reviewsCount: 57,
    quality: 'Export Quality Cotton 76×68',
    description:
      'An understated luxury masterpiece in soft champagne beige with tone-on-tone jacquard floral damasks. Calendered for an exquisite silk-cotton tactile hand.',
    features: [
      '76×68 Cotton Damask Weave',
      'Includes 1 King Sheet + 2 Pillow Shams',
      'Natural moisture wicking and cool sleep temperature',
      'Deep corner tuck with generous drop',
    ],
    dimensions: 'King Sheet: 96" × 102" | 2 Pillow Covers: 19" × 29"',
    material: '100% Mercerized Combed Cotton',
    threadDensity: '76×68 Jacquard Weave',
    image: '/src/assets/images/category_bedsheets_showcase_1791034139014.jpg',
    alternateImages: [
      '/src/assets/images/hero_luxury_bedroom_1791034123929.jpg',
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    wholesaleEligible: true,
    wholesaleMinQty: 20,
    wholesalePrice: 3950,
    availableSizes: ['King Size (96"x102")'],
    colors: [
      { name: 'Champagne Gold', hex: '#D4B36A' },
      { name: 'Warm Ivory', hex: '#F8F5EF' },
    ],
  },
];

export const QUALITY_PILLARS = [
  {
    id: 'export-cotton',
    title: 'Export Quality Cotton',
    spec: '100% Long-Staple Fibers',
    description:
      'We use only carefully graded long-staple cotton cultivated in the Indus basin, renowned globally for softness and strength.',
    icon: 'ShieldCheck',
  },
  {
    id: 'thread-7668',
    title: '76×68 Cotton Quality',
    spec: 'Standard Export Construction',
    description:
      'Strict 76 warp by 68 weft threads per square inch balance. The gold standard for breathable, non-sheer, non-shrinking home bedding.',
    icon: 'Layers',
  },
  {
    id: 'premium-finishing',
    title: 'Premium Finishing',
    spec: 'Mercerized & Calendered',
    description:
      'Silken touch achieved through precision mechanical calendering and environmentally safe reactive dye penetration.',
    icon: 'Sparkles',
  },
  {
    id: 'soft-comfortable',
    title: 'Soft & Comfortable',
    spec: 'Gets Softer Each Wash',
    description:
      'Natural thermo-regulating cotton weaves that keep you comfortably cool in summer and cozy in winter.',
    icon: 'HeartHandshake',
  },
  {
    id: 'durable',
    title: 'Durable & Enduring',
    spec: '100+ Commercial Wash Tested',
    description:
      'Double-locked serged seams and colorfast pigments prevent fraying, fading, or fabric distortion.',
    icon: 'BadgeCheck',
  },
  {
    id: 'retail-wholesale',
    title: 'Retail & Wholesale Available',
    spec: 'Direct Factory Supply',
    description:
      'Whether you need 1 bedset for your sanctuary or 5,000 meters for hotel furnishing or retail distribution, we fulfill promptly.',
    icon: 'Truck',
  },
];

export const WHOLESALE_BENEFITS = [
  {
    title: 'Direct Mill Pricing',
    description: 'Eliminate middlemen markups with direct-from-manufacturer wholesale rates.',
  },
  {
    title: 'Low Minimum Order Quantities',
    description: 'Flexible starter MOQs starting from 20 sets or 50 meters for emerging boutiques.',
  },
  {
    title: 'Custom Sizing & Private Labeling',
    description: 'Custom dimensions, bespoke woven brand labels, and barcode packaging available.',
  },
  {
    title: 'Nationwide & Export Logistics',
    description: 'Doorstep freight delivery across Pakistan and verified container freight worldwide.',
  },
];
