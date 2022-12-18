export const calendarItemsQueries = {
  selectDatesByRecipeId: `
    SELECT date
    FROM calendar_items
    WHERE recipe_id = ?
    AND date 
    BETWEEN ? AND ?`,

  selectDatesByOrderedFoodId: `
    SELECT date
    FROM calendar_items
    WHERE ordered_food_id = ?
    AND date 
    BETWEEN ? AND ?`,

  select: `
    SELECT * 
    FROM calendar_items
    WHERE date 
    BETWEEN ? AND ?`,

  selectById: `
    SELECT * 
    FROM calendar_items
    WHERE id = ?`,

  insert: `
    INSERT INTO calendar_items SET
    date = ?,
    recipe_id = ?,
    ordered_food_id = ?,
    sort_order = ?`,

  update: `
    UPDATE calendar_items SET
    date = ?,
    recipe_id = ?,
    ordered_food_id = ?,
    sort_order = ?
    WHERE id = ?`,

  delete: `DELETE FROM calendar_items WHERE id = ?`,
};
