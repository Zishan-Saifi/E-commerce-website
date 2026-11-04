import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowLeft, Star } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, toggleWishlist, addToCart } = useCart();

  const handleRemove = (product) => {
    const id = product._id || product.id || product.name;
    if (typeof removeFromWishlist === 'function') {
      removeFromWishlist(id);
    } else if (typeof toggleWishlist === 'function') {
      toggleWishlist(product);
    }
  };

  const handleMoveToCart = (product) => {
    addToCart(product);
    handleRemove(product);
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-12 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 fill-rose-100" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your Wishlist is Empty</h2>
        <p className="text-slate-500 mt-2 text-sm">Save products you love by tapping the heart icon.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[75vh]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">
            Saved Wishlist <span className="text-base font-normal text-slate-500">({wishlist.length})</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product, idx) => {
          const id = product._id || product.id || `wish-${idx}`;
          const title = product.name || product.title || 'Tech Accessory';
          const price = typeof product.price === 'number'
            ? product.price
            : parseFloat(String(product.price || 0).replace(/[^0-9.-]+/g, '')) || 0;

          return (
            <div
              key={id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img
                  src={product.image || FALLBACK_IMAGE}
                  alt={title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-rose-500 hover:bg-rose-50 hover:text-rose-600 shadow-md transition-all active:scale-90"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {product.category || 'Electronics'}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-1 line-clamp-2 text-sm">
                    {title}
                  </h3>

                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-700">{product.rating || '4.8'}</span>
                    <span>({product.numReviews || product.reviewsCount || 100})</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Price</span>
                    <span className="text-base font-black text-slate-900">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(product)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}