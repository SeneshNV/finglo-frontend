import { Metadata } from "next";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { AboutMission } from "./components/AboutMission";
import { AboutJourney } from "./components/AboutJourney";
import { AboutStats } from "./components/AboutStats";
import { AboutTestimonials } from "./components/AboutTestimonials";
import GalleryHeader from "./components/GalleryHeader";
import Loading from "../components/shared/Loading";
import { CTATiny } from "./components/CTA";

export const metadata: Metadata = {
  title: "About Us - FingloSarees | Preserving Indian Textile Heritage",
  description:
    "Discover the story behind FingloSarees. We connect skilled artisans with global customers, preserving India's rich textile heritage through authentic, handcrafted sarees.",
  keywords:
    "about finglo sarees, indian saree heritage, textile artisans, traditional weavers, sustainable fashion",
  openGraph: {
    title: "About FingloSarees - Preserving Indian Textile Heritage",
    description:
      "Discover our journey of connecting skilled artisans with global customers.",
    images: ["/images/about/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryHeader />

      <div className="container mx-auto px-4 ">
        <Suspense fallback={<Loading />}>
          <AboutMission />
          <AboutStats />
          <AboutJourney />
          <AboutTestimonials />
          <CTATiny />
        </Suspense>
      </div>
    </div>
  );
}
