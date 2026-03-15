import { getCategories } from "../lib/api/categories";
import CategoryClient from "./components/CategoryClient";

// ✅ tells Next.js: don't prerender this at build time
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Categories - Finglo Sarees",
  description: "Browse our wide range of saree categories",
};

export default async function CategoryPage() {
  try {
    const categoryData = await getCategories();
    return <CategoryClient initialData={categoryData} />;
  } catch (error) {
    // ✅ build won't crash, page still renders at runtime
    return <CategoryClient initialData={null} />;
  }
}