"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../components/cartContext";


interface CartClientProps {
  userId: string;
}

export default function CartClient({ userId }: CartClientProps) {
  const { cart, totalPrice, removeFromCart, clearCart, fetchCart } = useCart();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        await fetchCart(userId);
      }
      setLoading(false);
    };
    loadCart();
  }, [userId, fetchCart]);

  const handlePurchase = () => {
    if (cart.length === 0) return;
    alert("🎉 Order placed successfully!");
    clearCart(userId); 
    router.push("/")
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-zinc-500 font-medium">
        Loading your cart items...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-black mb-8 text-zinc-900 dark:text-zinc-100">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link href="/menu" className="text-amber-500 font-bold underline">Go to Menu</Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="divide-y divide-gray-100 dark:divide-zinc-800 border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-xs">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100" />
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 capitalize">{item.name}</h3>
                    <p className="text-sm text-zinc-400">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="font-black text-zinc-900 dark:text-zinc-100">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                  <button 
                    onClick={() => removeFromCart(userId, item._id)} 
                    className="text-red-500 hover:text-red-600 text-sm font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-zinc-400 font-medium">Grand Total</p>
              <span className="text-3xl font-black text-amber-500">
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePurchase}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg active:scale-98 transition-all duration-200 cursor-pointer text-center"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}