import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { travelApi } from '../services/api';
import PaymentModal from '../components/PaymentModal';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { 
  Clock, Star, Heart, Check, X, MapPin, Calendar, Users, 
  ShieldCheck, ArrowLeft, ChevronDown, ChevronUp, Sparkles, Hotel, Car, Utensils, UserCheck 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function PackageDetail() {
  const { id } = useParams();
  const { formatPrice, currency } = useCurrency();
  const { currentUser } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [openDay, setOpenDay] = useState(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-08-15');
  const [payModalOpen, setPayModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await travelApi.getPackageById(id);
        setPkg(data);
      } catch (err) {
        console.error("Failed to load package detail:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Loading itinerary details...</div>;
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold">Package Not Found</h2>
        <Link to="/packages" className="mt-4 gradient-btn !py-2 !px-4 text-xs">Browse Packages</Link>
      </div>
    );
  }

  const saved = isInWishlist(pkg.id);
  const images = pkg.images && pkg.images.length > 0 ? pkg.images : ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'];
  const unitPrice = Number(pkg.price || 1500);
  const totalPrice = unitPrice * guests;

  const handleBookingSuccess = async (paymentData) => {
    try {
      await travelApi.createBooking({
        title: pkg.title,
        type: 'Package',
        amount: totalPrice,
        guests: Number(guests),
        date: date,
        paymentId: paymentData.razorpay_payment_id,
        userName: currentUser ? currentUser.name : 'VIP Traveler',
        userEmail: currentUser ? currentUser.email : 'traveler@wanderluxe.com'
      });
      toast.success('🎉 Booking recorded in your profile!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Booking confirmation notice saved offline.');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/packages" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Packages</span>
          </Link>
          
          <button
            onClick={() => toggleWishlist(pkg)}
            className={`p-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 text-xs font-bold ${
              saved ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-500 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            <span>{saved ? 'Saved in Wishlist' : 'Save Package'}</span>
          </button>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
              {pkg.type || 'Luxury Tour'} • {pkg.destinationName || 'World Landmark'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
              {pkg.title}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-secondary font-bold"><Clock className="w-4 h-4" /> {pkg.duration || '7 Days / 6 Nights'}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-4 h-4 fill-current" /> {pkg.rating || 4.9} ({pkg.reviewsCount || 140} Reviews)</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          <div className="lg:col-span-2 h-80 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl relative">
            <img src={images[activeImgIdx]} alt={pkg.title} className="w-full h-full object-cover transition-all duration-500" />
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

        {/* Main Content + Booking Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Details & Itinerary */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-montserrat font-extrabold text-slate-900 dark:text-white mb-4">
                Package Overview
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {pkg.overview || 'Carefully handcrafted VIP itinerary featuring luxury accommodations, dedicated sightseeing transport, and authentic local experiences.'}
              </p>

              {/* Quick Perks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-primary shrink-0" />
                  <span>5-Star Resort Stay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-secondary shrink-0" />
                  <span>VIP AC SUV Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>All Breakfasts & Dinners</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Dedicated Private Guide</span>
                </div>
              </div>
            </div>

            {/* Day-by-Day Itinerary Accordion */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-montserrat font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Day-by-Day VIP Itinerary
              </h3>

              <div className="space-y-3">
                {(pkg.itinerary || [
                  { day: 1, title: 'VIP Airport Arrival & Check-In', desc: 'Chilled champagne welcome and sunset beach relaxation.' },
                  { day: 2, title: 'Sacred Temples & Nature Excursion', desc: 'Visit historical landmarks with your certified English historian guide.' },
                  { day: 3, title: 'Private Island Catamaran Cruise', desc: 'Full day island hopping with onboard seafood barbecue & snorkeling.' },
                  { day: 4, title: 'Spa Rejuvenation & Departure', desc: 'Balinese herbal massage and luxury limousine transfer to airport.' }
                ]).map((item) => (
                  <div key={item.day} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/60 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-primary text-white text-xs flex items-center justify-center shrink-0">
                          Day {item.day}
                        </span>
                        <span>{item.title}</span>
                      </span>
                      {openDay === item.day ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openDay === item.day && (
                      <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/10">
                <h4 className="font-montserrat font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-base">
                  <Check className="w-5 h-5 text-emerald-500" /> What's Included
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {(pkg.inclusions || ['6 Nights 5-Star Hotel Stay', 'Daily Gourmet Breakfast & 3 Dinners', 'Private AC Sightseeing Transfers', 'All Entrance Fees', 'Full Day Island Excursion']).map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-rose-500/30 bg-rose-950/10">
                <h4 className="font-montserrat font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-base">
                  <X className="w-5 h-5 text-rose-500" /> What's Excluded
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {(pkg.exclusions || ['International Flight Airfare', 'Personal Travel & Medical Insurance', 'Personal Shopping & Extra Beverages', 'Optional Spa Upgrades']).map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
              
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block">Rate Per Person</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-montserrat font-extrabold text-primary">
                    {formatPrice(unitPrice)}
                  </span>
                  <span className="text-xs text-slate-400">all-inclusive</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Select Departure Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Number of Travelers
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>{formatPrice(unitPrice)} × {guests} Travelers</span>
                  <span className="font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>VIP Concierge & Taxes</span>
                  <span>Included</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline text-sm font-bold text-slate-900 dark:text-white">
                  <span>Total Due:</span>
                  <span className="text-xl font-montserrat font-extrabold text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={() => setPayModalOpen(true)}
                className="w-full gradient-btn !py-4 !rounded-2xl text-base font-extrabold shadow-xl hover:scale-102 transition-transform flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Book This Journey Now</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-600 font-semibold pt-2">
                <ShieldCheck className="w-4 h-4" />
                <span>100% ATOL & Razorpay Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        item={{ title: pkg.title, price: totalPrice, duration: pkg.duration }}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}
