import React from 'react';
import { Compass, ShieldCheck, Award, Users, Globe, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { label: 'Global Destinations', value: '120+', icon: <Globe className="w-6 h-6 text-primary" /> },
    { label: 'Happy VIP Explorers', value: '45,000+', icon: <Users className="w-6 h-6 text-secondary" /> },
    { label: '5-Star Hotel Partners', value: '850+', icon: <Award className="w-6 h-6 text-amber-500" /> },
    { label: 'ATOL Protected Trips', value: '100%', icon: <ShieldCheck className="w-6 h-6 text-emerald-500" /> }
  ];

  const team = [
    { name: 'Alexander Sterling', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', desc: 'Former international diplomat with 20 years of bespoke expedition experience.' },
    { name: 'Elena Rostova', role: 'VP of Luxury Hospitality', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', desc: 'Curates our exclusive partnerships with Michelin-starred chefs and boutique villas.' },
    { name: 'Kenji Takahashi', role: 'Head of Asia & Orient Operations', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', desc: 'Specialist in private temple ceremonies and bullet train VIP logistics in Kyoto & Tokyo.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" /> Our Story & Heritage
          </span>
          <h1 className="text-4xl sm:text-6xl font-montserrat font-extrabold text-slate-900 dark:text-white tracking-tight">
            Redefining Luxury Travel Since 2015
          </h1>
          <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-light">
            At WanderLuxe, we believe that travel should be an extraordinary transformation—an artful blend of five-star comfort, cultural immersion, and seamless logistics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <span className="text-3xl font-montserrat font-extrabold text-slate-900 dark:text-white">{stat.value}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Values */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-20 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">The WanderLuxe Promise</span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-slate-900 dark:text-white leading-tight">
              Unrivaled Attention to Detail & Personal Concierge
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              We reject mass-market tours. Every itinerary we design is vetted in person by our travel directors. Whether it's a private helicopter transfer to the Matterhorn or after-hours access to the Vatican, we make the impossible effortless.
            </p>

            <div className="space-y-3 mt-6">
              {[
                '100% Financial Protection via ATOL & Razorpay Escrow',
                '24/7 Dedicated Multilingual Travel Concierge Hotline',
                'Curated Partnerships with Leading Airlines & Luxury Resorts',
                'Custom AI Itinerary Wizard & Transparent Pricing'
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/packages" className="gradient-btn !py-3 !px-6 inline-flex items-center gap-2 shadow-lg">
                <span>Explore VIP Packages</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80" alt="luxury hotel" className="rounded-3xl object-cover h-64 shadow-xl translate-y-4" />
            <img src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80" alt="alps train" className="rounded-3xl object-cover h-64 shadow-xl -translate-y-4" />
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">Executive Leadership</span>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            Meet Our Travel Architects
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            A diverse team of seasoned explorers, hoteliers, and tech innovators passionate about creating world-class memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="glass-card overflow-hidden flex flex-col group border border-slate-200 dark:border-slate-800">
              <div className="h-64 overflow-hidden relative">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-montserrat font-bold">{member.name}</h4>
                  <span className="text-xs font-semibold text-primary block">{member.role}</span>
                </div>
              </div>
              <div className="p-6 flex-1 bg-white dark:bg-slate-900/60">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
