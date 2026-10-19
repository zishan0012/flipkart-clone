import React from 'react';
import { BrowserRouter, Routes, Route, useLocation as useRouterLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

import { Header } from './components/Header/Header';
import { CategoryStrip } from './components/CategoryStrip/CategoryStrip';
import { BottomNav } from './components/Header/BottomNav';
import { Footer } from './components/Common/Footer';
import { AuthModal } from './components/Auth/AuthModal';

import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Main Layout to conditionally show CategoryStrip and Footer
const AppLayout = () => {
  const location = useRouterLocation();
  const isCheckout = location.pathname.startsWith('/checkout');

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f3f6]">
      {/* Sticky Flipkart Blue Header */}
      <Header />

      {/* Category Strip below header (hidden on checkout for distraction-free flow) */}
      {!isCheckout && <CategoryStrip />}

      {/* Main Routed Page Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Flipkart Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <LocationProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <AppLayout />
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </LocationProvider>
    </ToastProvider>
  );
}
