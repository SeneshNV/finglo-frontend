"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const CTATiny = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-base-100 overflow-hidden border-t border-base-200">
      {/* Ghost Brand Seal */}
      <div className="absolute right-[-6%] top-1/2 -translate-y-1/2 opacity-[0.3] pointer-events-none w-64 h-64 md:w-96 md:h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
          <Image
            src="/logo/iconLogo.png"
            alt="Brand Seal"
            fill
            className="object-contain grayscale"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 bg-white/40 backdrop-blur-sm border border-base-200 p-6 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/25 transition-all duration-700 group">
          {/* Text & Branding */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 relative flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
              <Image
                src="/logo/iconLogo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-primary font-semibold mb-1 block opacity-90">
                Limited Artistry
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-base-content leading-snug">
                Carry the <i className="italic">Legacy of the Loom</i>
              </h2>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              href="/contact"
              className="relative text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-base-content/60 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all hover:after:w-full"
            >
              Contact Us
            </Link>

            <Link href="/shop/products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-sm sm:btn-md rounded-full px-8 sm:px-10 flex items-center gap-3 group/btn transition-all duration-400 shadow-md hover:shadow-primary/25"
              >
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
                  Shop Now
                </span>
                <div className="w-6 h-[1px] bg-primary-content opacity-30 group-hover/btn:w-10 transition-all duration-500" />
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-10 flex justify-center items-center gap-2 sm:gap-4 opacity-15">
          <div className="h-[0.5px] w-16 sm:w-20 bg-base-content" />
          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase italic">
            Finglo Heritage
          </span>
          <div className="h-[0.5px] w-16 sm:w-20 bg-base-content" />
        </div>
      </div>
    </section>
  );
};
