"use client";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp Concierge",
    details: ["+94 77 123 4567", "+94 11 987 6543"],
    action: "Chat Now",
    link: "https://wa.me/94771234567",
  },
  {
    icon: Mail,
    title: "Email Inquiry",
    details: ["concierge@finglosarees.com", "heritage@finglosarees.com"],
    action: "Send Message",
    link: "mailto:concierge@finglosarees.com",
  },
  {
    icon: Clock,
    title: "Open 24 Hours",
    details: ["Our atelier is available round the clock for inquiries."],
    action: "Contact Anytime",
    link: "/shop/products",
  },
];

const socialLinks = [
  { icon: Facebook, url: "#", label: "Facebook" },
  { icon: Instagram, url: "#", label: "Instagram" },
  { icon: Twitter, url: "#", label: "Twitter" },
  { icon: Youtube, url: "#", label: "YouTube" },
];

export const ContactInfo = () => {
  return (
    <section className="py-12 bg-base-100 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                // KEY FIX: use whileInView + amount:0 so it triggers even when
                // already in the viewport on page load (no scroll needed)
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card bg-base-100 border border-base-200 rounded-none p-8 transition-all duration-500 hover:border-primary/30 group hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 rounded-full group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-6 h-6 text-primary group-hover:text-primary-content transition-colors" />
                </div>

                <h3 className="text-sm uppercase tracking-widest font-bold text-base-content mb-4">
                  {item.title}
                </h3>

                <div className="space-y-2 mb-8 min-h-[4.5rem]">
                  {item.details.map((detail, i) => (
                    <p
                      key={i}
                      className="text-base-content/80 font-serif italic text-lg leading-relaxed"
                    >
                      {detail}
                    </p>
                  ))}
                </div>

                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-primary hover:text-primary-focus transition-colors group-hover:gap-3"
                >
                  {item.action}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* SOCIAL SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center text-center pt-8"
        >
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-10" />

          <h4 className="text-xs md:text-sm uppercase tracking-[0.45em] text-base-content/50 font-bold mb-8">
            Join the Heritage Community
          </h4>

          <div className="flex gap-5 md:gap-8 mb-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-ghost btn-circle bg-base-200/40 hover:bg-primary hover:text-primary-content transition-all duration-400 shadow-sm"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </div>

          <p className="text-xs md:text-sm font-serif italic text-base-content/50 max-w-md">
            Follow our journey through the looms and weavers of Sri Lanka
          </p>
        </motion.div>
      </div>
    </section>
  );
};
