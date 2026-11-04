import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price || 0) * (item.quantity || 1),
    0
  );
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setSubmitting(true);

    const orderData = {
      orderItems: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: Number(item.price || 0),
        image: item.image || "",
      })),
      shippingAddress: {
        fullName: "Zishan Saifi",
        address: "123 Tech Street",
        city: "New Delhi",
        postalCode: "110001",
      },
      totalAmount: total,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok) {
        setPlacedOrder(data);
        clearCart();
      } else {
        alert("Failed to create order: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Order placing failed. Make sure server is running.");
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl shadow-lg border border-slate-100 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Confirmed!</h2>
        <p className="text-slate-600 mb-2">
          Your order has been saved directly to MongoDB Atlas.
        </p>
        <p className="text-xs font-mono bg-slate-100 py-2 px-3 rounded inline-block text-slate-600 mb-6">
          Order ID: {placedOrder._id}
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/orders"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            View in Orders Page
          </Link>
          <Link
            to="/"
            className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-sm font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-600 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Explore Gadgets <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Shopping Cart ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id || item.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-slate-50"
                />
                <div>
                  <h3 className="font-semibold text-slate-800 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-slate-500">₹{Number(item.price).toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item._id || item.id, (item.quantity || 1) - 1)}
                    className="p-2 hover:bg-slate-100 text-slate-600"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 py-1 text-sm font-semibold text-slate-800">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id || item.id, (item.quantity || 1) + 1)}
                    className="p-2 hover:bg-slate-100 text-slate-600"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id || item.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">Order Summary</h2>
          <div className="space-y-2 text-sm text-slate-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-800 pt-3 border-t">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={submitting}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Placing Order in MongoDB..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}