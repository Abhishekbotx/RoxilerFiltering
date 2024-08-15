import React from 'react';

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search transaction"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded p-2 w-full"
    />
  );
}

export default SearchBar;
