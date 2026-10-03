import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  MessageCircle,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { AsimLogo } from './AsimLogo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, filter?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const categories = [
    { label: 'All Collection', view: 'shop', filter: 'all' },
    { label: 'King Size Bedsheets', view: 'shop', filter: 'King Size Bedsheets' },
    { label: 'Double Bedsheets', view: 'shop', filter: 'Double Bedsheets' },
    { label: 'Single Bedsheets', view: 'shop', filter: 'Single Bedsheets' },
    { label: 'Cotton Fabric (76×68)', view: 'shop', filter: 'Cotton Fabric' },
    { label: 'Printed Fabric', view: 'shop', filter: 'Printed Fabric' },
    { label: 'Home Textile Articles', view: 'shop', filter: 'Home Textile Articles' },
    { label: 'Home Decor Products', view: 'shop', filter: 'Home Decor Products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#EFE7DA] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#6B001A] text-[#F8F5EF] text-[11px] md:text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-2 text-[#D4B36A]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Indus Valley Export Cotton 76×68</span>
        </div>
        <div className="mx-auto flex items-center gap-2">
          <span>Free Nationwide Delivery on Orders Over Rs. 4,999</span>
          <span className="opacity-40">|</span>
          <a
            href="https://wa.me/923146148488"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4B36A] underline underline-offset-2 flex items-center gap-1 font-semibold"
          >
            <Phone className="w-3 h-3" />
            +92 314 6148488
          </a>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#EFE7DA]/90">
          <button
            onClick={() => onNavigate('wholesale')}
            className="hover:text-[#D4B36A] transition-colors cursor-pointer"
          >
            Wholesale B2B Catalog
          </button>
          <span>Retail &amp; Bulk Orders</span>
        </div>
      </div>

      {/* Main Navigation Bar - Strict 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Official ASIM FABRICS Logo */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B001A] rounded p-1 -ml-1 transition-opacity hover:opacity-90 cursor-pointer"
          aria-label="ASIM FABRICS Home"
        >
          <AsimLogo variant="horizontal" size="md" />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2A2A2A]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-[#6B001A] relative py-1 cursor-pointer ${
              currentView === 'home' ? 'text-[#6B001A] font-semibold' : ''
            }`}
          >
            Home
            {currentView === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6B001A]" />
            )}
          </button>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesDropdownOpen(true)}
            onMouseLeave={() => setCategoriesDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('shop', 'all')}
              className={`flex items-center gap-1 transition-colors hover:text-[#6B001A] py-1 cursor-pointer ${
                currentView === 'shop' ? 'text-[#6B001A] font-semibold' : ''
              }`}
            >
              <span>Shop Collection</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  categoriesDropdownOpen ? 'rotate-180 text-[#6B001A]' : ''
                }`}
              />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute top-full left-0 w-64 pt-2 shadow-xl animate-fadeIn">
                <div className="bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg shadow-lg py-2">
                  <div className="px-3 py-1.5 text-[10px] tracking-widest text-[#B39148] font-bold uppercase border-b border-[#EFE7DA]">
                    Categories &amp; Fabrics
                  </div>
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onNavigate(cat.view, cat.filter);
                        setCategoriesDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#2A2A2A] hover:bg-[#EFE7DA]/60 hover:text-[#6B001A] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('shop', 'King Size Bedsheets')}
            className="transition-colors hover:text-[#6B001A] cursor-pointer"
          >
            Bedsheets
          </button>

          <button
            onClick={() => onNavigate('shop', 'Cotton Fabric')}
            className="transition-colors hover:text-[#6B001A] cursor-pointer"
          >
            Fabrics (76×68)
          </button>

          <button
            onClick={() => onNavigate('wholesale')}
            className={`transition-colors hover:text-[#6B001A] cursor-pointer flex items-center gap-1.5 ${
              currentView === 'wholesale' ? 'text-[#6B001A] font-semibold' : ''
            }`}
          >
            <span>Wholesale B2B</span>
            <span className="text-[10px] bg-[#6B001A] text-[#F8F5EF] px-1.5 py-0.5 rounded font-mono font-medium">
              Bulk
            </span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[#6B001A] cursor-pointer ${
              currentView === 'about' ? 'text-[#6B001A] font-semibold' : ''
            }`}
          >
            Brand Story
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors hover:text-[#6B001A] cursor-pointer ${
              currentView === 'contact' ? 'text-[#6B001A] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Cart, WhatsApp) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-white border border-[#D4B36A] rounded-full px-3 py-1.5 shadow-sm transition-all w-52 sm:w-64">
                <Search className="w-4 h-4 text-[#6B001A] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search bedsheets, fabric..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNavigate('shop');
                    }
                  }}
                  autoFocus
                  className="w-full text-xs bg-transparent focus:outline-none text-[#2A2A2A]"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#2A2A2A] hover:text-[#6B001A] hover:bg-[#EFE7DA]/50 rounded-full transition-colors cursor-pointer"
                title="Search Products"
                aria-label="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#2A2A2A] hover:text-[#6B001A] hover:bg-[#EFE7DA]/50 rounded-full transition-colors relative cursor-pointer"
            title="Wishlist"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6B001A] text-[#F8F5EF] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#2A2A2A] hover:text-[#6B001A] hover:bg-[#EFE7DA]/50 rounded-full transition-colors relative cursor-pointer"
            title="Shopping Cart"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6B001A] text-[#F8F5EF] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono animate-scaleIn">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp Quick Action Button */}
          <a
            href="https://wa.me/923146148488?text=Hello%20ASIM%20FABRICS,%20I%20would%20like%20to%20inquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#20b859] transition-all shadow-sm whitespace-nowrap"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2A2A2A] hover:text-[#6B001A] lg:hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5EF] border-b border-[#EFE7DA] px-6 py-6 animate-fadeIn">
          {/* Mobile Search */}
          <div className="mb-5 flex items-center bg-white border border-[#EFE7DA] rounded-lg px-3 py-2 shadow-sm">
            <Search className="w-4 h-4 text-[#6B001A] mr-2" />
            <input
              type="text"
              placeholder="Search fabrics, bedsheets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMobileMenuOpen(false);
                  onNavigate('shop');
                }
              }}
              className="w-full text-sm bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 text-base font-medium text-[#2A2A2A]">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#6B001A] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop', 'all');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#6B001A] transition-colors cursor-pointer"
            >
              Full Shop Collection
            </button>

            <div className="pl-3 border-l-2 border-[#D4B36A] flex flex-col gap-2.5 py-1 text-sm text-[#2A2A2A]/80">
              <button
                onClick={() => {
                  onNavigate('shop', 'King Size Bedsheets');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#6B001A] cursor-pointer"
              >
                King Size Bedsheets
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', 'Double Bedsheets');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#6B001A] cursor-pointer"
              >
                Double Bedsheets
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', 'Single Bedsheets');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#6B001A] cursor-pointer"
              >
                Single Bedsheets
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', 'Cotton Fabric');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#6B001A] cursor-pointer"
              >
                Cotton Fabric (76×68)
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', 'Printed Fabric');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#6B001A] cursor-pointer"
              >
                Printed Fabric
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', 'Home Textile Articles');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#6B001A] cursor-pointer"
              >
                Home Textile Articles
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', 'Home Decor Products');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#6B001A] cursor-pointer"
              >
                Home Decor Products
              </button>
            </div>

            <button
              onClick={() => {
                onNavigate('wholesale');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#6B001A] font-semibold hover:text-[#500013] transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Wholesale B2B Inquiry</span>
              <span className="text-xs bg-[#6B001A] text-[#F8F5EF] px-2 py-0.5 rounded font-mono">
                Bulk Rates
              </span>
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#6B001A] transition-colors cursor-pointer"
            >
              Brand Story &amp; 76×68 Quality
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#6B001A] transition-colors cursor-pointer"
            >
              Contact &amp; Showroom
            </button>
          </div>

          {/* Direct WhatsApp Callout in Mobile Menu */}
          <div className="mt-6 pt-5 border-t border-[#EFE7DA] flex flex-col gap-3">
            <a
              href="https://wa.me/923146148488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#25D366] text-white font-medium text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Direct WhatsApp: +92 314 6148488</span>
            </a>
            <p className="text-center text-xs text-[#2A2A2A]/70">
              asimfabrics690@gmail.com
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
