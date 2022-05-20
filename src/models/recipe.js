const selectRecipesList =
  "SELECT * FROM recipes WHERE concat(recipe_name,tags) COLLATE utf8mb4_general_ci LIKE ? LIMIT ? OFFSET ? ";
const selectRecipesCount = "SELECT COUNT(*) FROM recipes";

const selectRecipeById = "SELECT * FROM recipes WHERE id = ?";

const insertRecipe =
  "INSERT INTO recipes SET recipe_name = ?, preparation_time = ?, tags = ?";

const updateRecipe =
  "UPDATE recipes SET recipe_name = ?, preparation_time = ?, tags = ? WHERE id = ?";

const deleteRecipe = "DELETE FROM recipes WHERE id = ?";

export default {
  selectRecipesList,
  selectRecipesCount,
  selectRecipeById,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
};
