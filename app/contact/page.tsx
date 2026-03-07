import { Metadata } from "next";
import { Suspense } from "react";
import { ContactInfo } from "./components/ContactInfo";
import { ContactForm } from "./components/ContactForm";
import { ContactFAQ } from "./components/ContactFAQ";
import Loading from "../components/shared/Loading";
import ContactHero from "./components/ContactHero";
import { CTATiny } from "./components/CTA";

export const metadata: Metadata = {
  title: "Contact Us - FingloSarees | Get in Touch",
  description:
    "Get in touch with FingloSarees. We're here to help with any questions about our sarees, orders, or services. Visit our store in Mumbai or contact us online.",
  keywords:
    "contact finglo sarees, customer support, saree store mumbai, saree inquiries, help center",
  openGraph: {
    title: "Contact FingloSarees - We're Here to Help",
    description:
      "Reach out to us for any questions about our handcrafted sarees. Visit our Mumbai store or contact us online.",
    images: ["/images/contact/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />

      <Suspense fallback={<Loading />}>
        <ContactInfo />
        <ContactForm />
        <ContactFAQ />
        <CTATiny />
      </Suspense>
    </div>
  );
}
