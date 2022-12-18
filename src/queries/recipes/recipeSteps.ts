export const recipeStepsQueries = {
  selectByRecipeId: `SELECT * FROM recipe_steps WHERE recipe_id = ?`,

  insert: `
    INSERT INTO recipe_steps SET
    recipe_id = ?,
    number = ?,
    instructions = ?`,

  update: `
    UPDATE recipe_steps SET
    recipe_id = ?,
    number = ?,
    instructions = ?
    WHERE id = ?`,

  delete: `DELETE FROM recipe_steps WHERE id = ?`,
};
