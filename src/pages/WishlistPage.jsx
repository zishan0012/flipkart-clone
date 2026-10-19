import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { RatingBadge } from '../components/Common/RatingBadge';
import { AssuredBadge } from '../components/Common/AssuredBadge';
import { formatPrice } from '../utils/formatters';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-pink-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Empty Wishlist</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm mx-auto">
          You have no items in your wishlist. Start adding items you love to keep track of them!
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-8 py-2.5 bg-[#2874f0] text-white text-xs sm:text-sm font-bold uppercase rounded-[2px] shadow-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">
              My Wishlist ({wishlist.length})
            </h1>
            <p className="text-xs text-gray-500">Items saved for later review and purchase</p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-red-600 hover:underline uppercase"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="divide-y divide-gray-100">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Link
                  to={`/product/${item.id}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 p-1 border border-gray-100 rounded flex-shrink-0"
                >
                  <img
                    src={item.images && item.images[0] ? item.images[0] : ''}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/100x100/2874f0/ffffff?text=FK';
                    }}
                  />
                </Link>

                <div className="space-y-1">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-sm font-semibold text-gray-900 hover:text-[#2874f0] line-clamp-1"
                  >
                    {item.title}
                  </Link>

                  <div className="flex items-center gap-2">
                    <RatingBadge rating={item.rating} size="sm" />
                    {item.assured && <AssuredBadge />}
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.mrp > item.price && (
                      <>
                        <span className="text-xs line-through text-gray-400">
                          {formatPrice(item.mrp)}
                        </span>
                        <span className="text-xs font-bold text-[#388e3c]">
                          {item.discount}% off
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="px-4 py-2 bg-[#ff9f00] hover:bg-[#e08c00] text-white text-xs font-bold uppercase rounded-[2px] shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded border border-gray-200 hover:border-red-200 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
