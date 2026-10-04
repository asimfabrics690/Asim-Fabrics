import React from 'react';
import { Instagram, Facebook, Video, Sparkles, ExternalLink } from 'lucide-react';
import heroBedroomImg from '../assets/images/hero_luxury_bedroom_1791034123929.jpg';
import cottonFabricRollsImg from '../assets/images/category_cotton_fabric_rolls_1791034153002.jpg';
import maroonJacquardSetImg from '../assets/images/product_maroon_jacquard_set_1791034172611.jpg';
import bedsheetsShowcaseImg from '../assets/images/category_bedsheets_showcase_1791034139014.jpg';

export const SocialSection: React.FC = () => {
  const socialCards = [
    {
      platform: 'Instagram',
      handle: '@asimfabrics640',
      link: 'https://www.instagram.com/asimfabrics640',
      caption: 'Royal Maroon embroidered king suite in natural morning light. Pure 76×68 combed cotton perfection.',
      image: heroBedroomImg,
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      platform: 'Facebook',
      handle: 'ASIM FABRICS Official',
      link: 'https://www.facebook.com/profile.php?id=61588468446149',
      caption: 'Fresh loom batch! 76×68 raw and dyed cotton fabric rolls ready for nationwide dispatch.',
      image: cottonFabricRollsImg,
      icon: <Facebook className="w-4 h-4" />,
    },
    {
      platform: 'TikTok',
      handle: '@asim.fabrics2',
      link: 'https://www.tiktok.com/@asim.fabrics2',
      caption: 'Watch how 76×68 export density resists wrinkles & tests against ordinary 68×68 cotton.',
      image: maroonJacquardSetImg,
      icon: <Video className="w-4 h-4" />,
    },
    {
      platform: 'Instagram',
      handle: '@asimfabrics640',
      link: 'https://www.instagram.com/asimfabrics640',
      caption: 'Artisan hand-embroidery details: our signature 8-point cross-stitch cushion trio.',
      image: bedsheetsShowcaseImg,
      icon: <Instagram className="w-4 h-4" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F8F5EF] border-b border-[#EFE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6B001A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B36A]" />
            <span>Community &amp; Real Homes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2A2A] tracking-tight">
            Follow Our Textile Journey
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#2A2A2A]/70">
            Join thousands of interior designers, homemakers, and fabric lovers across our official social channels.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-medium text-[#6B001A]">
            <a
              href="https://www.instagram.com/asimfabrics640"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
            <span>·</span>
            <a
              href="https://www.facebook.com/profile.php?id=61588468446149"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <Facebook className="w-3.5 h-3.5" /> Facebook
            </a>
            <span>·</span>
            <a
              href="https://www.tiktok.com/@asim.fabrics2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <Video className="w-3.5 h-3.5" /> TikTok
            </a>
          </div>
        </div>

        {/* 4-Column Social Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialCards.map((card, idx) => (
            <a
              key={idx}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-[#EFE7DA] bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square w-full bg-[#EFE7DA]/50 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-xs flex items-center gap-1.5 text-xs font-semibold">
                    {card.icon}
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-lg">
                  {card.icon}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#2A2A2A]/80 line-clamp-2 leading-relaxed">
                  {card.caption}
                </p>
                <div className="mt-3 pt-2 border-t border-[#EFE7DA] flex items-center justify-between text-[11px] font-semibold text-[#6B001A]">
                  <span>{card.handle}</span>
                  <span className="text-[#D4B36A] uppercase tracking-wider text-[10px]">
                    {card.platform}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
