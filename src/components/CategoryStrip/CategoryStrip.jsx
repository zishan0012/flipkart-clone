import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { 
  Percent, 
  Smartphone, 
  Laptop, 
  Shirt, 
  Armchair, 
  Tv, 
  Sparkles, 
  Gamepad2, 
  ShoppingBag, 
  Plane,
  ChevronDown
} from 'lucide-react';

const ICON_MAP = {
  Percent,
  Smartphone,
  Laptop,
  Shirt,
  Armchair,
  Tv,
  Sparkles,
  Gamepad2,
  ShoppingBag,
  Plane
};

export const CategoryStrip = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSubItemClick = (slug, subItem) => {
    setActiveCategory(null);
    navigate(`/search?category=${slug}&sub=${encodeURIComponent(subItem)}`);
  };

  return (
    <nav 
      aria-label="Product Categories"
      className="bg-white shadow-[0_1px_1px_rgba(0,0,0,0.08)] border-b border-gray-100 relative z-30"
    >
      <div className="max-w-[1280px] mx-auto px-2 sm:px-4">
        {/* Category List */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 sm:py-3 gap-4 sm:gap-6 md:gap-8">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || ShoppingBag;
            const hasSub = cat.subcategories && cat.subcategories.length > 0;

            return (
              <div
                key={cat.id}
                className="relative group flex-shrink-0"
                onMouseEnter={() => hasSub && setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={`/search?category=${cat.slug}`}
                  className="flex flex-col items-center gap-1 group/item cursor-pointer focus:outline-none"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center p-1 bg-gray-50 border border-gray-100 group-hover/item:border-[#2874f0] group-hover/item:shadow-sm transition-all">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full group-hover/item:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="text-[#2874f0]"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div>`;
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-0.5 mt-0.5">
                    <span className="text-[12px] sm:text-[13px] font-medium text-gray-800 group-hover/item:text-[#2874f0] whitespace-nowrap transition-colors">
                      {cat.name}
                    </span>
                    {hasSub && (
                      <ChevronDown className="w-3 h-3 text-gray-400 group-hover/item:text-[#2874f0] group-hover/item:rotate-180 transition-transform hidden md:inline-block" />
                    )}
                  </div>
                </Link>

                {/* Desktop Mega-Dropdown */}
                {activeCategory === cat.id && hasSub && (
                  <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-white rounded-sm shadow-fkDropdown border border-gray-100 p-5 min-w-[340px] max-w-xl text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cat.subcategories.map((group, idx) => (
                          <div key={idx} className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-1">
                              {group.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {group.items.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <button
                                    onClick={() => handleSubItemClick(cat.slug, sub)}
                                    className="text-xs text-gray-700 hover:text-[#2874f0] hover:font-medium transition-colors text-left w-full truncate"
                                  >
                                    {sub}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <Link
                          to={`/search?category=${cat.slug}`}
                          className="text-xs font-semibold text-[#2874f0] hover:underline"
                        >
                          View all in {cat.name} →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
