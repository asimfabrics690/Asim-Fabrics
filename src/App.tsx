import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { WhyAsimSection } from './components/WhyAsimSection';
import { BrandStorySection } from './components/BrandStorySection';
import { WholesaleSection } from './components/WholesaleSection';
import { SocialSection } from './components/SocialSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShopPage } from './components/ShopPage';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Product, PRODUCTS } from './data/products';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'wholesale' | 'about' | 'contact'>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asim_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('asim_wishlist');
      return saved ? JSON.parse(saved) : ['af-k01', 'af-cf04'];
    } catch {
      return ['af-k01', 'af-cf04'];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wholesalePrefill, setWholesalePrefill] = useState<string>('');
  const [homeFeaturedTab, setHomeFeaturedTab] = useState<'featured' | 'bedsheets' | 'fabrics' | 'articles'>('featured');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asim_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asim_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavigate = (view: string, filter?: string) => {
    setCurrentView(view as any);
    if (filter) {
      setActiveCategoryFilter(filter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, size?: string, quantity: number = 1) => {
    const chosenSize = size || (product.availableSizes ? product.availableSizes[0] : 'Standard');
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === chosenSize
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${chosenSize}-${Date.now()}`,
        product,
        selectedSize: chosenSize,
        quantity,
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`Added "${product.name}" to shopping bag.`);
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== product.id));
      showToast(`Removed from wishlist.`);
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      showToast(`Saved "${product.name}" to wishlist.`);
    }
  };

  const handleOpenWholesale = (productName?: string) => {
    setWholesalePrefill(productName || '');
    setCurrentView('wholesale');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for homepage featured section
  const homeDisplayProducts = PRODUCTS.filter((p) => {
    if (homeFeaturedTab === 'bedsheets') {
      return p.category.includes('Bedsheets');
    }
    if (homeFeaturedTab === 'fabrics') {
      return p.category.includes('Fabric');
    }
    if (homeFeaturedTab === 'articles') {
      return p.category.includes('Articles') || p.category.includes('Decor');
    }
    return p.isFeatured;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#2A2A2A] relative selection:bg-[#6B001A] selection:text-[#F8F5EF]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-[#6B001A] text-[#F8F5EF] text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fadeIn border border-[#D4B36A]/40">
          <Check className="w-4 h-4 text-[#D4B36A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() !== '' && currentView !== 'shop') {
            setCurrentView('shop');
          }
        }}
      />

      {/* Body Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onExplore={() => handleNavigate('shop', 'all')}
              onWholesale={() => handleNavigate('wholesale')}
            />

            {/* Shop By Category */}
            <CategoriesSection
              onSelectCategory={(catName) => handleNavigate('shop', catName)}
            />

            {/* Featured & New Arrivals Showcase */}
            <section className="py-16 sm:py-24 bg-[#F8F5EF] border-b border-[#EFE7DA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B001A] mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4B36A]" />
                      <span>Signature Woven Selections</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A2A] tracking-tight">
                      Featured &amp; New Arrivals
                    </h2>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#EFE7DA] overflow-x-auto">
                    <button
                      onClick={() => setHomeFeaturedTab('featured')}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        homeFeaturedTab === 'featured'
                          ? 'bg-[#6B001A] text-white shadow-xs'
                          : 'text-[#2A2A2A]/70 hover:text-[#6B001A]'
                      }`}
                    >
                      Featured
                    </button>
                    <button
                      onClick={() => setHomeFeaturedTab('bedsheets')}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        homeFeaturedTab === 'bedsheets'
                          ? 'bg-[#6B001A] text-white shadow-xs'
                          : 'text-[#2A2A2A]/70 hover:text-[#6B001A]'
                      }`}
                    >
                      Bedsheets (76×68)
                    </button>
                    <button
                      onClick={() => setHomeFeaturedTab('fabrics')}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        homeFeaturedTab === 'fabrics'
                          ? 'bg-[#6B001A] text-white shadow-xs'
                          : 'text-[#2A2A2A]/70 hover:text-[#6B001A]'
                      }`}
                    >
                      Fabrics (Meter &amp; Roll)
                    </button>
                    <button
                      onClick={() => setHomeFeaturedTab('articles')}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        homeFeaturedTab === 'articles'
                          ? 'bg-[#6B001A] text-white shadow-xs'
                          : 'text-[#2A2A2A]/70 hover:text-[#6B001A]'
                      }`}
                    >
                      Quilts &amp; Decor
                    </button>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {homeDisplayProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(p) => handleAddToCart(p)}
                      onQuickView={(p) => setSelectedProduct(p)}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>

                {/* Explore Full Shop CTA */}
                <div className="mt-12 text-center">
                  <button
                    onClick={() => handleNavigate('shop', 'all')}
                    className="inline-flex items-center gap-2 py-3 px-8 bg-white border border-[#6B001A] text-[#6B001A] hover:bg-[#6B001A] hover:text-white font-semibold text-xs rounded-xl shadow-xs transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore Complete 76×68 Cotton Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Why ASIM FABRICS Quality Pillars */}
            <WhyAsimSection />

            {/* Wholesale B2B Section */}
            <WholesaleSection prefilledProduct={wholesalePrefill} />

            {/* Brand Story & Loom Craftsmanship */}
            <BrandStorySection
              onExploreCollection={() => handleNavigate('shop', 'all')}
              onWholesale={() => handleNavigate('wholesale')}
            />

            {/* Social Media Section */}
            <SocialSection />

            {/* Newsletter */}
            <Newsletter />
          </>
        )}

        {currentView === 'shop' && (
          <ShopPage
            initialCategory={activeCategoryFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setSelectedProduct(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'wholesale' && (
          <div className="pt-6">
            <WholesaleSection prefilledProduct={wholesalePrefill} />
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-6">
            <BrandStorySection
              onExploreCollection={() => handleNavigate('shop', 'all')}
              onWholesale={() => handleNavigate('wholesale')}
            />
            <WhyAsimSection />
            <SocialSection />
          </div>
        )}

        {currentView === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Concierge */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenWholesale={handleOpenWholesale}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onSelectRelatedProduct={(p) => setSelectedProduct(p)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveWishlist={(p) => handleToggleWishlist(p)}
        onAddToCart={(p) => handleAddToCart(p)}
      />
    </div>
  );
}
