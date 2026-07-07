import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import HotelCard from '../components/HotelCard';
import AIRecommenderModal from '../components/AIRecommenderModal';
import CostCalculatorModal from '../components/CostCalculatorModal';
import { travelApi } from '../services/api';
import { mockBlogs } from '../services/mockData';
import { Link } from 'react-router-dom';
import { Sparkles, Calculator, Compass, Award, ShieldCheck, HeartHandshake, ArrowRight, Star, MessageSquarePlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modals
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newDest, setNewDest] = useState('Bali Ultimate Tropical Escape');

  useEffect(() => {
    async function loadData() {
      try {
        const [dests, pkgs, htls, revs] = await Promise.all([
          travelApi.getDestinations(),
          travelApi.getPackages(),
          travelApi.getHotels(),
          travelApi.getReviews()
        ]);
        setDestinations(dests || []);
        setPackages(pkgs || []);
        setHotels(htls || []);
        setReviews(revs || []);
      } catch (err) {
        console.error("Home loading error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredDestinations = activeCategory === 'All' 
    ? destinations.slice(0, 6)
    : destinations.filter(d => d.category && d.category.toLowerCase() === activeCategory.toLowerCase()).slice(0, 6);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newComment) return;
    try {
      const res = await travelApi.addReview({
        userName: 'You (VIP Member)',
        destination: newDest,
        rating: Number(newRating),
        comment: newComment
      });
      setReviews(prev => [res.review || { id: `rev-${Date.now()}`, userName: 'You (VIP Member)', destination: newDest, rating: Number(newRating), comment: newComment, date: 'Just now', likes: 1 }, ...prev]);
      toast.success('🎉 Thank you! Your review has been posted.');
      setReviewModalOpen(false);
      setNewComment('');
    } catch (err) {
      toast.error('Failed to post review');
    }
  };

  const categories = ['All', 'Beach', 'Pilgrimage', 'Honeymoon', 'Hill Station', 'Luxury'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. AI Tools & VIP Perks Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div 
            onClick={() => setAiModalOpen(true)}
            className="glass-card !bg-gradient-to-br from-[#0066FF] to-[#00C896] text-white p-6 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                AI Powered
              </span>
              <h3 className="text-xl font-montserrat font-extrabold mt-2">Dream Trip Wizard</h3>
              <p className="text-xs text-white/80 mt-1">Match your mood & budget to curated itineraries</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform shrink-0">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
          </div>

          <div 
            onClick={() => setCalcModalOpen(true)}
            className="glass-card !bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition-all flex items-center justify-between group border border-slate-700"
          >
            <div>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Instant Estimator
              </span>
              <h3 className="text-xl font-montserrat font-extrabold mt-2">Cost Calculator</h3>
              <p className="text-xs text-slate-400 mt-1">Estimate lodging, flights & VIP insurance</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Calculator className="w-6 h-6 text-amber-400" />
            </div>
          </div>

          <div className="glass-card !bg-white/90 dark:!bg-slate-900/90 p-6 rounded-3xl shadow-xl flex items-center justify-between border border-slate-200 dark:border-slate-800">
            <div>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                100% Protected
              </span>
              <h3 className="text-xl font-montserrat font-extrabold mt-2 text-slate-900 dark:text-white">Razorpay Secured</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ATOL guaranteed refunds & 24/7 concierge</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              Explore Our World
            </span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-slate-900 dark:text-white">
              Featured Iconic Destinations
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'gradient-btn !py-2 !px-4 shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-[#DB2777] border border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/destinations"
            className="gradient-btn-outline inline-flex items-center gap-2 shadow-sm"
          >
            <span>View All 120+ Global Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Exclusive Tour Packages Section */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-20 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
                Handcrafted Itineraries
              </span>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-slate-900 dark:text-white">
                Exclusive VIP Tour Packages
              </h2>
            </div>
            <Link
              to="/packages"
              className="text-primary font-bold text-sm hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore All Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. 5-Star Luxury Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
              Unrivaled Hospitality
            </span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-slate-900 dark:text-white">
              Luxury 5-Star Hotel Partners
            </h2>
          </div>
          <Link
            to="/hotels"
            className="text-primary font-bold text-sm hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Search Rooms & Suites</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.slice(0, 4).map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 6. Customer Testimonials & Reviews */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                Verified Experiences
              </span>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-white">
                What Our VIP Explorers Say
              </h2>
            </div>
            
            <button
              onClick={() => setReviewModalOpen(true)}
              className="gradient-btn !py-2.5 !px-5 !text-xs !rounded-xl flex items-center gap-2 shadow-lg shrink-0 self-start sm:self-auto"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Experience</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="glass !bg-white/10 !border-white/20 p-6 rounded-3xl flex flex-col justify-between hover:scale-102 transition-transform">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < (rev.rating || 5) ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <img
                    src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={rev.userName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{rev.userName}</h4>
                    <span className="text-xs text-emerald-400 font-medium">{rev.destination}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Latest Travel Blogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            WanderLuxe Journal
          </span>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            Travel Inspiration & Guides
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Curated tips from global journalists on hidden lagoons, geisha etiquette, and high-altitude alpine packing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockBlogs.map((blog) => (
            <div key={blog.id} className="glass-card overflow-hidden flex flex-col group border border-slate-200 dark:border-slate-800">
              <div className="relative h-52 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {blog.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span>{blog.date}</span> • <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary">
                  <span>By {blog.author}</span>
                  <Link to="/about" className="hover:underline flex items-center gap-1">
                    <span>Read Article</span> →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <AIRecommenderModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      <CostCalculatorModal isOpen={calcModalOpen} onClose={() => setCalcModalOpen(false)} />

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl glass !bg-white/95 dark:!bg-slate-900/95 border border-white/60 p-6 shadow-2xl relative">
            <h3 className="text-lg font-montserrat font-extrabold mb-4 text-slate-900 dark:text-white">Share Your VIP Experience</h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Destination / Tour</label>
                <input
                  type="text"
                  value={newDest}
                  onChange={(e) => setNewDest(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-semibold"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                  <option value="3">⭐⭐⭐ 3 Stars (Good)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Review</label>
                <textarea
                  rows="3"
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the private villa, tour guide, sunset views..."
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                ></textarea>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setReviewModalOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">Cancel</button>
                <button type="submit" className="flex-1 gradient-btn !py-3 !text-xs !rounded-xl">Post Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
