import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Zishan Ahmad',
    phone: '9142915494',
    pincode: '842002',
    locality: 'Chakbhikhi',
    address: 'Near Meer Razzak Chowk, Chakbhikhi',
    city: 'Muzaffarpur',
    state: 'Bihar',
    type: 'Home',
    isDefault: true
  }
];

const INITIAL_USER = {
  id: 'usr-1',
  name: 'Zishan Ahmad',
  email: 'zishan.ahmad@example.com',
  phone: '9142915494',
  plusMember: true,
  superCoins: 240,
  joinedDate: 'October 2023'
};

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('fk_auth_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // If it was the previous demo user, auto-update to Zishan Ahmad
        if (parsed.name === 'Rahul Sharma' || parsed.phone === '9876543210') {
          return INITIAL_USER;
        }
        return parsed;
      }
      return INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_user_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If it was previous demo address (Rahul Sharma), auto-update to INITIAL_ADDRESSES
        if (parsed.some((a) => a.name === 'Rahul Sharma')) {
          return INITIAL_ADDRESSES;
        }
        return parsed;
      }
      return INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_user_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectPath, setAuthRedirectPath] = useState(null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('fk_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('fk_auth_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('fk_user_addresses', JSON.stringify(addresses));
    } catch (e) {
      console.error(e);
    }
  }, [addresses]);

  useEffect(() => {
    try {
      localStorage.setItem('fk_user_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const loginWithPassword = (identifier, password) => {
    // Basic validation
    if (!identifier || !password) {
      return { success: false, message: 'Please provide both mobile/email and password.' };
    }

    const displayName = identifier.includes('@')
      ? identifier.split('@')[0]
      : 'User ' + identifier.slice(-4);

    const loggedUser = {
      id: 'usr_' + Date.now(),
      name: displayName,
      email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
      phone: !identifier.includes('@') ? identifier : '9876543210',
      plusMember: true,
      superCoins: 240,
      joinedDate: 'October 2023'
    };

    setUser(loggedUser);
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${loggedUser.name}!`, 'success');
    return { success: true };
  };

  const loginWithOtp = (identifier, enteredOtp) => {
    if (enteredOtp !== '123456') {
      return { success: false, message: 'Invalid OTP. Please enter 123456' };
    }

    const displayName = identifier.includes('@')
      ? identifier.split('@')[0]
      : 'User ' + identifier.slice(-4);

    const loggedUser = {
      id: 'usr_' + Date.now(),
      name: displayName,
      email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
      phone: !identifier.includes('@') ? identifier : '9876543210',
      plusMember: true,
      superCoins: 240,
      joinedDate: 'October 2023'
    };

    setUser(loggedUser);
    setIsAuthModalOpen(false);
    addToast(`Logged in successfully with OTP!`, 'success');
    return { success: true };
  };

  const signup = ({ name, email, phone, password }) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      plusMember: false,
      superCoins: 50,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    addToast(`Account created! Welcome to Flipkart, ${newUser.name}!`, 'success');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    addToast('You have been logged out successfully.', 'info');
  };

  const addAddress = (addressData) => {
    const newAddr = {
      id: 'addr-' + Date.now(),
      ...addressData,
      isDefault: addresses.length === 0 || addressData.isDefault
    };

    setAddresses((prev) => {
      let updated = prev;
      if (newAddr.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      return [newAddr, ...updated];
    });

    addToast('Delivery address saved successfully.', 'success');
    return newAddr;
  };

  const updateAddress = (id, updatedData) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) {
          return { ...addr, ...updatedData };
        }
        if (updatedData.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      })
    );
    addToast('Address updated.', 'success');
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
    addToast('Address removed.', 'info');
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: 'OD' + Math.floor(100000000000000 + Math.random() * 900000000000000),
      date: new Date().toISOString(),
      status: 'Placed',
      statusHistory: [
        { status: 'Order Placed', time: 'Just now', completed: true },
        { status: 'Packed', time: 'Expected tomorrow', completed: false },
        { status: 'Shipped', time: 'Expected in 2 days', completed: false },
        { status: 'Delivered', time: 'Expected in 3 days', completed: false }
      ],
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
            ...ord,
            status: 'Cancelled',
            statusHistory: [
              ...ord.statusHistory,
              { status: 'Order Cancelled', time: 'Just now', completed: true }
            ]
          }
          : ord
      )
    );
    addToast(`Order #${orderId} has been cancelled.`, 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authRedirectPath,
        setAuthRedirectPath,
        loginWithPassword,
        loginWithOtp,
        signup,
        logout,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        orders,
        placeOrder,
        cancelOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
