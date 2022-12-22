export const recipeIngredientsQueries = {
  selectByRecipeId: `
    SELECT 
      recipe_ingredients.*, 
      ingredients.name AS ingredient_name, 
      units.shortcut AS unit_shortcut,
      ingredient_units.kcal_per_unit,
      ingredient_units.is_primary,
      ingredient_units.converter_to_primary
    FROM recipe_ingredients 
    JOIN ingredient_units ON recipe_ingredients.ingredient_unit_id = ingredient_units.id
    JOIN units ON ingredient_units.unit_id = units.id 
    JOIN ingredients ON ingredient_units.ingredient_id = ingredients.id 
    WHERE recipe_id = ?`,

  selectById: `
    SELECT * FROM recipe_ingredients 
    WHERE id = ?`,

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

  delete: `DELETE FROM recipe_ingredients WHERE id = ?`,
};
