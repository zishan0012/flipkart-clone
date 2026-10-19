import React from 'react';
import { Star } from 'lucide-react';

export const RatingBadge = ({ rating, size = 'md' }) => {
  const isHigh = rating >= 4.0;
  const isMedium = rating >= 3.0 && rating < 4.0;

  const bgClass = isHigh
    ? 'bg-[#388e3c]'
    : isMedium
    ? 'bg-[#ff9f00]'
    : 'bg-[#ff6161]';

  const sizeClass = size === 'sm' ? 'text-[11px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold text-white rounded-[3px] leading-tight ${bgClass} ${sizeClass}`}
    >
      <span>{rating ? Number(rating).toFixed(1) : '4.0'}</span>
      <Star className="w-2.5 h-2.5 fill-current" />
    </span>
  );
};
