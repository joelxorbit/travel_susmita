import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Core Components & Widgets
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChatWidget from './components/LiveChatWidget';

// Pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Hotels from './pages/Hotels';
import Transportation from './pages/Transportation';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <WishlistProvider>
            <NotificationProvider>
              <Router>
                <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
                  
                  {/* Global Notifications Toaster */}
                  <Toaster 
                    position="top-center" 
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#1e293b',
                        color: '#fff',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: '600',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                      }
                    }} 
                  />

                  {/* Main Navigation Bar */}
                  <Navbar />

                  {/* Page Content Area */}
                  <main className="flex-1">
                    <Routes>
                      {/* Public User Pages */}
                      <Route path="/" element={<Home />} />
                      <Route path="/destinations" element={<Destinations />} />
                      <Route path="/destinations/:id" element={<DestinationDetail />} />
                      <Route path="/packages" element={<Packages />} />
                      <Route path="/packages/:id" element={<PackageDetail />} />
                      <Route path="/hotels" element={<Hotels />} />
                      <Route path="/transportation" element={<Transportation />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      
                      {/* Auth Routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      {/* User Dashboard */}
                      <Route 
                        path="/dashboard" 
                        element={
                          <PrivateRoute>
                            <Dashboard />
                          </PrivateRoute>
                        } 
                      />

                      {/* Master Admin Portal */}
                      <Route 
                        path="/admin" 
                        element={
                          <AdminRoute>
                            <AdminDashboard />
                          </AdminRoute>
                        } 
                      />

                      {/* Catch-all redirect */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>

                  {/* Footer */}
                  <Footer />

                  {/* Interactive AI Travel Assistant Floating Widget */}
                  <LiveChatWidget />

                </div>
              </Router>
            </NotificationProvider>
          </WishlistProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
