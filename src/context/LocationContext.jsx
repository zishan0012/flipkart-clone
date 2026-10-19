import React, { createContext, useContext, useState, useEffect } from 'react';
import { isValidPincode, lookupPincode } from '../utils/formatters';
import { useToast } from './ToastContext';

const LocationContext = createContext();

const DEFAULT_PINCODE = '842002';

export const LocationProvider = ({ children }) => {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_user_location');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.pincode === '560001') {
          return lookupPincode(DEFAULT_PINCODE);
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return lookupPincode(DEFAULT_PINCODE);
  });

  const [isLoadingGeo, setIsLoadingGeo] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('fk_user_location', JSON.stringify(location));
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  const updatePincode = (pin) => {
    const cleanPin = String(pin).trim();
    if (!isValidPincode(cleanPin)) {
      return { success: false, message: 'Please enter a valid 6-digit Indian pincode.' };
    }

    const locInfo = lookupPincode(cleanPin);
    setLocation(locInfo);
    setIsModalOpen(false);
    addToast(`Delivery location set to ${cleanPin} (${locInfo.city})`, 'success');
    return { success: true };
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      addToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    setIsLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoadingGeo(false);
        // Map realistic Indian coordinates or fallback to default metro
        // For demonstration, map to Bengaluru / Mumbai
        const samplePins = ['560001', '400001', '110001', '500001'];
        const randomPin = samplePins[Math.floor(Math.random() * samplePins.length)];
        const locInfo = lookupPincode(randomPin);
        setLocation({
          ...locInfo,
          area: 'Detected via GPS'
        });
        setIsModalOpen(false);
        addToast(`Location detected: ${locInfo.city} (${locInfo.pincode})`, 'success');
      },
      (error) => {
        setIsLoadingGeo(false);
        console.warn('Geolocation error:', error.message);
        // Graceful fallback to default
        const locInfo = lookupPincode(DEFAULT_PINCODE);
        setLocation(locInfo);
        addToast('Location access denied. Set to Bengaluru (560001).', 'info');
      },
      { timeout: 8000 }
    );
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isModalOpen,
        setIsModalOpen,
        updatePincode,
        useCurrentLocation,
        isLoadingGeo
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};
