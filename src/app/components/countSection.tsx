"use client";

import React, { useState } from "react";
import { useCart } from "./cartContext";
import { redirect } from "next/navigation";

interface CounterSectionProps {
  food: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  userId: string; 
}

export default function CounterSection({ food, userId }: CounterSectionProps) {
  const [count, setCount] = useState<number>(1);
  const { addToCart } = useCart();

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    const success = await addToCart(userId, { _id: food._id, name: food.name, price: food.price, image: food.image }, count);
    
    if (success) {
      alert(`Successfully added ${count} ${food.name} to your cart!`);
      redirect('/cart')
    } else {
      alert(`Failed to add item to cart. Please try again.`);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-zinc-800">
        <button type="button" onClick={handleDecrement} className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700 text-lg font-bold cursor-pointer">-</button>
        <span className="px-4 py-2 font-bold text-zinc-900 dark:text-zinc-100 min-w-[40px] text-center">{count}</span>
        <button type="button" onClick={handleIncrement} className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700 text-lg font-bold cursor-pointer">+</button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md active:scale-98 transition-all duration-200 cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
}