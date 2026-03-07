import { getCategories } from "../lib/api/categories";
import CategoryClient from "./components/CategoryClient";

export const metadata = {
  title: "Categories - Finglo Sarees",
  description: "Browse our wide range of saree categories",
};

export default async function CategoryPage() {
  // Fetch categories on the server
  const categoryData = await getCategories();

  // Pass data to client component
  return <CategoryClient initialData={categoryData} />;
}
