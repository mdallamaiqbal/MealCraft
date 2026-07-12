"use client";


import Link from "next/link";
import { ShoppingCart, Utensils, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4">
         
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 sm:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle main menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Utensils className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-extrabold tracking-wide text-gray-900 dark:text-white">
              Meal<span className="text-amber-500">Craft</span>
            </span>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center space-x-8" aria-label="Desktop navigation">
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/menu" 
            className="text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
          >
            Menu
          </Link>

          <Link
            href="/cart"
            className="relative rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-amber-500 transition-colors flex items-center"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {/* Cart Counter Badge */}
            {/* <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
              0
            </span> */}
          </Link>
        </nav>

        {/* Right: Only Login Button */}
        <div className="flex items-center gap-4">
          
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-amber-500 transition-colors sm:hidden"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {/* <span className="absolute top-1 right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
              
            </span> */}
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-500/20 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Link>
        </div>
      </div>

      {/* Mobile Responsive Navigation Menu */}
      {isMenuOpen && (
        <nav className="sm:hidden border-t border-gray-100 bg-white dark:bg-black px-4 py-3 shadow-lg" aria-label="Mobile navigation">
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}