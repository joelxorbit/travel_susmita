import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { Star, MapPin, Wifi, Coffee, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  const { formatPrice } = useCurrency();

  if (!hotel) return null;

  const image = hotel.images && hotel.images.length > 0 ? hotel.images[0] : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="glass-card overflow-hidden flex flex-col group h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass !bg-slate-900/80 text-white text-[11px] font-extrabold uppercase tracking-wider">
          5-Star Resort
        </span>
        <div className="absolute bottom-4 right-4 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-xl font-extrabold text-xs flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{hotel.rating || '4.9'} ({hotel.reviewsCount || '310'})</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="truncate">{hotel.location}</span>
          </div>
          <h3 className="text-lg font-montserrat font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {(hotel.facilities || ['Free WiFi', 'Infinity Pool', 'Luxury Spa', 'Airport Shuttle']).slice(0, 3).map((fac, idx) => (
              <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-secondary" />
                <span>{fac}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Per Night</span>
            <span className="text-xl font-montserrat font-extrabold text-primary">
              {formatPrice(hotel.price || 250)}
            </span>
          </div>

          <Link
            to={`/hotels`}
            className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold text-xs transition-all shadow-md flex items-center gap-1"
          >
            <span>Reserve</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
