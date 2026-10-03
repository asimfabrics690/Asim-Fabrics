import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Layers, PhoneCall } from 'lucide-react';
import { AsimLogoMark } from './AsimLogo';

interface HeroSectionProps {
  onExplore: () => void;
  onWholesale: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onWholesale,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F5EF] via-[#F8F5EF] to-[#EFE7DA]/50 py-12 sm:py-20 lg:py-24 border-b border-[#EFE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Trust Pill / Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6B001A] mb-4">
              <AsimLogoMark size={18} />
              <span>Indus Valley Export Cotton 76×68</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2A2A2A] tracking-tight leading-[1.08] text-balance">
              Luxury Living Starts With Authentic Comfort.
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-[#2A2A2A]/80 leading-relaxed max-w-xl">
              Discover our signature export quality 76×68 combed cotton bedsheets, woven textiles, and artisanal prints. Tailored for discerning homes, luxury boutique suites, and wholesale distribution across Pakistan and worldwide.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExplore}
                className="px-8 py-3.5 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-sm rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group hover:shadow-lg"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onWholesale}
                className="px-6 py-3.5 bg-white/80 hover:bg-white text-[#6B001A] border border-[#D4B36A] font-semibold text-sm rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Wholesale B2B Orders</span>
              </button>
            </div>

            {/* Adjacency Trust Proof */}
            <div className="mt-10 pt-6 border-t border-[#EFE7DA] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#6B001A] block">
                  76×68
                </span>
                <span className="text-[11px] sm:text-xs text-[#2A2A2A]/70 leading-snug block">
                  Export Density Standard
                </span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#6B001A] block">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs text-[#2A2A2A]/70 leading-snug block">
                  Combed Pure Cotton
                </span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#6B001A] block">
                  Retail &amp; Bulk
                </span>
                <span className="text-[11px] sm:text-xs text-[#2A2A2A]/70 leading-snug block">
                  Direct Factory Pricing
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative border frame */}
              <div className="absolute -inset-3 rounded-2xl border border-[#D4B36A]/40 -rotate-1 pointer-events-none" />

              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-4/3 sm:aspect-16/10">
                <img
                  src="/src/assets/images/hero_luxury_bedroom_1791034123929.jpg"
                  alt="ASIM FABRICS Luxury King Bedsheet Collection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs backdrop-blur-md bg-black/40 p-3 rounded-xl border border-white/20">
                  <div>
                    <span className="font-serif font-bold text-sm block">
                      Master Suite Collection
                    </span>
                    <span className="text-[11px] text-white/80">
                      Deep Maroon &amp; Gold Accents
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#D4B36A] text-xs">
                    76×68 Combed Weave
                  </span>
                </div>
              </div>

              {/* Floating Quality Stamp */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#F8F5EF] p-3.5 rounded-xl border border-[#D4B36A] shadow-xl items-center gap-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-lg bg-[#6B001A] text-[#F8F5EF] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#D4B36A]" />
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-[#2A2A2A] block leading-tight">
                    Export Grade Quality
                  </span>
                  <span className="text-[11px] text-[#2A2A2A]/70">
                    Pre-washed · Colorfast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
