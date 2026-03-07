"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const milestones = [
  {
    year: "2023",
    title: "The Digital Loom",
    description:
      "Launched our innovative virtual experience, allowing customers to feel the drape and fall of our sarees from anywhere in the world.",
    image:
      "https://images.unsplash.com/photo-1719462193202-7064a0b3fd04?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    year: "2024",
    title: "Empowering Legacies",
    description:
      "Our community grew to 350+ women artisans, proving that traditional craft can thrive in a modern economy.",
    image: "https://images.unsplash.com/photo-1628019234134-bb28c929a2c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUxfHx8ZW58MHx8fHx8",
  },
];

export const AboutJourney = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-32 bg-[#FCFBFA] relative overflow-hidden">
      {/* Background Silk Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[10px] uppercase tracking-[0.6em] text-[#C5A059] font-bold mb-4 block"
          >
            The Finglo Narrative
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-serif text-[#1A1A1A] mb-8"
          >
            Our Journey through Time
          </motion.h2>
          <div className="w-20 h-[1px] bg-[#C5A059] mx-auto opacity-50" />
        </div>

        <div ref={ref} className="relative">
          {/* Central Animated Thread */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-[#E5E1DA] hidden md:block">
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="w-full bg-[#C5A059]"
            />
          </div>

          {milestones.map((milestone, index) => (
            <div key={index} className="relative mb-32 last:mb-0">
              <div
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 1. TEXT CONTENT */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.2, delay: index * 0.2 }}
                  className="w-full md:w-1/2 flex flex-col justify-center"
                >
                  <div
                    className={`max-w-md ${index % 2 === 0 ? "md:ml-auto md:text-right" : "md:mr-auto md:text-left"}`}
                  >
                    <span className="text-4xl font-serif italic text-[#C5A059]/20 mb-2 block">
                      {milestone.year}
                    </span>
                    <h3 className="text-3xl font-serif text-[#1A1A1A] mb-4">
                      {milestone.title}
                    </h3>
                    <p className="text-[#666666] font-light leading-relaxed text-lg">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>

                {/* 2. CENTER DOT */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center z-20">
                  <div className="w-3 h-3 bg-white border border-[#C5A059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.3)]" />
                </div>

                {/* 3. IMAGE CONTENT */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1.5, delay: index * 0.3 }}
                  className="w-full md:w-1/2"
                >
                  <div
                    className={`relative aspect-[4/5] max-w-sm rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl ${
                      index % 2 === 0 ? "mr-auto" : "ml-auto"
                    }`}
                  >
                    {milestone.image ? (
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-cover transition-transform duration-[2000ms] hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F1EDE7] flex items-center justify-center text-[#C5A059]/30 italic font-serif">
                        Global Archive
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-700" />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
