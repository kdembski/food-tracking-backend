const recipesListQuery =
  "SELECT * FROM recipes WHERE concat(recipe_name,tags) COLLATE utf8mb4_general_ci LIKE ? LIMIT ? OFFSET ? ";
const recipeListCountQuery = "SELECT COUNT(*) FROM recipes";

export default {
  recipesListQuery,
  recipeListCountQuery,
};
