const ShimmerBlock = ({ className = '' }) => (
  <div className={`shimmer ${className}`} />
);

const Loading = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* Page title shimmer */}
        <ShimmerBlock className="h-9 w-64 mb-8 rounded-lg" />

        {/* Stats cards shimmer */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <ShimmerBlock className="h-4 w-24 rounded" />
                  <ShimmerBlock className="h-8 w-16 rounded" />
                </div>
                <ShimmerBlock className="w-12 h-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Section title shimmer */}
        <ShimmerBlock className="h-7 w-48 mb-6 rounded-lg" />

        {/* Card rows shimmer */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <ShimmerBlock className="h-6 w-56 rounded" />
                  <ShimmerBlock className="h-4 w-40 rounded" />
                  <ShimmerBlock className="h-4 w-32 rounded" />
                </div>
                <div className="flex gap-2">
                  <ShimmerBlock className="h-10 w-20 rounded-lg" />
                  <ShimmerBlock className="h-10 w-32 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Loading;
