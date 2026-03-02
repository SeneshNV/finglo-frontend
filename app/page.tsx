import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import Banner from "./components/home/Banner";
import Categories from "./components/home/Categories";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <Banner />
      <Categories />
    </>
  );
}
