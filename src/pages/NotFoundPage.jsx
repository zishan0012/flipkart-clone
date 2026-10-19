import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ShoppingBag } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-12 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#212121]">404</h1>
        <h2 className="text-lg font-bold text-gray-700 mt-2">
          Unfortunately the page you are looking for does not exist
        </h2>
        <p className="text-xs text-gray-500 mt-2">
          The link might be broken, or the page may have been removed. Check the URL or return to Flipkart home.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#2874f0] hover:bg-[#1259c7] text-white text-xs font-bold uppercase rounded-[2px] transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            to="/search?category=all"
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold uppercase rounded-[2px] hover:bg-gray-50 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};
