const Separator = () => (
  <div className="flex justify-center">
    <div className="flex justify-center">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-1"
        />
      ))}
    </div>
  </div>
);

export default Separator;
