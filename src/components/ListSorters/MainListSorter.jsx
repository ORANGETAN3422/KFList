import ListItem from "../ListItems/ListItem.jsx";
import NonDemonListItem from "../ListItems/NonDemonListItem.jsx";

function MainListSorter({ data }) {
  const { levels, nonDemonRecords } = data;

  return (
    <ol className="main-list">
      {levels.map((level, index) => (
        <ListItem key={level.ID + index} data={level} rank={index + 1} />
      ))}
      {nonDemonRecords.map((level, index) => (
        <NonDemonListItem
          key={index}
          data={level}
          rank={levels.length + index + 1}
        />
      ))}
      <li style={{ height: '20px' }}></li>
    </ol>
  );
}
export default MainListSorter;

