// Formatting and validation helpers for Flipkart clone

/**
 * Format a number to Indian currency format, e.g. 12999 -> ₹12,999
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
};

/**
 * Format numbers like reviews/ratings count, e.g. 12450 -> 12,450
 */
export const formatNumber = (num) => {
  if (!num || isNaN(num)) return '0';
  return Number(num).toLocaleString('en-IN');
};

/**
 * Validate 6-digit Indian pincode
 */
export const isValidPincode = (pincode) => {
  return /^[1-9][0-9]{5}$/.test(String(pincode).trim());
};

/**
 * Mock database of pincodes to cities in India
 */
export const PINCODE_MAP = {
  '560001': { city: 'Bengaluru', state: 'Karnataka', area: 'MG Road / Central' },
  '560034': { city: 'Bengaluru', state: 'Karnataka', area: 'Koramangala' },
  '560100': { city: 'Bengaluru', state: 'Karnataka', area: 'Electronic City' },
  '110001': { city: 'New Delhi', state: 'Delhi', area: 'Connaught Place' },
  '110020': { city: 'New Delhi', state: 'Delhi', area: 'Okhla' },
  '400001': { city: 'Mumbai', state: 'Maharashtra', area: 'Fort / South Mumbai' },
  '400050': { city: 'Mumbai', state: 'Maharashtra', area: 'Bandra' },
  '700001': { city: 'Kolkata', state: 'West Bengal', area: 'BBD Bagh' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', area: 'George Town' },
  '500001': { city: 'Hyderabad', state: 'Telangana', area: 'Afzal Gunj' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', area: 'Bhadra' },
  '411001': { city: 'Pune', state: 'Maharashtra', area: 'Camp / Station' },
  '201301': { city: 'Noida', state: 'Uttar Pradesh', area: 'Sector 1' },
  '122001': { city: 'Gurugram', state: 'Haryana', area: 'Old Railway Road' },
  '302001': { city: 'Jaipur', state: 'Rajasthan', area: 'MI Road' },
  '842002': { city: 'Muzaffarpur', state: 'Bihar', area: 'Chakbhikhi / Meer Razzak Chowk' },
  '822002': { city: 'Muzaffarpur', state: 'Bihar', area: 'Chakbhikhi' }
};

/**
 * Lookup location details from pincode with fallback
 */
export const lookupPincode = (pincode) => {
  const pin = String(pincode).trim();
  if (PINCODE_MAP[pin]) {
    return {
      pincode: pin,
      ...PINCODE_MAP[pin],
      isDeliverable: true
    };
  }
  
  if (isValidPincode(pin)) {
    // Generate pseudo city for any valid 6 digit
    return {
      pincode: pin,
      city: 'Hub Delivery Location',
      state: 'India',
      area: 'Standard Express Zone',
      isDeliverable: true
    };
  }

  return null;
};

/**
 * Estimated delivery date string calculation
 */
export const getEstimatedDelivery = (daysOffset = 2) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateStr = d.toLocaleDateString('en-IN', options);
  return `Delivery by ${dateStr} | ₹40 Free`;
};
