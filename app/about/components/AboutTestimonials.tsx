"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Meera Reddy",
    location: "Colombo, Sri Lanka",
    comment:
      "The saree I purchased is exquisite. The craftsmanship and attention to detail reflect true Sri Lankan heritage.",
    image: "/logo/iconLogo.png",
  },
  {
    name: "Sarah Johnson",
    location: "London, UK",
    comment:
      "FingloSarees offers authentic handloom quality that is increasingly rare. Truly a luxury experience from start to finish.",
    image: "/logo/iconLogo.png",
  },
  {
    name: "Anjali Gupta",
    location: "Kandy, Sri Lanka",
    comment:
      "Their breathtaking drapes and care for the artisan community make every purchase feel like a contribution to our culture.",
    image: "/logo/iconLogo.png",
  },
  {
    name: "Sarah Johnson",
    location: "London, UK",
    comment:
      "FingloSarees offers authentic handloom quality that is increasingly rare. Truly a luxury experience from start to finish.",
    image: "/logo/iconLogo.png",
  },
  {
    name: "Anjali Gupta",
    location: "Kandy, Sri Lanka",
    comment:
      "Their breathtaking drapes and care for the artisan community make every purchase feel like a contribution to our culture.",
    image: "/logo/iconLogo.png",
  },
];

export const AboutTestimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-12 md:py-12 bg-base-100 overflow-hidden">
      {/* Ghost Watermark Background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[12vw] font-serif leading-none">Finglo_Lovers</h2>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-primary font-bold mb-4 block">
            Patron Reflections
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-base-content leading-tight">
            Kind Words from Saree Lovers
          </h2>
        </motion.div>

        {/* Swiper Container */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20} // smaller gap for mobile
          slidesPerView={1.2} // show partial next slide
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 1.3, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="card h-full bg-base-100 border border-base-200 rounded-box p-6 md:p-10 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-700 group mb-10"
              >
                {/* Decorative Quote Icon */}
                <div className="mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 group-hover:bg-primary transition-colors duration-500">
                    <Quote className="w-4 h-4 text-primary group-hover:text-primary-content transition-colors duration-500" />
                  </div>
                </div>

                {/* Feedback Text */}
                <div className="flex-grow mb-4">
                  <p className="text-base-content/80 font-serif italic text-base md:text-xl leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 md:gap-5 mt-4">
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[12px] md:text-[13px] uppercase tracking-widest font-bold text-base-content">
                      {item.name}
                    </h4>
                    <p className="text-[10px] md:text-[11px] text-primary font-mono font-medium">
                      {item.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper Bullets */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          @apply bg-primary rounded-none transition-all duration-300;
          height: 2px !important;
          width: 20px !important;
          opacity: 0.2;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          width: 45px !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};
