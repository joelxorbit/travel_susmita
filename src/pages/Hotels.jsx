import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import { travelApi } from '../services/api';
import { Hotel, Search, Star, Sparkles, SlidersHorizontal, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [checkIn, setCheckIn] = useState('2026-08-10');
  const [checkOut, setCheckOut] = useState('2026-08-16');

  useEffect(() => {
    async function load() {
      try {
        const data = await travelApi.getHotels();
        setHotels(data || []);
      } catch (err) {
        console.error("Failed to load hotels:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = hotels
    .filter(h => !searchTerm || h.name.toLowerCase().includes(searchTerm.toLowerCase()) || (h.location && h.location.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      return (b.rating || 0) - (a.rating || 0);
    });

  const handleSearch = (e) => {
    e.preventDefault();
    toast.success(`🏨 Checking 5-star room availability for dates ${checkIn} to ${checkOut}...`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-current" /> 5-Star Luxury Resorts
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            World-Class Hospitality
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            From private infinity plunge pools in Santorini to imperial traditional Onsens in Gion and ski-in alpine chalets in Switzerland.
          </p>
        </div>

        {/* Search & Reservation Bar */}
        <form onSubmit={handleSearch} className="mt-10 glass-card p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hotel or destination..."
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 pl-12 pr-4 py-3 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-all font-semibold"
            />
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <Calendar className="w-4 h-4 text-primary shrink-0 ml-2" />
            <div className="w-full text-left">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Check-In</span>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-transparent text-xs font-bold focus:outline-none cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <Calendar className="w-4 h-4 text-secondary shrink-0 ml-2" />
            <div className="w-full text-left">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Check-Out</span>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent text-xs font-bold focus:outline-none cursor-pointer" />
            </div>
          </div>

          <button type="submit" className="w-full h-full min-h-[48px] gradient-btn !rounded-2xl text-xs font-extrabold shadow-md flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Check Availability</span>
          </button>
        </form>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 glass-card p-12 rounded-3xl">
            <Hotel className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold">No hotels matched your query</h3>
            <button onClick={() => setSearchTerm('')} className="mt-4 gradient-btn !py-2 !px-4 !text-xs">Show All Hotels</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
