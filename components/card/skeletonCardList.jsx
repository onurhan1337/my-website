import SkeletonCard from "./skeleton";

const SkeletonCardList = ({ count = 1 }) => {
  const cards = [...Array(count)].map((_, index) => (
    <SkeletonCard key={index} />
  ));

  return <>{cards}</>;
};

export default SkeletonCardList;
