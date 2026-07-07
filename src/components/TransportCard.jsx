import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { Plane, Train, Car, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TransportCard({ item }) {
  const { formatPrice } = useCurrency();

  if (!item) return null;

  const getIcon = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'flight': return <Plane className="w-5 h-5 text-primary" />;
      case 'train': return <Train className="w-5 h-5 text-secondary" />;
      case 'rental car': case 'taxi': return <Car className="w-5 h-5 text-amber-500" />;
      default: return <Plane className="w-5 h-5 text-primary" />;
    }
  };

  const handleBook = () => {
    toast.success(`✈️ Reserved seat/vehicle on ${item.provider}! Proceed to checkout.`);
  };

  return (
    <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/50 dark:border-slate-800">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
          {getIcon(item.type)}
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            {item.type} • {item.class}
          </span>
          <h4 className="text-lg font-montserrat font-bold text-slate-900 dark:text-white">
            {item.provider}
          </h4>
          <p className="text-xs font-semibold text-primary mt-0.5">{item.route}</p>
        </div>
      </div>

      <div className="flex flex-col sm:items-end text-sm w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{item.timing}</span>
        </div>
        <span className="text-xs text-slate-400 mt-0.5">{item.duration} • {item.availability}</span>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Fare</span>
          <span className="text-2xl font-montserrat font-extrabold text-primary">
            {formatPrice(item.price || 150)}
          </span>
        </div>
        <button
          onClick={handleBook}
          className="px-5 py-2.5 rounded-xl gradient-btn !text-xs !py-2 !px-4 mt-1 shadow-md flex items-center gap-1"
        >
          <span>Select</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
