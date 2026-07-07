import React, { useState } from 'react';
import { Sparkles, X, Compass, Check, ArrowRight, Heart } from 'lucide-react';
import { mockPackages } from '../services/mockData';
import { useCurrency } from '../contexts/CurrencyContext';
import { Link } from 'react-router-dom';

export default function AIRecommenderModal({ isOpen, onClose }) {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState('Beach');
  const [budget, setBudget] = useState('2500');
  const [duration, setDuration] = useState('7 Days');

  if (!isOpen) return null;

  const moods = [
    { name: 'Beach & Islands', icon: '🏝️', desc: 'Sunny lagoons & surf' },
    { name: 'Pilgrimage Heritage', icon: '⛩️', desc: 'Temples & Zen gardens' },
    { name: 'Honeymoon Romantic', icon: '💑', desc: 'Cliffside villas & wine' },
    { name: 'Alps & Hill Station', icon: '🏔️', desc: 'Glaciers & fondue' },
    { name: 'Luxury Safari', icon: '🦁', desc: '5-star camps & wildlife' }
  ];

  const matchedPackages = mockPackages.filter(p => {
    const priceNum = Number(p.price || 2000);
    const budgetNum = Number(budget);
    return priceNum <= budgetNum + 500;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl glass !bg-white/95 dark:!bg-slate-900/95 border border-white/60 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C896] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-xl font-montserrat font-extrabold text-slate-900 dark:text-white">
              AI Dream Trip Recommender
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Answer 2 quick questions to find your custom luxury itinerary</p>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                1. What vibe or mood are you seeking?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moods.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMood(m.name.split(' ')[0])}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      mood.includes(m.name.split(' ')[0])
                        ? 'bg-primary/10 border-primary text-primary font-bold shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <span className="text-sm block">{m.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{m.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  2. Maximum Budget Per Person
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1500">Up to $1,500</option>
                  <option value="2500">Up to $2,500</option>
                  <option value="3500">Up to $3,500</option>
                  <option value="5000">Unlimited VIP ($5,000+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  3. Preferred Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="5 Days">5 Days / 4 Nights</option>
                  <option value="7 Days">7 Days / 6 Nights</option>
                  <option value="10 Days">10+ Days Extended</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full gradient-btn !py-3.5 !rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 mt-4 shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate AI Recommendations</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                🎯 Found {matchedPackages.length} Perfect Matches for you
              </span>
              <button onClick={() => setStep(1)} className="text-xs text-primary font-bold hover:underline">
                ← Change Filters
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
              {matchedPackages.map((pkg) => (
                <div key={pkg.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <img src={pkg.images ? pkg.images[0] : ''} alt={pkg.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-extrabold text-secondary uppercase block">{pkg.type}</span>
                      <h4 className="text-sm font-montserrat font-bold text-slate-900 dark:text-white">{pkg.title}</h4>
                      <span className="text-xs text-slate-400 block mt-0.5">{pkg.duration} • ⭐ {pkg.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 dark:border-slate-700">
                    <span className="text-lg font-montserrat font-extrabold text-primary">{formatPrice(pkg.price)}</span>
                    <Link
                      to={`/packages/${pkg.id}`}
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl gradient-btn !text-xs !py-1.5 shadow-md flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
