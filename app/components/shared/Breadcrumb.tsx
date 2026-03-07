import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
  homeHref?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
  showHomeIcon = true,
  homeHref = "/",
}) => {
  // Add home item if showHomeIcon is true and first item isn't home
  const allItems =
    showHomeIcon && (items.length === 0 || items[0].href !== homeHref)
      ? [{ label: "Home", href: homeHref, icon: HomeIcon }, ...items]
      : items;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://yourdomain.com${item.href}`,
    })),
  };

  return (
    <>
      {/* Add structured data script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav aria-label="Breadcrumb" className={`mb-4 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={index} className="flex items-center">
                {!isLast ? (
                  <>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors duration-200 group"
                      aria-label={`Go to ${item.label}`}
                    >
                      {item.icon && (
                        <span className="w-4 h-4 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                    <span className="mx-2 text-gray-400" aria-hidden="true">
                      <ChevronRightIcon />
                    </span>
                  </>
                ) : (
                  <span
                    className="flex items-center gap-1 text-gray-800 font-medium"
                    aria-current="page"
                  >
                    {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

// Icon Components
const HomeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="w-4 h-4 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="w-3 h-3 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default Breadcrumb;
