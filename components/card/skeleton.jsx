export const SkeletonCard = () => {
  return (
    <div className="max-w-screen-sm px-6 py-12 mx-auto overflow-hidden">
      <div className="flex flex-col gap-y-6">
        <div className="card bg-gray-100 dark:bg-zinc-950 shadow-lg flex flex-col gap-y-1 rounded-md p-2.5 -m-2.5 overflow-hidden">
          <div className="animate-pulse flex p-3 space-x-4">
            <div className="flex-1 py-2">
              <div className="h-4 bg-gray-400 rounded w-5/6"></div>
              <div className="h-4 bg-gray-400 rounded w-2/6 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
