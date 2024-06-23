import FlagCard from "../components/FlagCard";
import SearchBar from "../components/SearchBar";
import "./../styles/flag.css";

export default function Flag({
  data,
  searchVal,
  setSearchVal,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="flag-container">
      <SearchBar setSearchVal={setSearchVal} searchVal={searchVal} />
      <div className="flag-lists">
        {/* array of components */}
        {data.map((card) => (
          <FlagCard
            key={card.id}
            card={card}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
