import React, { useMemo } from 'react';
import { HeroCarousel } from '../components/Home/HeroCarousel';
import { PromoGrid } from '../components/Home/PromoGrid';
import { DealSlider } from '../components/Common/DealSlider';
import { ProductCard } from '../components/Common/ProductCard';
import { PRODUCTS } from '../data/products';
import { Sparkles, Zap, Flame, ShieldAlert, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  // Sliced data sets for deal sliders
  const dealsOfTheDay = useMemo(() => {
    return PRODUCTS.filter((p) => p.discount >= 30).slice(0, 10);
  }, []);

  const bestElectronics = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'electronics' || p.category === 'mobiles').slice(0, 8);
  }, []);

  const trendingFashion = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'fashion').slice(0, 8);
  }, []);

  const homeEssentials = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'home' || p.category === 'appliances').slice(0, 8);
  }, []);

  const beautyPicks = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'beauty').slice(0, 8);
  }, []);

  const recommendedProducts = useMemo(() => {
    return PRODUCTS.slice(8, 20);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <div className="max-w-[1280px] mx-auto px-2 sm:px-4 pt-2 sm:pt-3">
        <HeroCarousel />
      </div>

      <div className="max-w-[1280px] mx-auto px-2 sm:px-4">
        {/* Deals of the Day (With countdown timer & Flipkart styling) */}
        <DealSlider
          title="Deals of the Day"
          subtitle="Top discounts updated every 24 hours"
          products={dealsOfTheDay}
          viewAllLink="/search?filter=deals"
          hasTimer={true}
          timerHours={12}
          timerMinutes={45}
          timerSeconds={18}
          adBanner={{
            title: 'Big Savings on Gadgets',
            subtitle: 'Extra 10% instant off on HDFC & Axis bank cards'
          }}
        />

        {/* Promo Grid (3 Banners) */}
        <PromoGrid />

        {/* Best of Electronics Slider */}
        <DealSlider
          title="Best of Electronics"
          subtitle="Top rated laptops, sound systems & accessories"
          products={bestElectronics}
          viewAllLink="/search?category=electronics"
        />

        {/* Trending Fashion Slider */}
        <DealSlider
          title="Trending Fashion"
          subtitle="Min 40% - 70% Off on Men & Women Clothing"
          products={trendingFashion}
          viewAllLink="/search?category=fashion"
        />

        {/* Home & Furniture Essentials */}
        <DealSlider
          title="Home & Kitchen Essentials"
          subtitle="Mattresses, cookware, smart lights & more"
          products={homeEssentials}
          viewAllLink="/search?category=home"
        />

        {/* Middle Feature Banner */}
        <div className="my-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-sm p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Award className="w-7 h-7 text-[#ffe500]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Flipkart Plus Membership</h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Earn 4 SuperCoins for every ₹100 spent. Enjoy free & early delivery on all Assured products!
              </p>
            </div>
          </div>
          <Link
            to="/search?category=top-offers"
            className="px-5 py-2 bg-[#ffe500] hover:bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold rounded-[2px] transition-colors whitespace-nowrap shadow-sm"
          >
            Explore Plus Zone
          </Link>
        </div>

        {/* Beauty Picks Slider */}
        <DealSlider
          title="Beauty & Grooming Picks"
          subtitle="Skin care, fragrances, hair styling & grooming tools"
          products={beautyPicks}
          viewAllLink="/search?category=beauty"
        />

        {/* Recommended Products Grid */}
        <div className="bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-4 my-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#212121]">
                Suggested For You
              </h2>
              <p className="text-xs text-[#878787]">
                Based on your browsing activity & best selling items
              </p>
            </div>
            <Link
              to="/search?category=all"
              className="text-xs font-bold text-[#2874f0] hover:underline"
            >
              View More →
            </Link>
          </div>

          {/* Responsive Grid: 2 cols mobile -> 3 cols tablet -> 4-5 desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
