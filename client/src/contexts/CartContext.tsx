import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@shared/schema';

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount with migration
  useEffect(() => {
    // First try to load from new key
    let savedCart = localStorage.getItem('mira-cart');
    
    // If not found, migrate from old key
    if (!savedCart) {
      savedCart = localStorage.getItem('nava-cart');
      if (savedCart) {
        // Migrate to new key
        localStorage.setItem('mira-cart', savedCart);
        localStorage.removeItem('nava-cart');
        console.log('Migrated cart data from nava-cart to mira-cart');
      }
    }
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mira-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      // Fetch product from API
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) return;
      
      const product = await response.json();

      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === productId);
        if (existingItem) {
          return prevItems.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevItems, { productId, quantity, product }];
        }
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      // Validate price is a valid number
      if (isNaN(price) || price < 0) {
        console.warn(`Invalid price for product ${item.productId}:`, item.product.price);
        return total;
      }
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};