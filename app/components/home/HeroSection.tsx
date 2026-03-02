"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Instagram, Twitter, Youtube } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const grayscaleValue = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["100%", "0%"],
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] bg-black text-white overflow-hidden pt-20 px-6 md:px-16"
    >
      {/* 1. TOP HEADER ROW (Text Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left: Main Heading */}
        <div className="lg:col-span-7 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-400 uppercase tracking-[0.3em] text-xs md:text-sm"
          >
            Elevate Your Style in Every Moment
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-2xl"
          >
            Timeless Elegance Woven Into Every Thread
          </motion.h1>
          <div className="w-40 h-[1px] bg-white/30 mt-4" />
        </div>

        {/* Right: Description & Social Avatars */}
        <div className="lg:col-span-5 lg:pl-12 space-y-8 flex flex-col h-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md"
          >
            Discover Finglo’s exclusive saree and couture collections designed
            to celebrate grace, heritage, and modern femininity. Each piece is
            crafted with precision, passion, and premium fabrics.
          </motion.p>

          <div className="flex flex-col items-end text-right space-y-6">
            <div className="overflow-hidden">
              <span className="text-rotate text-7xl leading-tight block">
                <span className="flex flex-col items-end">
                  <span>SRI LANKAN</span>
                  <span>SAREE</span>
                  <span>HERITAGE</span>
                  <span>LUXURY</span>
                  <span>GRACE</span>
                  <span>TIMELESS</span>
                </span>
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                href="/shop/products"
                className="group relative inline-flex items-center overflow-hidden border border-nude-sand px-12 py-4 text-[11px] uppercase tracking-[0.2em]"
              >
                {/* Text */}
                <span className="px-7 relative z-10 transition-colors duration-500 text-nude-sand group-hover:text-nude-dark">
                  Explore The Collection
                </span>
                {/* Hover background */}
                <span className="absolute inset-0 z-0 bg-nude-sand translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. MAIN VISUAL AREA */}
      <div className="relative w-full h-[500px] md:h-[650px] mt-10">
        <div className="hidden lg:flex absolute left-0 bottom-20 flex-col gap-8 z-20">
          <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Youtube className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
        </div>

        <div className="absolute inset-0 flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl h-full"
            style={{ filter: `grayscale(${grayscaleValue})` }}
          >
            <Image
              src="/web/model-main.png"
              alt="Main Fashion Display"
              fill
              className="object-cover object-top transition-all duration-1000 md:grayscale md:hover:grayscale-0"
              priority
            />

            <div className="absolute right-0 bottom-12 text-right p-6 md:p-12 bg-black/40 backdrop-blur-sm">
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase leading-none">
                Infinity
                <br />
                Fashion
                <br />
                <span className="font-bold">Week</span>
              </h2>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-zinc-900/50 -z-10" />
      </div>
    </section>
  );
}
