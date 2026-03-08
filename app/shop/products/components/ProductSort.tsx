// src/app/components/shop/ProductSort.tsx
import { ChevronDown } from "lucide-react";

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-neutral-200 px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary-300 cursor-pointer"
      >
        <option value="newest">Newest First</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="popular">Most Popular</option>
        <option value="rating">Top Rated</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
    </div>
  );
}
