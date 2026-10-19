import React from 'react';
import { HelpCircle, Star, Gift, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white text-xs mt-12 border-t border-gray-800">
      {/* Top Main Footer Section */}
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          
          {/* Column 1: ABOUT */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-3 tracking-wider text-[11px] uppercase">
              About
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#careers" className="hover:underline">Careers</a></li>
              <li><a href="#stories" className="hover:underline">Flipkart Stories</a></li>
              <li><a href="#press" className="hover:underline">Press</a></li>
              <li><a href="#wholesale" className="hover:underline">Flipkart Wholesale</a></li>
              <li><a href="#corporate" className="hover:underline">Corporate Information</a></li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-3 tracking-wider text-[11px] uppercase">
              Help
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#payments" className="hover:underline">Payments</a></li>
              <li><a href="#shipping" className="hover:underline">Shipping</a></li>
              <li><a href="#cancellation" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
              <li><a href="#report" className="hover:underline">Report Infringement</a></li>
            </ul>
          </div>

          {/* Column 3: CONSUMER POLICY */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-3 tracking-wider text-[11px] uppercase">
              Consumer Policy
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#returns" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#terms" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#security" className="hover:underline">Security</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy</a></li>
              <li><a href="#sitemap" className="hover:underline">Sitemap</a></li>
              <li><a href="#grievance" className="hover:underline">Grievance Redressal</a></li>
              <li><a href="#epr" className="hover:underline">EPR Compliance</a></li>
            </ul>
          </div>

          {/* Column 4: SOCIAL */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-3 tracking-wider text-[11px] uppercase">
              Social
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter / X</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline">YouTube</a></li>
            </ul>
          </div>

          {/* Column 5: Mail Us (with left border on desktop) */}
          <div className="lg:border-l lg:border-gray-700 lg:pl-6">
            <h4 className="text-gray-400 font-semibold mb-3 tracking-wider text-[11px] uppercase">
              Mail Us:
            </h4>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>

          {/* Column 6: Registered Office Address */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-3 tracking-wider text-[11px] uppercase">
              Registered Office Address:
            </h4>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              CIN: U51109KA2012PTC066107<br />
              Telephone: <a href="tel:04445614700" className="text-[#2874f0]">044-45614700</a>
            </p>
          </div>

        </div>
      </div>

      {/* Feature Strip & Payment Badges */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-xs">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#ffe500]" />
                <span>Become a Seller</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#ffe500]" />
                <span>Advertise</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#ffe500]" />
                <span>Gift Cards</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#ffe500]" />
                <span>Help Center</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-[11px]">
              © 2007-2026 Flipkart.com Clone (Portfolio & Educational Demo)
            </div>

            {/* Payment Method Badges */}
            <div className="flex items-center gap-2 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="px-2 py-0.5 bg-white text-gray-800 text-[10px] font-bold rounded">VISA</span>
              <span className="px-2 py-0.5 bg-white text-red-600 text-[10px] font-bold rounded">Mastercard</span>
              <span className="px-2 py-0.5 bg-white text-blue-600 text-[10px] font-bold rounded">RuPay</span>
              <span className="px-2 py-0.5 bg-white text-green-700 text-[10px] font-bold rounded">UPI</span>
              <span className="px-2 py-0.5 bg-white text-orange-600 text-[10px] font-bold rounded">NetBanking</span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};
