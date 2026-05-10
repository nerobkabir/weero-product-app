// ── Single shimmer pulse block ─────────────────────────────────────────────
const Shimmer = ({ className = '' }) => (
  <div
    className={`rounded-lg bg-slate-200 dark:bg-[#1a1a1a] animate-pulse ${className}`}
  />
);

// ── One skeleton card (mirrors ProductCard layout) ─────────────────────────
const SkeletonCard = () => (
  <div className="card flex flex-col overflow-hidden">
    {/* Image area */}
    <Shimmer className="h-48 rounded-none rounded-t-2xl" />

    {/* Content */}
    <div className="flex flex-col gap-3 p-4">
      {/* Title */}
      <Shimmer className="h-4 w-3/4" />
      {/* Description lines */}
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-5/6" />
      {/* Owner */}
      <Shimmer className="h-3 w-1/3 mt-1" />
      {/* Buttons */}
      <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-[#1e1e1e]">
        <Shimmer className="h-8 flex-1 rounded-xl" />
        <Shimmer className="h-8 flex-1 rounded-xl" />
      </div>
    </div>
  </div>
);

// ── Grid of skeleton cards ─────────────────────────────────────────────────
const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonGrid;