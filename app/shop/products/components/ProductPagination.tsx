"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadMorePaginationProps {
  currentPage: number;
  totalPages: number;
  onLoadMore: () => void;
  loading: boolean;
}

export default function LoadMorePagination({
  currentPage,
  totalPages,
  onLoadMore,
  loading,
}: LoadMorePaginationProps) {
  // Don't show if we are on the last page
  const isLastPage = currentPage >= totalPages - 1;

  if (isLastPage) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-[1px] bg-neutral-200 mb-4" />
        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-medium">
          End of Collection
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      {/* Editorial Progress Indicator */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-400">
          Chapter {currentPage + 1} of {totalPages}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-neutral-900 px-10 md:px-16 py-3.5 md:py-4 transition-all duration-500 disabled:opacity-50"
        >
          {/* Text Layer */}
          <span className="relative z-10 flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 group-hover:text-white">
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Revealing...</span>
              </>
            ) : (
              <span>Load More Pieces</span>
            )}
          </span>

          {/* Elegant Fill Animation Layer */}
          <span className="absolute inset-0 z-0 bg-neutral-900 translate-y-full transition-transform duration-500 ease-[0.215, 0.61, 0.355, 1] group-hover:translate-y-0" />
        </button>
      </motion.div>
    </div>
  );
}
