import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Plus, Trash2, Edit3, Shield, Award, Sparkles, LogOut } from 'lucide-react';
import { isValidPincode, lookupPincode } from '../utils/formatters';

export const ProfilePage = () => {
  const { user, logout, addresses, addAddress, deleteAddress, setIsAuthModalOpen, setAuthRedirectPath } = useAuth();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'addresses', 'pan'
  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [addrForm, setAddrForm] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    type: 'Home'
  });
  const [errorMsg, setErrorMsg] = useState('');

  if (!user) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Please log in to view your profile</h2>
        <p className="text-xs text-gray-500 mt-1">Access your saved addresses, SuperCoins, and personal info</p>
        <button
          onClick={() => {
            setAuthRedirectPath('/profile');
            setIsAuthModalOpen(true);
          }}
          className="mt-4 px-8 py-2.5 bg-[#2874f0] text-white text-xs font-bold uppercase rounded-[2px]"
        >
          Login
        </button>
      </div>
    );
  }

  const handlePincodeChange = (pin) => {
    const clean = pin.replace(/\D/g, '');
    setAddrForm((prev) => {
      const updated = { ...prev, pincode: clean };
      if (isValidPincode(clean)) {
        const info = lookupPincode(clean);
        updated.city = info.city;
        updated.state = info.state;
      }
      return updated;
    });
  };

  const handleSaveAddr = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!addrForm.name.trim() || !addrForm.phone.trim() || !addrForm.pincode.trim() || !addrForm.address.trim()) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }
    if (!isValidPincode(addrForm.pincode)) {
      setErrorMsg('Please enter a valid 6-digit pincode.');
      return;
    }

    addAddress(addrForm);
    setIsAddingAddr(false);
    setAddrForm({
      name: '',
      phone: '',
      pincode: '',
      locality: '',
      address: '',
      city: '',
      state: '',
      type: 'Home'
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Left Side: User Profile Header + Nav Tabs */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-4">
          {/* User Card */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2874f0] text-white font-bold text-lg flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-gray-400">Hello,</span>
              <h2 className="text-sm font-bold text-gray-900 truncate">{user.name}</h2>
              {user.plusMember && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2874f0]">
                  <Sparkles className="w-3 h-3 text-[#ff9f00] fill-current" /> Plus Member
                </span>
              )}
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'profile' ? 'bg-blue-50 text-[#2874f0] font-bold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4 text-[#2874f0]" />
              <span>Profile Information</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'addresses' ? 'bg-blue-50 text-[#2874f0] font-bold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#2874f0]" />
              <span>Manage Addresses</span>
            </button>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* SuperCoins Box */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white rounded-sm p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/60">Balance</span>
                <p className="text-2xl font-black text-gray-900">{user.superCoins} SuperCoins</p>
              </div>
              <Award className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-[11px] text-gray-900 mt-2">
              Use SuperCoins at checkout for instant discounts!
            </p>
          </div>
        </div>

        {/* Right Side: Tab Contents */}
        <div className="flex-1 w-full bg-white rounded-sm shadow-sm border border-gray-100 p-4 sm:p-6">
          
          {/* TAB 1: Profile Information */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    readOnly
                    value={user.name}
                    className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded text-gray-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    readOnly
                    value={user.phone}
                    className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded text-gray-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Email Address</label>
                  <input
                    type="text"
                    readOnly
                    value={user.email}
                    className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded text-gray-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Member Since</label>
                  <input
                    type="text"
                    readOnly
                    value={user.joinedDate || 'October 2023'}
                    className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded text-gray-800 font-medium"
                  />
                </div>
              </div>

              {/* FAQs */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Account FAQs
                </h4>
                <div className="space-y-3 text-xs text-gray-600">
                  <div>
                    <h5 className="font-semibold text-gray-800">What happens when I update my email address?</h5>
                    <p className="mt-0.5">Your login email ID changes. You will receive all account-related communications at your updated address.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800">When will my Flipkart account be updated with the new mobile number?</h5>
                    <p className="mt-0.5">It happens immediately after verification via OTP sent to your new mobile number.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Manage Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">
                  Manage Addresses ({addresses.length})
                </h3>
                {!isAddingAddr && (
                  <button
                    onClick={() => setIsAddingAddr(true)}
                    className="px-4 py-2 border border-[#2874f0] text-[#2874f0] text-xs font-bold uppercase rounded-[2px] hover:bg-blue-50 flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add A New Address</span>
                  </button>
                )}
              </div>

              {/* New Address Form */}
              {isAddingAddr && (
                <form onSubmit={handleSaveAddr} className="p-4 bg-gray-50 border border-gray-200 rounded space-y-4 text-xs">
                  <h4 className="font-bold text-gray-800 uppercase tracking-wider">
                    Add A New Address
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1">Name *</label>
                      <input
                        type="text"
                        value={addrForm.name}
                        onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2874f0]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">10-digit Mobile *</label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={addrForm.phone}
                        onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2874f0]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1">Pincode *</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={addrForm.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2874f0]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">City *</label>
                      <input
                        type="text"
                        value={addrForm.city}
                        onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2874f0]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">State *</label>
                      <input
                        type="text"
                        value={addrForm.state}
                        onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2874f0]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">Address (House No, Building, Street) *</label>
                    <input
                      type="text"
                      value={addrForm.address}
                      onChange={(e) => setAddrForm({ ...addrForm, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2874f0]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">Locality</label>
                    <input
                      type="text"
                      value={addrForm.locality}
                      onChange={(e) => setAddrForm({ ...addrForm, locality: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2874f0]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-red-600 bg-red-50 p-2 rounded">{errorMsg}</p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#2874f0] text-white font-bold uppercase rounded-[2px]"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddr(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-[2px]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* List of existing addresses */}
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 border border-gray-200 rounded flex items-start justify-between hover:border-gray-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{addr.name}</span>
                        <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {addr.type}
                        </span>
                        <span className="text-xs font-semibold text-gray-700">{addr.phone}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {addr.address}, {addr.locality ? `${addr.locality}, ` : ''}{addr.city}, {addr.state} -{' '}
                        <strong>{addr.pincode}</strong>
                      </p>
                      {addr.isDefault && (
                        <span className="inline-block mt-2 text-[10px] text-[#388e3c] font-bold uppercase bg-green-50 px-2 py-0.5 rounded">
                          Default Address
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
