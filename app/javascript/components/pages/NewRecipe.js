import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createRecipe } from "../../services/recipes_service";

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
    <form
      onSubmit={handleSubmit((data) => {
        newRecipe(data);
      })}
    >
      <div>
        <h3>Recipe data</h3>
        <label>Title</label>
        <input
          placeholder="Name of the recipe"
          {...register("title", {
            required: "This is required",
            pattern: { value: /^[a-zA-Z ]+$/, message: "Letters only" },
          })}
        />
        <p>{errors.title?.message}</p>

        <label>URL</label>
        <input placeholder="url of the recipe" {...register("sourceUrl")} />
        {errors && <p>{errors.sourceUrl?.message}</p>}
        <label>Image URL</label>
        <input
          placeholder="url of the image for the recipe"
          {...register("image")}
        />
        {errors && <p>{errors.image?.message}</p>}

        <label>Publisher</label>
        <input
          placeholder="name of the recipe's author"
          {...register("publisher", {
            // required: "This is required",
            pattern: { value: /^[a-zA-Z]+$/, message: "Letters only" },
          })}
        />
        {errors && <p>{errors.publisher?.message}</p>}

        <label>Prep time</label>
        <input
          placeholder="aprox. time to do the recipe"
          {...register("cookingTime", {
            required: "This is required",
            pattern: { value: /^[0-9]+$/, message: "Numbers only" },
          })}
        />
        {errors && <p>{errors.cookingTime?.message}</p>}

        <label>Servings</label>
        <input
          placeholder="How many servings for this recipe"
          {...register("servings", {
            required: "This is required",
            pattern: { value: /^[0-9]+$/, message: "Numbers only" },
          })}
        />
        {errors && <p>{errors.servings?.message}</p>}
      </div>

      <div>
        <h3>Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          placeholder="Format: 'Quantity,Unit,Description'"
          {...register("ingredient1", {
            // required: "This is required",
            pattern: {
              value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
              message: "Format: 'Quantity,Unit,Description'",
            },
          })}
        />

        <label>Ingredient 2</label>
        <input
          placeholder="Format: 'Quantity,Unit,Description'"
          {...register("ingredient2", {
            // required: "This is required",
            pattern: {
              value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
              message: "Format: 'Quantity,Unit,Description'",
            },
          })}
        />

        <label>Ingredient 3</label>
        <input
          placeholder="Format: 'Quantity,Unit,Description'"
          {...register("ingredient3", {
            // required: "This is required",
            pattern: {
              value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
              message: "Format: 'Quantity,Unit,Description'",
            },
          })}
        />

        <label>Ingredient 4</label>
        <input
          placeholder="Format: 'Quantity,Unit,Description'"
          {...register("ingredient4", {
            // required: "This is required",
            pattern: {
              value: /^[0-9]+,[a-zA-Z\.]+,[a-zA-Z0-9_ ]*$/,
              message: "Format: 'Quantity,Unit,Description'",
            },
          })}
        />
      </div>
      <input type="submit" />
    </form>
  );
}
