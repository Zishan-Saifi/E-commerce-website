import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => {
    const p = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[^0-9.-]+/g, '')) || 0;
    return acc + p * (item.quantity || 1);
  }, 0);

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleQuantity = (id, delta, currentQty) => {
    const newQty = (currentQty || 1) + delta;
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      if (updateQuantity) {
        updateQuantity(id, newQty);
      }
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);

    const orderData = {
      orderId: 'NEX-' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
      })),
      totalAmount: total,
      status: 'Placed',
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Try backend
      await axios.post('http://localhost:5000/api/orders', orderData, { timeout: 2000 });
    } catch {
      // 2. Fallback to LocalStorage for live site
      const existing = JSON.parse(localStorage.getItem('nexora_orders') || '[]');
      existing.unshift(orderData);
      localStorage.setItem('nexora_orders', JSON.stringify(existing));
    } finally {
      clearCart();
      setLoading(false);
      navigate('/orders');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-slate-50 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-slate-500 mt-2 max-w-sm text-sm">Looks like you haven't added any premium tech gadgets yet.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition"
        >
          Explore Store <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          Shopping Cart <span className="text-sm font-normal text-slate-500">({cartItems.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-slate-100 flex-shrink-0"
                />

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="text-sm font-semibold text-slate-800 truncate">{item.name}</h3>
                  <p className="text-base font-bold text-blue-600 mt-1">₹{Number(item.price).toLocaleString('en-IN')}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                  <button
                    onClick={() => handleQuantity(item._id || item.id, -1, item.quantity)}
                    className="p-1.5 hover:bg-white text-slate-600 rounded transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-slate-800">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantity(item._id || item.id, 1, item.quantity)}
                    className="p-1.5 hover:bg-white text-slate-600 rounded transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id || item.id)}
                  className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-5">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Order Summary</h2>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-semibold text-slate-800">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 font-semibold uppercase text-xs">FREE</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span className="text-blue-600">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Placing Order...' : 'Confirm & Place Order'}
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Safe & Secure 256-Bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}