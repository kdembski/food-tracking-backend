const selectIngredientsList =
  "SELECT * FROM ingredients WHERE ingredient_name COLLATE utf8mb4_general_ci LIKE ? LIMIT ? OFFSET ? ";
const selectIngredientsCount = "SELECT COUNT(*) FROM ingredients";

export default {
  selectIngredientsList,
  selectIngredientsCount,
};
