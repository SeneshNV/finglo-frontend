import { Category } from "@/app/types/category";

// Map of category names to their corresponding images
export const categoryImageMap: Record<string, { url: string; alt: string }> = {
  "Sri Lankan Bride Sarees": {
    url: "https://images.unsplash.com/photo-1740750047392-0d48b5fc23e4?q=80&w=687&auto=format&fit=crop",
    alt: "Sri Lankan bride in traditional saree",
  },
  "Party Wear Sarees": {
    url: "https://images.unsplash.com/photo-1679006831648-7c9ea12e5807?q=80&w=687&auto=format&fit=crop",
    alt: "Elegant party wear saree",
  },
  "Office Wear Sarees 22": {
    url: "https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?q=80&w=687&auto=format&fit=crop",
    alt: "Professional office wear saree",
  },
  "Traditional Sarees": {
    url: "https://images.unsplash.com/photo-1752847048197-1f99b1ea1936?q=80&w=605&auto=format&fit=crop",
    alt: "Traditional Indian saree",
  },
  "Casual Sarees": {
    url: "https://images.unsplash.com/photo-1740750047392-0d48b5fc23e4?q=80&w=687&auto=format&fit=crop",
    alt: "Casual everyday saree",
  },
  "Sarees 22": {
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop",
    alt: "Modern saree collection",
  },
};

// Default image for categories without specific mapping
const defaultCategoryImage = {
  url: "https://images.unsplash.com/photo-1610030469629-bc1b53d5d5e5?w=800&auto=format&fit=crop",
  alt: "Beautiful saree collection",
};

// Get image for a category based on its name
export const getCategoryImage = (
  categoryName: string,
): { url: string; alt: string } => {
  // Try to find exact match
  const exactMatch = categoryImageMap[categoryName];
  if (exactMatch) return exactMatch;

  // Try to find partial match
  const partialMatch = Object.entries(categoryImageMap).find(
    ([key]) =>
      categoryName.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(categoryName.toLowerCase()),
  );

  if (partialMatch) return partialMatch[1];

  // Return default image if no match found
  return defaultCategoryImage;
};

// Process categories to add image information
export const processCategoriesWithImages = (
  categories: Category[],
): Category[] => {
  return categories.map((category) => {
    const image = getCategoryImage(category.catName);
    return {
      ...category,
      imageUrl: image.url,
      imageAlt: image.alt,
    };
  });
};
