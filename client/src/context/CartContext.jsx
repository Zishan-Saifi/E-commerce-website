import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const addToCart = (product) => {
    if (!product) return;
    const id = product._id || product.id || product.name;
    setCart((prev) => {
      const existing = prev.find((item) => (item._id || item.id || item.name) === id);
      if (existing) {
        return prev.map((item) =>
          (item._id || item.id || item.name) === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => (item._id || item.id || item.name) !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item._id || item.id || item.name) === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    if (!product) return;
    const id = product._id || product.id || product.name;
    setWishlist((prev) => {
      const exists = prev.some((item) => (item._id || item.id || item.name) === id);
      if (exists) {
        return prev.filter((item) => (item._id || item.id || item.name) !== id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => (item._id || item.id || item.name) !== id)
    );
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <CartContext.Provider
      value={{
        cart: cart || [],
        cartItems: cart || [],
        wishlist: wishlist || [],
        wishlistItems: wishlist || [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist: toggleWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      cartItems: [],
      wishlist: [],
      wishlistItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      addToWishlist: () => {},
      toggleWishlist: () => {},
      removeFromWishlist: () => {},
      clearWishlist: () => {},
    };
  }
  return context;
}