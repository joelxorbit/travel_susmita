import React, { useState, useEffect } from 'react';
import TransportCard from '../components/TransportCard';
import { travelApi } from '../services/api';
import { Plane, Train, Car, Compass, Search, ShieldCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Transportation() {
  const [transportList, setTransportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await travelApi.getTransportation();
        setTransportList(data || []);
      } catch (err) {
        console.error("Failed to load transport:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const tabs = [
    { name: 'All Services', id: 'All', icon: <Compass className="w-4 h-4" /> },
    { name: 'VIP Flights', id: 'Flight', icon: <Plane className="w-4 h-4" /> },
    { name: 'Bullet Trains', id: 'Train', icon: <Train className="w-4 h-4" /> },
    { name: 'Limousine Rentals', id: 'Rental Car', icon: <Car className="w-4 h-4" /> },
    { name: 'VIP Taxi Transit', id: 'Taxi', icon: <Car className="w-4 h-4" /> }
  ];

  const filtered = transportList.filter(t => {
    const matchesTab = activeTab === 'All' || (t.type && t.type.toLowerCase() === activeTab.toLowerCase());
    const matchesSearch = !searchTerm || t.provider.toLowerCase().includes(searchTerm.toLowerCase()) || t.route.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Plane className="w-3.5 h-3.5" /> First Class & Private Transit
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            VIP Transportation
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Travel between destinations with unmatched comfort. We partner with top airlines, Japan Railways Shinkansen, and luxury Maybach / Mercedes chauffeur services.
          </p>
        </div>

        {/* Search and Tabs */}
        <div className="mt-10 glass-card p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search airline, route, or city..."
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 pl-12 pr-4 py-3 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-all font-semibold"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'gradient-btn !py-2 !px-4 shadow-md scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 glass-card p-12 rounded-3xl">
            <Plane className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold">No transport services matched your criteria</h3>
            <button onClick={() => { setSearchTerm(''); setActiveTab('All'); }} className="mt-4 gradient-btn !py-2 !px-4 !text-xs">Reset Filters</button>
          </div>
        ) : (
          filtered.map((item) => <TransportCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
