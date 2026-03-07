"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryHeader() {
  const [filter, setFilter] = useState<"all" | "feedback" | "designs">("all");

  return (
    <div className="bg-white shadow-sm">
      {/* EDITORIAL HERO SECTION 
              Large-scale branding with thin geometric lines
            */}
      <header className="relative border-b border-neutral-100 overflow-hidden bg-[#FAFAFA]">
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              {/* Thin accent line */}
              <div className="w-12 h-[1px] bg-neutral-950 mb-10" />

              <h1 className="text-4xl md:text-6xl font-extralight tracking-tight leading-[0.85] text-neutral-950 mb-8">
                Core Philosophy
                <span className="font-serif italic font-light"> </span>
                <span className="font-serif italic font-light">
                  Legacy & Intent
                </span>
              </h1>

              <p className="max-w-md text-sm md:text-base text-neutral-500 font-light leading-relaxed tracking-wide">
                Guided by tradition, defined by excellence, and committed to the{" "}
                <span className="text-neutral-900 underline underline-offset-4 decoration-neutral-100 font-normal">
                  artisans who weave
                </span>{" "}
                the fabric of our culture.
              </p>
            </div>
          </div>
        </div>

        {/* BRAND MARK WATERMARK
                Large, subtle icon logo used as a design element
              */}
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-[0.2] grayscale pointer-events-none hidden lg:block">
          <Image
            src="/logo/iconLogo.png"
            alt=""
            width={500}
            height={500}
            priority
          />
        </div>
      </header>
    </div>
  );
}
