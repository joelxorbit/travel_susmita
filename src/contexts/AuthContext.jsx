import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : `${window.location.origin}/api`);
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, fullName, username, phone) {
    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, username, phone })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }
      localStorage.setItem('wanderluxe_token', data.token);
      localStorage.setItem('wanderluxe_user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      // Offline local fallback if server isn't running
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        const fallbackUser = {
          uid: `usr-${Date.now()}`,
          email: email.trim().toLowerCase(),
          fullName: fullName || email.split('@')[0],
          username: username || email.split('@')[0],
          phone: phone || '',
          role: email.trim().toLowerCase() === 'admin@gmail.com' ? 'admin' : 'user',
          plan: 'Free'
        };
        localStorage.setItem('wanderluxe_user', JSON.stringify(fallbackUser));
        setCurrentUser(fallbackUser);
        return { user: fallbackUser };
      }
      throw err;
    }
  }

  async function login(email, password) {
    let loginEmail = email.trim().toLowerCase();
    if (loginEmail === 'admin') {
      loginEmail = 'admin@gmail.com';
    }

    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid email or password');
      }
      localStorage.setItem('wanderluxe_token', data.token);
      localStorage.setItem('wanderluxe_user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      // Special offline / local fallback for master admin and demo accounts
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        if ((loginEmail === 'admin@gmail.com' || loginEmail === 'admin@wanderluxe.com') && password === 'admin@123') {
          const adminUser = {
            uid: 'usr-admin-101',
            email: loginEmail,
            fullName: 'Master Admin',
            username: 'admin',
            phone: '+1 800 WANDERLUXE',
            role: 'admin',
            plan: 'Enterprise VIP'
          };
          localStorage.setItem('wanderluxe_user', JSON.stringify(adminUser));
          setCurrentUser(adminUser);
          return { user: adminUser };
        }
        if (loginEmail === 'explorer@wanderluxe.com' && password === 'travel2026') {
          const demoUser = {
            uid: 'usr-demo-102',
            email: loginEmail,
            fullName: 'Explorer VIP',
            username: 'explorer',
            phone: '+1 555 WANDERLUXE',
            role: 'user',
            plan: 'VIP Club'
          };
          localStorage.setItem('wanderluxe_user', JSON.stringify(demoUser));
          setCurrentUser(demoUser);
          return { user: demoUser };
        }
      }
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem('wanderluxe_token');
    localStorage.removeItem('wanderluxe_user');
    setCurrentUser(null);
  }

  async function resetPassword(email) {
    return Promise.resolve();
  }

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem('wanderluxe_token');
      if (!token) {
        // Check local fallback storage
        const storedUser = localStorage.getItem('wanderluxe_user');
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch (e) {
            localStorage.removeItem('wanderluxe_user');
          }
        }
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${getApiBaseUrl()}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('wanderluxe_user', JSON.stringify(data.user));
          setCurrentUser(data.user);
        } else {
          const storedUser = localStorage.getItem('wanderluxe_user');
          if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
          } else {
            localStorage.removeItem('wanderluxe_token');
            setCurrentUser(null);
          }
        }
      } catch (err) {
        // Offline fallback
        const storedUser = localStorage.getItem('wanderluxe_user');
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch (e) {}
        }
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, []);

  const isAdmin = Boolean(
    currentUser && (
      currentUser.role === 'admin' ||
      currentUser.email === 'admin@gmail.com' ||
      currentUser.email === 'admin@wanderluxe.com' ||
      currentUser.username === 'admin'
    )
  );

  const value = {
    currentUser,
    isAdmin,
    signup,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
