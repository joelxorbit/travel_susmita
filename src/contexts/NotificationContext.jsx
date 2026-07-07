import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { id: 1, title: '🎉 Welcome to WanderLuxe VIP!', message: 'Explore our curated summer packages with 10% early bird savings.', time: 'Just now', read: false },
    { id: 2, title: '✈️ New Direct Flight Added', message: 'First class suites now available on our Tokyo & Kyoto routes.', time: '2 hours ago', read: false },
    { id: 3, title: '🏝️ Bali Lagoon Price Drop', message: 'Overwater luxury villas have open dates for August.', time: '1 day ago', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (title, message) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, markAsRead, addNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
