import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { getProductReviews, calculateRatingSummary } from '../data/reviews';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic reviews rating
  const reviews = getProductReviews(product.id);
  const summary = calculateRatingSummary(reviews);
  const displayRating = summary.total > 0 ? summary.overall : product.rating;
  const reviewCount = summary.total > 0 ? summary.total : product.reviewsCount;

  return (
    <div
      className="group relative flex flex-col bg-[#F8F5EF] rounded-xl border border-[#EFE7DA] overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container (65-75% height ratio) */}
      <div className="relative aspect-4/3 sm:aspect-square w-full bg-[#EFE7DA]/50 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#EFE7DA]/80 p-4 text-center">
            <Sparkles className="w-8 h-8 text-[#D4B36A] mb-2" />
            <span className="font-serif text-[#6B001A] font-semibold text-sm">
              {product.name}
            </span>
            <span className="text-[11px] text-[#2A2A2A]/70 mt-1">
              76×68 Export Cotton
            </span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}

        {/* Quality or Promo Badge (Single, quiet label) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="bg-[#6B001A] text-[#F8F5EF] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-[#D4B36A] text-[#2A2A2A] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded shadow-sm">
              New Arrival
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-[#6B001A] text-[9px] tracking-widest uppercase font-medium px-2 py-0.5 rounded border border-[#EFE7DA] shadow-xs">
            76×68 Export
          </span>
        </div>

        {/* Top-Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-[#6B001A] text-[#F8F5EF]'
              : 'bg-white/80 hover:bg-white text-[#2A2A2A] hover:text-[#6B001A]'
          }`}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div
          className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#2A2A2A] hover:text-[#6B001A] text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="py-2 px-3 bg-[#6B001A] hover:bg-[#500013] text-white text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Subtle Category & Spec Kicker */}
          <div className="flex items-center justify-between text-[11px] text-[#2A2A2A]/70 uppercase tracking-wider mb-1 font-medium">
            <span>{product.category}</span>
            <div className="flex items-center gap-0.5 text-[#B39148]">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-mono text-xs font-semibold text-[#2A2A2A]">
                {displayRating}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-bold text-[#2A2A2A] hover:text-[#6B001A] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#2A2A2A]/70 line-clamp-1 mt-0.5">
            {product.quality} · {product.material}
          </p>
        </div>

        {/* Price and Add CTA */}
        <div className="pt-2 border-t border-[#EFE7DA] flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base sm:text-lg font-bold text-[#6B001A] tabular-nums">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#2A2A2A]/50 line-through tabular-nums">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="text-xs font-semibold text-[#6B001A] hover:text-[#500013] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
