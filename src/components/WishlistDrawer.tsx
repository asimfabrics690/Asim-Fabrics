import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#F8F5EF] h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EFE7DA] bg-[#F8F5EF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#6B001A] fill-[#6B001A]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2A2A2A]">
              My Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-[#EFE7DA] transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {wishlistedProducts.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center">
              <Heart className="w-14 h-14 text-[#D4B36A] stroke-1 mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#2A2A2A] mb-1">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-[#2A2A2A]/70 max-w-xs mb-6">
                Tap the heart on any bedsheet or cotton fabric to save your favorite articles for later.
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-[#6B001A] text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-[#500013] transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 bg-white p-3 rounded-xl border border-[#EFE7DA] shadow-2xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-[#EFE7DA]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#2A2A2A] line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="text-[11px] text-[#2A2A2A]/70 block">
                          {product.quality}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="font-mono text-sm font-bold text-[#6B001A]">
                        Rs. {product.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                        }}
                        className="py-1 px-3 bg-[#6B001A] hover:bg-[#500013] text-white text-xs font-semibold rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 border-t border-[#EFE7DA] bg-white text-center">
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-2.5 bg-[#6B001A] hover:bg-[#500013] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Move All to Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
