import React from 'react';
import { Link } from 'react-router-dom';
import { PROMO_STRIP_BANNERS } from '../../data/banners';
import { ArrowRight } from 'lucide-react';

export const PromoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-3 sm:my-4">
      {PROMO_STRIP_BANNERS.map((banner) => (
        <Link
          key={banner.id}
          to={banner.link}
          className={`${banner.bg} text-white p-4 sm:p-5 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center justify-between group overflow-hidden relative`}
        >
          <div className="relative z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-black/25 px-2 py-0.5 rounded">
              {banner.badge}
            </span>
            <h3 className="text-base sm:text-lg font-bold mt-2 group-hover:translate-x-0.5 transition-transform">
              {banner.title}
            </h3>
            <p className="text-xs text-white/90 mt-0.5">{banner.subtitle}</p>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-gray-900 text-white transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      ))}
    </div>
  );
};
