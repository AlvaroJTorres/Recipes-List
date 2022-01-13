import React from "react";
import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipes_service";

export default function useSearchRecipes() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (query.length < 3) return;

    const searchRecipes = async () => {
      setError(null);
      setLoading(true);
      const recipesImagesData = await getRecipes(query);
      setLoading(false);
      if (recipesImagesData.status === "error") {
        setError(recipesImagesData.message);
      } else {
        setRecipes(recipesImagesData.data.recipes);
      }
    };

    const timerId = setTimeout(searchRecipes, 1000);
    return () => clearTimeout(timerId);
  }, [query]);

  return [query, setQuery, recipes, loading, error];
}
