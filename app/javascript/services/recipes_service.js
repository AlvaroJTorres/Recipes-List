export function getRecipes(query) {
  return fetch(`api/v1/recipes?search=${query}`).then((res) => res.json());
}

export function getRecipe(id) {
  return fetch(`api/v1/recipes/${id}`).then((res) => res.json());
}

export function createRecipe(data) {
  return fetch("api/v1/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
