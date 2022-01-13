export function getRecipes(query) {
  return fetch(`/recipes?search=${query}`).then((res) => res.json());
}
