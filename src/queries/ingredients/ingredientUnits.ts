export const ingredientUnitsQueries = {
  selectById: `
    SELECT ingredient_units.*, units.name AS unit_name 
    FROM ingredient_units
    JOIN units ON ingredient_units.unit_id = units.id 
    WHERE ingredient_units.id = ?`,

  selectByIngredientId: `
    SELECT ingredient_units.*, units.name AS unit_name 
    FROM ingredient_units
    JOIN units ON ingredient_units.unit_id = units.id 
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
