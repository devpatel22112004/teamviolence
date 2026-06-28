// Premium shimmer skeleton loaders (replace plain spinners)

export const Skeleton = ({ className = '' }) => (
  <div className={`relative overflow-hidden rounded-xl bg-primary-500/10 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-primary-400/20 to-transparent" />
  </div>
)

export const SkeletonCard = () => (
  <div className="card-modern space-y-4">
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex gap-3 pt-2">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  </div>
)

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
)

export default Skeleton
