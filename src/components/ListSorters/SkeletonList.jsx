import SkeletonItem from '../ListItems/SkeletonItem.jsx'

function SkeletonList({ data }) {
  return (
    <ol className="main-list">
      {Array.from({ length: 10 }, (_, i) => (
        <SkeletonItem key={i} />
      ))}
    </ol>
  );
}
export default SkeletonList;