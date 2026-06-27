import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  product: any;
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: any[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (productId: string) => boolean;
  currentUser: any | null;
  setCurrentUser: (user: any) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('omnimarket_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<any[]>(() => {
    const saved = localStorage.getItem('omnimarket_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<any | null>(() => {
    const saved = localStorage.getItem('omnimarket_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('omnimarket_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('omnimarket_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('omnimarket_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('omnimarket_user');
    }
  }, [currentUser]);

  const addToCart = (product: any, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => (item.product.id || item.product._id) === (product.id || product._id));
      if (existing) {
        return prev.map(item => 
          (item.product.id || item.product._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => (item.product.id || item.product._id) !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.product.id || item.product._id) === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: any) => {
    setWishlist(prev => {
      const isFav = prev.some(item => (item.id || item._id) === (product.id || product._id));
      if (isFav) {
        return prev.filter(item => (item.id || item._id) !== (product.id || product._id));
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => (item.id || item._id) === productId);
  };

  const logout = () => setCurrentUser(null);

  return (
    <AppContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      currentUser,
      setCurrentUser,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
