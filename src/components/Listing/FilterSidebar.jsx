import React from 'react';
import { X, Star, Check } from 'lucide-react';
import { AssuredBadge } from '../Common/AssuredBadge';
import { formatPrice } from '../../utils/formatters';

export const FilterSidebar = ({
  filters,
  setFilters,
  availableBrands = [],
  maxPriceLimit = 150000,
  isMobileDrawer = false,
  onCloseMobile = () => {}
}) => {
  const handleBrandToggle = (brand) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand]
      };
    });
  };

  const handleRatingSelect = (rating) => {
    setFilters((prev) => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  const handleDiscountSelect = (discount) => {
    setFilters((prev) => ({
      ...prev,
      minDiscount: prev.minDiscount === discount ? 0 : discount
    }));
  };

  const handleClearAll = () => {
    setFilters({
      maxPrice: maxPriceLimit,
      brands: [],
      minRating: 0,
      minDiscount: 0,
      assuredOnly: false,
      inStockOnly: false
    });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.minRating > 0 ||
    filters.minDiscount > 0 ||
    filters.assuredOnly ||
    filters.inStockOnly ||
    filters.maxPrice < maxPriceLimit;

  return (
    <div className={`bg-white text-gray-800 ${isMobileDrawer ? 'p-4' : 'rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)]'}`}>
      {/* Title & Clear Filters */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Filters</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-[#2874f0] uppercase hover:underline"
            >
              Clear All
            </button>
          )}
          {isMobileDrawer && (
            <button onClick={onCloseMobile} className="p-1 text-gray-500 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Flipkart Assured Filter */}
        <div className="p-4">
          <label className="flex items-center justify-between cursor-pointer select-none">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.assuredOnly}
                onChange={(e) => setFilters((prev) => ({ ...prev, assuredOnly: e.target.checked }))}
                className="w-4 h-4 text-[#2874f0] rounded border-gray-300 focus:ring-[#2874f0]"
              />
              <AssuredBadge />
            </div>
            <span className="text-xs text-gray-400">?</span>
          </label>
        </div>

        {/* Price Slider */}
        <div className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Price Range
          </h4>
          <input
            type="range"
            min={100}
            max={maxPriceLimit}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-[#2874f0] cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-gray-600 mt-2 font-medium">
            <span>Min: ₹100</span>
            <span className="text-[#2874f0] font-bold">Up to {formatPrice(filters.maxPrice)}</span>
          </div>
        </div>

        {/* Brand Checkboxes */}
        {availableBrands.length > 0 && (
          <div className="p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Brand
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 text-xs">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer select-none text-gray-700 hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-[#2874f0] rounded border-gray-300 focus:ring-[#2874f0]"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Customer Ratings */}
        <div className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Customer Ratings
          </h4>
          <div className="space-y-1.5 text-xs">
            {[4, 3, 2].map((stars) => (
              <label
                key={stars}
                onClick={() => handleRatingSelect(stars)}
                className={`flex items-center gap-2 cursor-pointer p-1 rounded transition-colors ${
                  filters.minRating === stars ? 'bg-blue-50 font-semibold text-[#2874f0]' : 'text-gray-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.minRating === stars ? 'border-[#2874f0] bg-[#2874f0]' : 'border-gray-300'}`}>
                  {filters.minRating === stars && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <div className="flex items-center gap-1">
                  <span>{stars}★ & above</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Filter */}
        <div className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Discount
          </h4>
          <div className="space-y-1.5 text-xs">
            {[50, 40, 30, 20, 10].map((disc) => (
              <label
                key={disc}
                onClick={() => handleDiscountSelect(disc)}
                className={`flex items-center gap-2 cursor-pointer p-1 rounded transition-colors ${
                  filters.minDiscount === disc ? 'bg-blue-50 font-semibold text-[#2874f0]' : 'text-gray-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.minDiscount === disc ? 'border-[#2874f0] bg-[#2874f0]' : 'border-gray-300'}`}>
                  {filters.minDiscount === disc && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span>{disc}% or more</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Availability
          </h4>
          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
              className="w-4 h-4 text-[#2874f0] rounded border-gray-300 focus:ring-[#2874f0]"
            />
            <span>Exclude Out of Stock</span>
          </label>
        </div>
      </div>

      {isMobileDrawer && (
        <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-[#fb641b] text-white text-sm font-bold uppercase rounded-[2px] shadow-sm"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
