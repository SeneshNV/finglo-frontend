"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryImage as GalleryImageType } from "../data/gallery-images";

interface GalleryImageProps {
  image: GalleryImageType;
  onClick?: () => void;
  priority?: boolean;
  className?: string;
}

export default function GalleryImage({
  image,
  onClick,
  priority = false,
  className = "",
}: GalleryImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.03 }}
      className={`relative cursor-pointer overflow-hidden rounded-lg ${className}`}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={1000}
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
        priority={priority}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              image.category === "feedback"
                ? "bg-green-500 text-white"
                : "bg-pink-500 text-white"
            }`}
          >
            {image.category === "feedback"
              ? "Customer Feedback"
              : "Saree Design"}
          </span>

          {image.customerName && (
            <p className="text-white text-sm mt-2">- {image.customerName}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
