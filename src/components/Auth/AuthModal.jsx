import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authRedirectPath,
    setAuthRedirectPath,
    loginWithPassword,
    loginWithOtp,
    signup
  } = useAuth();

  const navigate = useNavigate();

  // Mode: 'login-password', 'login-otp', 'signup'
  const [mode, setMode] = useState('login-password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [showPassword, setShowPassword] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Handle 30s resend timer
  useEffect(() => {
    let interval = null;
    if (mode === 'login-otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, otpTimer]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMessage('');
  };

  const handlePostAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (authRedirectPath) {
      navigate(authRedirectPath);
      setAuthRedirectPath(null);
    }
  };

  const handleLoginPassword = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier.trim()) {
      setErrorMessage('Please enter email or mobile number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const res = loginWithPassword(identifier.trim(), password);
    if (res.success) {
      handlePostAuthSuccess();
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      setErrorMessage('Please enter your registered email or mobile number first.');
      return;
    }
    setErrorMessage('');
    setMode('login-otp');
    setOtpTimer(30);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!otp.trim()) {
      setErrorMessage('Please enter the 6-digit OTP.');
      return;
    }
    const res = loginWithOtp(identifier.trim(), otp.trim());
    if (res.success) {
      handlePostAuthSuccess();
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signupName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!signupPhone.trim() || signupPhone.trim().length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const res = signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword
    });

    if (res.success) {
      handlePostAuthSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-sm shadow-fkModal w-full max-w-2xl overflow-hidden flex flex-col md:flex-row relative min-h-[480px] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full p-1"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Blue Panel */}
        <div className="bg-[#2874f0] text-white p-8 md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              {mode === 'signup' ? "Looks like you're new here!" : 'Login'}
            </h2>
            <p className="text-sm text-blue-100 font-normal leading-relaxed">
              {mode === 'signup'
                ? 'Sign up with your mobile number and email to get started'
                : 'Get access to your Orders, Wishlist and Recommendations'}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center pt-8">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-12 h-12 text-[#ffe500]" />
            </div>
            <span className="text-xs text-blue-100 mt-4 text-center">
              100% Safe and Secure Flipkart Experience
            </span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 md:w-3/5 flex flex-col justify-between bg-white">
          <div>
            {/* Mode 1: Login with Password */}
            {mode === 'login-password' && (
              <form onSubmit={handleLoginPassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Enter Email / Mobile number
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or user@example.com"
                    className="w-full border-b-2 border-gray-300 focus:border-[#2874f0] py-2 px-1 text-sm outline-none transition-colors text-gray-900"
                    autoFocus
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Enter Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border-b-2 border-gray-300 focus:border-[#2874f0] py-2 px-1 text-sm outline-none transition-colors text-gray-900 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-7 text-gray-400 hover:text-gray-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {errorMessage && (
                  <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <p className="text-[11px] text-gray-500 leading-normal">
                  By continuing, you agree to Flipkart's{' '}
                  <span className="text-[#2874f0] font-medium cursor-pointer">Terms of Use</span> and{' '}
                  <span className="text-[#2874f0] font-medium cursor-pointer">Privacy Policy</span>.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#fb641b] hover:bg-[#e25512] text-white text-sm font-semibold rounded-[2px] shadow-sm transition-colors uppercase tracking-wide"
                >
                  Login
                </button>

                <div className="text-center">
                  <span className="text-xs text-gray-400 font-medium">OR</span>
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3 bg-white text-[#2874f0] border border-gray-300 hover:shadow-sm text-sm font-semibold rounded-[2px] transition-all"
                >
                  Request OTP
                </button>
              </form>
            )}

            {/* Mode 2: Login with OTP */}
            {mode === 'login-otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="bg-blue-50 p-3 rounded text-xs text-[#2874f0] border border-blue-100 flex items-center justify-between">
                  <span>
                    OTP sent to: <strong>{identifier}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode('login-password')}
                    className="underline text-xs hover:text-blue-800"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Enter OTP (Mock Code: <strong>123456</strong>)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full border-b-2 border-gray-300 focus:border-[#2874f0] py-2 px-1 text-center tracking-[8px] font-bold text-lg outline-none text-gray-900"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  {otpTimer > 0 ? (
                    <span className="text-gray-500">Resend OTP in {otpTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpTimer(30);
                        setErrorMessage('');
                      }}
                      className="text-[#2874f0] font-semibold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMode('login-password')}
                    className="text-gray-500 hover:text-gray-700 font-medium"
                  >
                    Use Password instead
                  </button>
                </div>

                {errorMessage && (
                  <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#fb641b] hover:bg-[#e25512] text-white text-sm font-semibold rounded-[2px] shadow-sm transition-colors uppercase tracking-wide"
                >
                  Verify & Proceed
                </button>
              </form>
            )}

            {/* Mode 3: Sign Up */}
            {mode === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full border-b border-gray-300 focus:border-[#2874f0] py-1.5 px-1 text-sm outline-none text-gray-900"
                    autoFocus
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full border-b border-gray-300 focus:border-[#2874f0] py-1.5 px-1 text-sm outline-none text-gray-900"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit Mobile Number"
                    className="w-full border-b border-gray-300 focus:border-[#2874f0] py-1.5 px-1 text-sm outline-none text-gray-900"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Set Password (min 6 characters)"
                    className="w-full border-b border-gray-300 focus:border-[#2874f0] py-1.5 px-1 text-sm outline-none text-gray-900 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-2 text-gray-400"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div>
                  <input
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full border-b border-gray-300 focus:border-[#2874f0] py-1.5 px-1 text-sm outline-none text-gray-900"
                  />
                </div>

                {errorMessage && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <p className="text-[11px] text-gray-500 leading-tight">
                  By clicking Continue, you agree to Flipkart's Terms of Use & Privacy Policy.
                </p>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#fb641b] hover:bg-[#e25512] text-white text-sm font-semibold rounded-[2px] shadow-sm transition-colors uppercase tracking-wide"
                >
                  Continue
                </button>
              </form>
            )}
          </div>

          {/* Bottom Switcher */}
          <div className="pt-6 border-t border-gray-100 text-center">
            {mode === 'signup' ? (
              <p className="text-xs text-gray-600">
                Existing User?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login-password');
                    setErrorMessage('');
                  }}
                  className="text-[#2874f0] font-semibold hover:underline"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p className="text-xs text-gray-600">
                New to Flipkart?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                  }}
                  className="text-[#2874f0] font-semibold hover:underline"
                >
                  Create an account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
