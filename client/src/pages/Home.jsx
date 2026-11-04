import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

const defaultProducts = [
  {
    _id: '1',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling with two processors and 8 microphones.',
    price: 34999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    stock: 12,
    rating: 4.8,
    numReviews: 240
  },
  {
    _id: '2',
    name: 'Apple AirPods Pro (2nd Gen)',
    description: 'Up to 2x more Active Noise Cancellation with Adaptive Audio and MagSafe USB-C.',
    price: 24900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
    stock: 20,
    rating: 4.9,
    numReviews: 412
  },
  {
    _id: '3',
    name: 'Apple Watch Ultra 2 Titanium',
    description: 'Rugged titanium case with precision dual-frequency GPS and up to 36 hours battery.',
    price: 89900,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    stock: 8,
    rating: 4.9,
    numReviews: 128
  },
  {
    _id: '4',
    name: 'Galaxy Watch 6 Classic LTE',
    description: 'Rotating bezel, sleep coaching, advanced fitness tracking with Sapphire crystal glass.',
    price: 33999,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    stock: 15,
    rating: 4.6,
    numReviews: 95
  },
  {
    _id: '5',
    name: 'Anker Prime 100W GaN Fast Charger',
    description: 'Ultra-compact 3-port wall charger for MacBook Pro, iPhone, and Android fast charging.',
    price: 5499,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
    stock: 35,
    rating: 4.7,
    numReviews: 180
  },
  {
    _id: '6',
    name: 'Peak Design Everyday Tech Backpack 20L',
    description: 'Weatherproof recycled nylon canvas, MagLatch hardware, dedicated laptop sleeve.',
    price: 21999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    stock: 10,
    rating: 4.8,
    numReviews: 87
  },
  {
    _id: '7',
    name: 'Keychron Q1 Pro Wireless Mechanical Keyboard',
    description: 'Full aluminum body, hot-swappable tactile switches, and double-gasket acoustic dampening.',
    price: 17999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    stock: 14,
    rating: 4.9,
    numReviews: 110
  },
  {
    _id: '8',
    name: 'Logitech MX Master 3S Ergonomic Mouse',
    description: 'Quiet clicks, 8K DPI any-surface tracking, and MagSpeed electromagnetic scrolling.',
    price: 9995,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
    stock: 25,
    rating: 4.8,
    numReviews: 310
  },
  {
    _id: '9',
    name: 'Bose SoundLink Flex Bluetooth Speaker',
    description: 'Waterproof rugged portable speaker with PositionIQ technology and deep crisp bass.',
    price: 13900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    stock: 18,
    rating: 4.7,
    numReviews: 142
  },
  {
    _id: '10',
    name: 'Whoop 4.0 Health & Fitness Tracker Band',
    description: 'Continuous biometric sensor monitoring strain, recovery, HRV, and sleep stages.',
    price: 24999,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80',
    stock: 12,
    rating: 4.5,
    numReviews: 76
  },
  {
    _id: '11',
    name: 'Belkin 3-in-1 MagSafe Wireless Charging Stand',
    description: 'Fast 15W MagSafe charging simultaneously for iPhone, Apple Watch, and AirPods.',
    price: 12999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1622445262464-84b124806a6b?w=800&q=80',
    stock: 22,
    rating: 4.6,
    numReviews: 94
  },
  {
    _id: '12',
    name: 'Nomad Horween Leather Phone Case',
    description: 'Rugged vegetable-tanned American leather with 10ft drop protection and MagSafe.',
    price: 4999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
    stock: 30,
    rating: 4.7,
    numReviews: 65
  }
];

export default function Home() {
  const [products, setProducts] = useState(defaultProducts);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch(() => {
        setProducts(defaultProducts);
      });
  }, []);

  const categories = ['All', 'Electronics', 'Wearables', 'Accessories'];

  const filteredProducts = products
    .filter((p) => (category === 'All' ? true : p.category.toLowerCase() === category.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <HeroBanner onSelectCategory={(cat) => setCategory(cat)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 text-sm text-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSelect={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </main>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}