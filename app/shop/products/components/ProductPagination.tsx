'use client'

import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function ProductPagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: ProductPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i)

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages
    
    if (currentPage < 3) return pages.slice(0, 5)
    if (currentPage > totalPages - 3) return pages.slice(totalPages - 5)
    
    return pages.slice(currentPage - 2, currentPage + 3)
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="w-10 h-10 flex items-center justify-center border border-neutral-200 bg-white 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:border-primary-300 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center border transition-colors
            ${currentPage === page 
              ? 'bg-primary-600 text-white border-primary-600' 
              : 'bg-white border-neutral-200 hover:border-primary-300'
            }`}
        >
          {page + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="w-10 h-10 flex items-center justify-center border border-neutral-200 bg-white 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:border-primary-300 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}