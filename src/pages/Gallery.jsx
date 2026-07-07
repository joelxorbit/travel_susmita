import React, { useState } from 'react';
import { Camera, X, Sparkles, MapPin } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImg, setSelectedImg] = useState(null);

  const photos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', title: 'Maldives Tropical Lagoon', category: 'Beach', location: 'Maldives Island' },
    { id: 2, src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80', title: 'Fushimi Inari Shrine Gates', category: 'Heritage', location: 'Kyoto, Japan' },
    { id: 3, src: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', title: 'Matterhorn Peak Sunrise', category: 'Mountains', location: 'Zermatt, Switzerland' },
    { id: 4, src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80', title: 'Ulun Danu Beratan Temple', category: 'Heritage', location: 'Bali, Indonesia' },
    { id: 5, src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80', title: 'Oia Sunset Cliff Houses', category: 'Romantic', location: 'Santorini, Greece' },
    { id: 6, src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', title: 'Overwater Luxury Bungalows', category: 'Beach', location: 'Bora Bora, French Polynesia' },
    { id: 7, src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', title: 'Infinity Pool Under Stars', category: 'Romantic', location: 'Amalfi Coast, Italy' },
    { id: 8, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', title: 'Banff National Park Lake', category: 'Mountains', location: 'Alberta, Canada' },
    { id: 9, src: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80', title: 'Mount Fuji Bamboo Forest', category: 'Heritage', location: 'Arashiyama, Japan' }
  ];

  const categories = ['All', 'Beach', 'Heritage', 'Mountains', 'Romantic'];

  const filtered = activeTab === 'All' ? photos : photos.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" /> Visual Wanderlust
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-slate-900 dark:text-white">
            Travel Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Get inspired by real photographs captured by our travelers and professional guides across 120+ global luxury destinations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === cat
                    ? 'gradient-btn !py-2.5 !px-5 shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-[#DB2777] border border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedImg(photo)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">{photo.category}</span>
                <h4 className="text-lg font-montserrat font-bold text-white mt-0.5">{photo.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{photo.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full rounded-3xl overflow-hidden glass !bg-slate-900/90 border border-slate-800 shadow-2xl p-4 sm:p-6 text-white flex flex-col items-center">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-white hover:bg-rose-500 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImg.src}
              alt={selectedImg.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-montserrat font-extrabold">{selectedImg.title}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {selectedImg.location} • {selectedImg.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
