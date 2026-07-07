import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { travelApi } from '../services/api';
import { Search, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function Destinations() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    async function load() {
      try {
        const data = await travelApi.getDestinations();
        setDestinations(data || []);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ['All', 'Beach', 'Pilgrimage', 'Honeymoon', 'Hill Station', 'Luxury'];

  const filtered = destinations
    .filter(d => {
      const matchesCat = category === 'All' || (d.category && d.category.toLowerCase() === category.toLowerCase());
      const matchesSearch = !searchTerm || d.name.toLowerCase().includes(searchTerm.toLowerCase()) || (d.location && d.location.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'rating') return (b.ratings || 0) - (a.ratings || 0);
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 120+ Global Landmarks
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            Discover Iconic Destinations
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            From tropical Indonesian archipelagos and serene Kyoto temples to snow-draped Swiss alpine villages and romantic Aegean sunset cliffs.
          </p>
        </div>

        {/* Filter & Search Bar Box */}
        <div className="mt-10 glass-card p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by city, island, or country..."
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 pl-12 pr-4 py-3 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-all font-semibold"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  category === cat
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-[#DB2777] border border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 glass-card p-12 rounded-3xl">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold">No destinations matched your criteria</h3>
            <p className="text-sm text-slate-400 mt-1">Try clearing filters or searching for another city.</p>
            <button onClick={() => { setSearchTerm(''); setCategory('All'); }} className="mt-4 gradient-btn !py-2 !px-4 !text-xs">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
