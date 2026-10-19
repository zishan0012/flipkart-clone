import React from 'react';
import { X, User, ShoppingBag, Heart, HelpCircle, Bell, Tag, Sparkles, ChevronRight, LogOut, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/categories';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { user, logout, setIsAuthModalOpen } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Top User Bar */}
        <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-base">
              {user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">
                {user ? user.name : 'Welcome Guest'}
              </p>
              {user ? (
                <span className="text-[11px] text-yellow-300 font-medium">Flipkart Plus Member</span>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    setIsAuthModalOpen(true);
                  }}
                  className="text-xs text-white underline font-medium hover:text-yellow-200 mt-0.5"
                >
                  Log In / Sign Up
                </button>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white" aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Links */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {/* Quick links */}
          <div className="py-2">
            <Link
              to="/orders"
              onClick={onClose}
              className="flex items-center gap-3.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <ShoppingBag className="w-4 h-4 text-[#2874f0]" />
              <span>My Orders</span>
            </Link>
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center gap-3.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Heart className="w-4 h-4 text-[#2874f0]" />
              <span>My Wishlist</span>
            </Link>
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-3.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <User className="w-4 h-4 text-[#2874f0]" />
              <span>My Account</span>
            </Link>
          </div>

          {/* Plus Zone & Offers */}
          <div className="py-2">
            <Link
              to="/search?category=top-offers"
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3.5">
                <Sparkles className="w-4 h-4 text-[#ff9f00]" />
                <span className="font-medium text-gray-800">SuperCoin Zone</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/search?category=top-offers"
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3.5">
                <Tag className="w-4 h-4 text-[#388e3c]" />
                <span>All Offers</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Categories List */}
          <div className="py-2">
            <p className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              All Categories
            </p>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/search?category=${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            ))}
          </div>

          {/* More options */}
          <div className="py-2">
            <div className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              <Store className="w-4 h-4 text-gray-500" />
              <span>Become a Seller</span>
            </div>
            <div className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              <HelpCircle className="w-4 h-4 text-gray-500" />
              <span>24x7 Customer Care</span>
            </div>
            <div className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              <Bell className="w-4 h-4 text-gray-500" />
              <span>Notification Preferences</span>
            </div>
          </div>

          {/* Logout */}
          {user && (
            <div className="p-3">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
