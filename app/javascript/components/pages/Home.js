import React from "react";
import { Link } from "react-router-dom";
import useSearchRecipes from "../../hooks/useSearchRecipes";
import Search from "../Search";

export default function Home() {
  const [query, setQuery, recipes, loading, error] = useSearchRecipes();

  return (
    <>
      <Search
        query={query}
        setQuery={setQuery}
        loading={loading}
        error={error}
      />
      <div>
        {recipes &&
          recipes.map((recipe) => (
            <Link key={recipe.id} to={`${recipe.id}`}>
              {recipe.title}
            </Link>
          ))}
      </div>
      <div>
        <Link to="new-recipe">NEW RECIPE</Link>
      </div>
    </>
  );
}
