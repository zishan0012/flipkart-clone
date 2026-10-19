import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { FilterSidebar } from '../components/Listing/FilterSidebar';
import { ProductCard } from '../components/Common/ProductCard';
import { Filter, SlidersHorizontal, ChevronRight, Grid, List, SearchX } from 'lucide-react';

export const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const subParam = searchParams.get('sub') || '';
  const filterParam = searchParams.get('filter') || '';

  // Sort: 'relevance', 'price_asc', 'price_desc', 'popularity', 'rating'
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Filter state
  const [filters, setFilters] = useState({
    maxPrice: 150000,
    brands: [],
    minRating: 0,
    minDiscount: 0,
    assuredOnly: false,
    inStockOnly: false
  });

  // Reset page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [queryParam, categoryParam, subParam, filterParam]);

  // Base dataset matching query / category / subcategory
  const baseProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (categoryParam && categoryParam !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === categoryParam.toLowerCase());
    }

    if (queryParam) {
      const q = queryParam.toLowerCase().trim();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.highlights && p.highlights.some((h) => h.toLowerCase().includes(q)))
      );
    }

    if (filterParam === 'deals') {
      list = list.filter((p) => p.discount >= 30);
    }

    return list;
  }, [categoryParam, queryParam, filterParam]);

  // Available brands in the filtered subset
  const availableBrands = useMemo(() => {
    const brandSet = new Set();
    baseProducts.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, [baseProducts]);

  // Maximum price in base dataset
  const maxPriceLimit = useMemo(() => {
    if (baseProducts.length === 0) return 150000;
    return Math.max(...baseProducts.map((p) => p.price), 5000);
  }, [baseProducts]);

  // Apply active filters
  const filteredProducts = useMemo(() => {
    let result = baseProducts.filter((product) => {
      // Price
      if (product.price > filters.maxPrice) return false;

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Discount
      if (filters.minDiscount > 0 && product.discount < filters.minDiscount) {
        return false;
      }

      // Assured
      if (filters.assuredOnly && !product.assured) {
        return false;
      }

      // Stock
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [baseProducts, filters, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const pageTitle = queryParam
    ? `Results for "${queryParam}"`
    : categoryParam
    ? `${categoryParam.toUpperCase()} Store`
    : 'All Products';

  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-3 sm:py-4">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
        <Link to="/" className="hover:text-[#2874f0]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        {categoryParam && (
          <>
            <span className="capitalize">{categoryParam}</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </>
        )}
        <span className="text-gray-800 font-medium truncate max-w-xs">{pageTitle}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Left Filter Sidebar - Desktop */}
        <div className="hidden lg:block w-72 flex-shrink-0 sticky top-20">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            availableBrands={availableBrands}
            maxPriceLimit={maxPriceLimit}
          />
        </div>

        {/* Right Main Content */}
        <div className="flex-1 w-full bg-white rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-3 sm:p-4">
          {/* Top Sort & Header Row */}
          <div className="pb-3 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-xs text-gray-500">
                (Showing {(currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products)
              </p>
            </div>

            {/* Sort Options (Flipkart Style) */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar text-xs">
              <span className="font-bold text-gray-800 flex-shrink-0 hidden sm:inline">Sort By</span>
              <button
                onClick={() => setSortBy('relevance')}
                className={`py-1 px-2.5 rounded-[2px] transition-colors whitespace-nowrap ${
                  sortBy === 'relevance'
                    ? 'font-bold text-[#2874f0] border-b-2 border-[#2874f0]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Relevance
              </button>
              <button
                onClick={() => setSortBy('popularity')}
                className={`py-1 px-2.5 rounded-[2px] transition-colors whitespace-nowrap ${
                  sortBy === 'popularity'
                    ? 'font-bold text-[#2874f0] border-b-2 border-[#2874f0]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Popularity
              </button>
              <button
                onClick={() => setSortBy('price_asc')}
                className={`py-1 px-2.5 rounded-[2px] transition-colors whitespace-nowrap ${
                  sortBy === 'price_asc'
                    ? 'font-bold text-[#2874f0] border-b-2 border-[#2874f0]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Price -- Low to High
              </button>
              <button
                onClick={() => setSortBy('price_desc')}
                className={`py-1 px-2.5 rounded-[2px] transition-colors whitespace-nowrap ${
                  sortBy === 'price_desc'
                    ? 'font-bold text-[#2874f0] border-b-2 border-[#2874f0]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Price -- High to Low
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`py-1 px-2.5 rounded-[2px] transition-colors whitespace-nowrap ${
                  sortBy === 'rating'
                    ? 'font-bold text-[#2874f0] border-b-2 border-[#2874f0]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Customer Rating
              </button>

              {/* View Switcher (Desktop) */}
              <div className="hidden sm:flex items-center gap-1 border-l border-gray-200 pl-3 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'text-[#2874f0] bg-blue-50' : 'text-gray-400 hover:text-gray-700'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'text-[#2874f0] bg-blue-50' : 'text-gray-400 hover:text-gray-700'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filter & Sort Bar */}
          <div className="lg:hidden flex items-center justify-between py-2.5 border-b border-gray-100 my-2">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 text-xs font-semibold text-gray-800 bg-gray-100 px-3 py-1.5 rounded"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#2874f0]" />
              <span>Filters</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-1.5 text-gray-600 bg-gray-100 rounded"
                aria-label="Toggle view"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Product Items or Empty State */}
          {paginatedProducts.length > 0 ? (
            <div
              className={`mt-4 ${
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
                  : 'flex flex-col gap-3'
              }`}
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800">No results found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                We couldn't find any products matching your active filters. Try resetting the filters or searching with a different term.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    maxPrice: maxPriceLimit,
                    brands: [],
                    minRating: 0,
                    minDiscount: 0,
                    assuredOnly: false,
                    inStockOnly: false
                  })
                }
                className="mt-4 px-5 py-2 bg-[#2874f0] text-white text-xs font-bold uppercase rounded-[2px]"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-gray-300 rounded font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded font-semibold ${
                        currentPage === pageNum
                          ? 'bg-[#2874f0] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-gray-300 rounded font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50">
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              availableBrands={availableBrands}
              maxPriceLimit={maxPriceLimit}
              isMobileDrawer={true}
              onCloseMobile={() => setIsMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
