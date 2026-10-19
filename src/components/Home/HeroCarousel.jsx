import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_BANNERS } from '../../data/banners';

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative overflow-hidden w-full bg-gray-900 group shadow-sm select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {HERO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="w-full flex-shrink-0 relative h-[180px] sm:h-[260px] md:h-[340px] bg-gradient-to-r from-blue-900 via-indigo-900 to-gray-900"
          >
            {/* Background Image with Overlay */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x400/2874f0/ffffff?text=Flipkart+Big+Sale';
              }}
            />

            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 text-white max-w-xl">
              <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest text-[#ffe500] uppercase bg-black/40 px-2 py-0.5 rounded w-max mb-2">
                {banner.tag}
              </span>
              <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold tracking-tight leading-tight line-clamp-2">
                {banner.title}
              </h2>
              <p className="text-xs sm:text-base text-gray-200 mt-2 line-clamp-1">
                {banner.subtitle}
              </p>
              <div className="mt-4">
                <Link
                  to={banner.link}
                  className="inline-block px-5 py-2 bg-[#2874f0] hover:bg-[#1259c7] text-white text-xs sm:text-sm font-bold rounded-[2px] shadow uppercase tracking-wider transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-18 bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center rounded-r shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-18 bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center rounded-l shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {HERO_BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all rounded-full ${
              idx === currentIndex
                ? 'w-6 h-1.5 bg-[#2874f0]'
                : 'w-2 h-1.5 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
