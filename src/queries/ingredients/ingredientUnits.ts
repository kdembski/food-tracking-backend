export const ingredientUnitsQueries = {
  selectByIngredientId: `
    SELECT * FROM ingredient_units
    WHERE ingredient_id = ?`,

  insert: `
    INSERT INTO ingredient_units SET
    ingredient_id = ?,
    unit_id = ?,
    kcal_per_unit = ?,
    is_primary = ?,
    converter_to_primary = ?`,

  update: `
    UPDATE ingredient_units SET
    ingredient_id = ?,
    unit_id = ?,
    kcal_per_unit = ?,
    is_primary = ?,
    converter_to_primary = ?
    WHERE id = ?`,

  delete: `DELETE FROM ingredient_units WHERE id = ?`,
};
