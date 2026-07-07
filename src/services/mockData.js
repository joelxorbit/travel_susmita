export const mockDestinations = [
  {
    id: 'dest-1',
    name: 'Bali Ultimate Tropical Escape',
    country: 'Indonesia',
    location: 'Bali, Indonesia',
    price: 1450,
    category: 'Beach',
    ratings: 4.9,
    reviewsCount: 320,
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
    description: 'Experience crystal clear turquoise lagoons, sacred Hindu temples in Ubud, private pool villas, and unforgettable beachfront dining in Seminyak.',
    weather: { temp: '29°C', condition: 'Sunny & Tropical', humidity: '74%' },
    map: { lat: '-8.4095', lng: '115.1889' },
    packages: [],
    hotels: []
  },
  {
    id: 'dest-2',
    name: 'Santorini Romantic Cliffside Suite',
    country: 'Greece',
    location: 'Oia, Santorini',
    price: 2400,
    category: 'Honeymoon',
    ratings: 5.0,
    reviewsCount: 410,
    images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80'],
    description: 'Iconic whitewashed cave suites with private heated infinity plunge pools overlooking the sparkling Aegean caldera at sunset.',
    weather: { temp: '26°C', condition: 'Clear Skies', humidity: '55%' },
    map: { lat: '36.4618', lng: '25.3753' },
    packages: [],
    hotels: []
  },
  {
    id: 'dest-3',
    name: 'Kyoto Imperial Shinto Experience',
    country: 'Japan',
    location: 'Kyoto & Tokyo, Japan',
    price: 2200,
    category: 'Pilgrimage',
    ratings: 4.9,
    reviewsCount: 280,
    images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'],
    description: 'Immerse in timeless Shinto shrines, walk through the Fushimi Inari torii gates, participate in authentic tea ceremonies, and ride 1st class Shinkansen.',
    weather: { temp: '22°C', condition: 'Mild & Zen', humidity: '60%' },
    map: { lat: '35.0116', lng: '135.7681' },
    packages: [],
    hotels: []
  },
  {
    id: 'dest-4',
    name: 'Swiss Alps Express Chalet',
    country: 'Switzerland',
    location: 'Zermatt & St. Moritz',
    price: 2890,
    category: 'Hill Station',
    ratings: 4.8,
    reviewsCount: 195,
    images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'],
    description: 'Panoramic rail journeys on the Glacier Express, high-altitude alpine hiking, Matterhorn views, and gourmet cheese fondue dining.',
    weather: { temp: '14°C', condition: 'Crisp Alpine Breeze', humidity: '45%' },
    map: { lat: '46.0207', lng: '7.7491' },
    packages: [],
    hotels: []
  },
  {
    id: 'dest-5',
    name: 'Maldives Overwater VIP Lagoon',
    country: 'Maldives',
    location: 'Baa Atoll, Maldives',
    price: 3200,
    category: 'Luxury',
    ratings: 5.0,
    reviewsCount: 512,
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'],
    description: 'Ultra-luxury overwater bungalows with glass floor panels, 24/7 personal butler concierge, and private seaplane transfers.',
    weather: { temp: '30°C', condition: 'Pristine Sunshine', humidity: '70%' },
    map: { lat: '5.2950', lng: '73.2568' },
    packages: [],
    hotels: []
  },
  {
    id: 'dest-6',
    name: 'Amalfi Coast Luxury Yacht Tour',
    country: 'Italy',
    location: 'Positano & Capri, Italy',
    price: 2650,
    category: 'Romantic',
    ratings: 4.9,
    reviewsCount: 230,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'],
    description: 'Sail the dramatic Italian coastline on a chartered yacht, dine at cliffside Michelin terraces, and explore the Blue Grotto of Capri.',
    weather: { temp: '27°C', condition: 'Warm Mediterranean', humidity: '62%' },
    map: { lat: '40.6281', lng: '14.4850' },
    packages: [],
    hotels: []
  }
];

