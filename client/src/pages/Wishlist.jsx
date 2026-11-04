import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-12 bg-white rounded-3xl border border-slate-200 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your Wishlist is Empty</h2>
        <p className="text-slate-500 mt-2 text-sm">Save items you like by clicking the heart icon on any product.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Saved Wishlist ({wishlist.length})</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div className="relative aspect-square bg-slate-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-white transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase">
                  {product.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-base font-black text-slate-900 mt-2">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  toggleWishlist(product);
                }}
                className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-100"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}