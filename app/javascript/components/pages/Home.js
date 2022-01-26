import React from "react";
import { Link } from "react-router-dom";
import useSearchRecipes from "../../hooks/useSearchRecipes";
import Search from "../Search";

export default function Home() {
  const [query, setQuery, recipes, loading, error] = useSearchRecipes();
  recipes && console.log(recipes);
  return (
    <div className="bg-orange-200">
      <div className="p-4 flex justify-between items-center">
        <Search
          query={query}
          setQuery={setQuery}
          loading={loading}
          error={error}
        />
        <button className="px-1 border-black rounded-lg bg-yellow-600 hover:bg-yellow-400">
          <Link to="new-recipe">NEW RECIPE</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 auto-rows-auto gap-2 lg:grid-cols-6 sm:grid-cols-4">
        {recipes &&
          recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`${recipe.id}`}
              className="max-w-sm rounded-lg overflow-hidden shadow-lg flex flex-col gap-1 justify-between hover:opacity-75"
            >
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="p-2 w-64 h-40 object-cover"
              />
              <div className="flex flex-col gap-2 justify-between leading-tight p-3 md:p-2">
                <h3 className="text-lg">{recipe.title}</h3>
                <p className="text-sm">{recipe.publisher}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
