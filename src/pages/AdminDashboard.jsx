import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { travelApi } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, MapPin, Gift, Hotel, Car, Users, DollarSign, 
  TrendingUp, Plus, Trash2, Edit3, CheckCircle2, XCircle, 
  LogOut, ShieldAlert, Sparkles, RefreshCw, Eye 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { currentUser, logout, isAdmin } = useAuth();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('analytics');
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transport, setTransport] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals for CRUD
  const [isAddDestOpen, setIsAddDestOpen] = useState(false);
  const [newDestName, setNewDestName] = useState('');
  const [newDestCountry, setNewDestCountry] = useState('');
  const [newDestPrice, setNewDestPrice] = useState('1200');
  const [newDestCat, setNewDestCat] = useState('Beach');

  const [isAddPkgOpen, setIsAddPkgOpen] = useState(false);
  const [newPkgTitle, setNewPkgTitle] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState('1800');
  const [newPkgDuration, setNewPkgDuration] = useState('7 Days / 6 Nights');

  useEffect(() => {
    async function loadAll() {
      try {
        const [dests, pkgs, htls, trns, bkgs] = await Promise.all([
          travelApi.getDestinations(),
          travelApi.getPackages(),
          travelApi.getHotels(),
          travelApi.getTransportation(),
          travelApi.getAdminBookings()
        ]);
        setDestinations(dests || []);
        setPackages(pkgs || []);
        setHotels(htls || []);
        setTransport(trns || []);
        setBookings(bkgs || []);
      } catch (err) {
        console.error("Admin dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  // CRUD Handlers
  const handleCreateDestination = async (e) => {
    e.preventDefault();
    if (!newDestName || !newDestCountry) return;
    try {
      const created = await travelApi.createDestination({
        name: newDestName,
        country: newDestCountry,
        location: newDestCountry,
        price: Number(newDestPrice),
        category: newDestCat,
        ratings: 5.0,
        reviewsCount: 1,
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80']
      });
      setDestinations(prev => [created || { id: `dest-${Date.now()}`, name: newDestName, location: newDestCountry, price: Number(newDestPrice), category: newDestCat }, ...prev]);
      toast.success('🏝️ New destination published to live site!');
      setIsAddDestOpen(false);
      setNewDestName('');
      setNewDestCountry('');
    } catch (err) {
      toast.error('Failed to create destination');
    }
  };

  const handleDeleteDestination = async (id) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    try {
      await travelApi.deleteDestination(id);
      setDestinations(prev => prev.filter(d => d.id !== id));
      toast.success('Destination deleted.');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    if (!newPkgTitle) return;
    try {
      const created = await travelApi.createPackage({
        title: newPkgTitle,
        price: Number(newPkgPrice),
        duration: newPkgDuration,
        type: 'Luxury Tour',
        rating: 5.0,
        images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80']
      });
      setPackages(prev => [created || { id: `pkg-${Date.now()}`, title: newPkgTitle, price: Number(newPkgPrice), duration: newPkgDuration }, ...prev]);
      toast.success('🎁 VIP package published successfully!');
      setIsAddPkgOpen(false);
      setNewPkgTitle('');
    } catch (err) {
      toast.error('Failed to create package');
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await travelApi.deletePackage(id);
      setPackages(prev => prev.filter(p => p.id !== id));
      toast.success('Package deleted.');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    toast.success(`Booking #${id} marked as ${newStatus}`);
  };

  const totalRev = bookings.reduce((acc, b) => acc + (b.status !== 'Cancelled' ? (Number(b.amount) || 1500) : 0), 0) + 184500;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="glass !bg-slate-900/90 !border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FFD700] via-[#FF8C00] to-[#FF4500] flex items-center justify-center text-slate-950 font-extrabold shadow-xl">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-montserrat font-extrabold text-white">Master Admin Portal</h1>
                <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Super Admin Access
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>Logged in as: <strong className="text-amber-400">admin</strong></span> •
                <span>System Health: <strong className="text-emerald-400">100% Operational</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-4 h-4 text-primary" />
              <span>View Live Website</span>
            </Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800 no-scrollbar">
          {[
            { id: 'analytics', label: '📊 Visual Analytics', count: null },
            { id: 'destinations', label: '🏝️ Destinations', count: destinations.length },
            { id: 'packages', label: '🎁 Tour Packages', count: packages.length },
            { id: 'hotels', label: '🏨 Luxury Hotels', count: hotels.length },
            { id: 'transport', label: '🚗 Transport', count: transport.length },
            { id: 'bookings', label: '📋 All Bookings', count: bookings.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white shadow-lg scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Visual Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass !bg-slate-900/80 !border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-montserrat font-extrabold text-white">{formatPrice(totalRev)}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
                </span>
              </div>

              <div className="glass !bg-slate-900/80 !border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-montserrat font-extrabold text-white">{1280 + bookings.length} Bookings</span>
                <span className="text-xs text-blue-400 font-semibold flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +24% conversion rate
                </span>
              </div>

              <div className="glass !bg-slate-900/80 !border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active VIP Members</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-montserrat font-extrabold text-white">4,520 Members</span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 mt-2">
                  <span>94% retention rate</span>
                </span>
              </div>

              <div className="glass !bg-slate-900/80 !border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Satisfaction</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-montserrat font-extrabold text-white">4.9 / 5.0 ⭐</span>
                <span className="text-xs text-purple-400 font-semibold flex items-center gap-1 mt-2">
                  <span>Based on 1,420 reviews</span>
                </span>
              </div>
            </div>

            {/* Visual Charts Simulation Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Chart 1: Revenue & Bookings Trend */}
              <div className="glass !bg-slate-900/80 !border-slate-800 p-6 sm:p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-montserrat font-extrabold text-white">Monthly Revenue Breakdown</h3>
                    <p className="text-xs text-slate-400">Past 6 months booking trajectory</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">Live Feed</span>
                </div>

                <div className="space-y-4 pt-4">
                  {[
                    { month: 'March', val: '75%', amt: '$38,400', color: 'bg-blue-500' },
                    { month: 'April', val: '82%', amt: '$44,100', color: 'bg-indigo-500' },
                    { month: 'May', val: '88%', amt: '$52,800', color: 'bg-emerald-500' },
                    { month: 'June', val: '95%', amt: '$68,200', color: 'bg-amber-500' },
                    { month: 'July (Current)', val: '100%', amt: '$84,500', color: 'bg-gradient-to-r from-[#0066FF] to-[#00C896]' }
                  ].map((bar, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <span>{bar.month}</span>
                        <span className="text-white font-bold">{bar.amt}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${bar.color}`} style={{ width: bar.val }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Popular Destination Share */}
              <div className="glass !bg-slate-900/80 !border-slate-800 p-6 sm:p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-montserrat font-extrabold text-white">Top Booked Destinations</h3>
                    <p className="text-xs text-slate-400">Share of customer travel volume</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">Global</span>
                </div>

                <div className="space-y-4 pt-4">
                  {[
                    { name: 'Bali Ultimate Tropical Escape', pct: '35%', color: 'from-emerald-500 to-teal-400' },
                    { name: 'Santorini Romantic Cliffside Suite', pct: '28%', color: 'from-blue-600 to-cyan-400' },
                    { name: 'Kyoto Imperial Shinto Experience', pct: '22%', color: 'from-rose-500 to-pink-400' },
                    { name: 'Swiss Alps Express Chalet', pct: '15%', color: 'from-amber-500 to-yellow-400' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-gradient-to-r shrink-0" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${item.color}`}></span>
                        <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px]">{item.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-white bg-slate-700 px-2.5 py-1 rounded-lg">{item.pct} Share</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Destinations */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Manage Destinations Catalog ({destinations.length})</h3>
              <button
                onClick={() => setIsAddDestOpen(true)}
                className="gradient-btn !py-2.5 !px-5 !text-xs !rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Destination</span>
              </button>
            </div>

            <div className="glass !bg-slate-900/80 !border-slate-800 rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
                    <th className="py-4 px-6">Destination</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Starting Rate</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {destinations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-3">
                        <img src={d.images ? d.images[0] : d.image} alt={d.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span>{d.name}</span>
                          <span className="block text-[10px] text-slate-400 font-normal">{d.location || d.country}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-primary text-xs font-semibold">{d.category || 'Travel'}</span></td>
                      <td className="py-4 px-6 font-bold text-emerald-400">{formatPrice(d.price)}</td>
                      <td className="py-4 px-6">⭐ {d.ratings || 4.9}</td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => handleDeleteDestination(d.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors" title="Delete Destination">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Manage Packages */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Manage Tour Packages ({packages.length})</h3>
              <button
                onClick={() => setIsAddPkgOpen(true)}
                className="gradient-btn !py-2.5 !px-5 !text-xs !rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Package</span>
              </button>
            </div>

            <div className="glass !bg-slate-900/80 !border-slate-800 rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
                    <th className="py-4 px-6">Package Title</th>
                    <th className="py-4 px-6">Duration</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Price / Person</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {packages.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-3">
                        <img src={p.images ? p.images[0] : ''} alt={p.title} className="w-10 h-10 rounded-xl object-cover" />
                        <span>{p.title}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-300">{p.duration}</td>
                      <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-secondary text-xs font-semibold">{p.type}</span></td>
                      <td className="py-4 px-6 font-bold text-primary">{formatPrice(p.price)}</td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => handleDeletePackage(p.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors" title="Delete Package">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Manage Hotels */}
        {activeTab === 'hotels' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">5-Star Partner Hotels ({hotels.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(h => (
                <div key={h.id} className="glass !bg-slate-900/80 p-5 rounded-3xl border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={h.images ? h.images[0] : ''} alt={h.name} className="w-14 h-14 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{h.name}</h4>
                      <span className="text-xs text-slate-400">{h.location} • {formatPrice(h.price)}/night</span>
                    </div>
                  </div>
                  <button onClick={() => { setHotels(prev => prev.filter(item => item.id !== h.id)); toast.success('Hotel partnership removed.'); }} className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Manage Transport */}
        {activeTab === 'transport' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">VIP Transportation Services ({transport.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {transport.map(t => (
                <div key={t.id} className="glass !bg-slate-900/80 p-5 rounded-3xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-primary block">{t.type} • {t.class}</span>
                    <h4 className="font-bold text-sm text-white">{t.provider}</h4>
                    <span className="text-xs text-slate-400">{t.route} • {formatPrice(t.price)}</span>
                  </div>
                  <button onClick={() => { setTransport(prev => prev.filter(item => item.id !== t.id)); toast.success('Transport provider removed.'); }} className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: All Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">All Customer Bookings ({bookings.length})</h3>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">
                100% Escrow Protected
              </span>
            </div>

            <div className="glass !bg-slate-900/80 !border-slate-800 rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
                    <th className="py-4 px-6">Booking ID</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Trip / Package</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-mono text-slate-400">#{b.id}</td>
                      <td className="py-4 px-6 font-bold text-white">{b.userName || 'VIP Explorer'}</td>
                      <td className="py-4 px-6">
                        <span className="font-semibold block text-slate-200">{b.title}</span>
                        <span className="text-[10px] text-slate-400">{b.date} • {b.guests} Guests</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-primary">{formatPrice(b.amount || 1450)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          b.status === 'Cancelled' ? 'bg-rose-500/15 text-rose-400' :
                          b.status === 'Completed' ? 'bg-blue-500/15 text-blue-400' :
                          'bg-emerald-500/15 text-emerald-400'
                        }`}>
                          {b.status || 'Confirmed'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-1.5">
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Completed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white text-[11px] font-bold"
                          title="Mark Complete"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled')}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white text-[11px] font-bold"
                          title="Cancel Booking"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Destination Modal */}
      {isAddDestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl glass !bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-montserrat font-extrabold mb-4 text-white">Add New Destination</h3>
            <form onSubmit={handleCreateDestination} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Destination Name</label>
                <input type="text" required value={newDestName} onChange={(e) => setNewDestName(e.target.value)} placeholder="e.g., Bora Bora Island" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Country / Region</label>
                <input type="text" required value={newDestCountry} onChange={(e) => setNewDestCountry(e.target.value)} placeholder="e.g., French Polynesia" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Starting Price ($)</label>
                  <input type="number" required value={newDestPrice} onChange={(e) => setNewDestPrice(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                  <select value={newDestCat} onChange={(e) => setNewDestCat(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-bold">
                    <option value="Beach">Beach</option>
                    <option value="Pilgrimage">Pilgrimage</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Hill Station">Hill Station</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setIsAddDestOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-800 text-xs font-bold">Cancel</button>
                <button type="submit" className="flex-1 gradient-btn !py-3 !text-xs !rounded-xl">Publish Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Package Modal */}
      {isAddPkgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl glass !bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-montserrat font-extrabold mb-4 text-white">Add New Tour Package</h3>
            <form onSubmit={handleCreatePackage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Package Title</label>
                <input type="text" required value={newPkgTitle} onChange={(e) => setNewPkgTitle(e.target.value)} placeholder="e.g., Santorini Sunset Escape" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Price / Person ($)</label>
                  <input type="number" required value={newPkgPrice} onChange={(e) => setNewPkgPrice(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Duration</label>
                  <input type="text" required value={newPkgDuration} onChange={(e) => setNewPkgDuration(e.target.value)} placeholder="e.g., 6 Days / 5 Nights" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setIsAddPkgOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-800 text-xs font-bold">Cancel</button>
                <button type="submit" className="flex-1 gradient-btn !py-3 !text-xs !rounded-xl">Publish Package</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
