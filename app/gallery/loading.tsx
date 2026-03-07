export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>

          {/* Filter buttons skeleton */}
          <div className="flex justify-center gap-4 mb-12">
            <div className="h-10 bg-gray-200 rounded-full w-24"></div>
            <div className="h-10 bg-gray-200 rounded-full w-40"></div>
            <div className="h-10 bg-gray-200 rounded-full w-32"></div>
          </div>

          {/* Image grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
