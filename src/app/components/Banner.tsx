"use client";

import React from "react";
import Link from "next/link";
// Swiper React components and modules import
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper structural styles load kora lagging behavior stop korar jonno
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface FoodSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export default function HeroBanner() {
  const slides: FoodSlide[] = [
    {
      id: 1,
      title: "Savor the Juicy Craft",
      description: "Handcrafted gourmet burgers made with premium beef and fresh toppings.",
      image: "/assets/burger.png",
      tag: "Best Seller",
    },
    {
      id: 2,
      title: "Wok-Fired Perfection",
      description: "Authentic, smokey fried rice tossed with fresh herbs and choice proteins.",
      image: "/assets/friedrice.png",
      tag: "Chef's Special",
    },
    {
      id: 3,
      title: "Sizzling Stir Noodles",
      description: "Hot, tangy, and savory noodles packed with vibrant seasonal vegetables.",
      image: "/assets/noodles.png",
      tag: "Trending",
    },
    {
      id: 4,
      title: "Artisan Cheesy Crusts",
      description: "Freshly baked wood-fired pizzas with stringy mozzarella and rich marinara.",
      image: "/assets/pizza.png",
      tag: "New Arrival",
    },
  ];

  return (
    
    <section 
      className="max-w-7xl mx-auto mb-4 h-[500px] text-white overflow-hidden relative"
      style={{ backgroundColor: "#06090F" }}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={"fade"} 
        fadeEffect={{ crossFade: true }}
        speed={1000} 
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full h-full"
      >
        {slides.map((slide: FoodSlide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Slide block inner layout reset */}
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 md:px-24 py-12 relative z-10">
              
              {/* Background Gradient Overlay reset matching exact theme color hex (#06090F) */}
              <div 
                className="absolute inset-0 -z-10 bg-linear-to-r md:block hidden" 
                style={{
                  backgroundImage: "linear-gradient(to right, #06090F 35%, rgba(6, 9, 15, 0.6) 60%, transparent 100%)"
                }}
              />
              <div 
                className="absolute inset-0 -z-10 md:hidden block" 
                style={{
                  backgroundImage: "linear-gradient(to bottom, #06090F 50%, rgba(6, 9, 15, 0.7) 80%, transparent 100%)"
                }}
              />

              {/* Text Layout Block */}
              <div className="w-full md:w-1/2 flex flex-col items-start gap-4 text-left">
                <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  {slide.tag}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-300 max-w-md">
                  {slide.description}
                </p>
                <div className="mt-2">
                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Order Online
                  </Link>
                </div>
              </div>

              {/* Food Image Container */}
              <div className="w-full md:w-1/2 h-48 md:h-full flex items-center justify-center relative mt-6 md:mt-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="max-h-[230px] md:max-h-[380px] object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
                />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Global custom style overriding for swiper dots component styling */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #f59e0b !important; /* amber-500 */
          width: 24px !important;
          border-radius: 5px !important;
          transition: all 0.3s ease-in-out;
        }
        .swiper-pagination-bullet {
          background: #4b5563 !important; /* slightly lighter for dark theme contrast */
        }
      `}</style>
    </section>
  );
}