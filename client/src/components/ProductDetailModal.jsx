import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  if (!product) return null;

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-700 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-slate-100 relative aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details Content */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-4 pb-4 border-b border-slate-100">
              <span className="text-3xl font-black text-slate-900">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-600 font-bold ml-2">Inclusive of all taxes</span>
            </div>

            {/* Features / Highlights */}
            <p className="text-slate-600 text-xs sm:text-sm mt-4 leading-relaxed">
              Designed with precision for modern lifestyle and professional workflows. Built using top-tier materials with an emphasis on durability, performance, and intuitive ergonomics.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-5 text-[11px] text-slate-600 text-center">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Truck className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                <span>Fast Delivery</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <RefreshCw className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                <span>7-Day Return</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                <span>1-Yr Warranty</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-xl border transition-colors flex items-center justify-center ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm transition-all active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}