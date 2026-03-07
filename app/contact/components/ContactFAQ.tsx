"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Domestic shipping within Sri Lanka typically arrives within 3-5 business days. International heritage shipping via DHL takes 7-14 business days. Every package is insured and tracked to your doorstep.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We honor a 7-day return period for unworn pieces in original condition. Please note that custom-woven sarees and bespoke bridal drapes are final sale due to their unique craftsmanship.",
  },
  {
    question: "Are your sarees authentic?",
    answer:
      "Every Finglo saree is accompanied by a Certificate of Heritage. We work exclusively with master weavers, ensuring the silk and gold zari are 100% authentic and ethically sourced.",
  },
  {
    question: "Do you offer customization?",
    answer:
      "Yes. Our Atelier offers a Bespoke Service where you can consult with our design team to customize color palettes, border motifs, and blouse embroidery for a truly one-of-a-kind drape.",
  },
];

export const ContactFAQ = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* LEFT SIDE: HEADER */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <div className="sticky top-32">
              <HelpCircle className="w-10 h-10 text-primary/40 mb-6" />
              <h2 className="text-4xl md:text-5xl font-serif text-base-content leading-tight mb-6">
                Common <br /> <i className="italic text-primary">Inquiries.</i>
              </h2>
              <p className="text-base-content/60 font-light leading-relaxed mb-8">
                Seeking more details on our weaving process or shipping
                logistics? Our concierge has prepared these insights for you.
              </p>
              <div className="h-[1px] w-20 bg-primary/30" />
            </div>
          </motion.div>

          {/* RIGHT SIDE: ACCORDION */}
          <div className="lg:w-2/3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-base-200"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full py-8 flex items-center justify-between text-left group transition-all"
                >
                  <span
                    className={`text-lg md:text-xl font-serif transition-colors duration-300 ${openIndex === index ? "text-primary" : "text-base-content group-hover:text-primary"}`}
                  >
                    {faq.question}
                  </span>
                  <div className="ml-4 flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-primary transition-transform duration-300 rotate-180" />
                    ) : (
                      <Plus className="w-5 h-5 text-base-content/30 group-hover:text-primary transition-all" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12 text-base-content/70 font-light leading-relaxed text-lg italic font-serif">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* CTA FOOTER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-16 p-8 bg-base-200/30 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <p className="text-sm uppercase tracking-widest font-bold opacity-60">
                Still require assistance?
              </p>
              <a
                href="#contact-form"
                className="text-xs uppercase tracking-[0.3em] font-bold text-primary border-b border-primary pb-1 hover:opacity-70 transition-all"
              >
                Message our concierge
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
