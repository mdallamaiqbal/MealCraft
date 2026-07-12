"use client";

import React from "react";
import Link from "next/link";
import { Utensils, Phone, Mail, MapPin } from "lucide-react";
import { LogoFacebook, LogoLinkedin, LogoTelegram } from "@gravity-ui/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Ekhane bg-[#06090F] explicitly set kora hoyeche border lines dark-mode line compatible kore
    <footer className="w-full border-t border-gray-800 text-gray-300" style={{ backgroundColor: "#06090F" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 sm:grid-cols-2">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Utensils className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-extrabold tracking-wide text-white">
                Meal<span className="text-amber-500">Craft</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Freshly crafted meals delivered right to your doorstep. Experience the craft of taste with us.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Facebook">
                <LogoFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="LinkedIn">
                <LogoLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Telegram">
                <LogoTelegram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-amber-500 transition-colors">Our Menu</Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-amber-500 transition-colors">Your Cart</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="text-gray-400">123 Chef Avenue, Food City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="text-gray-400">+880 1822-913954</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="text-gray-400">support@mealcraft.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Get the latest updates and delicious offers right in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-700 px-3 py-2 text-sm bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
              <button
                type="submit"
                className="w-full rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-black hover:bg-amber-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {currentYear} MealCraft. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}