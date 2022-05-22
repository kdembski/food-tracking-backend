const ingredientModel = {
  createIngredientsTable: `
    CREATE TABLE ingredients (
      id int NOT NULL AUTO_INCREMENT,
      ingredient_name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  selectIngredientsList: `
    SELECT * FROM ingredients
    WHERE ingredient_name
    COLLATE utf8mb4_general_ci
    LIKE ?
    LIMIT ?
    OFFSET ?`,

  selectIngredientsCount: `
    SELECT COUNT(*) FROM ingredients
    WHERE ingredient_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectIngredientUnits: `
    SELECT * FROM ingredients_with_units
    WHERE ingredient_id = ?`,
};

export default ingredientModel;
