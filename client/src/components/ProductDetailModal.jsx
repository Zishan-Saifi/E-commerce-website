import React from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  const { addToCart, addToWishlist } = useCart();

  const price = Number(product.price) || 0;
  const rating = Number(product.rating) || 4.8;
  const reviews = Number(product.numReviews) || 120;
  const stock = Number(product.stock) || 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition shadow"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-slate-100 relative min-h-[260px] md:min-h-full flex items-center justify-center p-6">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
            alt={product.name || 'Product'}
            className="w-full h-64 md:h-full object-contain max-h-72 drop-shadow-md"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
            }}
          />
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {product.category || 'Tech'}
          </span>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold text-slate-800 ml-1">{rating}</span>
              <span className="text-xs text-slate-400">({reviews} reviews)</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-snug">{product.name}</h2>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-blue-600">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                In Stock ({stock} units)
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {product.description || 'Engineered with cutting-edge technology and premium materials for an elevated lifestyle experience.'}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-center text-[11px] text-slate-500">
              <div className="flex flex-col items-center gap-1">
                <Truck size={16} className="text-blue-600" />
                <span>Free Express</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={16} className="text-blue-600" />
                <span>7 Days Return</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                if (addToCart) addToCart(product);
                onClose();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
            <button
              onClick={() => {
                if (addToWishlist) addToWishlist(product);
              }}
              className="p-3 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-red-500 rounded-xl transition"
              title="Add to Wishlist"
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}