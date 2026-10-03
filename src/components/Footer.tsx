import React from 'react';
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  Video,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { AsimLogo } from './AsimLogo';

interface FooterProps {
  onNavigate: (view: string, filter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#6B001A] text-[#F8F5EF] pt-16 pb-12 border-t border-[#500013]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Strip */}
        <div className="pb-12 border-b border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#F8F5EF]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#D4B36A]" />
            </div>
            <div>
              <span className="font-semibold block text-white text-sm">
                Certified 76×68 Cotton
              </span>
              <span className="text-[#F8F5EF]/70">Strict Export Quality Weave</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#D4B36A]" />
            </div>
            <div>
              <span className="font-semibold block text-white text-sm">
                Nationwide Courier
              </span>
              <span className="text-[#F8F5EF]/70">Cash on Delivery across Pakistan</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-[#D4B36A]" />
            </div>
            <div>
              <span className="font-semibold block text-white text-sm">
                7-Day Easy Exchange
              </span>
              <span className="text-[#F8F5EF]/70">Uncompromised satisfaction</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#D4B36A]" />
            </div>
            <div>
              <span className="font-semibold block text-white text-sm">
                Retail &amp; Wholesale
              </span>
              <span className="text-[#F8F5EF]/70">Direct loom-to-doorstep pricing</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <AsimLogo variant="horizontal" lightText size="md" />
              </div>
              <p className="text-xs sm:text-sm text-[#F8F5EF]/80 leading-relaxed max-w-sm mb-6">
                ASIM FABRICS is an artisanal home textile and decor house dedicated to pure export-quality combed cotton bedsheets, printed fabrics, and luxury articles.
              </p>

              {/* Official Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/asimfabrics640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4B36A] hover:text-[#2A2A2A] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61588468446149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4B36A] hover:text-[#2A2A2A] text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@asim.fabrics2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4B36A] hover:text-[#2A2A2A] text-white flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <Video className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-bold text-[#D4B36A] uppercase tracking-wider mb-4">
              Bedding &amp; Fabrics
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5EF]/80">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'King Size Bedsheets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  King Size Bedsheets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Double Bedsheets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Double Bedsheets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Single Bedsheets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Single Bedsheets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Cotton Fabric')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  76×68 Cotton Fabric (Meter / Roll)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Printed Fabric')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rotary Printed Fabric
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Home Textile Articles')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quilts &amp; Home Textile Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Home Decor Products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cushion Covers &amp; Decor
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-base font-bold text-[#D4B36A] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5EF]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wholesale')}
                  className="hover:text-white transition-colors cursor-pointer text-[#D4B36A] font-semibold"
                >
                  Wholesale B2B Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-bold text-[#D4B36A] uppercase tracking-wider mb-4">
              Official Contact
            </h4>
            <div className="space-y-3.5 text-xs text-[#F8F5EF]/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D4B36A] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#D4B36A] font-medium text-[11px]">
                    WhatsApp &amp; Orders:
                  </span>
                  <a
                    href="https://wa.me/923146148488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-white hover:text-[#D4B36A] text-sm"
                  >
                    +92 314 6148488
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4B36A] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#D4B36A] font-medium text-[11px]">
                    Customer &amp; Wholesale Email:
                  </span>
                  <a
                    href="mailto:asimfabrics690@gmail.com"
                    className="font-mono text-white hover:text-[#D4B36A]"
                  >
                    asimfabrics690@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#F8F5EF]/70 leading-relaxed">
                Dispatching daily across Lahore, Karachi, Islamabad, Faisalabad, Multan, and all cities in Pakistan.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F5EF]/60 gap-4">
          <p>© {new Date().getFullYear()} ASIM FABRICS (Home Textile &amp; Decor). All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Wholesale Supply Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
