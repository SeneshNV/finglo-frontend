import { Suspense } from "react";
import GalleryGrid from "./components/GalleryGrid";
import GalleryHeader from "./components/GalleryHeader";
import { galleryImages } from "./data/gallery-images";
import Loading from "./loading";

export const metadata = {
  title: "Gallery | Finglo Sarees",
  description:
    "Browse our collection of beautiful sarees and customer feedback images",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryHeader />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <GalleryGrid images={galleryImages} />
        </Suspense>
      </div>
    </div>
  );
}
