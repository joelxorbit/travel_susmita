import axios from 'axios';
import { mockDestinations, mockPackages, mockHotels, mockTransportation, mockReviews, mockBlogs } from './mockData';
import { db } from '../firebase/firebase';
import { collection, getDocs, getDoc, doc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : `${window.location.origin}/api`),
  timeout: 5000,
});

// Interceptor for headers
api.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem('wanderluxe_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Token read error:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Local storage booking persistence as backup
const getLocalBookings = () => {
  try {
    const stored = localStorage.getItem('wanderluxe_bookings');
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return [
    { id: 'bkg-101', title: 'Bali Ultimate Tropical Escape', amount: 2900, guests: 2, date: '2026-08-15', status: 'Confirmed', userName: 'Sarah Jenkins', userEmail: 'sarah@gmail.com', paymentMethod: 'Razorpay SSL' },
    { id: 'bkg-102', title: 'Santorini Romantic Cliffside Suite', amount: 2400, guests: 2, date: '2026-09-01', status: 'Confirmed', userName: 'Alexander Sterling', userEmail: 'alex@wanderluxe.com', paymentMethod: 'Razorpay SSL' }
  ];
};

const saveLocalBookings = (list) => {
  try {
    localStorage.setItem('wanderluxe_bookings', JSON.stringify(list));
  } catch (e) {}
};

// Helper: Read from Firebase Firestore or seed initial data if collection is empty
async function getOrSeedCollection(colName, seedData) {
  try {
    const colRef = collection(db, colName);
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    }
    console.log(`[Firebase Firestore] Collection '${colName}' is empty in travel-3206f. Auto-seeding initial data...`);
    const seededList = [];
    for (const item of seedData) {
      const docId = String(item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`);
      const docRef = doc(colRef, docId);
      const cleanItem = JSON.parse(JSON.stringify(item));
      await setDoc(docRef, cleanItem);
      seededList.push({ ...cleanItem, id: docId });
    }
    console.log(`[Firebase Firestore] Successfully seeded ${seededList.length} items to '${colName}'!`);
    return seededList;
  } catch (err) {
    console.warn(`[Firebase Firestore] Error reading collection '${colName}' (falling back to local/mock data):`, err.message || err);
    return seedData;
  }
}

export const travelApi = {
  // Destinations
  getDestinations: async () => {
    return await getOrSeedCollection('destinations', mockDestinations);
  },
  getDestinationById: async (id) => {
    try {
      const docRef = doc(db, 'destinations', String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    } catch (err) {
      console.warn('Firestore getDestinationById error:', err);
    }
    const all = await travelApi.getDestinations();
    return all.find(d => String(d.id) === String(id)) || all[0];
  },
  createDestination: async (data) => {
    try {
      const colRef = collection(db, 'destinations');
      const cleanData = JSON.parse(JSON.stringify(data));
      const docRef = await addDoc(colRef, cleanData);
      return { id: docRef.id, ...cleanData };
    } catch (err) {
      console.error('Firestore createDestination error:', err);
      const newDest = { ...data, id: `dest-${Date.now()}` };
      mockDestinations.unshift(newDest);
      return newDest;
    }
  },
  deleteDestination: async (id) => {
    try {
      await deleteDoc(doc(db, 'destinations', String(id)));
    } catch (err) {
      console.error('Firestore deleteDestination error:', err);
      const idx = mockDestinations.findIndex(d => String(d.id) === String(id));
      if (idx !== -1) mockDestinations.splice(idx, 1);
    }
  },

  // Packages
  getPackages: async () => {
    return await getOrSeedCollection('packages', mockPackages);
  },
  getPackageById: async (id) => {
    try {
      const docRef = doc(db, 'packages', String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    } catch (err) {
      console.warn('Firestore getPackageById error:', err);
    }
    const all = await travelApi.getPackages();
    return all.find(p => String(p.id) === String(id)) || all[0];
  },
  createPackage: async (data) => {
    try {
      const colRef = collection(db, 'packages');
      const cleanData = JSON.parse(JSON.stringify(data));
      const docRef = await addDoc(colRef, cleanData);
      return { id: docRef.id, ...cleanData };
    } catch (err) {
      console.error('Firestore createPackage error:', err);
      const newPkg = { ...data, id: `pkg-${Date.now()}` };
      mockPackages.unshift(newPkg);
      return newPkg;
    }
  },
  deletePackage: async (id) => {
    try {
      await deleteDoc(doc(db, 'packages', String(id)));
    } catch (err) {
      console.error('Firestore deletePackage error:', err);
      const idx = mockPackages.findIndex(p => String(p.id) === String(id));
      if (idx !== -1) mockPackages.splice(idx, 1);
    }
  },

  // Hotels
  getHotels: async () => {
    return await getOrSeedCollection('hotels', mockHotels);
  },

  // Transportation
  getTransportation: async () => {
    return await getOrSeedCollection('transportation', mockTransportation);
  },

  // Reviews
  getReviews: async () => {
    return await getOrSeedCollection('reviews', mockReviews);
  },
  addReview: async (reviewData) => {
    try {
      const colRef = collection(db, 'reviews');
      const newRev = { ...JSON.parse(JSON.stringify(reviewData)), date: 'Just now', likes: 1 };
      const docRef = await addDoc(colRef, newRev);
      return { review: { id: docRef.id, ...newRev } };
    } catch (err) {
      console.error('Firestore addReview error:', err);
      const newRev = { ...reviewData, id: `rev-${Date.now()}`, date: 'Just now', likes: 1 };
      mockReviews.unshift(newRev);
      return { review: newRev };
    }
  },

  // Blogs
  getBlogs: async () => {
    return await getOrSeedCollection('blogs', mockBlogs);
  },

  // Bookings (User & Admin)
  getUserBookings: async () => {
    return await getOrSeedCollection('bookings', getLocalBookings());
  },
  getAdminBookings: async () => {
    return await getOrSeedCollection('bookings', getLocalBookings());
  },
  createBooking: async (bookingData) => {
    try {
      const colRef = collection(db, 'bookings');
      const newBooking = { ...JSON.parse(JSON.stringify(bookingData)), status: 'Confirmed', createdAt: new Date().toISOString() };
      const docRef = await addDoc(colRef, newBooking);
      const res = { id: docRef.id, ...newBooking };
      const list = getLocalBookings();
      list.unshift(res);
      saveLocalBookings(list);
      return res;
    } catch (err) {
      console.error('Firestore createBooking error:', err);
      const list = getLocalBookings();
      const newBooking = { ...bookingData, id: `bkg-${Date.now()}`, status: 'Confirmed' };
      list.unshift(newBooking);
      saveLocalBookings(list);
      return newBooking;
    }
  },
  cancelBooking: async (id) => {
    try {
      await updateDoc(doc(db, 'bookings', String(id)), { status: 'Cancelled' });
    } catch (err) {
      console.error('Firestore cancelBooking error:', err);
    }
    const list = getLocalBookings().map(b => String(b.id) === String(id) ? { ...b, status: 'Cancelled' } : b);
    saveLocalBookings(list);
  },
  updateBookingStatus: async (id, status) => {
    try {
      await updateDoc(doc(db, 'bookings', String(id)), { status });
    } catch (err) {
      console.error('Firestore updateBookingStatus error:', err);
    }
    const list = getLocalBookings().map(b => String(b.id) === String(id) ? { ...b, status } : b);
    saveLocalBookings(list);
  }
};

export default api;
