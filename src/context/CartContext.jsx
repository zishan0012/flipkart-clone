import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_saved_for_later');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('fk_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('fk_saved_for_later', JSON.stringify(savedForLater));
    } catch (e) {
      console.error(e);
    }
  }, [savedForLater]);

  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    setCartItems((prev) => {
      const itemKey = `${product.id}-${JSON.stringify(selectedVariant || {})}`;
      const existingIndex = prev.findIndex((item) => item.cartKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        addToast(`Updated quantity for "${product.title.slice(0, 24)}..."`, 'success');
        return updated;
      } else {
        const newItem = {
          cartKey: itemKey,
          id: product.id,
          title: product.title,
          brand: product.brand,
          category: product.category,
          price: product.price,
          mrp: product.mrp,
          discount: product.discount,
          image: product.images && product.images[0] ? product.images[0] : '',
          seller: 'RetailNet',
          assured: product.assured,
          selectedVariant: selectedVariant,
          quantity: quantity
        };
        addToast(`Added "${product.title.slice(0, 24)}..." to cart`, 'success');
        return [newItem, ...prev];
      }
    });
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeItem(cartKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (cartKey) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
    addToast('Item removed from cart', 'info');
  };

  const saveForLaterItem = (cartKey) => {
    const itemToSave = cartItems.find((item) => item.cartKey === cartKey);
    if (!itemToSave) return;

    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
    setSavedForLater((prev) => [itemToSave, ...prev]);
    addToast('Item moved to Saved For Later', 'info');
  };

  const moveToCartFromSaved = (cartKey) => {
    const itemToMove = savedForLater.find((item) => item.cartKey === cartKey);
    if (!itemToMove) return;

    setSavedForLater((prev) => prev.filter((item) => item.cartKey !== cartKey));
    setCartItems((prev) => [itemToMove, ...prev]);
    addToast('Item moved back to Cart', 'success');
  };

  const removeSavedItem = (cartKey) => {
    setSavedForLater((prev) => prev.filter((item) => item.cartKey !== cartKey));
    addToast('Item removed from Saved for Later', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FLIPKART10' || cleanCode === 'DISCOUNT10' || cleanCode === 'SAVE10') {
      setCouponCode(cleanCode);
      setCouponDiscount(10); // 10% extra
      addToast('Coupon applied! Extra 10% discount added.', 'success');
      return { success: true };
    } else if (cleanCode === 'FLIPKART500') {
      setCouponCode(cleanCode);
      setCouponDiscount(500); // Flat ₹500
      addToast('Coupon applied! Flat ₹500 off.', 'success');
      return { success: true };
    } else {
      return { success: false, message: 'Invalid promo code. Try "FLIPKART10" or "FLIPKART500"' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    addToast('Coupon removed.', 'info');
  };

  // Calculations
  const cartSummary = useMemo(() => {
    const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalMrp = cartItems.reduce((acc, item) => acc + item.mrp * item.quantity, 0);
    const totalSellingPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const baseDiscount = totalMrp - totalSellingPrice;

    // Delivery charge rule: Free if order value > 500, else 40
    const deliveryCharges = totalSellingPrice > 500 || totalSellingPrice === 0 ? 0 : 40;

    // Calculate extra coupon
    let promoSavings = 0;
    if (couponDiscount > 0) {
      if (couponDiscount <= 100) {
        promoSavings = Math.round((totalSellingPrice * couponDiscount) / 100);
      } else {
        promoSavings = Math.min(couponDiscount, totalSellingPrice);
      }
    }

    const finalAmount = Math.max(0, totalSellingPrice - promoSavings + deliveryCharges);
    const totalSavings = baseDiscount + promoSavings + (totalSellingPrice > 500 ? 40 : 0);

    return {
      totalItemsCount,
      totalMrp,
      totalSellingPrice,
      baseDiscount,
      deliveryCharges,
      promoSavings,
      finalAmount,
      totalSavings
    };
  }, [cartItems, couponDiscount]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedForLater,
        addToCart,
        updateQuantity,
        removeItem,
        saveForLaterItem,
        moveToCartFromSaved,
        removeSavedItem,
        clearCart,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        cartSummary
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
