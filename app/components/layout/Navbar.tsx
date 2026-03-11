"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Menu } from "lucide-react";

const NAV_LINKS = [
  { name: "Shop", href: "/shop/products" },
  { name: "Category", href: "/category" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="navbar bg-base-100/70 backdrop-blur-md border-b border-base-200/50 sticky top-0 z-50 px-6 md:px-10 h-20">
      {/* LEFT SIDE: Responsive Logo & Mobile Menu */}
      <div className="navbar-start gap-4">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden p-2"
          >
            <Menu className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-100 rounded-xl z-[1] mt-3 w-52 p-4 shadow-xl border border-base-200 uppercase tracking-widest"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.name.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LOGO SECTION */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity flex items-center"
        >
          {/* MOBILE: Icon Logo (Visible on small screens, hidden on LG) */}
          <div className="lg:hidden block">
            <Image
              src="/logo/darkLogo.png" // Change to actual icon filename
              alt="Finglo Icon"
              width={125}
              height={35}
              priority // High priority for LCP
            />
          </div>

          {/* DESKTOP: Full Logo (Hidden on mobile, visible on LG) */}
          <div className="hidden lg:block">
            <Image
              src="/logo/darkLogo.png" // Change to actual full logo filename
              alt="Finglo Full Logo"
              width={140}
              height={40}
              priority
            />
          </div>
        </Link>
      </div>

      {/* CENTER: Premium Underline Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul
          className="flex items-center gap-2 font-medium"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_LINKS.map((link, index) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <Link
                href={link.href}
                className={`relative z-10 px-8 py-2 block text-[13px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                  hoveredIndex === index
                    ? "text-primary"
                    : "text-base-content/60"
                }`}
              >
                {link.name.toUpperCase()}
              </Link>

              {/* Premium Underline Slide */}
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary mx-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE: Cart */}
      <div className="navbar-end gap-3">
        <Link
          href="/cart"
          className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors relative"
        >
          <div className="indicator">
            <ShoppingCart className="h-5 w-5 stroke-[1.5]" />
            <span className="badge badge-primary badge-sm indicator-item border-none text-[10px] font-bold">
              3
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
