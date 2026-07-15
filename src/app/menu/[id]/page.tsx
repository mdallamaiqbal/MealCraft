import React from "react";
import Link from "next/link";
import { getSingleFood } from "@/app/lib/getFood";
import { getUserSession } from "@/app/lib/session/session";
import CounterSection from "@/app/components/countSection";
import { CartProvider } from "@/app/components/cartContext";

interface DetailProps {
    params: Promise<{ id: string }>;
}

export default async function FoodDetailsPage({ params }: DetailProps) {
    const { id } = await params;

    const food = await getSingleFood(id);
    const session = await getUserSession();

    const isLoggedIn = !!session;
    const isNormalUser = session?.role === "user";
    const userId = session?.id || ""; 

    if (!food) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">Food item not found!</h2>
                <Link href="/menu" className="text-amber-500 underline mt-4 inline-block">Back to Menu</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <Link href="/menu" className="text-amber-500 hover:text-amber-600 text-sm font-semibold flex items-center gap-1 mb-6">
                ← Back to Menu
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                {/* Large Image */}
                <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800 aspect-square">
                    <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details Content */}
                <div className="flex flex-col justify-between">
                    <div>
                        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full capitalize mb-3">
                            {food.category}
                        </span>
                        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 capitalize mb-4">
                            {food.name}
                        </h1>
                        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                            {food.description}
                        </p>
                    </div>

                    {/* Price & Final Action */}
                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                        <div>
                            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Total Price</p>
                            <span className="text-2xl font-black text-amber-500">${food.price.toLocaleString()}</span>
                        </div>

                        {isLoggedIn ? (
                            isNormalUser ? (
                                <CartProvider>
                                   
                                    <CounterSection 
                                        food={{ _id: food._id, name: food.name, price: food.price, image: food.image }} 
                                        userId={userId} 
                                    />
                                </CartProvider>
                            ) : (
                                <div className="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 rounded-xl border border-amber-200/50">
                                    Admins/Moderators cannot buy products.
                                </div>
                            )
                        ) : (
                            <Link
                                href="/login"
                                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl shadow-md transition-all duration-200 text-sm flex items-center justify-center text-center"
                            >
                                Login to Order
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}