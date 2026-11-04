import React from 'react';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelect }) {
  const { addToCart, addToWishlist, wishlist = [] } = useCart();

  if (!product) return null;

  const isWishlisted = (wishlist || []).some(
    (item) => (item._id || item.id) === (product._id || product.id)
  );

  const price = typeof product.price === 'number'
    ? product.price
    : parseFloat(String(product.price).replace(/[^0-9.-]+/g, '')) || 0;

  return (
    <div
      onClick={() => onSelect && onSelect(product)}
      className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div className="relative bg-slate-100 h-56 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
          }}
        />

        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
          {product.category || 'Tech'}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (addToWishlist) addToWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition shadow-sm ${
            isWishlisted
              ? 'bg-red-50 text-red-500'
              : 'bg-white/90 text-slate-400 hover:text-red-500'
          }`}
          title="Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center gap-1 text-amber-500 text-xs mb-1.5 font-semibold">
            <Star size={14} fill="currentColor" />
            <span>{product.rating || 4.8}</span>
            <span className="text-slate-400 font-normal">({product.numReviews || 120})</span>
          </div>

          <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-medium">Price</span>
            <span className="text-lg font-extrabold text-slate-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (addToCart) addToCart(product);
            }}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3.5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition active:scale-95"
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}