import React from "react";
import { useGlobalContext } from "./context";

import { FaRegSun } from "react-icons/fa";

const SearchForm = () => {
  const { query, handleSearch, handleMode } = useGlobalContext();

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-form">
      <button className="toggle-btn" onClick={handleMode}>
        <FaRegSun />
      </button>
      <h2>Search Hacker News</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
