import { notFound } from "next/navigation";
import { Metadata } from "next";
import { productApi } from "@/app/lib/api/products";
import ProductDetailsClient from "./ProductDetailsClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const productId = parseInt(slug, 10);

    if (isNaN(productId)) {
      return {
        title: "Product Details | Finglo Sarees",
        description: "View product details",
      };
    }

    const response = await productApi.getProductById(productId);

    if (response.responseCode !== "00" || !response.responseData) {
      return {
        title: "Product Not Found | Finglo Sarees",
        description: "The requested product could not be found.",
      };
    }

    const product = response.responseData;

    const image =
      product.images?.find((img) => img.isPrimary)?.imageUrl ||
      product.images?.[0]?.imageUrl;

    const url = `https://finglo-frontend.vercel.app/shop/products/${productId}`;

    return {
      title: `${product.proName} — Finglo Sarees`,
      description:
        product.proDescription?.slice(0, 160) ||
        "Luxury handcrafted saree from Finglo Sarees",

      alternates: {
        canonical: url,
      },

      openGraph: {
        title: `${product.proName} — Finglo Sarees`,
        description:
          product.proDescription?.slice(0, 160) || "Luxury handcrafted saree",
        url,
        siteName: "Finglo Sarees",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: product.proName,
          },
        ],
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title: `${product.proName} — Finglo Sarees`,
        description:
          product.proDescription?.slice(0, 160) || "Luxury handcrafted saree",
        images: [image],
      },
    };
  } catch (error) {
    return {
      title: "Error | Finglo Sarees",
      description: "An error occurred while loading the product.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { slug } = await params;
    console.log("🔄 Page - Slug received:", slug);

    const productId = parseInt(slug, 10);
    console.log("🔄 Page - Product ID parsed:", productId);

    if (isNaN(productId)) {
      console.log("🔄 Page - Invalid product ID");
      notFound();
    }

    console.log("🔄 Page - Calling API for product:", productId);
    const response = await productApi.getProductById(productId);

    console.log("🔄 Page - API Response Code:", response.responseCode);
    console.log("🔄 Page - API Response Data:", response.responseData);

    if (response.responseCode !== "00" || !response.responseData) {
      console.log("🔄 Page - Product not found in API");
      notFound();
    }

    console.log("🔄 Page - Product found, rendering client component");
    return <ProductDetailsClient product={response.responseData} />;
  } catch (err) {
    console.error("🔄 Page - Error loading product:", err);
    notFound();
  }
}
