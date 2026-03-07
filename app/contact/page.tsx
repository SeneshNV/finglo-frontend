"use client";

import { useState } from "react";
import Link from "next/link";
import { SEO } from "../components/shared/SEO";
import { Button } from "../components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - FingloSarees"
        description="Get in touch with FingloSarees. We're here to help with any questions about our sarees, orders, or services."
        keywords="contact finglo sarees, customer support, saree inquiries"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about our
              products, need help with an order, or just want to say hello,
              we're here for you.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-pink-600 mr-3">📍</span>
                      <div>
                        <h3 className="font-medium text-gray-800">Address</h3>
                        <p className="text-gray-600">
                          123 Fashion Street
                          <br />
                          Andheri East, Mumbai
                          <br />
                          Maharashtra 400069, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-pink-600 mr-3">📞</span>
                      <div>
                        <h3 className="font-medium text-gray-800">Phone</h3>
                        <p className="text-gray-600">+91 98765 43210</p>
                        <p className="text-gray-600">+91 98765 43211</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-pink-600 mr-3">✉️</span>
                      <div>
                        <h3 className="font-medium text-gray-800">Email</h3>
                        <p className="text-gray-600">info@finglosarees.com</p>
                        <p className="text-gray-600">
                          support@finglosarees.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-pink-600 mr-3">⏰</span>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Business Hours
                        </h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM
                        </p>
                        <p className="text-gray-600">
                          Saturday: 10:00 AM - 4:00 PM
                        </p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Connect With Us
                  </h2>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
                      >
                        <span className="text-xl">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Send Us a Message
                  </h2>

                  {submitStatus.type && (
                    <div
                      className={`mb-6 p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="product">Product Inquiry</option>
                          <option value="order">Order Status</option>
                          <option value="return">Returns & Exchanges</option>
                          <option value="wholesale">Wholesale Inquiry</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Type your message here..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Visit Our Store
            </h2>
            <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              {/* Replace with actual Google Maps embed */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <p className="text-gray-600">Google Maps Integration</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/faq">
                <Button variant="outline">View All FAQs</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const socialLinks = [
  { icon: "📘", url: "https://facebook.com/finglosarees" },
  { icon: "📷", url: "https://instagram.com/finglosarees" },
  { icon: "🐦", url: "https://twitter.com/finglosarees" },
  { icon: "📌", url: "https://pinterest.com/finglosarees" },
];

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Domestic shipping typically takes 3-5 business days. International shipping may take 7-14 business days depending on the destination.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer 7-day return policy on all unworn products with original tags attached. Customized products are non-returnable.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to select countries worldwide. Shipping charges and delivery times vary by location.",
  },
];
