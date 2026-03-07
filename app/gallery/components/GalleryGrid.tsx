"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryImage from "./GalleryImage";
import Lightbox from "./Lightbox";
import { GalleryImage as GalleryImageType } from "../data/gallery-images";

interface GalleryGridProps {
  images: GalleryImageType[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImageType | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("all");

  const filteredImages = useMemo(() => {
    return filter === "all"
      ? images
      : images.filter((img) => img.category === filter);
  }, [images, filter]);

  // Navigation logic for Lightbox
  const handleNavigate = (direction: number) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage?.id,
    );
    const nextIndex =
      (currentIndex + direction + filteredImages.length) %
      filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">

      {/* 2. True Masonry Format (3 Columns like your image) */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              {/* Image Component - Uses natural aspect ratio */}
              <GalleryImage
                image={image}
                onClick={() => setSelectedImage(image)}
              />

              {/* Subtle Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-xs font-medium drop-shadow-md">
                  View Project
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 3. Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-40 text-gray-400 font-light">
          No works found in this category.
        </div>
      )}

      {/* 4. Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            onNext={() => handleNavigate(1)}
            onPrev={() => handleNavigate(-1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
