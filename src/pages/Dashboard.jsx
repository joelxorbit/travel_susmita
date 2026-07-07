import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { travelApi } from '../services/api';
import InvoiceModal from '../components/InvoiceModal';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Calendar, Heart, Settings, ShieldCheck, Printer, 
  Trash2, ArrowRight, CheckCircle2, Lock, Sparkles, LogOut, Compass 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { currentUser, logout, isAdmin } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Profile update state
  const [name, setName] = useState(currentUser?.name || 'Sarah Jenkins');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 019-2831');
  const [pass, setPass] = useState('');

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await travelApi.getUserBookings();
        setBookings(res || []);
      } catch (err) {
        console.error("Failed loading bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success('✨ Profile updated successfully!');
    setPass('');
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this luxury trip booking?')) return;
    try {
      await travelApi.cancelBooking(bookingId);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
      toast.success('Booking cancelled. ATOL refund initiated.');
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Profile Banner */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#0066FF] to-[#00C896] flex items-center justify-center text-2xl font-extrabold shadow-lg border-2 border-white/20">
              {currentUser?.name?.charAt(0) || 'V'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-montserrat font-extrabold">{currentUser?.name || 'VIP Traveler'}</h1>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Gold Member
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>{currentUser?.email || 'explorer@wanderluxe.com'}</span> •
                <span>Joined July 2026</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
              >
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'bookings', label: 'My Bookings', icon: <Calendar className="w-4 h-4" />, count: bookings.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: <Heart className="w-4 h-4" />, count: wishlist.length },
            { id: 'settings', label: 'Profile & Security', icon: <Settings className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2].map(i => <div key={i} className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 glass-card p-12 rounded-3xl">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold">No confirmed journeys yet</h3>
                <p className="text-sm text-slate-400 mt-1">Explore our VIP tour packages and start planning your next vacation.</p>
                <Link to="/packages" className="mt-4 gradient-btn !py-2.5 !px-5 text-xs inline-flex items-center gap-1.5">
                  <span>Explore Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-0.5 rounded-md">
                          ID: {b.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          b.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-600'
                        }`}>
                          {b.status || 'Confirmed'}
                        </span>
                      </div>
                      <h3 className="text-lg font-montserrat font-bold text-slate-900 dark:text-white">
                        {b.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Departure: <strong className="text-slate-700 dark:text-slate-300">{b.date}</strong> • {b.guests} Guests • Paid via {b.paymentMethod || 'Razorpay SSL'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Paid</span>
                        <span className="text-2xl font-montserrat font-extrabold text-primary">
                          {formatPrice(b.amount || 1450)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedInvoice(b)}
                          className="px-3.5 py-2 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-1.5 shadow hover:bg-primary/90"
                          title="Print / View Invoice"
                        >
                          <Printer className="w-4 h-4" />
                          <span className="hidden sm:inline">Invoice</span>
                        </button>
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                            title="Cancel Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="text-center py-20 glass-card p-12 rounded-3xl">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold">Your wishlist is empty</h3>
                <p className="text-sm text-slate-400 mt-1">Click the heart icon on any destination or package to save it for later.</p>
                <Link to="/destinations" className="mt-4 gradient-btn !py-2.5 !px-5 text-xs inline-flex items-center gap-1.5">
                  <span>Browse Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div key={item.id} className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                    <div>
                      <img src={item.images ? item.images[0] : item.image || ''} alt={item.name || item.title} className="w-full h-44 object-cover rounded-2xl mb-3" />
                      <span className="text-[10px] uppercase font-bold text-secondary block">{item.category || item.type || 'Saved Item'}</span>
                      <h4 className="text-base font-montserrat font-bold text-slate-900 dark:text-white mt-1">{item.name || item.title}</h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-lg font-montserrat font-extrabold text-primary">{formatPrice(item.price || 1000)}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          to={item.type ? `/packages/${item.id}` : `/destinations/${item.id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-xl">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-xl font-montserrat font-extrabold mb-6">Personal & Security Settings</h3>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address (Read Only)</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser?.email || 'explorer@wanderluxe.com'}
                    className="w-full p-3 rounded-xl bg-slate-200 dark:bg-slate-800/50 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Change Password</label>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="gradient-btn !py-3 !px-6 !rounded-xl text-sm font-extrabold shadow-md">
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Printable Invoice Modal */}
      <InvoiceModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        booking={selectedInvoice}
      />
    </div>
  );
}
