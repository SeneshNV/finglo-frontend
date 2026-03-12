// src/app/shop/components/SearchBar.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/app/hooks/useDebounce";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search products...",
  className = "",
  initialValue = "",
}) => {
  const [localValue, setLocalValue] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedValue = useDebounce(localValue, 500);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Trigger search when debounced value changes
  useEffect(() => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Show searching indicator
    setIsSearching(true);

    // Call onSearch with the debounced value
    onSearch(debouncedValue);

    // Set timeout to turn off searching indicator
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [debouncedValue, onSearch]);

  const handleClear = () => {
    setLocalValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Search Icon with loading state */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {isSearching ? (
          <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
        ) : (
          <Search
            size={18}
            className="text-neutral-400 group-focus-within:text-neutral-900 transition-colors"
          />
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-12 pl-12 pr-12 bg-white border border-neutral-200 rounded-none
                 text-sm placeholder:text-neutral-400
                 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900
                 transition-all duration-300"
        aria-label="Search products"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={handleClear}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 
                   hover:text-neutral-900 transition-colors z-10"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
