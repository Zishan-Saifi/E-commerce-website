import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, XCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders', { timeout: 1500 });
      if (res.data && res.data.length > 0) {
        setOrders(res.data);
        return;
      }
    } catch {
      // Fallback: read from local storage
    }
    const local = JSON.parse(localStorage.getItem('nexora_orders') || '[]');
    setOrders(local);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    // 1. Try cancel via backend
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, {}, { timeout: 1500 });
    } catch {
      // proceed to local update
    }

    // 2. Update state and localStorage
    const updated = orders.map((ord) => {
      if ((ord._id && ord._id === orderId) || (ord.orderId && ord.orderId === orderId)) {
        return { ...ord, status: 'Cancelled' };
      }
      return ord;
    });

    setOrders(updated);
    localStorage.setItem('nexora_orders', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-slate-50 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Package size={36} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No Orders Placed Yet</h2>
        <p className="text-slate-500 mt-2 max-w-sm text-sm">Place your first order to track shipments and order history.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition"
        >
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          My Order History <span className="text-sm font-normal text-slate-500">({orders.length} orders)</span>
        </h1>

        <div className="space-y-4">
          {orders.map((order, idx) => {
            const isCancelled = order.status === 'Cancelled';
            const orderRef = order._id || order.orderId || `ORD-${idx + 1}`;

            return (
              <div
                key={orderRef}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Order ID</span>
                    <p className="text-sm font-bold text-slate-800 font-mono mt-0.5">{orderRef}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        isCancelled
                          ? 'bg-red-50 text-red-600'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {isCancelled ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                      {order.status || 'Placed'}
                    </span>

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancelOrder(orderRef)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {(order.items || order.orderItems || []).map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md bg-slate-100" />
                        )}
                        <div>
                          <p className="font-medium text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-slate-800">
                        ₹{(Number(item.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between items-center text-sm">
                  <span className="text-slate-500">
                    Date: {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Total Paid: </span>
                    <span className="text-base font-bold text-blue-600">
                      ₹{Number(order.totalAmount || order.totalPrice || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}