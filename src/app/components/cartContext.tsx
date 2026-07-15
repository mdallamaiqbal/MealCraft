"use client";

import React, { createContext, useContext, useState } from "react";
 import { addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, getCartItems as apiGetCartItems } from "../lib/cart/cart";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, product: Omit<CartItem, "quantity">, quantity: number) => Promise<boolean>;
  removeFromCart: (userId: string, id: string) => Promise<boolean>;
  clearCart: (userId: string) => Promise<void>;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const fetchCart = async (userId: string) => {
    const response = await apiGetCartItems(userId);
    if (response.success && response.data) {
      const mappedCart: CartItem[] = response.data.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      }));
      setCart(mappedCart);
    }
  };
  const addToCart = async (userId: string, product: Omit<CartItem, "quantity">, quantity: number) => {
    const response = await apiAddToCart({
      userId,
      foodId: product._id,
      quantity
    });

    if (response.success) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === product._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
      return true;
    }
    return false;
  };
  const removeFromCart = async (userId: string, id: string) => {
    const response = await apiRemoveFromCart(userId, id);
    if (response.success) {
      setCart((prev) => prev.filter((item) => item._id !== id));
      return true;
    }
    return false;
  };

  const clearCart = async (userId: string) => {
  try {
    
    const deletePromises = cart.map((item) => apiRemoveFromCart(userId, item._id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing backend cart:", error);
  } finally {
    
    setCart([]);
  }
};

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};