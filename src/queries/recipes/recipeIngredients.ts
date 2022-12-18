export const recipeIngredientsQueries = {
  selectByRecipeId: `SELECT * FROM recipe_ingredients WHERE recipe_id = ?`,

  insert: `
    INSERT INTO recipe_ingredients SET
    recipe_id = ?,
    ingredient_unit_id = ?,
    amount = ?`,

  update: `
    UPDATE recipe_ingredients SET
    recipe_id = ?,
    ingredient_unit_id = ?,
    amount = ?
    WHERE id = ?`,

  deletet: `DELETE FROM recipe_ingredients WHERE id = ?`,
};
