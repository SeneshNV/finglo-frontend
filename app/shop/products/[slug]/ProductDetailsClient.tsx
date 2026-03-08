"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Info,
} from "lucide-react";

import { Product } from "@/app/types/product";
import PayHereCheckout from "../components/PayHereCheckout";

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showMobileControls, setShowMobileControls] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const images =
    product.images?.sort((a, b) => (b.isPrimary ? 1 : -1)).slice(0, 4) || [];

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(p);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") setIsLightboxOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedIdx]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  const handleNext = () => setSelectedIdx((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setShowMobileControls(true);
    setTimeout(() => setShowMobileControls(false), 2000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrev();
    }
    setShowMobileControls(false);
  };

  // Drag handlers for mouse/trackpad
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-slate-900 antialiased">
      {/* MOBILE CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t p-4 transition-transform duration-300 lg:hidden ${
          isScrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex gap-4 items-center max-w-md mx-auto">
          <div className="flex-1">
            <p className="text-xs text-slate-400 line-through">
              {formatPrice(product.proPrice * 1.2)}
            </p>
            <p className="font-semibold text-lg">
              {formatPrice(product.proPrice)}
            </p>
          </div>

          <button className="flex-[2] bg-black text-white py-3 rounded-xl font-semibold text-xs tracking-widest active:scale-95">
            ADD TO BAG
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-4 md:py-8">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-6 md:mb-10">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop/products" className="hover:text-black">
            Collection
          </Link>
          <ChevronRight size={12} />
          <span className="text-black font-semibold truncate max-w-[150px] md:max-w-none">
            {product.proName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* IMAGE GALLERY */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* THUMBNAILS - Hidden on mobile, visible on desktop */}
              <div className="flex md:flex-col gap-3 overflow-x-auto max-h-[600px]">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`relative flex-shrink-0 w-20 h-28 md:w-24 md:h-32 rounded-lg overflow-hidden border transition-all ${
                      selectedIdx === idx
                        ? "border-black shadow-sm"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={`${product.proName} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>

              {/* MAIN IMAGE with swipe support */}
              <div className="relative flex-1 aspect-[3/4] bg-white rounded-xl overflow-hidden group">
                {/* Mobile image counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedIdx + 1} / {images.length}
                  </div>
                )}

                {/* Mobile navigation arrows (appear on touch) */}
                <AnimatePresence>
                  {showMobileControls && images.length > 1 && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 md:hidden bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronLeft size={24} />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 md:hidden bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronRightIcon size={24} />
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>

                {/* Image with drag/swipe support */}
                <motion.div
                  ref={imageContainerRef}
                  key={selectedIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full cursor-zoom-in md:cursor-zoom-in"
                  onClick={() => setIsLightboxOpen(true)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 0.98 }}
                  style={{ touchAction: "pan-y" }} // Allow vertical scroll while preventing horizontal scroll during drag
                >
                  <Image
                    src={images[selectedIdx]?.imageUrl}
                    alt={product.proName}
                    fill
                    priority
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03] pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Desktop zoom indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition hidden md:block">
                    <div className="bg-white p-3 rounded-full shadow-md">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </motion.div>

                {/* Mobile thumbnail strip */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedIdx(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedIdx === idx ? "bg-white w-4" : "bg-white/50"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCT INFO - rest remains the same */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-10 lg:sticky lg:top-10 h-fit">
            {/* TITLE */}
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Boutique Exclusive
              </p>

              <div className="flex justify-between items-start gap-4">
                <h1 className="text-3xl md:text-[42px] leading-[1.2] font-serif tracking-tight">
                  {product.proName}
                </h1>

                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className="p-3 border rounded-full hover:border-black flex-shrink-0"
                >
                  <Heart
                    size={20}
                    fill={isWishlist ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* PRICE */}
              <div className="flex items-end gap-4 md:gap-6">
                <span className="text-3xl md:text-4xl font-semibold">
                  {formatPrice(product.proPrice)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.proPrice * 1.2)}
                </span>
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="grid grid-cols-2 gap-y-4 md:gap-y-6 border-y py-4 md:py-6 text-sm">
              <div>
                <p className="text-xs uppercase text-slate-400 mb-1">
                  Material
                </p>
                <p>{product.sareeFabricType || "Pure Silk"}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 mb-1">Code</p>
                <p>#{product.proCode}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 mb-1">Length</p>
                <p>{product.sareeLengthMeters || "5.5"}m</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 mb-1">Status</p>
                <p className="text-emerald-600 font-medium">
                  Ready to Dispatch
                </p>
              </div>
            </div>

            {/* QUANTITY + CART */}
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex items-center border rounded-xl h-12 md:h-14 px-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 md:w-10 flex justify-center"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 md:w-10 flex justify-center"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button className="flex-1 bg-black text-white h-12 md:h-14 rounded-xl font-semibold text-xs md:text-sm tracking-[0.15em] hover:bg-neutral-800 flex items-center justify-center gap-2 md:gap-3">
                  <ShoppingCart size={16} />
                  ADD TO BAG
                </button>
              </div>

              <PayHereCheckout product={product} quantity={quantity} />
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-1 gap-3 md:gap-4 pt-4">
              <div className="flex items-center gap-4 border p-4 rounded-xl bg-white">
                <Truck size={18} />
                <div>
                  <p className="text-sm font-medium">Express Delivery</p>
                  <p className="text-xs text-slate-500">Ships in 24-48 Hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border p-4 rounded-xl bg-white">
                <RotateCcw size={18} />
                <div>
                  <p className="text-sm font-medium">Easy Exchange</p>
                  <p className="text-xs text-slate-500">14 Day Policy</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border p-4 rounded-xl bg-white">
                <ShieldCheck size={18} />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-slate-500">PCI-DSS Encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-16 md:mt-24 border-t pt-12 md:pt-16 grid md:grid-cols-3 gap-8 md:gap-16">
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-4">
              The Story
            </h3>
            <p className="text-[15px] leading-7 text-slate-700">
              {product.proDescription}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-4">
              Specifications
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b pb-2">
                <span>Blouse Fabric</span>
                <span className="font-medium">
                  {product.blouseFabricType || "Unstitched"}
                </span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Color</span>
                <span className="font-medium capitalize">
                  {product.proColor}
                </span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Collection</span>
                <span className="font-medium">Heritage 2026</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-4">
              Care Guide
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed italic border-l pl-4">
              Professional dry clean only. Store wrapped in muslin cloth to
              protect the delicate handwoven fibers.
            </p>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 md:top-10 md:right-10 text-white hover:text-gray-300 z-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 md:left-10 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 md:right-10 text-white hover:text-gray-300 z-10"
            >
              <ChevronRightIcon size={40} />
            </button>

            <div className="relative w-full max-w-6xl h-[60vh] md:h-[85vh] mx-4">
              <Image
                src={images[selectedIdx]?.imageUrl}
                alt={`${product.proName} - Full view`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            {/* Image counter in lightbox */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                {selectedIdx + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
