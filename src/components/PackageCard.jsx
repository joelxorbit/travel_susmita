import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Clock, Star, Heart, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PackageCard({ pkg }) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!pkg) return null;

  const saved = isInWishlist(pkg.id);
  const image = pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="glass-card overflow-hidden flex flex-col group h-full border border-white/50 dark:border-slate-800">
      
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>

        {/* Duration Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass !bg-slate-900/80 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-md">
          <Clock className="w-3.5 h-3.5 text-secondary" />
          <span>{pkg.duration || '7 Days / 6 Nights'}</span>
        </span>

        {/* Wishlist Heart */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(pkg); }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
            saved 
              ? 'bg-rose-500 text-white scale-110' 
              : 'bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white'
          }`}
          title="Save Package"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 bg-amber-500/90 text-slate-950 px-2.5 py-1 rounded-xl font-extrabold text-xs flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{pkg.rating || '4.9'} ({pkg.reviewsCount || '140'})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-extrabold text-secondary uppercase tracking-wider block mb-1">
            {pkg.type || 'Luxury Tour'} • {pkg.destinationName || 'International'}
          </span>
          <h3 className="text-xl font-montserrat font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
            {pkg.title}
          </h3>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {pkg.overview || 'Carefully curated itinerary combining 5-star accommodations, private sightseeing, and authentic culinary dining.'}
          </p>

          {/* Quick Inclusions */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-1.5">
            {(pkg.inclusions || ['5-Star Hotel Stay', 'Daily Breakfast', 'VIP Airport Transfers', 'Local Guide']).slice(0, 4).map((inc, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 truncate">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Price & Booking */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">All-Inclusive Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-montserrat font-extrabold text-primary">
                {formatPrice(pkg.price || 1500)}
              </span>
              <span className="text-xs text-slate-400">/ person</span>
            </div>
          </div>

          <Link
            to={`/packages/${pkg.id}`}
            className="gradient-btn !px-5 !py-2.5 !text-xs !rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
