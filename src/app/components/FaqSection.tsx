"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does the food delivery take?",
    answer: "Usually, it takes 30 to 45 minutes depending on your location and traffic conditions. We always try to deliver it hot and fresh!",
  },
  {
    question: "Can I cancel or modify my order after confirming?",
    answer: "Once an order is confirmed and sent to the kitchen, it cannot be canceled or modified. Please double-check your cart before checking out.",
  },
  {
    question: "Do you offer cash on delivery (COD)?",
    answer: "Yes! We support Cash on Delivery as well as secure online payments via cards and mobile banking.",
  },
  {
    question: "How can I track my order?",
    answer: "After placing an order, you can see the live status directly on your dashboard under the 'My Orders' section.",
  },
  {
    question: "Is there a minimum order amount for free delivery?",
    answer: "Yes, free delivery is applicable for orders above $50. For orders below that, a small standard delivery fee will be added.",
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-zinc-950 text-zinc-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">
            Have Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm">
            Everything you need to know about our food delivery and ordering process.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                  isOpen 
                    ? "border-amber-500/40 bg-zinc-900/80 shadow-lg shadow-amber-500/5" 
                    : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left font-medium transition-colors duration-200"
                >
                  <span className={`text-base md:text-lg transition-colors ${isOpen ? "text-amber-400" : "text-zinc-200"}`}>
                    {faq.question}
                  </span>
                  
                  {/* Indicator Icon */}
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 border transition-all duration-300 ${
                    isOpen ? "border-amber-500 bg-amber-500/10 rotate-45" : "border-zinc-700"
                  }`}>
                    <span className={`text-xl font-light ${isOpen ? "text-amber-400" : "text-zinc-400"}`}>
                      ＋
                    </span>
                  </span>
                </button>

                {/* Answer Box */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-zinc-800/60" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-zinc-400 leading-relaxed text-sm bg-zinc-900/40">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}