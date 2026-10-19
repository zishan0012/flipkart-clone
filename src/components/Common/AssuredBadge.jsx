import React from 'react';

export const AssuredBadge = () => {
  return (
    <div className="inline-flex items-center gap-1 select-none" title="Flipkart Assured">
      <span className="text-[12px] font-black italic tracking-tighter text-[#2874f0]">
        <span className="text-[#212121]">f</span>Assured
      </span>
      <svg className="w-3.5 h-3.5 text-[#ff9f00]" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
  );
};
