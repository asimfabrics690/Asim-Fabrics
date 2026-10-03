import React from 'react';
import {
  ShieldCheck,
  Layers,
  Sparkles,
  HeartHandshake,
  BadgeCheck,
  Truck,
} from 'lucide-react';
import { QUALITY_PILLARS } from '../data/products';

export const WhyAsimSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#D4B36A]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#D4B36A]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#D4B36A]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#D4B36A]" />;
      case 'BadgeCheck':
        return <BadgeCheck className="w-6 h-6 text-[#D4B36A]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#D4B36A]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#D4B36A]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8F5EF] border-b border-[#EFE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B001A] block mb-2">
            The ASIM Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A2A2A] tracking-tight leading-tight">
            Why ASIM FABRICS
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed">
            Every thread woven at ASIM FABRICS honors Pakistan’s centuries-old cotton heritage while fulfilling demanding global export criteria.
          </p>
        </div>

        {/* 6 Quality Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUALITY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white p-7 rounded-2xl border border-[#EFE7DA] shadow-xs hover:border-[#D4B36A] transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#6B001A] flex items-center justify-center mb-5 shadow-xs">
                  {getIcon(pillar.icon)}
                </div>
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#B39148] mb-1">
                  {pillar.spec}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2A2A2A] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE7DA]/60 flex items-center gap-1.5 text-[11px] text-[#6B001A] font-semibold">
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAsimSection;
