import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Compass, User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Creating your VIP Membership...');

    try {
      await signup(email, password, fullName, email.split('@')[0], phone);
      toast.dismiss(toastId);
      toast.success('🎉 Welcome to WanderLuxe VIP Club!');
      navigate('/');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden py-12">
      
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-lg rounded-3xl glass !bg-slate-900/90 !border-slate-800 p-8 shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C896] flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
              <Compass className="w-7 h-7 animate-spin-slow" />
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-montserrat font-extrabold tracking-tight">
            Join WanderLuxe VIP Club
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Unlock secret discounts, complimentary airport transfers, and private concierge
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-slate-950/80 border border-slate-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@gmail.com"
                  className="w-full bg-slate-950/80 border border-slate-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2831"
                  className="w-full bg-slate-950/80 border border-slate-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Password</label>
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-slate-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn !py-3.5 !rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 mt-4"
          >
            <span>{loading ? 'Creating Account...' : 'Create VIP Membership'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>



        <p className="mt-8 text-center text-xs text-slate-400">
          Already a VIP member?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
