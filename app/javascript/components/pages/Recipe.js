import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../services/recipes_service";
import { Link } from "react-router-dom";

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

  console.log(recipe.ingredients);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl p-4">{recipe.title}</h1>
      <div className="lg:grid lg:grid-cols-2">
        <img className="px-3" src={recipe.image_url} alt={recipe.title} />
        <div>
          <div className="flex items-stretch gap-6 px-3">
            <h2>{recipe.publisher}</h2>
            <p>{recipe.cooking_time} minutes</p>
            <p>{recipe.servings} servings</p>
          </div>
          <div className="flex flex-col p-3 sm:grid sm:grid-cols-2 sm:gap-3">
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, index) => (
                <p key={index}>
                  -{" "}
                  {[
                    ingredient.quantity,
                    ingredient.unit,
                    ingredient.description,
                  ]
                    .join(" ")
                    .trim()}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="rounded-lg bg-orange-400 text-lg p-2 text-black hover:opacity-75">
          <Link to="/">HOME</Link>
        </button>
      </div>
    </div>
  );
}
