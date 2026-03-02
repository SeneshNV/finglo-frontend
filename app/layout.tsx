import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finglo Sarees - Exquisite Traditional & Designer Sarees",
  description:
    "Discover our exquisite collection of traditional silk sarees, designer sarees, and bridal collections. Handcrafted with passion for the modern woman.",
  keywords:
    "sarees, silk sarees, cotton sarees, designer sarees, bridal sarees, traditional wear",
  openGraph: {
    title: "Finglo Sarees - Exquisite Traditional & Designer Sarees",
    description: "Discover our exquisite collection of handcrafted sarees.",
    url: "https://finglo.com",
    siteName: "Finglo Sarees",
    images: [
      {
        url: "https://finglo.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Finglo Sarees Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finglo Sarees",
    description: "Discover our exquisite collection of handcrafted sarees.",
    images: ["https://finglo.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
