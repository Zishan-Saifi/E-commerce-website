import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PackagePlus,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Trash2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    { id: 1, title: 'AeroPulse Wireless Headphones', price: 4999, category: 'Electronics', stock: 24 },
    { id: 2, title: 'ProVision Smartwatch Series 7', price: 3499, category: 'Wearables', stock: 12 },
    { id: 3, title: 'Nomad Leather Backpack', price: 2199, category: 'Fashion', stock: 8 },
    { id: 4, title: 'PureBrew Ceramic Coffee Maker', price: 1899, category: 'Home & Kitchen', stock: 19 },
  ]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [stock, setStock] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!title || !price || !stock) return;

    const newProd = {
      id: Date.now(),
      title,
      price: Number(price),
      category,
      stock: Number(stock),
    };

    setProducts([newProd, ...products]);
    setTitle('');
    setPrice('');
    setStock('');
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Admin Management Portal</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase">
                Bonus Feature
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">Manage products, inventory, and storefront statistics</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Total Revenue</span>
            <span className="text-xl font-black text-slate-900">₹1,42,890</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Orders Processed</span>
            <span className="text-xl font-black text-slate-900">68 Orders</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Total Products</span>
            <span className="text-xl font-black text-slate-900">{products.length} Items</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Active Customers</span>
            <span className="text-xl font-black text-slate-900">124</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <PackagePlus className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900">Add New Product</h2>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
              <input
                type="text"
                placeholder="e.g. Ergonomic Office Chair"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  placeholder="2499"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Stock</label>
                <input
                  type="number"
                  placeholder="15"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Electronics">Electronics</option>
                <option value="Wearables">Wearables</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-100 transition-all active:scale-[0.98]"
            >
              Save Product to Catalog
            </button>
          </form>
        </div>

        {/* Existing Products Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200">
          <h2 className="text-lg font-black text-slate-900 mb-4">Current Catalog Inventory</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 font-bold text-slate-800">{p.title}</td>
                    <td className="py-3.5 text-xs text-slate-500 font-semibold">{p.category}</td>
                    <td className="py-3.5 font-black text-slate-900">₹{p.price.toLocaleString()}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}