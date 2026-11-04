import React from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onSelect }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some(
    (item) => (item._id || item.id) === (product._id || product.id)
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Product Image */}
      <div
        className="relative overflow-hidden bg-slate-50 cursor-pointer h-48"
        onClick={onSelect}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80";
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
            isWishlisted
              ? "bg-rose-50 text-rose-500 shadow-sm"
              : "bg-white/80 text-slate-600 hover:bg-white"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          {product.category}
        </span>

        {/* Product Title / Name (clearly visible) */}
        <h3
          onClick={onSelect}
          title={product.name}
          className="font-semibold text-slate-800 text-sm line-clamp-2 cursor-pointer hover:text-blue-600 transition mb-2 min-h-[2.5rem]"
        >
          {product.name}
        </h3>

        {/* Rating & Stock */}
        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-medium mb-3">
          <Star size={13} fill="currentColor" />
          <span>{product.rating || 4.5}</span>
          <span className="text-slate-400 font-normal">
            ({product.stock || 12} in stock)
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 block leading-none mb-0.5">Price</span>
            <p className="text-base font-bold text-slate-800">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition shadow-sm active:scale-95"
          >
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}