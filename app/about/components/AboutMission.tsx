"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Eye, ShieldCheck } from "lucide-react";
import Image from "next/image";

const missions = [
  {
    icon: Award,
    title: "Our Mission",
    subtitle: "Preserving Sri Lankan Heritage",
    description:
      "To celebrate Sri Lanka's rich saree tradition by connecting skilled local weavers with discerning buyers nationwide and globally.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    subtitle: "Empowering Artisans",
    description:
      "To become the premier destination for authentic Sri Lankan sarees, where each weave tells a story and every purchase sustains artisan livelihoods.",
  },
  {
    icon: ShieldCheck,
    title: "Our Promise",
    subtitle: "Unmatched Quality",
    description:
      "We commit to 100% authentic handloom sarees, ethically sourced and crafted with care, reflecting Sri Lanka's timeless textile legacy.",
  },
];

export const AboutMission = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Adjust threshold for earlier detection
  });

  return (
    <section className="relative py-16 sm:py-20 bg-[#FDFBF7] overflow-hidden">
      {/* Subtle handmade texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Warm gold ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-3">
          {missions.map((item, idx) => {
            const Icon = item.icon;
            // Each card has its own inView ref
            const [cardRef, cardInView] = useInView({
              triggerOnce: true,
              threshold: 0.3,
            });

            return (
              <motion.div
                key={idx}
                ref={cardRef}
                initial={{ opacity: 0, y: 40 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.15,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full bg-white border border-[#E5E1DA] rounded-xl p-8 sm:p-10 overflow-hidden transition-all duration-700 ease-out group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.07)] group-hover:-translate-y-2">
                  {/* Gold filament */}
                  <div className="absolute top-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent transition-all duration-[1000ms] ease-in-out group-hover:w-full" />

                  {/* Watermark */}
                  <div
                    className={`absolute -right-12 -bottom-12 w-48 h-48 transition-all duration-[1800ms] ease-out pointer-events-none 
                      ${cardInView ? "opacity-10 scale-105" : "opacity-0 scale-100"} 
                      md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-105 md:group-hover:-rotate-12`}
                  >
                    <Image
                      src="/logo/iconLogo.png"
                      alt="Brand Seal"
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-10 flex items-center justify-between">
                      <span className="text-4xl sm:text-5xl font-serif italic text-[#F1EDE7] group-hover:text-[#C5A059]/10 transition-colors duration-700 select-none">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="mb-6">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-bold mb-3">
                        {item.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] leading-[1.3] tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-[#666666] font-light text-[15px] sm:text-[17px] leading-relaxed mb-10 sm:mb-12 transition-colors duration-700 group-hover:text-[#333333]">
                      {item.description}
                    </p>

                    <div className="pt-6 sm:pt-8 border-t border-[#F1EDE7] flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-700">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-[#C5A059]" />
                        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase text-[#1A1A1A]">
                          Certified Handloom
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-serif italic text-[#C5A059]">
                        Since 2024
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
