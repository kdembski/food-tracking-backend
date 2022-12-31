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
    SELECT 
    calendar_items.*, 
    recipes.recipe_name, 
    recipes.tags AS recipe_tags, 
    ordered_food.food_name AS ordered_food_name, 
    ordered_food.tags AS ordered_food_tags 
    FROM calendar_items
    LEFT JOIN recipes ON recipes.id = calendar_items.recipe_id 
    LEFT JOIN ordered_food ON ordered_food.id = calendar_items.ordered_food_id
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
