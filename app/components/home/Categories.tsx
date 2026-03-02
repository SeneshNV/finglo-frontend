"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    id: 1,
    name: "Bridal Couture",
    image:
      "https://images.unsplash.com/photo-1740750047392-0d48b5fc23e4?q=80&w=687&auto=format&fit=crop",
    size: "lg",
    href: "/categories/bridal",
  },
  {
    id: 2,
    name: "Silk Heritage",
    image:
      "https://images.unsplash.com/photo-1679006831648-7c9ea12e5807?q=80&w=687&auto=format&fit=crop",
    size: "sm",
    href: "/categories/silk",
  },
  {
    id: 3,
    name: "Modern Drape",
    image:
      "https://images.unsplash.com/photo-1752847048197-1f99b1ea1936?q=80&w=605&auto=format&fit=crop",
    size: "sm",
    href: "/categories/modern",
  },
  {
    id: 4,
    name: "Occasion Wear",
    image:
      "https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?q=80&w=687&auto=format&fit=crop",
    size: "md",
    href: "/categories/occasion",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-nude-ivory overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-nude-taupe mb-6 block font-semibold">
              The Finglo Collection
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-nude-dark leading-[1.1]">
              Curated <span className="font-bold">Signature</span> <br />
              <span className="italic font-serif">Styles</span>
            </h2>
            <p className="text-sm md:text-base text-nude-taupe/80 mt-8 max-w-md font-light leading-relaxed">
              Experience the fusion of heritage craftsmanship and contemporary
              aesthetics through our expertly defined saree segments.
            </p>
          </motion.div>

          <Link
            href="/categories"
            className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-nude-dark font-bold"
          >
            <span className="border-b border-nude-taupe/30 pb-1 group-hover:border-nude-dark transition-all duration-500">
              View All Categories
            </span>
            <div className="w-8 h-[1px] bg-nude-taupe/30 group-hover:w-12 group-hover:bg-nude-dark transition-all duration-500" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[800px] lg:h-[750px]">
          {CATEGORIES.map((cat, index) => (
            <CategoryCard key={cat.id} category={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: any; index: number }) {
  const gridClasses = {
    lg: "lg:col-span-2 lg:row-span-2 min-h-[450px]",
    md: "lg:col-span-2 lg:row-span-1 min-h-[350px]",
    sm: "lg:col-span-1 lg:row-span-1 min-h-[350px]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative group overflow-hidden ${gridClasses[category.size as keyof typeof gridClasses]}`}
    >
      <Link href={category.href} className="block w-full h-full">
        {/* Subtle Grain Overlay for Texture */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Soft Dark Overlay */}
        <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/50 transition-all duration-700 z-10" />

        {/* The Image with extra-slow zoom */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-[2s] ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
        />

        {/* Text Content - Floating Glass Effect */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
          <div className="flex flex-col">
            <p className="text-white/60 text-[9px] uppercase tracking-[0.4em] mb-2 font-medium">
              Segment {index + 1}
            </p>
            <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight mb-6">
              {category.name}
            </h3>

            {/* Hidden Button that reveals */}
            <div className="overflow-hidden">
              <span className="inline-flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                Discover{" "}
                <div className="w-10 h-[1px] bg-white/50 group-hover:w-16 transition-all duration-1000" />
              </span>
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-6 right-6 z-20 w-8 h-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
      </Link>
    </motion.div>
  );
}
