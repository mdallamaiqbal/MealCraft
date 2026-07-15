"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-9xl font-extrabold text-amber-500 tracking-widest drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          404
        </h1>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-6 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            Page Not Found
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Oops! The page you are looking for doesn't exist or has been moved to another kitchen. Let's get you back to the main menu!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-8 py-3 rounded-full transition-all duration-200 shadow-lg shadow-amber-500/10"
          >
            Back to Home
          </Link>
          
          <Link
            href="/menu"
            className="border border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-200 px-8 py-3 rounded-full transition-all duration-200"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}