"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

export default function Banner() {
  const containerRef = useRef(null);

  // Parallax effect for the image to give it a "high-end" feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTranslate = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-neutral-950 min-h-screen flex items-center overflow-hidden py-20 lg:py-0"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nude-sand/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* LEFT CONTENT: TEXT BLOCK */}
          <div className="w-full lg:w-1/2 space-y-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-nude-sand/80 mb-6 block font-semibold">
                The Finglo Experience
              </span>

              <h2 className="text-4xl md:text-7xl font-light tracking-tight text-neutral-100 mb-8 leading-[1.1]">
                Celebrate{" "}
                <span className="italic text-neutral-400">Sri Lankan</span>{" "}
                <br />
                <span className="font-bold">Saree Heritage</span>
              </h2>

              {/* Stylized Divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[1px] bg-nude-sand/40" />
                <div className="w-2 h-2 rounded-full border border-nude-sand/40" />
              </div>

              <p className="text-sm md:text-lg text-neutral-400 leading-relaxed font-light mb-12">
                Finglo brings you the finest Sri Lankan sarees crafted with
                precision and passion. From timeless bridal collections to
                contemporary everyday elegance, each piece reflects tradition,
                luxury, and grace.
                <br />
                <br />
                Our artisans blend heritage techniques with modern aesthetics to
                create bespoke sarees that are truly unique.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/shop/products"
                  className="group relative inline-flex items-center justify-center overflow-hidden border border-nude-sand px-12 py-5 text-[11px] uppercase tracking-[0.3em] transition-all"
                >
                  <span className="relative z-10 transition-colors duration-500 text-nude-sand group-hover:text-neutral-950">
                    Explore The Collection
                  </span>
                  <span className="absolute inset-0 z-0 bg-nude-sand translate-y-full transition-transform duration-700 ease-[0.76, 0, 0.24, 1] group-hover:translate-y-0" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT CONTENT: IMAGE BLOCK */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              style={{ y: yTranslate }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Decorative Floating Border */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 32, y: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute inset-0 border border-nude-sand/20 -z-10 hidden lg:block"
              />

              <Image
                alt="Sri Lankan Finglo Bridal Saree"
                src="https://images.unsplash.com/photo-1654764746382-1a9ebd9629de?q=80&w=765&auto=format&fit=crop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-1000 grayscale-0 md:grayscale md:hover:grayscale-0"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
