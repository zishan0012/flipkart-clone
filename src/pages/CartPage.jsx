import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { AssuredBadge } from '../components/Common/AssuredBadge';
import { 
  ShoppingBag, 
  Trash2, 
  Bookmark, 
  ShieldCheck, 
  Tag, 
  ArrowRight, 
  MapPin, 
  Plus, 
  Minus 
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    savedForLater,
    updateQuantity,
    removeItem,
    saveForLaterItem,
    moveToCartFromSaved,
    removeSavedItem,
    couponCode,
    applyCoupon,
    removeCoupon,
    cartSummary
  } = useCart();

  const { user, setIsAuthModalOpen, setAuthRedirectPath } = useAuth();
  const { location, setIsModalOpen } = useLocation();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCoupon('');
    }
  };

  const handlePlaceOrder = () => {
    if (!user) {
      setAuthRedirectPath('/checkout');
      setIsAuthModalOpen(true);
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-8 sm:p-16 text-center max-w-2xl mx-auto">
          <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center bg-blue-50/50 rounded-full">
            <ShoppingBag className="w-20 h-20 text-[#2874f0]/60" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#212121]">
            Your Cart is empty!
          </h2>
          <p className="text-xs sm:text-sm text-[#878787] mt-2">
            Explore our wide range of products and discover great deals.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="px-8 py-2.5 bg-[#2874f0] hover:bg-[#1259c7] text-white text-sm font-bold uppercase rounded-[2px] shadow-sm transition-colors"
            >
              Shop Now
            </Link>
            {!user && (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-[2px] hover:bg-gray-50"
              >
                Login to see saved items
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-4 mb-20 lg:mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="flex-1 w-full space-y-3">
          
          {/* Deliver To Pincode Bar */}
          <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-3 sm:p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2874f0]" />
              <span className="text-gray-600">
                Deliver to: <strong className="text-gray-900">{location ? `${location.city} - ${location.pincode}` : '560001'}</strong>
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#2874f0] font-bold border border-gray-200 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
            >
              Change
            </button>
          </div>

          {/* Active Cart Items */}
          <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] overflow-hidden divide-y divide-gray-100">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h1 className="text-base font-bold text-gray-900">
                Flipkart ({cartSummary.totalItemsCount})
              </h1>
            </div>

            {cartItems.map((item) => (
              <div key={item.cartKey} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                
                {/* Image + Quantity controls */}
                <div className="flex sm:flex-col items-center gap-3 w-full sm:w-28 flex-shrink-0">
                  <Link to={`/product/${item.id}`} className="w-24 h-24 flex items-center justify-center p-1 border border-gray-100 rounded">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/100x100/2874f0/ffffff?text=FK';
                      }}
                    />
                  </Link>

                  {/* Quantity +/- */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-500 disabled:opacity-30"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-800 border border-gray-200 py-1 rounded">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-500"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-[#2874f0] line-clamp-2">
                        {item.title}
                      </Link>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        Delivery in 2 Days | <span className="text-[#388e3c] font-semibold">Free</span>
                      </span>
                    </div>

                    {item.selectedVariant && (
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        {Object.entries(item.selectedVariant).map(([k, v]) => (
                          <span key={k}>
                            {k}: <strong className="text-gray-700">{v}</strong>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">Seller: {item.seller}</span>
                      {item.assured && <AssuredBadge />}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2.5 mt-2.5">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.mrp > item.price && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(item.mrp * item.quantity)}
                          </span>
                          <span className="text-xs font-bold text-[#388e3c]">
                            {item.discount}% Off
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions: Save for later & Remove */}
                  <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-50 text-xs font-bold text-gray-800">
                    <button
                      onClick={() => saveForLaterItem(item.cartKey)}
                      className="hover:text-[#2874f0] uppercase tracking-wider flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save for later</span>
                    </button>
                    <button
                      onClick={() => removeItem(item.cartKey)}
                      className="hover:text-red-600 uppercase tracking-wider flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}

            {/* Desktop Place Order Button Strip */}
            <div className="p-4 bg-white flex justify-end">
              <button
                onClick={handlePlaceOrder}
                className="px-10 py-3.5 bg-[#fb641b] hover:bg-[#e25512] text-white text-sm font-bold uppercase rounded-[2px] shadow-sm tracking-wider transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Saved For Later Section */}
          {savedForLater.length > 0 && (
            <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] overflow-hidden divide-y divide-gray-100 mt-4">
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900">
                  Saved For Later ({savedForLater.length})
                </h3>
              </div>

              {savedForLater.map((sItem) => (
                <div key={sItem.cartKey} className="p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <div className="w-20 h-20 p-1 border border-gray-100 rounded flex-shrink-0">
                    <img src={sItem.image} alt={sItem.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{sItem.title}</h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-bold">{formatPrice(sItem.price)}</span>
                      <span className="text-xs line-through text-gray-400">{formatPrice(sItem.mrp)}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs font-bold">
                      <button
                        onClick={() => moveToCartFromSaved(sItem.cartKey)}
                        className="text-[#2874f0] uppercase hover:underline"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeSavedItem(sItem.cartKey)}
                        className="text-red-500 uppercase hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Price Details & Promo Card */}
        <div className="w-full lg:w-96 flex-shrink-0 lg:sticky lg:top-20 space-y-4">
          
          {/* Promo / Coupon Box */}
          <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#2874f0]" />
              <span>Apply Coupons & Promos</span>
            </h4>

            {couponCode ? (
              <div className="flex items-center justify-between p-2.5 bg-green-50 rounded border border-green-200 text-xs">
                <div>
                  <span className="font-bold text-[#388e3c]">Code: {couponCode}</span>
                  <p className="text-gray-500">Coupon applied successfully</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-red-600 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter Coupon (e.g. FLIPKART10)"
                    className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded uppercase font-semibold focus:outline-none focus:border-[#2874f0]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#2874f0] hover:bg-[#1259c7] text-white text-xs font-bold rounded uppercase transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-red-500">{couponError}</p>
                )}
                <p className="text-[11px] text-gray-400">
                  Try <strong>FLIPKART10</strong> for 10% off or <strong>FLIPKART500</strong>
                </p>
              </form>
            )}
          </div>

          {/* Flipkart Price Details Card */}
          <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Price Details
              </h2>
            </div>

            <div className="p-4 space-y-3.5 text-xs text-gray-700">
              <div className="flex items-center justify-between">
                <span>Price ({cartSummary.totalItemsCount} items)</span>
                <span>{formatPrice(cartSummary.totalMrp)}</span>
              </div>

              <div className="flex items-center justify-between text-[#388e3c]">
                <span>Discount</span>
                <span>- {formatPrice(cartSummary.baseDiscount)}</span>
              </div>

              {cartSummary.promoSavings > 0 && (
                <div className="flex items-center justify-between text-[#388e3c]">
                  <span>Coupon Discount</span>
                  <span>- {formatPrice(cartSummary.promoSavings)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                <span>
                  {cartSummary.deliveryCharges === 0 ? (
                    <span className="text-[#388e3c] font-semibold">FREE</span>
                  ) : (
                    formatPrice(cartSummary.deliveryCharges)
                  )}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-3 flex items-center justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span>{formatPrice(cartSummary.finalAmount)}</span>
              </div>

              {cartSummary.totalSavings > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-[#388e3c]">
                    You will save {formatPrice(cartSummary.totalSavings)} on this order
                  </p>
                </div>
              )}
            </div>

            {/* Safe & Secure banner */}
            <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center gap-2.5 text-xs text-gray-500">
              <ShieldCheck className="w-7 h-7 text-gray-400 flex-shrink-0" />
              <span>Safe and Secure Payments. 100% Authentic Products.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar for Place Order */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2.5 flex items-center justify-between z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[11px] text-gray-400 block line-through">
            {formatPrice(cartSummary.totalMrp)}
          </span>
          <span className="text-base font-bold text-gray-900">
            {formatPrice(cartSummary.finalAmount)}
          </span>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="px-6 py-2.5 bg-[#fb641b] hover:bg-[#e25512] text-white text-xs font-bold uppercase rounded-[2px] shadow-sm tracking-wide"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
