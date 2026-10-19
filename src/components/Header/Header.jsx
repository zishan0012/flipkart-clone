import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  ChevronDown, 
  Menu, 
  User, 
  Heart, 
  Package, 
  Bell, 
  HelpCircle, 
  TrendingUp, 
  Download, 
  LogOut, 
  Store,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { PRODUCTS } from '../../data/products';
import { MobileDrawer } from './MobileDrawer';
import { PincodeModal } from './PincodeModal';

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { cartSummary } = useCart();
  const { location, setIsModalOpen } = useLocation();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Dropdown states
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef(null);

  // Debounced/reactive search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const matched = PRODUCTS.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    ).slice(0, 6);

    setSuggestions(matched);
  }, [searchQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectProduct = (productId) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#2874f0] text-white shadow-fkHeader">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 md:h-16 gap-3 md:gap-6">
            
            {/* Mobile Menu Icon + Logo */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1 text-white hover:text-white/80 focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Text Logo: Flipkart + Explore Plus */}
              <Link to="/" className="flex flex-col select-none group">
                <span className="font-extrabold italic text-lg md:text-xl tracking-tight leading-none text-white group-hover:text-yellow-100 transition-colors">
                  Flipkart
                </span>
                <span className="text-[10px] italic flex items-center gap-0.5 text-gray-200 font-medium">
                  Explore{' '}
                  <span className="text-[#ffe500] font-bold">Plus</span>
                  <Sparkles className="w-2.5 h-2.5 text-[#ffe500] fill-current" />
                </span>
              </Link>
            </div>

            {/* Desktop / Tablet Search Bar */}
            <div
              ref={searchContainerRef}
              className="relative hidden md:block flex-1 max-w-2xl"
            >
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search for products, brands and more"
                  className="w-full h-9 px-4 pr-10 rounded-[2px] bg-white text-gray-900 text-sm placeholder-gray-500 shadow-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-3 text-[#2874f0] hover:text-blue-700 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && (searchQuery.trim() || suggestions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded shadow-fkDropdown border border-gray-100 text-gray-800 z-50 overflow-hidden divide-y divide-gray-100">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectProduct(item.id)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-8 h-8 object-contain rounded border border-gray-100 flex-shrink-0"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/40x40/2874f0/ffffff?text=FK';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            in <span className="text-[#2874f0] capitalize">{item.category}</span>
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-gray-900 flex-shrink-0">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-gray-500 text-center">
                      No matching products found for "{searchQuery}"
                    </div>
                  )}

                  {searchQuery.trim() && (
                    <div
                      onClick={handleSearchSubmit}
                      className="px-4 py-2 bg-blue-50/50 text-[#2874f0] text-xs font-semibold cursor-pointer hover:bg-blue-50 flex items-center justify-between"
                    >
                      <span>Search for "{searchQuery}"</span>
                      <Search className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Location Selector (Deliver to: Pincode) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#ffe500]" />
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-blue-200 block leading-tight">Deliver to</span>
                <span className="font-semibold text-xs leading-none">
                  {location ? location.pincode : '560001'}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Items */}
            <div className="flex items-center gap-4 lg:gap-6">
              
              {/* Login / User Profile Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
              >
                {user ? (
                  <button className="flex items-center gap-1 text-sm font-semibold text-white px-2 py-1 rounded hover:bg-white/10 transition-colors">
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-white text-[#2874f0] px-6 py-1 text-sm font-semibold rounded-[2px] hover:bg-white/90 transition-all shadow-sm"
                  >
                    Login
                  </button>
                )}

                {/* Dropdown Menu */}
                {isLoginHovered && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50 animate-in fade-in duration-100">
                    <div className="bg-white text-gray-800 rounded shadow-fkDropdown border border-gray-100 py-1 divide-y divide-gray-100">
                      {user ? (
                        <>
                          <div className="px-4 py-2.5 bg-blue-50/50">
                            <p className="text-xs text-gray-500">Logged in as</p>
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-[11px] text-[#2874f0] font-medium mt-0.5">
                              {user.superCoins} SuperCoins available
                            </p>
                          </div>
                          <div className="py-1">
                            <Link
                              to="/profile"
                              className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#2874f0]"
                            >
                              <User className="w-4 h-4 text-[#2874f0]" />
                              <span>My Profile</span>
                            </Link>
                            <Link
                              to="/orders"
                              className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#2874f0]"
                            >
                              <Package className="w-4 h-4 text-[#2874f0]" />
                              <span>Orders</span>
                            </Link>
                            <Link
                              to="/wishlist"
                              className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#2874f0]"
                            >
                              <Heart className="w-4 h-4 text-[#2874f0]" />
                              <span>Wishlist</span>
                            </Link>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={logout}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 text-left"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-3">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                            <span className="text-xs font-semibold text-gray-700">New customer?</span>
                            <button
                              onClick={() => setIsAuthModalOpen(true)}
                              className="text-xs font-bold text-[#2874f0] hover:underline"
                            >
                              Sign Up
                            </button>
                          </div>
                          <Link
                            to="/orders"
                            className="flex items-center gap-3 py-2 text-xs text-gray-700 hover:text-[#2874f0]"
                          >
                            <Package className="w-4 h-4 text-[#2874f0]" />
                            <span>Orders</span>
                          </Link>
                          <Link
                            to="/wishlist"
                            className="flex items-center gap-3 py-2 text-xs text-gray-700 hover:text-[#2874f0]"
                          >
                            <Heart className="w-4 h-4 text-[#2874f0]" />
                            <span>Wishlist</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Become a Seller (Desktop) */}
              <a
                href="#become-seller"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Flipkart Seller Hub: Start selling to 50+ crore registered customers across India!');
                }}
                className="hidden lg:flex items-center gap-1 text-sm font-semibold text-white hover:text-white/90"
              >
                <span>Become a Seller</span>
              </a>

              {/* More Dropdown (Desktop) */}
              <div
                className="relative hidden lg:block"
                onMouseEnter={() => setIsMoreHovered(true)}
                onMouseLeave={() => setIsMoreHovered(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-white/90">
                  <span>More</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {isMoreHovered && (
                  <div className="absolute top-full right-0 pt-2 w-56 z-50 animate-in fade-in duration-100">
                    <div className="bg-white text-gray-800 rounded shadow-fkDropdown border border-gray-100 py-1 divide-y divide-gray-100">
                      <div className="py-1">
                        <div
                          onClick={() => alert('Notification settings saved.')}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          <Bell className="w-4 h-4 text-[#2874f0]" />
                          <span>Notification Preferences</span>
                        </div>
                        <div
                          onClick={() => alert('Flipkart 24x7 Support: Call 1800-202-9898 or chat with us!')}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          <HelpCircle className="w-4 h-4 text-[#2874f0]" />
                          <span>24x7 Customer Care</span>
                        </div>
                        <div
                          onClick={() => alert('Flipkart Ads: Reach targeted shoppers across categories.')}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          <TrendingUp className="w-4 h-4 text-[#2874f0]" />
                          <span>Advertise</span>
                        </div>
                        <div
                          onClick={() => alert('Flipkart Mobile App: Download from Play Store & App Store.')}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-[#2874f0]" />
                          <span>Download App</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Icon with Live Count */}
              <Link
                to="/cart"
                className="flex items-center gap-2 text-white font-semibold text-sm hover:text-white/90 transition-colors"
                aria-label={`Shopping cart with ${cartSummary.totalItemsCount} items`}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartSummary.totalItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#ff6161] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                      {cartSummary.totalItemsCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar (Below Logo Row) */}
          <div className="md:hidden pb-2.5 pt-1">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full h-8 px-3 pr-8 rounded-[2px] bg-white text-gray-900 text-xs placeholder-gray-500 shadow-sm focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-2.5 text-[#2874f0]"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Pincode Selector Modal */}
      <PincodeModal />
    </>
  );
};
