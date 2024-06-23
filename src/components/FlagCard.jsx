import React, { useState } from "react";
import "../styles/flag-card.css";

export default function FlagCard({ card, onUpdate, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedCountry, setUpdatedCountry] = useState({ ...card });
  const [flagFile, setFlagFile] = useState(null);

  const handleUpdate = () => {
    onUpdate(card.id, updatedCountry, flagFile);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flag-card">
      <div className="flag-image">
        <img src={card.flag} alt="flag-img" />
      </div>
      <div className="flag-description">
        <h2>{card.name}</h2>
        <p>
          <span>Capital:</span> {card.capital}
        </p>
        <p>
          <span>Population: </span>
          {card.population}
        </p>
      </div>
      <div className="btn-flag-container">
        <button
          className="btn-flag-card update"
          onClick={() => setIsEditModalOpen(true)}
        >
          Update
        </button>
        <button
          className="btn-flag-card delete"
          onClick={() => onDelete(card.id)}
        >
          Delete
        </button>
      </div>

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditModalOpen(false)}>
              <i className="bx bx-x"></i>
            </span>
            <input
              type="file"
              onChange={(e) => setFlagFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Flag URL"
              value={updatedCountry.flag}
              onChange={(e) =>
                setUpdatedCountry({ ...updatedCountry, flag: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              value={updatedCountry.name}
              onChange={(e) =>
                setUpdatedCountry({ ...updatedCountry, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Capital"
              value={updatedCountry.capital}
              onChange={(e) =>
                setUpdatedCountry({
                  ...updatedCountry,
                  capital: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Population"
              value={updatedCountry.population}
              onChange={(e) =>
                setUpdatedCountry({
                  ...updatedCountry,
                  population: e.target.value,
                })
              }
            />
            <button className="save-changes" onClick={handleUpdate}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
