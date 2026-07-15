"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllFood } from "../lib/getFood";


interface FoodItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

export default function TopFoods() {
    const [foods, setFoods] = useState<FoodItem[]>([]);

    useEffect(() => {
        const fetchFoods = async () => {
            const response = await getAllFood();
            if (Array.isArray(response)) {
                const firstEightFoods = response.slice(0, 8);
                setFoods(firstEightFoods);
            }
        };

        fetchFoods();
    }, []);

    return (
        <section className="bg-zinc-950 text-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-amber-500">
                    Our Top Delicious Foods
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {foods.map((food) => (
                        <div key={food._id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-all group">
                            <div>
                                <div className="overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="font-semibold text-lg text-zinc-100">{food.name}</h3>
                            </div>

                            <div className="mt-4">
                                <p className="text-amber-400 font-bold mb-3">${food.price}</p>
                                <Link
                                    href={`/menu/${food._id}`}
                                    className="block text-center bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 font-medium text-sm py-2 rounded-lg transition-colors duration-200"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/menu"
                        className="inline-block bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-8 py-3 rounded-full transition-colors duration-200 shadow-lg shadow-amber-500/10"
                    >
                        Explore Full Menu →
                    </Link>
                </div>

            </div>
        </section>
    );
}