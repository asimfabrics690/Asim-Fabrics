import React from 'react';
import { AsimLogoMark } from './AsimLogo';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  onExploreCollection: () => void;
  onWholesale: () => void;
}

export const BrandStorySection: React.FC<BrandStoryProps> = ({
  onExploreCollection,
  onWholesale,
}) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8F5EF] border-b border-[#EFE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Workshop Craftsmanship Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#EFE7DA] bg-white aspect-4/3 sm:aspect-16/11">
              <img
                src="/src/assets/images/textile_craftsmanship_workshop_1791034188258.jpg"
                alt="ASIM FABRICS Weaving and Finishing Workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#D4B36A] block">
                  Export Spinning &amp; Looms
                </span>
                <p className="font-serif text-lg font-bold">
                  Indus Cotton Weaving &amp; Finishing Facility
                </p>
              </div>
            </div>

            {/* Overlaid emblem badge */}
            <div className="hidden sm:flex absolute -top-5 -right-5 bg-[#F8F5EF] border border-[#D4B36A] p-4 rounded-2xl shadow-xl flex-col items-center text-center">
              <AsimLogoMark size={44} />
              <span className="font-serif font-bold text-xs text-[#6B001A] mt-1.5 uppercase tracking-wider">
                ASIM FABRICS
              </span>
              <span className="text-[9px] text-[#B39148] tracking-widest uppercase">
                Home Textile
              </span>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6B001A] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4B36A]" />
              <span>Our Heritage &amp; Craft</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A2A2A] tracking-tight leading-tight mb-6">
              Born from Tradition, Perfected for Modern Homes.
            </h2>

            <p className="text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed mb-4">
              At <strong>ASIM FABRICS</strong>, we believe true home luxury begins with authentic tactile sensation. Rooted in Pakistan's historic textile belt, our collections celebrate the sacred symmetry of traditional cross-stitch needlework fused with modern export-grade cotton manufacturing.
            </p>

            <p className="text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed mb-6">
              Our emblem—an intricate 8-point cross-stitch star rendered in deep maroon and luxury gold—symbolizes balance, domestic sanctuary, and the unbroken chain of artisan weavers who transform raw cotton into heirlooms.
            </p>

            {/* Quality Checklist */}
            <div className="space-y-3 pt-2 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#6B001A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#D4B36A]" />
                </div>
                <p className="text-xs sm:text-sm text-[#2A2A2A]/85">
                  <strong>Strict 76×68 Cotton Density:</strong> No sheer, paper-thin fabric; only substantial, hotel-grade cotton that gets softer with every wash.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#6B001A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#D4B36A]" />
                </div>
                <p className="text-xs sm:text-sm text-[#2A2A2A]/85">
                  <strong>Colorfast Precision Finishing:</strong> Eco-safe reactive dyes that preserve rich maroon, gold, and ivory tones without bleeding.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#6B001A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#D4B36A]" />
                </div>
                <p className="text-xs sm:text-sm text-[#2A2A2A]/85">
                  <strong>Direct From Looms to Doorstep:</strong> From individual households to commercial hospitality chains, we deliver exceptional value without retail middleman bloat.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onExploreCollection}
                className="px-6 py-3 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWholesale}
                className="px-6 py-3 border border-[#6B001A] text-[#6B001A] hover:bg-[#EFE7DA] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                <span>Wholesale Partnership</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
