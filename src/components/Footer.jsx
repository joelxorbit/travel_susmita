import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Mail, Phone, MapPin, ShieldCheck, Award, Heart, 
  Send, Lock, Globe, Share2, MessageSquare, Video 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('✈️ Subscribed to WanderLuxe VIP Newsletter! Expect secret flight discounts in your inbox.');
    setEmail('');
  };

  return (
    <footer className="bg-white text-slate-900 pt-16 pb-12 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Guarantee Banner */}
        <div className="glass !bg-white !border-pink-200 p-8 rounded-3xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-pink-500/5">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">Exclusive Travel Club</span>
            <h3 className="text-2xl sm:text-3xl font-montserrat font-extrabold text-slate-900">
              Join the WanderLuxe VIP Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Receive secret off-market hotel suites, private charter jet deals, and complimentary luxury upgrades delivered straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            <div className="relative w-full sm:w-80">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your VIP email address..."
                className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all font-semibold"
              />
            </div>
            <button
              type="submit"
              className="gradient-btn !py-3 !px-6 !rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform shrink-0"
            >
              <span>Subscribe Now</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-pink-100">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#DB2777] via-[#E11D48] to-[#BE185D] flex items-center justify-center text-white shadow-lg">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-montserrat font-extrabold tracking-tight text-slate-900">
                Wander<span className="text-primary">Luxe</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              We craft bespoke luxury expeditions across 120+ global landmarks. Proudly offering 100% ATOL financial protection and dedicated 24/7 personal travel concierges.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary transition-all"><Share2 className="w-4 h-4" /></a>
              <a href="#facebook" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary transition-all"><Globe className="w-4 h-4" /></a>
              <a href="#twitter" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary transition-all"><MessageSquare className="w-4 h-4" /></a>
              <a href="#youtube" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary transition-all"><Video className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-montserrat font-extrabold uppercase tracking-wider text-white mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
              <li><Link to="/destinations" className="hover:text-primary transition-colors">VIP Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">Luxury Tour Packages</Link></li>
              <li><Link to="/hotels" className="hover:text-primary transition-colors">5-Star Partner Resorts</Link></li>
              <li><Link to="/transportation" className="hover:text-primary transition-colors">Private Jets & Shinkansen</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Travel Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-sm font-montserrat font-extrabold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
              <li><Link to="/about" className="hover:text-primary transition-colors">Our Heritage & Story</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">24/7 Concierge Hotline</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">VIP Account Portal</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Admin Demo Login</Link></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); toast.success('🔒 Your data is SSL encrypted & GDPR compliant'); }} className="hover:text-primary transition-colors">Privacy & Escrow Terms</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Security */}
          <div className="space-y-3 text-xs text-slate-400 font-semibold">
            <h4 className="text-sm font-montserrat font-extrabold uppercase tracking-wider text-white mb-4">Headquarters</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>480 Fifth Avenue, Luxury Plaza, 22nd Floor, New York, NY 10018</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-secondary shrink-0" />
              <span>+1 (800) 926-3375 (24/7 VIP)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>concierge@wanderluxe.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment & ATOL Protection */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span>© 2026 WanderLuxe VIP Travel Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-bold"><ShieldCheck className="w-4 h-4" /> 100% ATOL Financial Protected</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-primary" /> Razorpay 256-bit SSL Escrow Checkout</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
