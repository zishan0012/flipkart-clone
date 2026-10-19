import React from 'react';
import { Home, Grid, User, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const BottomNav = () => {
  const { cartSummary } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] h-14"
    >
      <div className="grid grid-cols-4 h-full">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#2874f0]' : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        {/* Categories */}
        <NavLink
          to="/search?category=all"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#2874f0]' : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>Categories</span>
        </NavLink>

        {/* Account */}
        {user ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#2874f0]' : 'text-gray-500 hover:text-gray-900'
              }`
            }
          >
            <User className="w-5 h-5 mb-0.5" />
            <span>Account</span>
          </NavLink>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex flex-col items-center justify-center text-[11px] font-medium text-gray-500 hover:text-gray-900"
          >
            <User className="w-5 h-5 mb-0.5" />
            <span>Account</span>
          </button>
        )}

        {/* Cart */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[11px] font-medium transition-colors relative ${
              isActive ? 'text-[#2874f0]' : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5" />
            {cartSummary.totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#ff6161] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartSummary.totalItemsCount > 9 ? '9+' : cartSummary.totalItemsCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </NavLink>
      </div>
    </nav>
  );
};
