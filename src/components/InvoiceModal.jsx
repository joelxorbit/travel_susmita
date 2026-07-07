import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck, Compass } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function InvoiceModal({ isOpen, onClose, booking }) {
  const { formatPrice } = useCurrency();

  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-3xl bg-white text-slate-900 border border-slate-200 p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Actions bar (hidden during print) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 print:hidden mb-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200">
            <CheckCircle className="w-4 h-4" /> Official Tax Invoice
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-primary/90"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Content */}
        <div className="space-y-8">
          
          {/* Header info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C896] flex items-center justify-center text-white shadow-lg">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-montserrat font-extrabold tracking-tight text-slate-900">
                  WanderLuxe VIP
                </h2>
                <p className="text-xs text-slate-500 font-semibold">Luxury Travel & Tourism Inc.</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-bold uppercase block">Invoice Number</span>
              <span className="text-lg font-montserrat font-extrabold text-slate-900">{booking.invoiceId || `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`}</span>
              <span className="text-xs text-slate-500 block mt-0.5">Date: {booking.date || new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Customer & Trip summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Billed To</span>
              <p className="text-sm font-bold text-slate-900 mt-1">{booking.userName || 'WanderLuxe VIP Explorer'}</p>
              <p className="text-xs text-slate-600">{booking.userEmail || 'explorer@wanderluxe.com'}</p>
              <p className="text-xs text-slate-500 mt-1">Status: <span className="font-bold text-emerald-600 uppercase">{booking.status || 'Confirmed'}</span></p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Booking Reference</span>
              <p className="text-sm font-bold text-slate-900 mt-1">{booking.title || 'Luxury Tour Package'}</p>
              <p className="text-xs text-slate-600">ID: {booking.id || 'WL-BK-9021'}</p>
              <p className="text-xs text-slate-500 mt-1">Travelers: {booking.guests || 2} Persons</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Description / Package</th>
                  <th className="py-3 px-4">Qty / Guests</th>
                  <th className="py-3 px-4">Unit Rate</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {booking.title || 'Bali Ultimate Tropical Escape'}
                    <span className="block text-xs text-slate-500 font-normal mt-0.5">All-inclusive 5-star lodging, VIP transport & meals</span>
                  </td>
                  <td className="py-4 px-4">{booking.guests || 2} Persons</td>
                  <td className="py-4 px-4">{formatPrice((Number(booking.amount) || 1450) / (booking.guests || 1))}</td>
                  <td className="py-4 px-4 text-right font-extrabold text-slate-900">{formatPrice(booking.amount || 1450)}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-600">Complimentary VIP Airport Transfer & Concierge</td>
                  <td className="py-3 px-4">1 Trip</td>
                  <td className="py-3 px-4">{formatPrice(0)}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600">FREE</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-600">National Park & Temple ATOL Protection Fee</td>
                  <td className="py-3 px-4">Included</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-700">{formatPrice(0)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-300 font-bold text-sm sm:text-base">
                  <td colSpan="3" className="py-4 px-4 text-right uppercase tracking-wider text-slate-600">Total Paid Amount:</td>
                  <td className="py-4 px-4 text-right font-montserrat font-extrabold text-primary text-lg sm:text-xl">
                    {formatPrice(booking.amount || 1450)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Protected by Razorpay Secure Gateway</span>
            </div>
            <span>Thank you for traveling with WanderLuxe!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