export const mockPackages = [
  {
    id: 'pkg-1',
    title: 'Bali Ultimate Tropical Escape',
    destinationId: 'dest-1',
    destinationName: 'Bali, Indonesia',
    price: 1450,
    duration: '7 Days / 6 Nights',
    type: 'Beach',
    rating: 4.9,
    reviewsCount: 140,
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'],
    overview: 'All-inclusive tropical vacation featuring 5-star resort accommodations in Seminyak, private AC SUV sightseeing, daily breakfast, and spa treatments.',
    inclusions: ['6 Nights 5-Star Resort Stay', 'Daily Gourmet Breakfast & 3 Dinners', 'Private AC Sightseeing SUV & Driver', 'VIP Airport Transfers', 'Full Day Nusa Penida Island Tour'],
    exclusions: ['International Flight Airfare', 'Personal Travel Insurance', 'Personal Shopping & Tips', 'Optional Alcoholic Beverages'],
    itinerary: [
      { day: 1, title: 'VIP Airport Meet & Greet', desc: 'Chilled coconut welcome drink and private limousine transfer to your luxury villa in Seminyak.' },
      { day: 2, title: 'Sacred Temples & Ubud Rice Terraces', desc: 'Visit Tegallalang rice terraces and the sacred Monkey Forest with a private historian guide.' },
      { day: 3, title: 'Nusa Penida Catamaran Excursion', desc: 'Sail across crystal waters to Kelingking Beach and Crystal Bay for private guided snorkeling.' },
      { day: 4, title: 'Seminyak Sunset Beach Club VIP', desc: 'Relax in reserved VIP daybeds at Potato Head Beach Club with sunset cocktails.' },
      { day: 5, title: 'Traditional Balinese Spa & Dining', desc: 'Enjoy a 3-hour couple herbal massage followed by a candlelit seafood dinner on Jimbaran beach.' },
      { day: 6, title: 'Cliffside Uluwatu & Fire Dance', desc: 'Witness the breathtaking Kecak fire dance overlooking the sunset ocean cliffs.' },
      { day: 7, title: 'Farewell Breakfast & Airport Transit', desc: 'Leisurely champagne breakfast and private transfer to Denpasar International Airport.' }
    ]
  },
  {
    id: 'pkg-2',
    title: 'Santorini Sunset Honeymoon Dream',
    destinationId: 'dest-2',
    destinationName: 'Santorini, Greece',
    price: 2650,
    duration: '6 Days / 5 Nights',
    type: 'Honeymoon',
    rating: 5.0,
    reviewsCount: 210,
    images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80'],
    overview: 'The ultimate romantic Greek island retreat featuring whitewashed cave suites, private plunge pools, and a sunset catamaran cruise with seafood dinner.',
    inclusions: ['5 Nights Luxury Caldera Cave Suite', 'Private Heated Infinity Pool', 'Sunset Catamaran Cruise with Dinner', 'Private Wine Tasting at Venetsanos Winery', 'Daily Champagne Breakfast in Bed'],
    exclusions: ['International Airfare', 'Travel Medical Insurance', 'Lunch & Extra Dinners'],
    itinerary: [
      { day: 1, title: 'Santorini Arrival & Check-in', desc: 'Private luxury transfer from Thira Airport to your cliffside cave suite in Oia.' },
      { day: 2, title: 'Oia Photo Walking Tour', desc: 'Explore the blue-domed churches with a professional photographer.' },
      { day: 3, title: 'Private Catamaran Sunset Cruise', desc: 'Sail to the Red Beach and hot springs with onboard BBQ seafood dinner.' },
      { day: 4, title: 'Volcanic Wine Tasting Experience', desc: 'Private wine tasting overlooking the volcanic caldera.' },
      { day: 5, title: 'Leisure Day & Cliffside Dining', desc: 'Relax in your plunge pool and enjoy reserved VIP seating at an Oia gourmet restaurant.' },
      { day: 6, title: 'Departure & Chauffeur Transit', desc: 'Private transfer back to Santorini airport.' }
    ]
  },
  {
    id: 'pkg-3',
    title: 'Imperial Kyoto & Tokyo Heritage Tour',
    destinationId: 'dest-3',
    destinationName: 'Kyoto & Tokyo, Japan',
    price: 2200,
    duration: '8 Days / 7 Nights',
    type: 'Pilgrimage',
    rating: 4.9,
    reviewsCount: 185,
    images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'],
    overview: 'A deep cultural journey through ancient Shinto shrines, Zen rock gardens, samurai heritage, and modern neon Tokyo.',
    inclusions: ['7 Nights 5-Star Hotel & Ryokan Stay', '1st Class JR Shinkansen Bullet Train Pass', 'Private Geisha Tea Ceremony in Gion', 'Mount Fuji Excursion with Private Guide', 'All Shrine Entrance Fees'],
    exclusions: ['International Airfare', 'Personal Shopping', 'Some Dinners'],
    itinerary: [
      { day: 1, title: 'Tokyo Haneda VIP Arrival', desc: 'Private transfer to The Capitol Hotel Tokyu.' },
      { day: 2, title: 'Tokyo Modern & Historic Exploration', desc: 'Visit Asakusa Senso-ji Temple and Shibuya Sky.' },
      { day: 3, title: 'Mount Fuji & Hakone Ryokan', desc: 'Private excursion to Lake Ashi and stay in a traditional hot spring Ryokan.' },
      { day: 4, title: 'Shinkansen Bullet Train to Kyoto', desc: '1st class train ride and evening walk in historical Gion.' },
      { day: 5, title: 'Fushimi Inari & Golden Pavilion', desc: 'Guided tour of Kinkaku-ji and the thousands of red torii gates.' },
      { day: 6, title: 'Arashiyama Bamboo Forest & Tea Ceremony', desc: 'Walk the bamboo groves and enjoy an authentic tea ceremony.' },
      { day: 7, title: 'Nara Deer Park Excursion', desc: 'Visit Todai-ji temple and feed the friendly sacred deer.' },
      { day: 8, title: 'Osaka VIP Airport Departure', desc: 'Private transfer to Kansai International Airport.' }
    ]
  },
  {
    id: 'pkg-4',
    title: 'Swiss Alps Alpine Express Tour',
    destinationId: 'dest-4',
    destinationName: 'Zermatt, Switzerland',
    price: 2890,
    duration: '7 Days / 6 Nights',
    type: 'Hill Station',
    rating: 4.8,
    reviewsCount: 160,
    images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'],
    overview: 'Experience the majesty of the Swiss Alps on scenic glass-domed train rides with luxury chalets and alpine fondue dining.',
    inclusions: ['6 Nights Luxury Alpine Chalet Stay', '1st Class Glacier Express Ticket', 'Gornergrat Cogwheel Mountain Railway Pass', 'Daily Swiss Breakfast & Fondue Dinner', 'All Train & Luggage Transfers'],
    exclusions: ['International Airfare', 'Ski Equipment Rental'],
    itinerary: [
      { day: 1, title: 'Zurich Arrival & Lucerne Transit', desc: 'Train transfer to picturesque Lake Lucerne.' },
      { day: 2, title: 'Mount Pilatus Gondola Adventure', desc: 'Ride the aerial cableway to panoramic alpine peaks.' },
      { day: 3, title: 'Glacier Express Scenic Rail', desc: 'Board the world-famed panoramic train to St. Moritz.' },
      { day: 4, title: 'Zermatt & Matterhorn Views', desc: 'Explore the car-free alpine village of Zermatt.' },
      { day: 5, title: 'Gornergrat Mountain Railway', desc: 'Ascend to 3,089 meters for breathtaking Matterhorn views.' },
      { day: 6, title: 'Geneva Lakeside Elegance', desc: 'Visit Montreux and Château de Chillon on Lake Geneva.' },
      { day: 7, title: 'Geneva Airport Departure', desc: 'First class train transfer to Geneva International Airport.' }
    ]
  }
];

