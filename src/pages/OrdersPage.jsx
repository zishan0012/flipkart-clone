import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Package, Search, ChevronRight, XCircle, CheckCircle, Clock } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const OrdersPage = () => {
  const { user, orders, cancelOrder, setIsAuthModalOpen, setAuthRedirectPath } = useAuth();
  const { addToCart } = useCart();
  const [orderSearch, setOrderSearch] = useState('');

  if (!user) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Please log in to view your orders</h2>
        <p className="text-xs text-gray-500 mt-1">Manage and track your recent orders easily</p>
        <button
          onClick={() => {
            setAuthRedirectPath('/orders');
            setIsAuthModalOpen(true);
          }}
          className="mt-4 px-8 py-2.5 bg-[#2874f0] text-white text-xs font-bold uppercase rounded-[2px] shadow-sm"
        >
          Login
        </button>
      </div>
    );
  }

  const filteredOrders = orders.filter((ord) => {
    if (!orderSearch.trim()) return true;
    const q = orderSearch.toLowerCase();
    return (
      ord.id.toLowerCase().includes(q) ||
      (ord.items && ord.items.some((it) => it.title.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Header and Search */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-900">My Orders ({orders.length})</h1>
          <p className="text-xs text-gray-500">Track current orders & review purchase history</p>
        </div>

        {orders.length > 0 && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search your orders here..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:border-[#2874f0] outline-none"
            />
          </div>
        )}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">No orders found</h3>
          <p className="text-xs text-gray-500 mt-1">
            {orders.length === 0
              ? "You haven't placed any orders yet."
              : 'No orders match your search term.'}
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-[#2874f0] text-white text-xs font-bold uppercase rounded-[2px]"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Top Order Metadata */}
              <div className="p-3.5 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-4">
                  <span>Order ID: <strong className="text-gray-900">#{order.id}</strong></span>
                  <span>Date: {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Total: <strong className="text-gray-900">{formatPrice(order.summary?.finalAmount)}</strong></span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase ${
                    order.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-[#388e3c]'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List inside Order */}
              <div className="p-4 divide-y divide-gray-100">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Link to={`/product/${item.id}`} className="w-16 h-16 p-1 border border-gray-100 rounded flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </Link>
                      <div>
                        <Link to={`/product/${item.id}`} className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#2874f0] line-clamp-1">
                          {item.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Qty: {item.quantity} | {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => addToCart(item, item.selectedVariant, 1)}
                        className="px-4 py-1.5 border border-[#2874f0] text-[#2874f0] hover:bg-blue-50 text-xs font-bold rounded-[2px]"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Tracker */}
              <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Delivery Status Tracker
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {order.statusHistory?.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                        order.status === 'Cancelled' && step.status.includes('Cancelled')
                          ? 'bg-red-500'
                          : step.completed
                          ? 'bg-[#388e3c]'
                          : 'bg-gray-300'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <div className="text-[11px]">
                        <span className="font-semibold text-gray-800 block">{step.status}</span>
                        <span className="text-gray-400">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cancel Order Action */}
                {order.status !== 'Cancelled' && (
                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="text-xs font-bold text-red-600 hover:underline uppercase"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
