import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';

export const DealSlider = ({
  title,
  subtitle,
  products = [],
  viewAllLink = '/search',
  hasTimer = false,
  timerHours = 14,
  timerMinutes = 32,
  timerSeconds = 45,
  adBanner = null
}) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-3 sm:p-4 my-3 sm:my-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-[#212121] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[#878787] mt-0.5">{subtitle}</p>
            )}
          </div>

          {/* Countdown timer badge if enabled */}
          {hasTimer && (
            <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1 rounded text-xs font-semibold border border-red-200">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Ends in {timerHours}h : {timerMinutes}m : {timerSeconds}s</span>
            </div>
          )}
        </div>

        <Link
          to={viewAllLink}
          className="self-start sm:self-auto px-4 py-1.5 bg-[#2874f0] hover:bg-[#1259c7] text-white text-xs font-bold rounded-[2px] shadow-sm uppercase tracking-wider transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Main Content: Optional Left Ad Banner + Horizontal Products Slider */}
      <div className="flex items-stretch gap-4 mt-3 relative group/slider">
        {/* Optional side ad banner */}
        {adBanner && (
          <div className="hidden lg:flex flex-col justify-between w-56 flex-shrink-0 bg-blue-50 p-4 rounded text-center border border-blue-100 overflow-hidden relative">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2874f0] bg-white px-2 py-0.5 rounded shadow-sm">
                Special Offer
              </span>
              <h3 className="text-sm font-bold text-gray-900 mt-3">{adBanner.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{adBanner.subtitle}</p>
            </div>
            <Link
              to={viewAllLink}
              className="mt-4 inline-block text-xs font-bold text-[#2874f0] hover:underline"
            >
              Shop Now →
            </Link>
          </div>
        )}

        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-16 bg-white/95 hover:bg-white text-gray-700 shadow-md rounded-r flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 border border-gray-200"
          aria-label="Previous items"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-16 bg-white/95 hover:bg-white text-gray-700 shadow-md rounded-l flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 border border-gray-200"
          aria-label="Next items"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-44 sm:w-52 md:w-56 flex-shrink-0"
            >
              <ProductCard product={product} viewMode="grid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
