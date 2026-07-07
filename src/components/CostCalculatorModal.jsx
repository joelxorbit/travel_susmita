import React, { useState } from 'react';
import { Calculator, X, DollarSign, Users, Calendar, Sparkles } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CostCalculatorModal({ isOpen, onClose }) {
  const { formatPrice } = useCurrency();
  const [destType, setDestType] = useState('Asia');
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [hotelGrade, setHotelGrade] = useState('5star');
  const [insurance, setInsurance] = useState(true);

  if (!isOpen) return null;

  const baseRate = destType === 'Europe' ? 250 : destType === 'Island Luxury' ? 350 : 180;
  const hotelMult = hotelGrade === 'luxury' ? 1.8 : hotelGrade === '5star' ? 1.3 : 1.0;
  
  const lodgingCost = Math.round(baseRate * days * hotelMult * (travelers / 2));
  const flightCost = destType === 'Europe' ? 850 * travelers : destType === 'Island Luxury' ? 1100 * travelers : 650 * travelers;
  const foodAndTour = Math.round(80 * days * travelers);
  const insCost = insurance ? 45 * travelers : 0;
  const totalEstimated = lodgingCost + flightCost + foodAndTour + insCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl glass !bg-white/95 dark:!bg-slate-900/95 border border-white/60 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00C896] to-[#0066FF] flex items-center justify-center text-white shadow-md">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-montserrat font-extrabold text-slate-900 dark:text-white">
              Instant Trip Cost Estimator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Customize parameters to estimate your all-inclusive vacation</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Destination Region
              </label>
              <select
                value={destType}
                onChange={(e) => setDestType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold focus:outline-none"
              >
                <option value="Asia">Asia & Orient ($$)</option>
                <option value="Europe">Europe & Alps ($$$)</option>
                <option value="Island Luxury">Maldives / Santorini ($$$$)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Hotel Grade
              </label>
              <select
                value={hotelGrade}
                onChange={(e) => setHotelGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold focus:outline-none"
              >
                <option value="standard">4-Star Superior</option>
                <option value="5star">5-Star Luxury Resort</option>
                <option value="luxury">Presidential Villa / Plunge Pool</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Duration: {days} Days
              </label>
              <input
                type="range"
                min="3"
                max="21"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer mt-2"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Travelers: {travelers} Persons
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer mt-2"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Include VIP Travel & Medical Insurance
            </span>
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
              className="w-4 h-4 accent-primary rounded cursor-pointer"
            />
          </div>

          {/* Breakdown Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white shadow-xl mt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Flights ({travelers} travelers):</span>
              <span className="text-white font-semibold">{formatPrice(flightCost)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Hotel & Lodging ({days} nights):</span>
              <span className="text-white font-semibold">{formatPrice(lodgingCost)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Dining & VIP Tours:</span>
              <span className="text-white font-semibold">{formatPrice(foodAndTour)}</span>
            </div>
            {insurance && (
              <div className="flex justify-between text-slate-400">
                <span>Travel Insurance:</span>
                <span className="text-white font-semibold">{formatPrice(insCost)}</span>
              </div>
            )}
            <div className="pt-3 border-t border-slate-700 flex justify-between items-baseline text-sm">
              <span className="font-extrabold uppercase tracking-wider text-amber-400">Total Estimated Cost:</span>
              <span className="text-2xl font-montserrat font-extrabold text-white">{formatPrice(totalEstimated)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
