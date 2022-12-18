export const recipeIngredientsQueries = {
  createTable: `
    CREATE TABLE recipe_ingredients (
      id int NOT NULL AUTO_INCREMENT,
      recipe_id int NOT NULL,
      ingredient_with_unit_id int NOT NULL,
      amount decimal(10,2) NOT NULL,
      PRIMARY KEY (id),
      KEY ingredient_with_unit_id_fk_idx (ingredient_with_unit_id),
      KEY ingredients_recipe_id_fk_idx (recipe_id),
      CONSTRAINT ingredient_with_unit_id_fk FOREIGN KEY (ingredient_with_unit_id) REFERENCES ingredients_with_units (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT ingredients_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  selectByRecipeId: `SELECT * FROM recipe_ingredients WHERE recipe_id = ?`,

  insert: `
    INSERT INTO recipe_ingredients SET
    recipe_id = ?,
    ingredient_with_unit_id = ?,
    amount = ?`,

  update: `
    UPDATE recipe_ingredients SET
    recipe_id = ?,
    ingredient_with_unit_id = ?,
    amount = ?
    WHERE id = ?`,

  deletet: `DELETE FROM recipe_ingredients WHERE id = ?`,
};
