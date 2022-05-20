const ingredientsListQuery =
  "SELECT * FROM ingredients WHERE ingredient_name COLLATE utf8mb4_general_ci LIKE ? LIMIT ? OFFSET ? ";
const ingredientsListCountQuery = "SELECT COUNT(*) FROM ingredients";

export default {
  ingredientsListQuery,
  ingredientsListCountQuery,
};
