import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import { travelApi } from '../services/api';
import { Search, Gift, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function Packages() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';
  const initialDestId = queryParams.get('destinationId') || '';

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    async function load() {
      try {
        const data = await travelApi.getPackages({ destinationId: initialDestId });
        setPackages(data || []);
      } catch (err) {
        console.error("Failed to load packages:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [initialDestId]);

  const types = ['All', 'Beach', 'Pilgrimage', 'Honeymoon', 'Hill Station'];

  const filtered = packages
    .filter(p => {
      const matchesType = typeFilter === 'All' || (p.type && p.type.toLowerCase() === typeFilter.toLowerCase());
      const matchesSearch = !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || (p.destinationName && p.destinationName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" /> All-Inclusive VIP Journeys
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            Curated Tour Packages
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Every itinerary is designed with 5-star resort accommodations, private air-conditioned transport, certified local historians, and unforgettable culinary experiences.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-10 glass-card p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search package or destination..."
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 pl-12 pr-4 py-3 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-all font-semibold"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  typeFilter === t
                    ? 'gradient-btn !py-2 !px-4 shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-[#DB2777] border border-slate-200 shadow-sm'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

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
            <Gift className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold">No packages found</h3>
            <p className="text-sm text-slate-400 mt-1">Try another keyword or category.</p>
            <button onClick={() => { setSearchTerm(''); setTypeFilter('All'); }} className="mt-4 gradient-btn !py-2 !px-4 !text-xs">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
