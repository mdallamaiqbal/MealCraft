
import React from "react";

import { FoodItem, getAllFood } from "../lib/getFood";
import Link from "next/link";

export default async function MenuPage() {

    const foods: FoodItem[] = await getAllFood();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    🍕 Our Delicious Menu
                </h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    Explore our wide range of freshly prepared meals just for you.
                </p>
            </div>
            {foods.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-divider rounded-2xl">
                    <p className="text-muted-foreground text-lg">No food items available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {foods.map((food) => (
                        <div
                            key={food._id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300"
                        >
                            {/* Image & Category Tag */}
                            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <span className="absolute top-3 left-3 rounded-lg bg-white/90 dark:bg-black/80 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs capitalize">
                                    {food.category}
                                </span>
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-1 flex-col p-5">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 capitalize line-clamp-1 mb-1.5 group-hover:text-amber-500 transition-colors duration-200">
                                        {food.name}
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                                        {food.description}
                                    </p>
                                </div>

                                {/* Price & Action Button */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-medium">Price</span>
                                        <span className="text-xl font-black text-amber-500">
                                            ${food.price.toLocaleString()}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/menu/${food._id}`}
                                        className="inline-flex items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-xs hover:shadow-sm active:scale-98 transition-all duration-200"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}