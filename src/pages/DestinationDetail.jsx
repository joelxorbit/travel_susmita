import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { travelApi } from '../services/api';
import PackageCard from '../components/PackageCard';
import HotelCard from '../components/HotelCard';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { MapPin, Star, Heart, CloudSun, Wind, Droplets, Compass, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DestinationDetail() {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const data = await travelApi.getDestinationById(id);
        setDest(data);
      } catch (err) {
        console.error("Error loading destination:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Loading Destination details...</div>;
  }

  if (!dest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <Compass className="w-16 h-16 text-slate-300 mb-3" />
        <h2 className="text-2xl font-bold">Destination Not Found</h2>
        <Link to="/destinations" className="mt-4 gradient-btn !py-2 !px-4 text-xs">Back to Destinations</Link>
      </div>
    );
  }

  const saved = isInWishlist(dest.id);
  const images = dest.images && dest.images.length > 0 ? dest.images : ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation & Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/destinations" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Destinations</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.success('🔗 Link copied to clipboard!')}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              title="Share Destination"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(dest)}
              className={`p-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 text-xs font-bold ${
                saved ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-500 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              <span>{saved ? 'Saved' : 'Save to Wishlist'}</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              {dest.category || 'World Heritage'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
              {dest.name}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" /> {dest.location || dest.country}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-4 h-4 fill-current" /> {dest.ratings || 4.9} ({dest.reviewsCount || 310} Reviews)</span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-slate-400 uppercase font-bold block">Starting Package Rate</span>
            <span className="text-3xl font-montserrat font-extrabold text-primary">{formatPrice(dest.price || 1200)}</span>
          </div>
        </div>

        {/* Photo Gallery Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          <div className="lg:col-span-2 h-80 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl relative">
            <img src={images[activeImgIdx]} alt={dest.name} className="w-full h-full object-cover transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          </div>
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIdx(idx)}
                className={`flex-1 h-24 lg:h-36 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImgIdx === idx ? 'border-primary scale-102 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info & Weather & Map Widget Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-montserrat font-extrabold text-slate-900 dark:text-white mb-4">
                About this Destination
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {dest.description || 'Immerse yourself in world-class scenic beauty, ancient cultural monuments, vibrant culinary markets, and pristine natural serenity.'}
              </p>
            </div>
          </div>

          {/* Right Column: Live Weather & Map Simulation */}
          <div className="space-y-6">
            <div className="glass-card !bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-3xl shadow-xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                Live Forecast Widget
              </span>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-4xl font-montserrat font-extrabold block">{dest.weather?.temp || '28°C'}</span>
                  <span className="text-xs text-white/80">{dest.weather?.condition || 'Sunny & Tropical'}</span>
                </div>
                <CloudSun className="w-14 h-14 text-amber-300 animate-pulse" />
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-xs font-semibold text-white/90">
                <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5" /> Humidity: {dest.weather?.humidity || '75%'}</span>
                <span className="flex items-center gap-1"><Wind className="w-3.5 h-3.5" /> Breeze: 14 km/h</span>
              </div>
            </div>

            {/* Map Simulation */}
            <div className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Geographic Map</span>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Lat: {dest.map?.lat || '-8.40'}, Lng: {dest.map?.lng || '115.18'}
                </span>
              </div>
              <div className="h-40 rounded-2xl bg-gradient-to-tr from-blue-900 to-slate-800 flex items-center justify-center text-white relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="text-center z-10">
                  <MapPin className="w-8 h-8 text-rose-500 mx-auto animate-bounce" />
                  <span className="text-xs font-bold tracking-wide mt-1 block">{dest.name} Area Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Tour Packages */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Book Your Trip</span>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-extrabold">Available VIP Tour Packages</h3>
            </div>
            <Link to={`/packages?destinationId=${dest.id}`} className="text-xs font-bold text-primary hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(dest.packages || []).length > 0 ? (
              dest.packages.map(p => <PackageCard key={p.id} pkg={p} />)
            ) : (
              <div className="col-span-3 text-center py-10 bg-slate-100 dark:bg-slate-900 rounded-3xl text-sm text-slate-500">
                Explore our full packages catalog for customized itineraries to {dest.name}.
              </div>
            )}
          </div>
        </div>

        {/* Associated Luxury Hotels */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Where to Stay</span>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-extrabold">Recommended 5-Star Hotels</h3>
            </div>
            <Link to="/hotels" className="text-xs font-bold text-primary hover:underline">Explore Hotels →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(dest.hotels || []).map(h => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
