import React from "react";
import { Link } from "react-router-dom";
import useSearchRecipes from "../../hooks/useSearchRecipes";
import Search from "../Search";

export default function Home() {
  const [query, setQuery, recipes, loading, error] = useSearchRecipes();

  return (
    <div className="flex flex-col justify-items-center items-center">
      <h1 className="text-4xl p-4">RECIPES LIST</h1>
      <div className="flex gap-4 p-3">
        <Search
          query={query}
          setQuery={setQuery}
          loading={loading}
          error={error}
        />
        <button className="rounded-lg bg-orange-400 text-lg p-2 text-black hover:opacity-75">
          <Link to="new-recipe">NEW RECIPE</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 p-4 justify-items-center items-center gap-4 md:grid-cols-3 xl:grid-cols-4">
        {recipes &&
          recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`${recipe.id}`}
              className="flex flex-col rounded-lg shadow-lg justify-items-center items-center p-2 hover:opacity-75"
            >
              <img
                className="w-60 h-32 object-cover"
                src={recipe.image_url}
                alt={recipe.title}
              />
              <div>
                <h3 className="text-black text-base">{recipe.title}</h3>
                <p className="text-sm">{recipe.publisher}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
