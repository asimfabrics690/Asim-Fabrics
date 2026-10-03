import React, { useState, useMemo } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  ShoppingBag,
  Plus,
  Minus,
  Layers,
  Heart,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { ProductReviewsSection } from './ProductReviewsSection';
import { getProductReviews, calculateRatingSummary } from '../data/reviews';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onOpenWholesale: (productName?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectRelatedProduct?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenWholesale,
  isWishlisted,
  onToggleWishlist,
  onSelectRelatedProduct,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes ? product.availableSizes[0] : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'wholesale'>('specs');
  const [addedToast, setAddedToast] = useState(false);

  // Dynamic reviews calculation for this product
  const reviews = useMemo(() => getProductReviews(product.id), [product.id]);
  const ratingSummary = useMemo(() => calculateRatingSummary(reviews), [reviews]);

  const allImages = [product.image, ...(product.alternateImages || [])];

  // Related products from same or complementary category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const scrollToReviews = () => {
    const el = document.getElementById('customer-reviews');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello ASIM FABRICS! I want to order/inquire about:\n- Product: ${product.name}\n- Size: ${selectedSize}\n- Color: ${selectedColor}\n- Quantity: ${quantity}\n- Unit Price: Rs. ${product.price}\n- Total: Rs. ${
        product.price * quantity
      }\nCould you please confirm availability and delivery?`
    );
    return `https://wa.me/923146148488?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#F8F5EF] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#EFE7DA] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Sticky Top Header with Breadcrumbs & Close */}
        <div className="sticky top-0 z-20 bg-[#F8F5EF]/95 backdrop-blur-md px-6 py-4 border-b border-[#EFE7DA] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#2A2A2A]/70">
            <span className="font-serif font-bold text-[#6B001A]">ASIM FABRICS</span>
            <span>/</span>
            <span className="truncate max-w-[200px] sm:max-w-xs">{product.category}</span>
            <span>/</span>
            <span className="text-[#2A2A2A] font-semibold truncate max-w-[150px] sm:max-w-sm">
              {product.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black bg-white/80 hover:bg-white rounded-full transition-all shadow-xs cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Top Section: Gallery & Contiguous Purchase Module */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Gallery (lg:col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-[#EFE7DA]">
                <img
                  src={activeImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#6B001A] text-[#F8F5EF] text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded shadow-sm">
                  {product.quality}
                </div>
              </div>

              {/* Thumbnail Selectors */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        activeImage === img
                          ? 'border-[#6B001A] shadow-xs'
                          : 'border-[#EFE7DA] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Brand Assurance Badges */}
              <div className="mt-6 pt-4 border-t border-[#EFE7DA] grid grid-cols-3 gap-2 text-center text-[11px] text-[#2A2A2A]/80">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#D4B36A] mb-1" />
                  <span className="font-medium">Indus Cotton 76×68</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-[#D4B36A] mb-1" />
                  <span className="font-medium">Nationwide Courier</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#D4B36A] mb-1" />
                  <span className="font-medium">7-Day Exchange</span>
                </div>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module (lg:col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Small Review Summary near Product Title */}
                <div className="flex items-center justify-between text-xs text-[#2A2A2A]/70 uppercase tracking-widest font-medium mb-1.5">
                  <span>{product.category}</span>

                  {/* Summary directly clickable to review section */}
                  <button
                    onClick={scrollToReviews}
                    className="flex items-center gap-1.5 text-[#B39148] hover:text-[#6B001A] transition-colors cursor-pointer group"
                    title="Jump to Customer Reviews"
                  >
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= Math.round(ratingSummary.overall || product.rating)
                              ? 'fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-xs text-[#2A2A2A] underline underline-offset-2">
                      {ratingSummary.total > 0
                        ? `${ratingSummary.overall}/5 — Customer Reviews (${ratingSummary.total})`
                        : `${product.rating}/5 — (${product.reviewsCount})`}
                    </span>
                  </button>
                </div>

                {/* Product Title */}
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2A2A2A] leading-tight mb-2">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#6B001A] tabular-nums">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-[#2A2A2A]/50 line-through tabular-nums">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-[#2A2A2A]/60 font-medium">Export Standard</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Size Selector */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-2">
                      Select Size / Length:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                            selectedSize === sz
                              ? 'border-[#6B001A] bg-[#6B001A] text-white shadow-xs'
                              : 'border-[#EFE7DA] bg-white text-[#2A2A2A] hover:border-[#6B001A]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Options */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#2A2A2A]">
                        Color: <span className="font-normal">{selectedColor}</span>
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                            selectedColor === c.name
                              ? 'scale-110 border-[#6B001A]'
                              : 'border-white hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor === c.name && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper & Add To Cart */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border border-[#EFE7DA] bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 text-[#2A2A2A] hover:bg-[#EFE7DA]/50 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-[#2A2A2A]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-[#2A2A2A] hover:bg-[#EFE7DA]/50 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 border rounded-lg transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-[#6B001A] bg-[#6B001A]/10 text-[#6B001A]'
                        : 'border-[#EFE7DA] bg-white text-[#2A2A2A] hover:border-[#6B001A]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Added Toast Feedback */}
                {addedToast && (
                  <div className="mb-3 p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-lg flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added {quantity}x to your bag!</span>
                  </div>
                )}

                {/* Secondary CTA: Instant WhatsApp Order */}
                <div className="flex flex-col sm:flex-row gap-2.5 mb-6">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20b859] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Instant WhatsApp Order</span>
                  </a>

                  {product.wholesaleEligible && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenWholesale(product.name);
                      }}
                      className="py-2.5 px-4 bg-transparent hover:bg-[#EFE7DA] text-[#6B001A] border border-[#6B001A] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Wholesale Bulk Rates</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tabbed Specifications */}
              <div className="border-t border-[#EFE7DA] pt-4">
                <div className="flex border-b border-[#EFE7DA] mb-3">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer mr-4 ${
                      activeTab === 'specs'
                        ? 'border-b-2 border-[#6B001A] text-[#6B001A]'
                        : 'text-[#2A2A2A]/60 hover:text-[#2A2A2A]'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer mr-4 ${
                      activeTab === 'care'
                        ? 'border-b-2 border-[#6B001A] text-[#6B001A]'
                        : 'text-[#2A2A2A]/60 hover:text-[#2A2A2A]'
                    }`}
                  >
                    Care &amp; Wash
                  </button>
                  <button
                    onClick={() => setActiveTab('wholesale')}
                    className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'wholesale'
                        ? 'border-b-2 border-[#6B001A] text-[#6B001A]'
                        : 'text-[#2A2A2A]/60 hover:text-[#2A2A2A]'
                    }`}
                  >
                    B2B Wholesale
                  </button>
                </div>

                {activeTab === 'specs' && (
                  <div className="text-xs text-[#2A2A2A]/80 space-y-1.5 animate-fadeIn">
                    <p>
                      <strong className="text-[#2A2A2A]">Dimensions:</strong>{' '}
                      {product.dimensions}
                    </p>
                    <p>
                      <strong className="text-[#2A2A2A]">Fabric Quality:</strong>{' '}
                      {product.quality} ({product.threadDensity})
                    </p>
                    <p>
                      <strong className="text-[#2A2A2A]">Material:</strong>{' '}
                      {product.material}
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-0.5 text-[#2A2A2A]/70">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="text-xs text-[#2A2A2A]/80 space-y-1 animate-fadeIn">
                    <p>• Machine wash gently at 30°C–40°C with mild laundry detergent.</p>
                    <p>• Do not use harsh chemical bleaching agents or chlorine.</p>
                    <p>• Tumble dry on low heat or line dry in the shade to preserve vibrancy.</p>
                    <p>• Warm iron on cotton setting while slightly damp for silky crisp finish.</p>
                  </div>
                )}

                {activeTab === 'wholesale' && (
                  <div className="text-xs text-[#2A2A2A]/80 space-y-1.5 animate-fadeIn">
                    <p>
                      <strong className="text-[#6B001A]">Minimum Bulk Quantity:</strong>{' '}
                      {product.wholesaleMinQty || 20} units
                    </p>
                    <p>
                      <strong className="text-[#6B001A]">Factory Bulk Price:</strong>{' '}
                      Rs. {product.wholesalePrice?.toLocaleString() || 'Inquire'} / unit
                    </p>
                    <p className="text-[#2A2A2A]/70">
                      Custom woven labels, master cartons, and export container packing available.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenWholesale(product.name);
                      }}
                      className="mt-1 text-xs text-[#6B001A] font-semibold underline underline-offset-2 hover:text-[#500013]"
                    >
                      Open Wholesale Inquiry Form →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Reviews & Ratings Section (Directly below product info) */}
          <ProductReviewsSection
            productId={product.id}
            productName={product.name}
          />

          {/* Related Products Section (Before end of modal) */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#EFE7DA]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2A2A2A]">
                    Complementary Bedding &amp; Fabrics
                  </h4>
                  <p className="text-xs text-[#2A2A2A]/70">
                    Handcrafted export articles designed to pair gracefully in your home.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (onSelectRelatedProduct) {
                        onSelectRelatedProduct(rel);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="bg-white rounded-xl border border-[#EFE7DA] p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="aspect-4/3 w-full rounded-lg overflow-hidden bg-[#EFE7DA]/50 mb-3">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#2A2A2A]/60 uppercase tracking-wider mb-0.5">
                        {rel.category}
                      </div>
                      <h5 className="font-serif font-bold text-sm text-[#2A2A2A] group-hover:text-[#6B001A] transition-colors line-clamp-1">
                        {rel.name}
                      </h5>
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#EFE7DA] flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#6B001A]">
                        Rs. {rel.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[#6B001A] font-semibold flex items-center gap-1 group-hover:underline">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
