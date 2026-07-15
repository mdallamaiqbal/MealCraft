"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  Users, 
  ShoppingBag, 
  TrendingUp 
} from "lucide-react";
import Link from "next/link";

export default function AdminWelcomePage() {
 
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="min-h-screen bg-zinc-950 text-white p-6 md:p-10 flex flex-col justify-center">
      
     
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full z-10">
        
       
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8"
        >
          <div>
            <span className="text-zinc-500 text-sm font-medium">{currentDate}</span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              Welcome Back
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-300 text-sm">
            <LayoutDashboard className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-xs uppercase tracking-wider">MealCraft Control Panel</span>
          </div>
        </motion.div>

       
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 md:p-8 mb-8 shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to craft today's menu?</h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
              From here, you can seamlessly add new food items, track live orders, modify prices, and manage user interactions. Everything you need is right at your fingertips.
            </p>
          </div>
          
          
          <TrendingUp className="absolute right-6 bottom-6 w-32 h-32 text-zinc-800/20 pointer-events-none" />
        </motion.div>

        
        <h3 className="text-zinc-400 font-semibold text-sm uppercase tracking-wider mb-4">Quick Management Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
         
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/dashboard/addFood" className="group flex flex-col justify-between p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-amber-500/50 transition-all h-36">
              <PlusCircle className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-zinc-200 text-sm mb-1">Add Food Item</h4>
                <p className="text-zinc-500 text-xs">Insert new dishes to the menu</p>
              </div>
            </Link>
          </motion.div>

        
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/admin/orders" className="group flex flex-col justify-between p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-amber-500/50 transition-all h-36">
              <ShoppingBag className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-zinc-200 text-sm mb-1">Manage Orders</h4>
                <p className="text-zinc-500 text-xs">Track incoming & current orders</p>
              </div>
            </Link>
          </motion.div>

         
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/admin/users" className="group flex flex-col justify-between p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-amber-500/50 transition-all h-36">
              <Users className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-zinc-200 text-sm mb-1">Total Users</h4>
                <p className="text-zinc-500 text-xs">View registered foodies & status</p>
              </div>
            </Link>
          </motion.div>

         
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/admin/settings" className="group flex flex-col justify-between p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-amber-500/50 transition-all h-36">
              <Settings className="w-8 h-8 text-amber-500 group-hover:rotate-45 transition-transform" />
              <div>
                <h4 className="font-bold text-zinc-200 text-sm mb-1">Settings</h4>
                <p className="text-zinc-500 text-xs">Configure app & kitchen details</p>
              </div>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}