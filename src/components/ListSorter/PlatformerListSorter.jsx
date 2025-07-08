import PlatformerListItem from '../ListItem/PlatformerListItem'

function PlatformerListSorter({ data }) {
  return (
    <ol className="main-list">
      {data.length > 0 ? (
        data.map((level, index) => (
          <PlatformerListItem key={level.ID + index} data={level} rank={index + 1} />
        ))
      ) : (
        <PlatformerListItem key="loading" data="loading" rank="" />
      )}
    </ol>
  );
}
export default PlatformerListSorter;