export const mockHotels = [
  {
    id: 'htl-1',
    name: 'The Royal Seminyak Resort & Spa',
    location: 'Seminyak Beach, Bali',
    price: 250,
    rating: 4.9,
    reviewsCount: 310,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    facilities: ['Free High-Speed WiFi', 'Infinity Ocean Pool', 'Luxury Herbal Spa', '24/7 Room Service', 'Private Beach Access']
  },
  {
    id: 'htl-2',
    name: 'Canaves Oia Epitome Luxury Villas',
    location: 'Oia Caldera, Santorini',
    price: 480,
    rating: 5.0,
    reviewsCount: 420,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    facilities: ['Heated Plunge Pool', 'Sunset Caldera Terrace', 'Michelin Star Dining', 'Private Butler Concierge', 'Helipad Access']
  },
  {
    id: 'htl-3',
    name: 'Four Seasons Hotel Kyoto',
    location: 'Higashiyama, Kyoto',
    price: 390,
    rating: 4.9,
    reviewsCount: 290,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
    facilities: ['800-Year-Old Pond Garden', 'Traditional Tea House', 'Luxury Indoor Pool', 'Chauffeur Service', 'Spa & Wellness Center']
  },
  {
    id: 'htl-4',
    name: 'The Omnia Alpine Lodge',
    location: 'Zermatt, Switzerland',
    price: 420,
    rating: 4.9,
    reviewsCount: 215,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    facilities: ['Matterhorn Mountain Views', 'Indoor/Outdoor Heated Pool', 'Fine Alpine Dining', 'Ski-in & Ski-out', 'Sauna & Jacuzzi']
  }
];

