import maroonJacquardSetImg from '../assets/images/product_maroon_jacquard_set_1791034172611.jpg';
import cottonFabricRollsImg from '../assets/images/category_cotton_fabric_rolls_1791034153002.jpg';

export interface Review {
  id: string;
  productId: string;
  author: string;
  email?: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  isSampleReview?: boolean; // Explicitly labeled per guidelines
  photos?: string[];
  helpfulYes: number;
  helpfulNo: number;
  userVoted?: 'yes' | 'no';
}

export interface RatingBreakdown {
  overall: number;
  total: number;
  stars: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  percentages: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Initial demonstration reviews clearly flagged with isSampleReview: true
export const INITIAL_SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-k01-1',
    productId: 'af-k01',
    author: 'Ayesha K.',
    rating: 5,
    date: 'February 18, 2026',
    title: 'Remarkable 76×68 Cotton Density & Stitching',
    comment:
      'The deep maroon shade is true royal quality. You can instantly feel the thickness of the 76×68 combed cotton compared to regular market bedsheets. Even after two gentle washes, the embroidery and gold cord remain pristine.',
    verifiedPurchase: true,
    isSampleReview: true,
    photos: [maroonJacquardSetImg],
    helpfulYes: 24,
    helpfulNo: 1,
  },
  {
    id: 'rev-k01-2',
    productId: 'af-k01',
    author: 'Tariq Mehmood (Boutique Villa)',
    rating: 5,
    date: 'January 29, 2026',
    title: 'Flawless King Dimensions with Generous Drop',
    comment:
      'We ordered 6 sets for our luxury guest suites. Dimensions 96x102 tuck easily beneath deep 12-inch spring mattresses with plenty of margin. Excellent finish and zero chemical smell.',
    verifiedPurchase: true,
    isSampleReview: true,
    helpfulYes: 18,
    helpfulNo: 0,
  },
  {
    id: 'rev-k01-3',
    productId: 'af-k01',
    author: 'Dr. Zoya Mansoor',
    rating: 4,
    date: 'January 12, 2026',
    title: 'Soft, Breathable and Premium Fabric',
    comment:
      'Very comfortable for sensitive skin. The colorfast reactive dye holds up well. Highly recommend pairing it with warm ivory lamps.',
    verifiedPurchase: true,
    isSampleReview: true,
    helpfulYes: 9,
    helpfulNo: 2,
  },
  {
    id: 'rev-cf04-1',
    productId: 'af-cf04',
    author: 'Hamza Furnishings (Wholesale Buyer)',
    rating: 5,
    date: 'March 02, 2026',
    title: 'Certified 76×68 Greige & Dyed Loom Rolls',
    comment:
      'We tested the fabric weight and tensile strength at our tailoring workshop. Warp and weft counts match the 76×68 export standard exactly. Prompt courier delivery to Faisalabad.',
    verifiedPurchase: true,
    isSampleReview: true,
    photos: [cottonFabricRollsImg],
    helpfulYes: 31,
    helpfulNo: 0,
  },
  {
    id: 'rev-d02-1',
    productId: 'af-d02',
    author: 'Samina Bilal',
    rating: 5,
    date: 'February 24, 2026',
    title: 'Delicate Ivory Flora & Silk-Soft Calendered Feel',
    comment:
      'Looks exquisite on our walnut bed. The cotton feels crisp yet gentle. Prompt WhatsApp updates on courier tracking.',
    verifiedPurchase: true,
    isSampleReview: true,
    helpfulYes: 14,
    helpfulNo: 1,
  },
];

const STORAGE_KEY = 'asim_customer_reviews_v1';

export const getStoredReviews = (): Review[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_SAMPLE_REVIEWS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SAMPLE_REVIEWS;
  } catch (err) {
    console.error('Error reading reviews from localStorage:', err);
    return INITIAL_SAMPLE_REVIEWS;
  }
};

export const saveStoredReviews = (reviews: Review[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Error saving reviews to localStorage:', err);
  }
};

export const getProductReviews = (productId: string): Review[] => {
  const all = getStoredReviews();
  return all.filter((r) => r.productId === productId);
};

export const calculateRatingSummary = (reviews: Review[]): RatingBreakdown => {
  const total = reviews.length;
  if (total === 0) {
    return {
      overall: 0,
      total: 0,
      stars: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      percentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  reviews.forEach((r) => {
    const rInt = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    stars[rInt] = (stars[rInt] || 0) + 1;
    sum += r.rating;
  });

  const overall = parseFloat((sum / total).toFixed(1));

  const percentages = {
    5: Math.round((stars[5] / total) * 100),
    4: Math.round((stars[4] / total) * 100),
    3: Math.round((stars[3] / total) * 100),
    2: Math.round((stars[2] / total) * 100),
    1: Math.round((stars[1] / total) * 100),
  };

  return {
    overall,
    total,
    stars,
    percentages,
  };
};
