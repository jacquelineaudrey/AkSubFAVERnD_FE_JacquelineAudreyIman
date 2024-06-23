import "./../styles/form.css";

export default function Form({
  flagFile,
  setFlagFile,
  newCountry,
  setNewCountry,
  handleAddCountry,
  fileInputRef,
}) {

  return (
    <div className="form-container">
      <input
        type="file"
        onChange={(e) => {
          // type="file" -> e.target.files = [<FILE>] 
          const uploadedImage = e.target.files[0];
          setFlagFile(uploadedImage);
        }}


        ref={fileInputRef}
      />
      <input
        type="text"
        placeholder="Name"
        value={newCountry.name}
        // Spread
        onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Capital"
        value={newCountry.capital}
        onChange={(e) =>
          setNewCountry({ ...newCountry, capital: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Population"
        value={newCountry.population}
        onChange={(e) =>
          setNewCountry({ ...newCountry, population: e.target.value })
        }
      />
      <button onClick={handleAddCountry}>Add Country</button>
    </div>
  );
}
