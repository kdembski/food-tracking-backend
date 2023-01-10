const fields = `
  recipe_id = ?,
  ingredient_unit_id = ?,
  amount = ?
`;
const select = `
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
`;
export const recipeIngredientsQueries = {
  selectByRecipeId: select + " WHERE recipe_id = ?",

  selectById: select + " WHERE id = ?",

  insert: "INSERT INTO recipe_ingredients SET " + fields,

  update: "UPDATE recipe_ingredients SET " + fields + " WHERE id = ?",

  delete: `DELETE FROM recipe_ingredients WHERE id = ?`,
};
