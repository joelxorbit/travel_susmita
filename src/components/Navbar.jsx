import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import { 
  Compass, Sun, Moon, Heart, Bell, User, LogIn, Menu, X, 
  ChevronDown, ShieldAlert, Sparkles, CheckCircle2, Trash2 
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { currency, changeCurrency, rates } = useCurrency();
  const { wishlist } = useWishlist();
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotification();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Transport', path: '/transportation' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#DB2777] via-[#E11D48] to-[#BE185D] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-montserrat font-extrabold tracking-tight text-slate-900">
                Wander<span className="text-primary">Luxe</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 -mt-1">VIP Expeditions</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Currency, Theme & Wishlist (Hidden on mobile, available in drawer) */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => { setCurrOpen(!currOpen); setNotifOpen(false); }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold flex items-center gap-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>{rates[currency]?.symbol || '$'} {currency}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {currOpen && (
                  <div className="absolute right-0 mt-2 w-32 glass rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                    {Object.keys(rates).map((code) => (
                      <button
                        key={code}
                        onClick={() => { changeCurrency(code); setCurrOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-xs font-bold flex items-center justify-between hover:bg-primary/10 transition-colors ${
                          currency === code ? 'text-primary' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{code}</span>
                        <span className="text-slate-400 font-mono">{rates[code].symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark / Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* Wishlist Link */}
              <Link
                to="/dashboard"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white transition-all border border-slate-200 dark:border-slate-700 relative"
                title="View Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setCurrOpen(false); }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 glass !bg-white/95 dark:!bg-slate-900/95 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 animate-in fade-in duration-200">
                  <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-primary" />
                      <h4 className="text-xs font-montserrat font-bold">VIP Notifications</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-[10px] text-primary hover:underline font-bold">
                          Mark read
                        </button>
                      )}
                      <button onClick={clearNotifications} className="text-slate-400 hover:text-white" title="Clear all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-400">No new notifications</div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className={`p-4 transition-colors ${!n.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                          <div className="flex justify-between items-start">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</h5>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Auth Button */}
            {currentUser ? (
              <Link
                to={isAdmin ? '/admin' : '/dashboard'}
                className="gradient-btn !py-2 !px-3 sm:!px-4 !rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
              >
                {isAdmin ? <ShieldAlert className="w-4 h-4 text-amber-300 animate-pulse" /> : <User className="w-4 h-4" />}
                <span className="hidden sm:inline">{isAdmin ? 'Admin Portal' : (currentUser.name?.split(' ')[0] || 'My Account')}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="gradient-btn !py-2 !px-4 !rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          {/* Mobile Quick Controls Row */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => { changeCurrency(currency === 'USD' ? 'EUR' : currency === 'EUR' ? 'INR' : currency === 'INR' ? 'GBP' : 'USD'); }}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold flex items-center justify-center gap-1 border border-slate-200 dark:border-slate-700"
            >
              <span>🌐 {rates[currency]?.symbol || '$'} {currency}</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold flex items-center justify-center gap-1 border border-slate-200 dark:border-slate-700 relative"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-xs font-bold text-center ${
                  location.pathname === link.path ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 flex justify-center">
            <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 24/7 VIP Travel Concierge Active
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
