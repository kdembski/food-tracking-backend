const recipeModel = {
  createRecipesTable: `
    CREATE TABLE recipes (
      id int NOT NULL AUTO_INCREMENT,
      recipe_name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      preparation_time int DEFAULT NULL,
      tags varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
      kcal int DEFAULT NULL,
      cooked_date TIMESTAMP DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  selectRecipesList: `
    SELECT * FROM recipes 
    WHERE concat(recipe_name,tags) 
    COLLATE utf8mb4_general_ci 
    LIKE ? 
    LIMIT ? 
    OFFSET ?`,

  selectRecipesCount: `
    SELECT COUNT(*) FROM recipes
    WHERE concat(recipe_name,tags) 
    COLLATE utf8mb4_general_ci 
    LIKE ?`,

  selectRecipeById: `SELECT * FROM recipes WHERE id = ?`;

  insertRecipe: `
    INSERT INTO recipes SET 
    recipe_name = ?, 
    preparation_time = ?, 
    tags = ?`,

  updateRecipe: `
    UPDATE recipes SET 
    recipe_name = ?, 
    preparation_time = ?, 
    tags = ? 
    WHERE id = ?`,

  deleteRecipe: `DELETE FROM recipes WHERE id = ?`
}

export default recipeModel;
