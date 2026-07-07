import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import toast from 'react-hot-toast';

export default function PaymentModal({ isOpen, onClose, item, onSuccess }) {
  const { formatPrice, currency } = useCurrency();
  const [method, setMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [cardNum, setCardNum] = useState('4532 •••• •••• 8841');
  const [upiId, setUpiId] = useState('explorer@okaxis');

  if (!isOpen || !item) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Contacting Razorpay Secure Gateway...', { id: 'pay_toast' });

    setTimeout(() => {
      toast.dismiss('pay_toast');
      toast.success('🎉 Payment Successful! Your luxury booking is confirmed.');
      setLoading(false);
      if (onSuccess) {
        onSuccess({
          razorpay_payment_id: `pay_${Date.now()}`,
          razorpay_order_id: `order_${Date.now()}`,
          amount: item.price || item.amount || 1000,
          currency: currency
        });
      }
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass !bg-white/95 dark:!bg-slate-900/95 border border-white/60 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C896] flex items-center justify-center text-white shadow-md">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-montserrat font-extrabold text-slate-900 dark:text-white">
              Secure Checkout
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Encrypted 256-bit SSL Razorpay Gateway</p>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-6 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Booking Item</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block truncate max-w-[220px]">
              {item.title || item.name || 'Luxury Tour Package'}
            </span>
            <span className="text-xs text-slate-500">{item.duration || 'All-Inclusive VIP'}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Due</span>
            <span className="text-xl font-montserrat font-extrabold text-primary">
              {formatPrice(item.price || item.amount || 1000)}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod('razorpay')}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                method === 'razorpay'
                  ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-xl">💳</span>
              <div>
                <span className="text-xs block font-bold">Razorpay / Card</span>
                <span className="text-[10px] text-slate-400">Visa, MC, Amex</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMethod('upi')}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                method === 'upi'
                  ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-xl">⚡</span>
              <div>
                <span className="text-xs block font-bold">Instant UPI / QR</span>
                <span className="text-[10px] text-slate-400">GPay, PhonePe</span>
              </div>
            </button>
          </div>
        </div>

        {/* Input Details */}
        <form onSubmit={handlePay} className="space-y-4">
          {method === 'razorpay' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Card Number (Demo Test Mode)
              </label>
              <input
                type="text"
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Virtual Payment Address (VPA / UPI ID)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@okaxis"
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-btn !py-3.5 !rounded-2xl text-base font-extrabold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Processing Payment...' : `Pay ${formatPrice(item.price || item.amount || 1000)} Now`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-emerald-600 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Guaranteed ATOL & SSL Protected Transaction</span>
        </div>
      </div>
    </div>
  );
}
