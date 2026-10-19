import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  CheckCircle2, 
  MapPin, 
  Plus, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Building2, 
  Check, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice, isValidPincode, lookupPincode } from '../utils/formatters';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, addresses, addAddress, placeOrder, setIsAuthModalOpen, setAuthRedirectPath } = useAuth();
  const { cartItems, cartSummary, clearCart } = useCart();

  // Active step: 1 (Login), 2 (Address), 3 (Order Summary), 4 (Payment), 5 (Confirmed)
  const [activeStep, setActiveStep] = useState(user ? 2 : 1);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // New address form state
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
  const [addrError, setAddrError] = useState('');

  // Payment method: 'upi', 'card', 'netbanking', 'cod'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (!user) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      setActiveStep(2);
    }
  }, [user]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  // If cart is empty and no confirmed order, redirect to cart
  if (cartItems.length === 0 && !confirmedOrder) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add items to your cart before proceeding to checkout.</p>
        <Link to="/" className="inline-block mt-4 px-6 py-2 bg-[#2874f0] text-white font-bold rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Handle auto-fill city/state when pincode is entered
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

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setAddrError('');

    if (!addrForm.name.trim() || !addrForm.phone.trim() || !addrForm.pincode.trim() || !addrForm.address.trim()) {
      setAddrError('Please fill in all mandatory fields.');
      return;
    }

    if (!isValidPincode(addrForm.pincode)) {
      setAddrError('Please enter a valid 6-digit pincode.');
      return;
    }

    if (addrForm.phone.trim().length !== 10) {
      setAddrError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const saved = addAddress(addrForm);
    setSelectedAddressId(saved.id);
    setIsAddingNewAddress(false);
  };

  const handleSelectDeliveryAddress = () => {
    if (!selectedAddressId) {
      alert('Please choose a delivery address.');
      return;
    }
    setActiveStep(3);
  };

  const handleFinalPayment = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

    // Simulate 1s bank gateway processing
    setTimeout(() => {
      const order = placeOrder({
        items: cartItems,
        summary: cartSummary,
        shippingAddress: selectedAddr,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: 'PAID'
      });

      setConfirmedOrder(order);
      clearCart();
      setIsProcessingPayment(false);
      setActiveStep(5);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }
    }, 1200);
  };

  // Step 5: ORDER CONFIRMATION SCREEN
  if (activeStep === 5 && confirmedOrder) {
    return (
      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="bg-white rounded-sm shadow-sm p-6 sm:p-10 border border-gray-100 text-center">
          
          <div className="w-20 h-20 bg-green-50 text-[#388e3c] rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold text-[#388e3c] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
            Order Placed Successfully!
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            Thank You For Your Order!
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Confirmation email & SMS have been sent to <strong>{user?.email || user?.phone}</strong>
          </p>

          <div className="bg-blue-50/70 border border-blue-100 rounded p-4 max-w-md mx-auto my-6 text-left text-xs">
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Order ID:</span>
              <span className="font-bold text-gray-900">{confirmedOrder.id}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Payment Mode:</span>
              <span className="font-bold text-gray-900">{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Total Amount Paid:</span>
              <span className="font-bold text-[#388e3c] text-sm">
                {formatPrice(confirmedOrder.summary?.finalAmount)}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Deliver To:</span>
              <span className="font-semibold text-gray-800 text-right">
                {confirmedOrder.shippingAddress?.name}, {confirmedOrder.shippingAddress?.city} ({confirmedOrder.shippingAddress?.pincode})
              </span>
            </div>
          </div>

          {/* Purchased Items Preview */}
          <div className="border border-gray-100 rounded divide-y divide-gray-100 max-w-xl mx-auto mb-6 text-left text-xs">
            {confirmedOrder.items?.map((it, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={it.image} alt="" className="w-10 h-10 object-contain rounded" />
                  <div>
                    <p className="font-medium text-gray-800 truncate max-w-xs">{it.title}</p>
                    <span className="text-gray-500">Qty: {it.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-gray-900">{formatPrice(it.price * it.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/orders"
              className="px-8 py-3 bg-[#2874f0] hover:bg-[#1259c7] text-white text-xs font-bold uppercase rounded-[2px] shadow-sm tracking-wide transition-colors"
            >
              Track Order Status
            </Link>
            <Link
              to="/"
              className="px-8 py-3 bg-[#fb641b] hover:bg-[#e25512] text-white text-xs font-bold uppercase rounded-[2px] shadow-sm tracking-wide transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column: Multi-step Accordion */}
        <div className="flex-1 w-full space-y-4">
          
          {/* STEP 1: LOGIN CHECK */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-[#2874f0] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    Login
                  </h3>
                  {user && (
                    <p className="text-xs font-semibold text-gray-900 mt-0.5">
                      {user.name} <span className="text-gray-500">({user.email || user.phone})</span>
                    </p>
                  )}
                </div>
              </div>

              {user ? (
                <div className="flex items-center gap-1 text-[#388e3c] text-xs font-bold">
                  <Check className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthRedirectPath('/checkout');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-5 py-1.5 border border-[#2874f0] text-[#2874f0] text-xs font-bold uppercase rounded-[2px] hover:bg-blue-50"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* STEP 2: DELIVERY ADDRESS */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className={`p-4 flex items-center justify-between ${activeStep === 2 ? 'bg-[#2874f0] text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${activeStep === 2 ? 'bg-white text-[#2874f0]' : 'bg-[#2874f0] text-white'}`}>
                  2
                </span>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${activeStep === 2 ? 'text-white' : 'text-gray-500'}`}>
                  Delivery Address
                </h3>
              </div>
              {activeStep > 2 && (
                <button
                  onClick={() => setActiveStep(2)}
                  className="text-xs font-bold text-[#2874f0] uppercase hover:underline"
                >
                  Change
                </button>
              )}
            </div>

            {/* Address Content */}
            {activeStep === 2 && (
              <div className="p-4 sm:p-6 divide-y divide-gray-100 space-y-4">
                
                {/* Saved addresses radio list */}
                {!isAddingNewAddress && (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded border transition-all cursor-pointer ${
                          selectedAddressId === addr.id
                            ? 'border-[#2874f0] bg-blue-50/40 ring-1 ring-[#2874f0]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === addr.id}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="mt-1 text-[#2874f0] focus:ring-[#2874f0]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-gray-900">{addr.name}</span>
                                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded">
                                  {addr.type}
                                </span>
                                <span className="text-xs text-gray-600 font-semibold">{addr.phone}</span>
                              </div>
                              <p className="text-xs text-gray-700 mt-1">
                                {addr.address}, {addr.locality}, {addr.city}, {addr.state} -{' '}
                                <strong className="text-gray-900">{addr.pincode}</strong>
                              </p>

                              {selectedAddressId === addr.id && (
                                <button
                                  type="button"
                                  onClick={handleSelectDeliveryAddress}
                                  className="mt-3 px-6 py-2.5 bg-[#fb641b] hover:bg-[#e25512] text-white text-xs font-bold uppercase rounded-[2px] shadow-sm tracking-wide"
                                >
                                  Deliver Here
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add new address button */}
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(true)}
                      className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-[#2874f0] rounded text-[#2874f0] font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add a new delivery address</span>
                    </button>
                  </div>
                )}

                {/* Add new address form */}
                {isAddingNewAddress && (
                  <form onSubmit={handleSaveAddress} className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Add New Address
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={addrForm.name}
                          onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">10-digit Mobile Number *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={addrForm.phone}
                          onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                          placeholder="Mobile"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Pincode *</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={addrForm.pincode}
                          onChange={(e) => handlePincodeChange(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                          placeholder="6-digit Pincode"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">City / District *</label>
                        <input
                          type="text"
                          value={addrForm.city}
                          onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">State *</label>
                        <input
                          type="text"
                          value={addrForm.state}
                          onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                          placeholder="State"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Flat, House no., Building, Apartment *</label>
                      <input
                        type="text"
                        value={addrForm.address}
                        onChange={(e) => setAddrForm({ ...addrForm, address: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                        placeholder="Street Address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Locality / Area / Landmark</label>
                      <input
                        type="text"
                        value={addrForm.locality}
                        onChange={(e) => setAddrForm({ ...addrForm, locality: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                        placeholder="Locality"
                      />
                    </div>

                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Address Type</span>
                      <div className="flex items-center gap-4 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="addrType"
                            checked={addrForm.type === 'Home'}
                            onChange={() => setAddrForm({ ...addrForm, type: 'Home' })}
                          />
                          <span>Home (All day delivery)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="addrType"
                            checked={addrForm.type === 'Work'}
                            onChange={() => setAddrForm({ ...addrForm, type: 'Work' })}
                          />
                          <span>Work (Delivery between 10 AM - 5 PM)</span>
                        </label>
                      </div>
                    </div>

                    {addrError && (
                      <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{addrError}</p>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#fb641b] text-white text-xs font-bold uppercase rounded-[2px]"
                      >
                        Save and Deliver Here
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(false)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-[2px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: ORDER SUMMARY */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className={`p-4 flex items-center justify-between ${activeStep === 3 ? 'bg-[#2874f0] text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${activeStep === 3 ? 'bg-white text-[#2874f0]' : 'bg-[#2874f0] text-white'}`}>
                  3
                </span>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${activeStep === 3 ? 'text-white' : 'text-gray-500'}`}>
                  Order Summary ({cartSummary.totalItemsCount} items)
                </h3>
              </div>
              {activeStep > 3 && (
                <button
                  onClick={() => setActiveStep(3)}
                  className="text-xs font-bold text-[#2874f0] uppercase hover:underline"
                >
                  Change
                </button>
              )}
            </div>

            {activeStep === 3 && (
              <div className="p-4 sm:p-6 divide-y divide-gray-100 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cartKey} className="flex items-center justify-between gap-4 py-2">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-14 h-14 object-contain rounded border p-1" />
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 truncate max-w-sm">{item.title}</h4>
                        <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <div className="pt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Order confirmation email will be sent to <strong>{user?.email}</strong>
                  </p>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-8 py-3 bg-[#fb641b] hover:bg-[#e25512] text-white text-xs font-bold uppercase rounded-[2px] shadow-sm tracking-wide"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: PAYMENT OPTIONS */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className={`p-4 flex items-center justify-between ${activeStep === 4 ? 'bg-[#2874f0] text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${activeStep === 4 ? 'bg-white text-[#2874f0]' : 'bg-[#2874f0] text-white'}`}>
                  4
                </span>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${activeStep === 4 ? 'text-white' : 'text-gray-500'}`}>
                  Payment Options
                </h3>
              </div>
            </div>

            {activeStep === 4 && (
              <div className="p-4 sm:p-6 divide-y divide-gray-100 space-y-4">
                {/* UPI Option */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 text-[#2874f0]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#2874f0]" />
                        <span className="font-bold text-xs text-gray-900">UPI (Google Pay, PhonePe, BHIM)</span>
                      </div>
                      {paymentMethod === 'upi' && (
                        <div className="mt-3 bg-gray-50 p-3 rounded space-y-2">
                          <input
                            type="text"
                            placeholder="Enter UPI ID (e.g. mobile@upi)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none"
                          />
                          <p className="text-[11px] text-gray-400">
                            Mock UPI: Enter any test ID to simulate instant payment
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Credit/Debit Card Option */}
                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 text-[#2874f0]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#2874f0]" />
                        <span className="font-bold text-xs text-gray-900">Credit / Debit / ATM Card</span>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="mt-3 bg-gray-50 p-3 rounded space-y-2.5">
                          <input
                            type="text"
                            placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="MM / YY"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              className="px-3 py-1.5 text-xs border border-gray-300 rounded"
                            />
                            <input
                              type="password"
                              maxLength={3}
                              placeholder="CVV"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              className="px-3 py-1.5 text-xs border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Net Banking */}
                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="mt-1 text-[#2874f0]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2874f0]" />
                        <span className="font-bold text-xs text-gray-900">Net Banking (HDFC, SBI, ICICI, Axis)</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Cash on Delivery */}
                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-[#2874f0]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#388e3c]" />
                        <span className="font-bold text-xs text-gray-900">Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Pay cash or UPI on delivery to the agent.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Pay Button */}
                <div className="pt-6">
                  <button
                    onClick={handleFinalPayment}
                    disabled={isProcessingPayment}
                    className="w-full sm:w-auto px-10 py-3.5 bg-[#fb641b] hover:bg-[#e25512] text-white text-sm font-bold uppercase rounded-[2px] shadow-sm tracking-wide transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <span>Processing Secure Order...</span>
                    ) : (
                      <span>Pay {formatPrice(cartSummary.finalAmount)} & Confirm Order</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Price Details */}
        <div className="w-full lg:w-96 flex-shrink-0 lg:sticky lg:top-20">
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Price Details
              </h4>
            </div>

            <div className="p-4 space-y-3 text-xs text-gray-700">
              <div className="flex items-center justify-between">
                <span>Price ({cartSummary.totalItemsCount} items)</span>
                <span>{formatPrice(cartSummary.totalMrp)}</span>
              </div>
              <div className="flex items-center justify-between text-[#388e3c]">
                <span>Discount</span>
                <span>- {formatPrice(cartSummary.baseDiscount)}</span>
              </div>
              {cartSummary.promoSavings > 0 && (
                <div className="flex items-center justify-between text-[#388e3c]">
                  <span>Promo Savings</span>
                  <span>- {formatPrice(cartSummary.promoSavings)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#388e3c] font-semibold">FREE</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 flex items-center justify-between text-base font-bold text-gray-900">
                <span>Total Payable</span>
                <span>{formatPrice(cartSummary.finalAmount)}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <span>Safe and Secure Payments. 100% Authentic Guarantee.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
