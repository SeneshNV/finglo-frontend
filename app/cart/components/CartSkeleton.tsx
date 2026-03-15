export default function CartSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8 md:py-12">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-24 h-32 bg-slate-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="h-8 bg-slate-200 rounded w-32 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <div className="h-6 bg-slate-200 rounded w-32 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="h-12 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}