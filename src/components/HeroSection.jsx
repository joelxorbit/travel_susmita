import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Sparkles, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HeroSection({ onOpenCalculator, onOpenRecommender }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('2026-08-15');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(destination.trim())}`);
      toast.success(`🔍 Searching luxury suites in ${destination}...`);
    } else {
      navigate('/destinations');
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Tropical luxury beach paradise"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80 dark:opacity-100"></div>
      </div>

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#DB2777]/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#BE185D]/15 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left w-full space-y-8">
        
        {/* Top Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest shadow-lg animate-in fade-in duration-500">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Redefining Bespoke Expeditions Since 2015</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-montserrat font-extrabold text-white tracking-tight leading-none drop-shadow-lg">
          Discover The Art Of <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#DB2777] via-[#E11D48] to-[#BE185D] bg-clip-text text-transparent">
            VIP Luxury Travel
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow">
          We curate five-star private villa escapes, chartered helicopter transfers, and immersive cultural journeys across over 120 global destinations.
        </p>

        {/* Interactive Search Bar Widget */}
        <form onSubmit={handleSearch} className="glass !bg-white/90 dark:!bg-slate-900/90 !border-white/40 p-3 sm:p-4 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
          
          {/* Destination input */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
            <MapPin className="w-5 h-5 text-primary shrink-0 ml-1" />
            <div className="w-full text-left">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Where to?</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Santorini, Bali, Alps..."
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
            <Calendar className="w-5 h-5 text-secondary shrink-0 ml-1" />
            <div className="w-full text-left">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Departure</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
            <Users className="w-5 h-5 text-amber-500 shrink-0 ml-1" />
            <div className="w-full text-left">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Travelers</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                  <option key={n} value={n} className="bg-slate-900 text-white">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="w-full h-full min-h-[54px] gradient-btn !rounded-2xl text-sm font-extrabold shadow-xl hover:scale-102 transition-transform flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Explore Now</span>
          </button>
        </form>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
          <button
            onClick={onOpenRecommender}
            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>AI Itinerary Recommender</span>
          </button>

          <button
            onClick={onOpenCalculator}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Compass className="w-4 h-4" />
            <span>Bespoke Cost Calculator</span>
          </button>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg mx-auto md:mx-0 text-white">
          <div>
            <span className="text-2xl sm:text-3xl font-montserrat font-extrabold block text-primary">120+</span>
            <span className="text-[11px] text-slate-300 font-semibold uppercase">Global Landmarks</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-montserrat font-extrabold block text-secondary">45,000+</span>
            <span className="text-[11px] text-slate-300 font-semibold uppercase">VIP Explorers</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-montserrat font-extrabold block text-amber-400">100%</span>
            <span className="text-[11px] text-slate-300 font-semibold uppercase">ATOL Protected</span>
          </div>
        </div>

      </div>
    </div>
  );
}
