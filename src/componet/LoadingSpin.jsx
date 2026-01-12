

// Skeleton loader component
const LoadingSpin = () => (
  <div className=" rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md animate-pulse flex flex-col h-full">
    {/* Header */}
    <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-500">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>

    {/* Body */}
    <div className="px-6 py-6 flex-grow space-y-5">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/3"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-500 rounded w-1/4"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-2/3"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-2/3"></div>
        </div>
      </div>
    </div>

    {/* Button placeholder */}
    <div className="px-6 pb-6 mt-auto">
      <div className="h-10 bg-gray-300 dark:bg-gray-500 rounded w-full"></div>
    </div>
  </div>
);


export default LoadingSpin