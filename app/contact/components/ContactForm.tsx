"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, CheckCircle, Quote } from "lucide-react";
import Image from "next/image";

export const ContactForm = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitStatus("success");
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-32 bg-[#FAF9F6] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          {/* LEFT COLUMN: BRAND STORY */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="lg:w-2/5 flex flex-col justify-between py-4"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-primary font-bold mb-6 md:mb-8 block">
                The Atelier
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-base-content leading-[1.2] md:leading-[1.1] mb-6 md:mb-8">
                Request a <br className="hidden md:block" />
                <i className="italic text-primary">Private Viewing.</i>
              </h2>
              <p className="text-base md:text-xl text-base-content/60 font-light leading-relaxed mb-8 md:mb-12">
                Our weavers take pride in every thread. For bespoke bridal
                orders or heritage inquiries, please allow our concierge 24
                hours to respond.
              </p>
            </div>

            {/* Branded Visual Quote - Visible on Tablet/Desktop */}
            <div className="relative p-8 md:p-10 bg-white border border-base-200 hidden md:block">
              <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/20" />
              <p className="font-serif italic text-lg text-base-content/80 mb-4">
                "A saree is not just a garment; it is a canvas of history."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-primary" />
                <span className="text-[9px] uppercase tracking-widest font-bold opacity-40">
                  The Finglo Philosophy
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: THE FORM */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-3/5 bg-white p-6 md:p-12 lg:p-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-base-200 relative"
          >
            {/* Watermark: Adjusted for Mobile */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-[0.03] pointer-events-none w-24 h-24 md:w-40 md:h-40">
              <Image
                src="/logo/iconLogo.png"
                alt="seal"
                fill
                className="object-contain"
              />
            </div>

            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12 md:py-20"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif mb-2 text-base-content">
                  Message Received
                </h3>
                <p className="text-base-content/50 italic font-serif">
                  We will speak soon.
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-8 text-[10px] uppercase tracking-widest font-bold underline decoration-primary underline-offset-8"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      className="peer w-full bg-transparent border-b border-base-300 py-3 outline-none focus:border-primary transition-colors font-serif italic text-lg"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.3em] font-bold text-base-content/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-primary peer-not-placeholder-shown:-top-6">
                      Full Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      className="peer w-full bg-transparent border-b border-base-300 py-3 outline-none focus:border-primary transition-colors font-serif italic text-lg"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.3em] font-bold text-base-content/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-primary peer-not-placeholder-shown:-top-6">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <select className="peer w-full bg-transparent border-b border-base-300 py-3 outline-none focus:border-primary transition-colors font-serif italic text-lg appearance-none rounded-none">
                    <option>Bridal Consultation</option>
                    <option>Wholesale Inquiry</option>
                    <option>Heritage Preservation</option>
                    <option>General Message</option>
                  </select>
                  <label className="absolute left-0 -top-6 text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                    Service Interest
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    rows={4}
                    required
                    className="peer w-full bg-transparent border-b border-base-300 py-3 outline-none focus:border-primary transition-colors font-serif italic text-lg resize-none"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-3 text-[10px] uppercase tracking-[0.3em] font-bold text-base-content/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-primary peer-not-placeholder-shown:-top-6">
                    Your Inquiry
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
                  <p className="text-[9px] uppercase tracking-widest leading-loose text-base-content/30 text-center sm:text-left max-w-xs">
                    By submitting, you agree to our terms of artisan service.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary btn-md md:btn-lg rounded-none w-full sm:w-auto px-10 text-white shadow-xl group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <span className="flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold">
                        SEND MESSAGE{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7-7 7M3 12h18"
    />
  </svg>
);
