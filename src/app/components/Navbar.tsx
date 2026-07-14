"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { ShoppingCart, Utensils, LogIn, LogOut, Menu, X, LayoutDashboard } from "lucide-react"; 
import { signOut, useSession } from "../lib/auth-client";
import { User } from "../lib/session/session";
import Image from "next/image";
import { Button } from "@heroui/react";
import avatar from "../../../public/assets/avatar.jpeg";

interface MenuItem {
  label: string;
  icon?: React.ReactNode; 
  href: string;
  allowedRoles?: string[];
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 
  const { data: session, isPending } = useSession();
  const user = (session?.user ? session.user : session) as User | undefined;
  const userRole = user?.role?.toLowerCase();

  const handleSignout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems: MenuItem[] = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { 
      label: "Dashboard", 
      href: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      allowedRoles: ["admin", "moderator"] 
    },
    { label: "Cart", icon: <ShoppingCart className="h-5 w-5" />, href: "/cart" }
  ];

  const visibleMenuItems = menuItems.filter((item) => {
    if (!item.allowedRoles) return true; 
    return userRole && item.allowedRoles.includes(userRole); 
  });

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-gray-800 backdrop-blur-md"
      style={{ backgroundColor: "#06090F" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Mobile Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white sm:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle main menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2 font-bold">
            <Utensils className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-extrabold tracking-wide text-white">
              Meal<span className="text-amber-500">Craft</span>
            </span>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center space-x-8" aria-label="Desktop navigation">
          {visibleMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive ? "text-amber-500" : "text-gray-300 hover:text-amber-500"
                }`}
              >
                {item.icon ? item.icon : item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className={`relative rounded-full p-2 transition-colors sm:hidden ${
              pathname === "/cart" ? "text-amber-500" : "text-gray-300 hover:bg-gray-800 hover:text-amber-500"
            }`}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
          </Link>

          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Image
                src={user?.image || avatar}
                alt="avatar" 
                className="rounded-full object-cover border border-gray-700"
                width={35} 
                height={35}
              />
              <Button
                onClick={handleSignout}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer min-w-0 h-auto"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                pathname === "/auth/login" 
                  ? "bg-amber-500 text-black" 
                  : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              }`}
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <nav 
          className="sm:hidden border-t border-gray-800 px-4 py-3 shadow-xl" 
          style={{ backgroundColor: "#06090F" }}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-3">
            {visibleMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium ${
                      isActive 
                        ? "bg-gray-800 text-amber-500" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-amber-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}

            {!isPending && user && (
              <li className="pt-2 border-t border-gray-800">
                <button
                  onClick={handleSignout}
                  className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}