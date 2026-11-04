import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "FESTIVAL MEGA SALE",
    discount: "UP TO 45% OFF",
    title: "Flagship Audio & ANC Headphones",
    subtitle: "Immerse in studio sound with Sony, Bose & Apple AirPods. Limited festive stock.",
    buttonText: "Shop Electronics",
    category: "Electronics",
    bgGradient: "from-blue-900 via-indigo-900 to-slate-900",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    id: 2,
    tag: "LIGHTNING DEAL",
    discount: "FLAT 30% OFF",
    title: "Smartwatches & Fitness Wearables",
    subtitle: "Track health, ECG & workouts in style with Apple Watch Ultra & Galaxy Watch6.",
    buttonText: "Explore Wearables",
    category: "Wearables",
    bgGradient: "from-purple-900 via-violet-950 to-slate-900",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: 3,
    tag: "HOT ACCESSORIES",
    discount: "STARTING ₹1,499",
    title: "Premium Tech Commuter Gear",
    subtitle: "Weatherproof Peak Design backpacks, MagSafe chargers & leather sleeves.",
    buttonText: "View Accessories",
    category: "Accessories",
    bgGradient: "from-emerald-950 via-teal-950 to-slate-900",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
];

export default function HeroBanner({ onSelectCategory }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-swap every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[current];

  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-10 shadow-2xl border border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`relative min-h-[360px] sm:min-h-[400px] bg-gradient-to-r ${activeSlide.bgGradient} p-6 sm:p-12 text-white flex flex-col justify-center transition-all duration-700`}
      >
        {/* Background Image Overlay with Fade */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <img
            src={activeSlide.image}
            alt="bg"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              <Sparkles size={13} /> {activeSlide.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-black uppercase tracking-wider animate-pulse">
              <Tag size={13} /> {activeSlide.discount}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 leading-tight drop-shadow-md">
            {activeSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-sm sm:text-base mb-6 max-w-lg leading-relaxed">
            {activeSlide.subtitle}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => onSelectCategory && onSelectCategory(activeSlide.category)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-sm transition-all transform hover:scale-105 shadow-lg active:scale-95 cursor-pointer"
          >
            {activeSlide.buttonText} <ArrowRight size={16} />
          </button>
        </div>

        {/* Side Floating Product Image */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500 pointer-events-none">
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left / Right Nav Arrows - Added z-30 and cursor-pointer for mobile touch */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition border border-white/20 z-30 cursor-pointer shadow-lg active:scale-90"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition border border-white/20 z-30 cursor-pointer shadow-lg active:scale-90"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Bottom Carousel Dots - Added z-30 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                current === idx ? "w-8 bg-amber-400" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}