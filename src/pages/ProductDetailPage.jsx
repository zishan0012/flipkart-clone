import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  getProductById, 
  getProductsByCategory 
} from '../data/products';
import { RatingBadge } from '../components/Common/RatingBadge';
import { AssuredBadge } from '../components/Common/AssuredBadge';
import { DealSlider } from '../components/Common/DealSlider';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLocation } from '../context/LocationContext';
import { 
  ShoppingCart, 
  Zap, 
  Heart, 
  Share2, 
  Tag, 
  ShieldCheck, 
  MapPin, 
  Check, 
  ChevronRight, 
  Star,
  Truck,
  RotateCcw,
  Calendar
} from 'lucide-react';
import { formatPrice, formatNumber, getEstimatedDelivery, isValidPincode, lookupPincode } from '../utils/formatters';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { location, updatePincode } = useLocation();

  // Selected state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Delivery check state
  const [pincodeInput, setPincodeInput] = useState(location?.pincode || '560001');
  const [deliveryInfo, setDeliveryInfo] = useState(getEstimatedDelivery(2));
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Image zoom state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    // Initialize default variants if product has any
    if (product?.variants) {
      const initial = {};
      Object.keys(product.variants).forEach((key) => {
        initial[key] = product.variants[key][0];
      });
      setSelectedVariants(initial);
    }
  }, [id, product]);

  useEffect(() => {
    if (location?.pincode) {
      setPincodeInput(location.pincode);
    }
  }, [location]);

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-500 mt-2">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="inline-block mt-4 px-6 py-2.5 bg-[#2874f0] text-white font-bold rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : [`https://picsum.photos/seed/${product.id}/600/600`];

  const similarProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  const handleVariantChange = (type, val) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: val }));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariants, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariants, quantity);
    navigate('/checkout');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!isValidPincode(pincodeInput)) {
      setPincodeStatus({ error: true, message: 'Please enter a valid 6-digit Indian pincode' });
      return;
    }
    const info = lookupPincode(pincodeInput);
    updatePincode(pincodeInput);
    setPincodeStatus({ error: false, message: `Delivery to ${info.city}, ${info.state} available` });
    setDeliveryInfo(getEstimatedDelivery(2));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-3 sm:py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 overflow-x-auto no-scrollbar">
        <Link to="/" className="hover:text-[#2874f0] whitespace-nowrap">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <Link to={`/search?category=${product.category}`} className="hover:text-[#2874f0] capitalize whitespace-nowrap">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <span className="text-gray-800 font-medium truncate max-w-sm">{product.title}</span>
      </nav>

      {/* Main Product Card */}
      <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-4 sm:p-6 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Image Gallery + Sticky CTAs */}
        <div className="w-full lg:w-[460px] flex-shrink-0 lg:sticky lg:top-20">
          <div className="flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start">
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-96 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setSelectedImageIndex(idx)}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 rounded border p-1 flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#2874f0] ring-1 ring-[#2874f0]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/80x80/2874f0/ffffff?text=FK';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image with Zoom */}
            <div className="relative flex-1 w-full max-w-md h-80 sm:h-96 border border-gray-100 rounded flex items-center justify-center p-4 bg-white overflow-hidden">
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>

              <div
                className="w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={images[selectedImageIndex] || images[0]}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-100"
                  style={
                    isZooming
                      ? {
                          transform: 'scale(1.8)',
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                        }
                      : {}
                  }
                  onError={(e) => {
                    e.target.src = `https://placehold.co/500x500/2874f0/ffffff?text=${encodeURIComponent(product.brand || 'Flipkart')}`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Flipkart Sticky Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="py-3.5 px-4 bg-[#ff9f00] hover:bg-[#e08c00] text-white text-sm sm:text-base font-bold rounded-[2px] shadow-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3.5 px-4 bg-[#fb641b] hover:bg-[#e25512] text-white text-sm sm:text-base font-bold rounded-[2px] shadow-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Offers, Specs */}
        <div className="flex-1 w-full space-y-5">
          {/* Title & Brand */}
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <h1 className="text-lg sm:text-2xl font-medium text-[#212121] leading-snug mt-1">
              {product.title}
            </h1>

            {/* Rating badge & review count */}
            <div className="flex items-center gap-2.5 mt-2.5">
              <RatingBadge rating={product.rating} size="md" />
              <span className="text-xs font-semibold text-[#878787]">
                {formatNumber(product.reviewCount)} Ratings & Reviews
              </span>
              {product.assured && <AssuredBadge />}
            </div>
          </div>

          {/* Pricing Row */}
          <div className="bg-gray-50/70 p-3 sm:p-4 rounded border border-gray-100">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#212121]">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm sm:text-base text-[#878787] line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#388e3c]">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              + ₹40 Secured Packaging Fee (Waived for Plus users)
            </p>
          </div>

          {/* Available Offers */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Available Offers
            </h3>
            <ul className="space-y-2 text-xs text-gray-800">
              <li className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-[#388e3c] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Bank Offer:</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card.{' '}
                  <span className="text-[#2874f0] font-medium cursor-pointer">T&C</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-[#388e3c] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Special Price:</strong> Get extra 10% off (price inclusive of discount).{' '}
                  <span className="text-[#2874f0] font-medium cursor-pointer">T&C</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-[#388e3c] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Partner Offer:</strong> Sign up for Flipkart Pay Later & get ₹100 Gift Card.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-[#388e3c] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>No Cost EMI:</strong> Available on leading bank credit cards starting ₹1,499/month.
                </span>
              </li>
            </ul>
          </div>

          {/* Variants Selectors */}
          {product.variants && Object.keys(product.variants).length > 0 && (
            <div className="space-y-3 pt-3 border-t border-gray-100">
              {Object.entries(product.variants).map(([vType, options]) => (
                <div key={vType} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 w-24">
                    {vType}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleVariantChange(vType, opt)}
                        className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${
                          selectedVariants[vType] === opt
                            ? 'border-[#2874f0] bg-blue-50 text-[#2874f0] font-bold shadow-sm'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 w-24">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold"
              >
                -
              </button>
              <span className="w-10 text-center text-xs font-bold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                className="w-8 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold"
              >
                +
              </button>
            </div>
            {product.stock && product.stock <= 10 && (
              <span className="text-xs text-red-600 font-medium">
                Only {product.stock} items left in stock!
              </span>
            )}
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 w-24">
                Delivery:
              </span>
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter Delivery Pincode"
                    className="w-44 pl-8 pr-3 py-1.5 text-xs border-b-2 border-gray-300 focus:border-[#2874f0] outline-none text-gray-900 font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="text-xs font-bold text-[#2874f0] hover:underline"
                >
                  Check
                </button>
              </form>
            </div>

            {pincodeStatus && (
              <p className={`text-xs mt-2 ${pincodeStatus.error ? 'text-red-500' : 'text-[#388e3c] font-semibold'}`}>
                {pincodeStatus.message}
              </p>
            )}

            <div className="flex items-center gap-6 mt-3 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#388e3c]" />
                <span className="font-semibold">{deliveryInfo}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#2874f0]" />
                <span>7 Days Replacement Policy</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {product.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications Table */}
          {product.specs && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Specifications
              </h3>
              <div className="border border-gray-100 rounded divide-y divide-gray-100 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex py-2 px-3">
                    <span className="w-1/3 text-gray-500 font-medium">{key}</span>
                    <span className="w-2/3 text-gray-800 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ratings & Reviews Section */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-4">
              Ratings & Reviews
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-gray-50 p-4 rounded border border-gray-100">
              {/* Rating Big Number */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-3xl font-extrabold text-gray-900">{product.rating}</span>
                  <Star className="w-6 h-6 text-[#388e3c] fill-current" />
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {formatNumber(product.reviewCount)} Ratings & {formatNumber(Math.floor(product.reviewCount / 6))} Reviews
                </p>
              </div>

              {/* Distribution bars */}
              <div className="flex-1 space-y-1.5 text-xs text-gray-600">
                {[
                  { star: 5, pct: 68 },
                  { star: 4, pct: 21 },
                  { star: 3, pct: 7 },
                  { star: 2, pct: 2 },
                  { star: 1, pct: 2 }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2">
                    <span className="w-4 font-semibold text-right">{row.star}★</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#388e3c] rounded-full"
                        style={{ width: `${row.pct}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-[11px] text-gray-400">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Verified Customer Reviews */}
            <div className="mt-4 divide-y divide-gray-100 text-xs">
              <div className="py-3">
                <div className="flex items-center gap-2">
                  <RatingBadge rating={5} size="sm" />
                  <span className="font-bold text-gray-800">Mind-blowing Purchase!</span>
                </div>
                <p className="text-gray-600 mt-1">
                  Exceeded all my expectations. Genuine product delivered in 24 hours in secure packaging. Highly recommend this!
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                  <span>Amit Verma</span>
                  <span className="flex items-center gap-1 text-[#388e3c]">
                    <Check className="w-3 h-3" /> Certified Buyer
                  </span>
                  <span>3 days ago</span>
                </div>
              </div>

              <div className="py-3">
                <div className="flex items-center gap-2">
                  <RatingBadge rating={4} size="sm" />
                  <span className="font-bold text-gray-800">Value-for-money</span>
                </div>
                <p className="text-gray-600 mt-1">
                  Very good build quality and features. Performs as advertised in the specifications table.
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                  <span>Priya Sundaram</span>
                  <span className="flex items-center gap-1 text-[#388e3c]">
                    <Check className="w-3 h-3" /> Certified Buyer
                  </span>
                  <span>1 week ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Similar Products Horizontal Slider */}
      {similarProducts.length > 0 && (
        <div className="mt-6">
          <DealSlider
            title="Similar Products You May Like"
            subtitle={`More popular picks from ${product.category}`}
            products={similarProducts}
            viewAllLink={`/search?category=${product.category}`}
          />
        </div>
      )}
    </div>
  );
};
