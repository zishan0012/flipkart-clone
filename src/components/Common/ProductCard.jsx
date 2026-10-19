import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RatingBadge } from './RatingBadge';
import { AssuredBadge } from './AssuredBadge';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice, formatNumber } from '../../utils/formatters';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const primaryImage = product.images && product.images.length > 0
    ? product.images[0]
    : `https://picsum.photos/seed/${product.id}/400/400`;

  // List view (often used in mobile search or tablet/desktop list mode)
  if (viewMode === 'list') {
    return (
      <div className="bg-white p-3.5 sm:p-4 rounded-sm border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow relative group flex flex-col sm:flex-row gap-4">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors text-gray-400 hover:text-red-500"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        {/* Product Image */}
        <Link
          to={`/product/${product.id}`}
          className="w-full sm:w-48 h-48 sm:h-44 flex-shrink-0 flex items-center justify-center p-2 group-hover:opacity-95 transition-opacity"
        >
          <img
            src={primaryImage}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x400/2874f0/ffffff?text=${encodeURIComponent(product.brand || 'Flipkart')}`;
            }}
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-sm font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2 transition-colors">
                {product.title}
              </h3>
            </Link>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mt-1.5">
              <RatingBadge rating={product.rating} size="sm" />
              <span className="text-xs text-[#878787] font-medium">
                ({formatNumber(product.reviewCount)})
              </span>
              {product.assured && <AssuredBadge />}
            </div>

            {/* Highlights preview */}
            {product.highlights && product.highlights.length > 0 && (
              <ul className="mt-2.5 hidden sm:block space-y-1 text-xs text-gray-600">
                {product.highlights.slice(0, 3).map((hl, i) => (
                  <li key={i} className="flex items-center gap-1.5 truncate">
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className="truncate">{hl}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="mt-3 sm:mt-0 pt-2 border-t sm:border-t-0 border-gray-100 flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold text-[#212121]">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-xs text-[#878787] line-through">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="text-xs font-bold text-[#388e3c]">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-[#388e3c] font-medium mt-0.5">
                Free delivery
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-3.5 py-1.5 bg-[#ff9f00] hover:bg-[#e08c00] text-white text-xs font-bold rounded-[2px] flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Standard card)
  return (
    <div className="bg-white p-3 sm:p-4 rounded-sm border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-200 relative group flex flex-col justify-between h-full">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors text-gray-400 hover:text-red-500"
        aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>

      <div>
        {/* Product Image */}
        <Link
          to={`/product/${product.id}`}
          className="w-full h-44 sm:h-52 flex items-center justify-center p-2 group-hover:opacity-95 transition-opacity overflow-hidden"
        >
          <img
            src={primaryImage}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x400/2874f0/ffffff?text=${encodeURIComponent(product.brand || 'Flipkart')}`;
            }}
          />
        </Link>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="mt-2 block">
          <h3 className="text-xs sm:text-sm font-medium text-[#212121] group-hover:text-[#2874f0] line-clamp-2 transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <RatingBadge rating={product.rating} size="sm" />
          <span className="text-[11px] text-[#878787] font-medium">
            ({formatNumber(product.reviewCount)})
          </span>
          {product.assured && (
            <div className="ml-auto hidden sm:block">
              <AssuredBadge />
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Free Delivery */}
      <div className="mt-2.5 pt-2 border-t border-gray-50">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-base sm:text-lg font-bold text-[#212121]">
            {formatPrice(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-[11px] text-[#878787] line-through">
              {formatPrice(product.mrp)}
            </span>
          )}
          {product.discount > 0 && (
            <span className="text-[11px] font-bold text-[#388e3c]">
              {product.discount}% off
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-1 text-[11px]">
          <span className="text-[#388e3c] font-medium">Free delivery</span>
          <button
            onClick={handleAddToCart}
            className="text-[#2874f0] font-bold hover:underline flex items-center gap-1 sm:hidden"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};
