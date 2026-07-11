import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Compass, Mail, Lock, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error('Please enter username/email and password');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Authenticating credentials...');

    try {
      const res = await login(identifier, password);
      toast.dismiss(toastId);

      // SPECIAL CHECK AS REQUESTED:
      const idLower = identifier.trim().toLowerCase();
      if (
        idLower === 'admin' ||
        idLower === 'admin@gmail.com' ||
        idLower === 'admin@wanderluxe.com' ||
        res?.user?.email === 'admin@gmail.com' ||
        res?.user?.email === 'admin@wanderluxe.com'
      ) {
        toast.success('👑 Welcome WanderLuxe Master Admin! Redirecting to Admin Panel...');
        navigate('/admin');
      } else {
        toast.success('🎉 Welcome back! Signed in successfully.');
        navigate(from);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };


  const fillAdmin = () => {
    setIdentifier('admin@gmail.com');
    setPassword('admin@123');
    toast('👑 Admin credentials filled! Click Sign In.');
  };

  const fillDemoUser = () => {
    setIdentifier('explorer@wanderluxe.com');
    setPassword('travel2026');
    toast('✈️ Demo VIP user filled! Click Sign In.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md rounded-3xl glass !bg-slate-900/90 !border-slate-800 p-8 shadow-2xl relative z-10">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C896] flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
              <Compass className="w-7 h-7 animate-spin-slow" />
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-montserrat font-extrabold tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your VIP bookings, saved itineraries, and rewards
          </p>
        </div>

        {/* Master Admin Notice Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-500/40 text-xs text-amber-300 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-extrabold uppercase tracking-wider block text-[10px] text-amber-400">Admin Page Access</span>
              <span>Email: <strong className="text-white underline">admin@gmail.com</strong> (or <strong>admin</strong>) | Pass: <strong className="text-white underline">admin@123</strong></span>
            </div>
          </div>
          <button
            type="button"
            onClick={fillAdmin}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[10px] rounded-lg transition-all shadow shrink-0"
          >
            Auto-Fill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. admin@gmail.com or explorer@gmail.com"
                className="w-full bg-slate-950/80 border border-slate-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <Link to="/forgot-password" className="text-[11px] text-primary hover:underline font-semibold">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn !py-3.5 !rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo User Helper */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={fillDemoUser}
            className="text-[11px] text-slate-400 hover:text-white transition-colors underline"
          >
            Or auto-fill regular demo traveler account
          </button>
        </div>



        {/* Footer Link */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Register VIP Membership
          </Link>
        </p>
      </div>
    </div>
  );
}
