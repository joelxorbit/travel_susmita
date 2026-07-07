import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, Clock, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bespoke Package Inquiry');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success('✈️ Inquiry transmitted! A dedicated VIP concierge will contact you within 2 hours.');
      setName('');
      setEmail('');
      setMessage('');
      setLoading(false);
    }, 1000);
  };

  const faqs = [
    { id: 1, q: 'How does WanderLuxe guarantee 100% financial protection?', a: 'All tour packages and hotel bookings are fully protected under ATOL and secured through Razorpay escrow. In the event of unforeseen international cancellations, you receive guaranteed prompt refunds or rebooking options.' },
    { id: 2, q: 'Can I customize an existing package or build an itinerary from scratch?', a: 'Yes! Our travel specialists specialize in tailor-made luxury journeys. Use our AI Recommender or contact our concierge directly to adjust flight classes, add private helicopter tours, or upgrade hotel suites.' },
    { id: 3, q: 'What is included in the complimentary VIP airport transfer?', a: 'Every booking over $1,000 includes private meet-and-greet service at your destination airport by an English-speaking chauffeur with a luxury air-conditioned sedan or SUV.' },
    { id: 4, q: 'How do I access my booking receipts and tax invoices?', a: 'Simply log into your VIP account and navigate to the Dashboard. You can download or print official ATOL tax invoices instantly for any confirmed booking.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5" /> 24/7 VIP Concierge
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            Get in Touch With Us
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Have questions about an upcoming itinerary, visa regulations, or private yacht charters? Our travel specialists are available around the clock.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          
          {/* Left info box */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-xl font-montserrat font-extrabold text-slate-900 dark:text-white">
                Global Headquarters
              </h3>
              
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">New York Office</h4>
                  <p className="text-slate-500 mt-1">480 Fifth Avenue, Luxury Plaza, 22nd Floor, New York, NY 10018</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">VIP Phone Hotline</h4>
                  <p className="text-slate-500 mt-1">+1 (800) 926-3375 (Toll Free US)</p>
                  <p className="text-slate-500">+44 20 7946 0921 (Europe / London)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Direct Concierge Email</h4>
                  <p className="text-slate-500 mt-1">vip@wanderluxe.com</p>
                  <p className="text-slate-500">concierge@wanderluxe.com</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600">
                <Clock className="w-4 h-4" />
                <span>Operating Hours: 24 Hours / 7 Days a Week</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-2xl font-montserrat font-extrabold text-slate-900 dark:text-white mb-6">
                Send a Bespoke Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sarah Jenkins"
                      className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@gmail.com"
                      className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Subject / Destination of Interest</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Maldives Honeymoon Package for October"
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Detailed Message / Special Requests</label>
                  <textarea
                    rows="4"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know your preferred travel dates, number of guests, suite preferences, or dietary requirements..."
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="gradient-btn !py-3.5 !px-8 !rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting Inquiry...' : 'Submit Inquiry to Concierge'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-montserrat font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-primary" /> Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full p-5 bg-slate-50 dark:bg-slate-800/60 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === faq.id ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaq === faq.id && (
                <div className="p-5 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
