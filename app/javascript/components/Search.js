import React from "react";

export default function Search({ query, setQuery, loading, error }) {
  return (
    <input
      placeholder="Food"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="rounded-lg text-sm pl-1"
    />
  );
}
