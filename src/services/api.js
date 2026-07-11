import axios from 'axios';
import { mockDestinations, mockPackages, mockHotels, mockTransportation, mockReviews, mockBlogs } from './mockData';

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
    { id: 'bkg-101', title: 'Bali Ultimate Tropical Escape', amount: 2900, guests: 2, date: '2026-08-15', status: 'Confirmed', userName: 'Sarah Jenkins', userEmail: 'sarah@gmail.com', paymentMethod: 'Razorpay SSL', createdAt: new Date().toISOString() },
    { id: 'bkg-102', title: 'Santorini Romantic Cliffside Suite', amount: 2400, guests: 2, date: '2026-09-01', status: 'Confirmed', userName: 'Alexander Sterling', userEmail: 'alex@wanderluxe.com', paymentMethod: 'Razorpay SSL', createdAt: new Date().toISOString() }
  ];
};

const saveLocalBookings = (list) => {
  try {
    localStorage.setItem('wanderluxe_bookings', JSON.stringify(list));
  } catch (e) {}
};

// Helper: fetch from SQLite3 REST API endpoint, fallback to seedData
async function getFromSQLite(endpoint, fallbackData) {
  try {
    const response = await api.get(endpoint);
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
    return fallbackData;
  } catch (err) {
    return fallbackData;
  }
}

export const travelApi = {
  // Destinations
  getDestinations: async () => {
    return await getFromSQLite('/destinations', mockDestinations);
  },
  getDestinationById: async (id) => {
    try {
      const res = await api.get(`/destinations/${id}`);
      if (res.data) return res.data;
    } catch (err) {}
    const all = await travelApi.getDestinations();
    return all.find(d => String(d.id) === String(id)) || all[0];
  },
  createDestination: async (data) => {
    try {
      const res = await api.post('/destinations', data);
      return res.data;
    } catch (err) {
      const newDest = { ...data, id: `dest-${Date.now()}` };
      mockDestinations.unshift(newDest);
      return newDest;
    }
  },
  deleteDestination: async (id) => {
    try {
      await api.delete(`/destinations/${id}`);
    } catch (err) {
      const idx = mockDestinations.findIndex(d => String(d.id) === String(id));
      if (idx !== -1) mockDestinations.splice(idx, 1);
    }
  },

  // Packages
  getPackages: async () => {
    return await getFromSQLite('/packages', mockPackages);
  },
  getPackageById: async (id) => {
    try {
      const res = await api.get(`/packages/${id}`);
      if (res.data) return res.data;
    } catch (err) {}
    const all = await travelApi.getPackages();
    return all.find(p => String(p.id) === String(id)) || all[0];
  },
  createPackage: async (data) => {
    try {
      const res = await api.post('/packages', data);
      return res.data;
    } catch (err) {
      const newPkg = { ...data, id: `pkg-${Date.now()}` };
      mockPackages.unshift(newPkg);
      return newPkg;
    }
  },
  deletePackage: async (id) => {
    try {
      await api.delete(`/packages/${id}`);
    } catch (err) {
      const idx = mockPackages.findIndex(p => String(p.id) === String(id));
      if (idx !== -1) mockPackages.splice(idx, 1);
    }
  },

  // Hotels
  getHotels: async () => {
    return mockHotels;
  },

  // Transportation
  getTransportation: async () => {
    return mockTransportation;
  },

  // Reviews
  getReviews: async () => {
    return await getFromSQLite('/reviews', mockReviews);
  },
  addReview: async (reviewData) => {
    try {
      const res = await api.post('/reviews', reviewData);
      return { review: res.data };
    } catch (err) {
      const newRev = { ...reviewData, id: `rev-${Date.now()}`, date: 'Just now', likes: 1 };
      mockReviews.unshift(newRev);
      return { review: newRev };
    }
  },

  // Blogs
  getBlogs: async () => {
    return mockBlogs;
  },

  // Bookings (User & Admin)
  getUserBookings: async () => {
    return await getFromSQLite('/bookings', getLocalBookings());
  },
  getAdminBookings: async () => {
    return await getFromSQLite('/bookings', getLocalBookings());
  },
  createBooking: async (bookingData) => {
    try {
      const res = await api.post('/bookings', bookingData);
      const list = getLocalBookings();
      list.unshift(res.data);
      saveLocalBookings(list);
      return res.data;
    } catch (err) {
      const list = getLocalBookings();
      const newBooking = { ...bookingData, id: `bkg-${Date.now()}`, status: 'Confirmed', createdAt: new Date().toISOString() };
      list.unshift(newBooking);
      saveLocalBookings(list);
      return newBooking;
    }
  },
  cancelBooking: async (id) => {
    try {
      await api.put(`/bookings/${id}/status`, { status: 'Cancelled' });
    } catch (err) {}
    const list = getLocalBookings().map(b => String(b.id) === String(id) ? { ...b, status: 'Cancelled' } : b);
    saveLocalBookings(list);
  },
  updateBookingStatus: async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
    } catch (err) {}
    const list = getLocalBookings().map(b => String(b.id) === String(id) ? { ...b, status } : b);
    saveLocalBookings(list);
  }
};

export default api;
