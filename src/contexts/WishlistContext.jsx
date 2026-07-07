import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderluxe_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wanderluxe_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  const toggleWishlist = (item) => {
    if (!item || !item.id) return;
    const exists = isInWishlist(item.id);
    if (exists) {
      setWishlist(prev => prev.filter(i => i.id !== item.id));
      toast.success('Removed from your wishlist.');
    } else {
      setWishlist(prev => [...prev, item]);
      toast.success('❤️ Saved to your VIP wishlist!');
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
    toast.success('Removed from wishlist.');
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared.');
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
