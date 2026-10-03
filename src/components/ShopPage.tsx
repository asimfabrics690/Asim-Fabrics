import React, { useState, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  searchQuery,
  onSearchChange,
  onAddToCart,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(12000);

  const categories = [
    'all',
    'King Size Bedsheets',
    'Double Bedsheets',
    'Single Bedsheets',
    'Cotton Fabric',
    'Printed Fabric',
    'Home Textile Articles',
    'Home Decor Products',
  ];

  const qualities = ['all', '76×68', 'Combed Cotton', 'Printed', 'Jacquard'];

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Quality filter
      if (selectedQuality !== 'all') {
        const matchesQuality =
          product.quality.includes(selectedQuality) ||
          product.material.includes(selectedQuality) ||
          product.threadDensity.includes(selectedQuality);
        if (!matchesQuality) return false;
      }

      // Price filter
      if (product.price > priceMax) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.price - b.price;
      if (selectedSort === 'price-high') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedQuality, selectedSort, priceMax, searchQuery]);

  return (
    <div className="py-10 sm:py-14 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-[#B39148] font-semibold mb-1">
            Collection &amp; Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A2A2A]">
            {selectedCategory === 'all' ? 'All Handcrafted Articles' : selectedCategory}
          </h1>
          <p className="text-xs sm:text-sm text-[#2A2A2A]/70 mt-2 max-w-2xl leading-relaxed">
            Woven with certified 76×68 combed cotton, silk-soft calendered finishing, and colorfast reactive printing. Available for retail dispatch and wholesale container volume.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EFE7DA] shadow-xs mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6B001A] text-white shadow-xs'
                    : 'bg-[#F8F5EF] text-[#2A2A2A] hover:bg-[#EFE7DA]'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Sort & Quality Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#EFE7DA]">
            {/* Quality Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#2A2A2A]/80">
              <span className="font-medium">Fabric:</span>
              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#6B001A]"
              >
                <option value="all">All Weaves</option>
                <option value="76×68">76×68 Export Standard</option>
                <option value="Combed Cotton">Combed Cotton</option>
                <option value="Printed">Rotary Printed</option>
                <option value="Jacquard">Jacquard &amp; Damask</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#2A2A2A]/80">
              <span className="font-medium">Sort By:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#6B001A]"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter & Active Search Badge */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#2A2A2A]/70">
          <div>
            Showing <strong className="font-mono text-[#6B001A]">{filteredProducts.length}</strong> of{' '}
            <strong className="font-mono">{PRODUCTS.length}</strong> products
          </div>
          {searchQuery && (
            <div className="flex items-center gap-2">
              <span>
                Matching search: <em>"{searchQuery}"</em>
              </span>
              <button
                onClick={() => onSearchChange('')}
                className="text-[#6B001A] font-semibold underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-[#EFE7DA] p-8 max-w-lg mx-auto">
            <Sparkles className="w-12 h-12 text-[#D4B36A] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#2A2A2A] mb-2">
              No matching products found
            </h3>
            <p className="text-xs text-[#2A2A2A]/70 mb-5 leading-relaxed">
              We couldn't find any articles matching your filter parameters. Try clearing your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedQuality('all');
                onSearchChange('');
              }}
              className="py-2.5 px-6 bg-[#6B001A] text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-[#500013] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
