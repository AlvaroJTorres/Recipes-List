import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createRecipe } from "../../services/recipes_service";
import { Link } from "react-router-dom";

export default function NewRecipe() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      sourceUrl: "",
      image: "",
      publisher: "",
      cookingTime: "",
      servings: "",
      ingredient1: "",
      ingredient2: "",
      ingredient3: "",
      ingredient4: "",
    },
  });

  const formatRecipe = (data) => {
    const ingredients = Object.entries(data)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const [quantity, unit, description] = ing[1]
          .replaceAll(" ", "")
          .split(",");
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };
    return recipe;
  };

  const newRecipe = async (data) => {
    const recipe = formatRecipe(data);
    const res = await createRecipe(recipe);
    if (res.status === "error") {
      setError(res.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-items-center items-center">
      <h1 className="text-4xl p-4">NEW RECIPE</h1>
      <form
        className="p-2"
        onSubmit={handleSubmit((data) => {
          newRecipe(data);
        })}
      >
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-5">
          <div className="flex flex-col">
            <h3 className="text-xl text-black self-center">Recipe Data</h3>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Title</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="Name of the recipe"
                {...register("title", {
                  required: "This is required",
                  pattern: { value: /^[a-zA-Z ]+$/, message: "Letters only" },
                })}
              />
              <p className="text-red-700">{errors.title?.message}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">URL</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="Url of the recipe"
                {...register("sourceUrl", { required: "This is required" })}
              />
              {errors && (
                <p className="text-red-700">{errors.sourceUrl?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Image URL</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="Url of the image for the recipe"
                {...register("image", { required: "This is required" })}
              />
              {errors && (
                <p className="text-red-700">{errors.image?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Publisher</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="Name of the recipe's author"
                {...register("publisher", {
                  required: "This is required",
                  pattern: { value: /^[a-zA-Z]+$/, message: "Letters only" },
                })}
              />
              {errors && (
                <p className="text-red-700">{errors.publisher?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Prep time</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="aprox. time to do the recipe"
                {...register("cookingTime", {
                  required: "This is required",
                  pattern: { value: /^[0-9]+$/, message: "Numbers only" },
                })}
              />
              {errors && (
                <p className="text-red-700">{errors.cookingTime?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Servings</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="How many servings for this recipe"
                {...register("servings", {
                  required: "This is required",
                  pattern: { value: /^[0-9]+$/, message: "Numbers only" },
                })}
              />
              {errors && (
                <p className="text-red-700">{errors.servings?.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl text-black self-center">Ingredients</h3>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Ingredient 1</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="Format: 'Quantity,Unit,Description'"
                {...register("ingredient1", {
                  required: "This is required",
                  pattern: {
                    value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
                    message: "Format: 'Quantity,Unit,Description'",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Ingredient 2</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="Format: 'Quantity,Unit,Description'"
                {...register("ingredient2", {
                  required: "This is required",
                  pattern: {
                    value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
                    message: "Format: 'Quantity,Unit,Description'",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Ingredient 3</label>
              <input
                className="rounded-lg text-base p-3"
                placeholder="Format: 'Quantity,Unit,Description'"
                {...register("ingredient3", {
                  required: "This is required",
                  pattern: {
                    value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
                    message: "Format: 'Quantity,Unit,Description'",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black text-lg">Ingredient 4</label>
              <input
                placeholder="Format: 'Quantity,Unit,Description'"
                className="rounded-lg text-base p-3"
                {...register("ingredient4", {
                  required: "This is required",
                  pattern: {
                    value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
                    message: "Format: 'Quantity,Unit,Description'",
                  },
                })}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <input type="submit" />
        </div>
      </form>
      <div className="flex justify-center">
        <button className="rounded-lg bg-orange-400 text-lg p-2 text-black hover:opacity-75">
          <Link to="/">HOME</Link>
        </button>
      </div>
    </div>
  );
}
