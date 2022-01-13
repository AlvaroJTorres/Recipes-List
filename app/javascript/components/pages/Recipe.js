import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../services/recipes_service";

export default function Recipe() {
  let params = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const showRecipe = async () => {
      const recipeData = await getRecipe(params.id);
      if (recipeData.status === "error") {
        alert(recipeData.message);
      } else {
        setRecipe(recipeData.data.recipe);
      }
    };
    showRecipe();
  }, []);
  return <div>{recipe.title}</div>;
}
