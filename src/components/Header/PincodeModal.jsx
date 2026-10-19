import React, { useState } from 'react';
import { X, MapPin, Navigation, Check } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

export const PincodeModal = () => {
  const { location, isModalOpen, setIsModalOpen, updatePincode, useCurrentLocation, isLoadingGeo } = useLocation();
  const [pinInput, setPinInput] = useState(location?.pincode || '');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = updatePincode(pinInput);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-md shadow-fkModal w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pincode-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2874f0]" />
            <h3 id="pincode-modal-title" className="text-base font-semibold text-[#212121]">
              Choose your delivery location
            </h3>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Enter your 6-digit pincode to check product availability, delivery speed, and available shipping offers in your area.
          </p>

          <form onSubmit={handleSubmit} className="mb-5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ''));
                  setErrorMsg('');
                }}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] tracking-wider font-medium text-gray-800"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2874f0] hover:bg-[#1259c7] text-white text-sm font-semibold rounded transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
            {errorMsg && (
              <p className="text-xs text-red-500 mt-2 font-medium">{errorMsg}</p>
            )}
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-medium">Or</span>
            </div>
          </div>

          {/* Current location button */}
          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={isLoadingGeo}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#2874f0] text-[#2874f0] hover:bg-blue-50 text-sm font-semibold rounded transition-colors disabled:opacity-60"
          >
            <Navigation className={`w-4 h-4 ${isLoadingGeo ? 'animate-spin' : ''}`} />
            {isLoadingGeo ? 'Detecting Location...' : 'Use my current location'}
          </button>

          {/* Current selected info */}
          {location && (
            <div className="mt-5 p-3 bg-gray-50 rounded border border-gray-100 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#388e3c] mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-600">
                <span className="font-semibold text-gray-800">
                  Currently Delivering to: {location.pincode}
                </span>
                <p className="text-gray-500 mt-0.5">
                  {location.area ? `${location.area}, ` : ''}{location.city}, {location.state}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
