export function getRecipes(query) {
  return fetch(`/recipes?search=${query}`).then((res) => res.json());
}

export function getRecipe(id) {
  return fetch(`/recipes/${id}`).then((res) => res.json());
}
