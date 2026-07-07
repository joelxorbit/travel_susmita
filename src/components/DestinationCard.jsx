import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Star, MapPin, Heart, ArrowRight, Sun, CloudSun } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!destination) return null;

  const saved = isInWishlist(destination.id);
  const imgUrl = destination.images && destination.images.length > 0 
    ? destination.images[0] 
    : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300">
      
      {/* Top Image & Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imgUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-primary font-extrabold text-[10px] uppercase tracking-wider border border-white/10 shadow">
          {destination.category || 'Luxury Beach'}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(destination); }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-md ${
            saved ? 'bg-rose-500 text-white scale-110' : 'bg-slate-900/60 text-white hover:bg-rose-500'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Weather Tag */}
        {destination.weather && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-bold bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{destination.weather.temp} • {destination.weather.condition}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white dark:bg-slate-900/60">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{destination.location || destination.country}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{destination.ratings || 4.9}</span>
              <span className="text-slate-400 font-normal">({destination.reviewsCount || 120})</span>
            </span>
          </div>

          <h3 className="text-lg font-montserrat font-extrabold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
            {destination.name}
          </h3>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed font-normal">
            {destination.description || 'Experience world-class luxury accommodations, private transfers, and curated cultural excursions.'}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Starting Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-montserrat font-extrabold text-primary">
                {formatPrice(destination.price)}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">/ person</span>
            </div>
          </div>

          <Link
            to={`/destinations/${destination.id}`}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-primary hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm group/btn"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
