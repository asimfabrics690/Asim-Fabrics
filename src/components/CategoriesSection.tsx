import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, CategoryInfo } from '../data/products';

interface CategoriesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#F8F5EF] border-b border-[#EFE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B001A] block mb-2">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A2A] tracking-tight">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs sm:text-sm font-semibold text-[#6B001A] hover:text-[#500013] flex items-center gap-1 group cursor-pointer"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`group relative rounded-2xl overflow-hidden border border-[#EFE7DA] bg-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Category Image */}
              <div
                className={`relative w-full overflow-hidden bg-[#EFE7DA]/50 ${
                  idx === 0 ? 'aspect-16/9 sm:aspect-2/1' : 'aspect-4/3'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge if present */}
                {cat.featuredBadge && (
                  <span className="absolute top-3 left-3 bg-[#6B001A] text-[#F8F5EF] text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded shadow-sm">
                    {cat.featuredBadge}
                  </span>
                )}

                {/* Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4B36A] transition-colors leading-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-1 mt-1 max-w-sm">
                        {cat.description}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#6B001A] transition-colors ml-2">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
