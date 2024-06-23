import { useState } from "react";
import "./../styles/search-bar.css";

export default function SearchBar({ searchVal, setSearchVal }) {
  // Controlled Input
  //   biar bisa pake default value
  return (
    <div className="search-container">
      <i class="bx bx-search"></i>
      <input
        type="text"
        placeholder="Search for a country"
        className="search-bar"
        // CONTROLLED INPUTS :
        value={searchVal}
        onChange={function (e) {
          const value = e.target.value;
          setSearchVal(value);
        }}
      />
    </div>
  );
}
