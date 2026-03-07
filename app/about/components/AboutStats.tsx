"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const stats = [
  { value: 1200, label: "Happy Customers", suffix: "+", sub: "Our Patrons" },
  { value: 9, label: "Handloom Regions", suffix: "", sub: "Sri Lanka" },
  {
    value: 20,
    label: "International Orders",
    suffix: "+",
    sub: "Global Reach",
  },
  { value: 350, label: "Master Weavers", suffix: "+", sub: "The Artisans" },
];

export const AboutStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 bg-[#0A0908] overflow-hidden border-t border-[#1A1816]">
      {/* Subtle fabric texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />

      {/* Central gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`text-center relative px-4 ${
                index !== stats.length - 1 ? "lg:border-r border-white/10" : ""
              }`}
            >
              {/* Sub-label */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.6em] text-gold/40 uppercase whitespace-nowrap">
                {stat.sub}
              </span>

              {/* Main number */}
              <div className="mb-4">
                <span className="text-5xl md:text-7xl font-serif text-[#F5F0E6] tracking-tighter inline-block">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={3.5}
                      suffix={stat.suffix}
                      separator=","
                    />
                  )}
                </span>
              </div>

              {/* Label with gold accent */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-12 h-[1px] bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={inView ? { x: "100%" } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gold w-1/2"
                  />
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/60 font-light max-w-[150px] leading-relaxed">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hanging gold line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gold via-gold/20 to-transparent opacity-50" />
    </section>
  );
};