export const mockTransportation = [
  { id: 'trn-1', type: 'Flight', class: 'First Class VIP', provider: 'Emirates / Singapore Airlines', route: 'New York (JFK) ⇄ Denpasar Bali (DPS)', timing: 'Daily Departures • 18h 30m', duration: '1 Stopover VIP Lounge', availability: '24/7 Concierge Booking', price: 2850 },
  { id: 'trn-2', type: 'Train', class: 'Gran Class 1st Class', provider: 'Japan Railways (JR Shinkansen)', route: 'Tokyo Station ⇄ Kyoto Station', timing: 'Every 15 Minutes • 2h 15m', duration: 'Direct Bullet Train', availability: 'Instant Seat Reservation', price: 180 },
  { id: 'trn-3', type: 'Rental Car', class: 'Executive Maybach SUV', provider: 'WanderLuxe Private Chauffeur', route: 'Zurich Airport ⇄ St. Moritz Chalet', timing: 'On Demand • 3h 00m', duration: 'Chauffeur Driven', availability: 'Includes Luggage Assistance', price: 450 },
  { id: 'trn-4', type: 'Taxi', class: 'Luxury Mercedes S-Class', provider: 'VIP Chauffeur Transit', route: 'Thira Airport (JTR) ⇄ Oia Hotel Suite', timing: '24/7 On Demand • 25m', duration: 'Private Airport Transfer', availability: 'Complimentary Water & WiFi', price: 85 }
];

export const mockReviews = [
  { id: 'rev-1', userName: 'Marcus & Elena Vance', destination: 'Santorini Romantic Cliffside Suite', rating: 5, comment: 'Our honeymoon was flawless! The private cave suite with the heated plunge pool overlooking Oia was worth every single penny. WanderLuxe concierge handled everything.', date: '3 days ago', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', likes: 24 },
  { id: 'rev-2', userName: 'Dr. Arthur Pendelton', destination: 'Imperial Kyoto & Tokyo Heritage Tour', rating: 5, comment: 'The Geisha tea ceremony in Gion and first-class Shinkansen tickets were seamlessly organized. Best luxury cultural tour I have experienced in 20 years of traveling.', date: '1 week ago', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', likes: 18 },
  { id: 'rev-3', userName: 'Sophia Chen & Family', destination: 'Bali Ultimate Tropical Escape', rating: 5, comment: 'Our driver Made in Ubud was an absolute gem! From the private pool villa to the sunset dinner at Jimbaran beach, the attention to detail was extraordinary.', date: '2 weeks ago', userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', likes: 31 }
];

export const mockBlogs = [
  { id: 'blog-1', title: 'Top 10 Hidden Lagoons in the Maldives for Private Swimming', category: 'Island Luxury', author: 'Alexander Sterling', date: 'July 2, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80', excerpt: 'Discover secret sandbanks and turquoise lagoons accessible only by chartered seaplanes or private catamaran.' },
  { id: 'blog-2', title: 'The Art of Kyoto: Geisha Etiquette & Private Shinto Shrines', category: 'Cultural Heritage', author: 'Kenji Takahashi', date: 'June 28, 2026', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', excerpt: 'A guide to experiencing authentic Japanese traditions with respect and gaining after-hours access to historical temples.' },
  { id: 'blog-3', title: 'Packing for High Altitude Elegance: Swiss Alps Winter Guide', category: 'Alpine Luxury', author: 'Elena Rostova', date: 'June 15, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80', excerpt: 'How to transition effortlessly from scenic panoramic train journeys to ski-in chalets and Michelin dining.' }
];

// Attach associations
mockDestinations.forEach(dest => {
  dest.packages = mockPackages.filter(p => p.destinationId === dest.id);
  dest.hotels = mockHotels.slice(0, 2);
});
