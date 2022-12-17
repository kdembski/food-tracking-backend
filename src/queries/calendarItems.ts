const calendarItemQueries = {
  createTable: `
    CREATE TABLE calendar_items (
      id int NOT NULL AUTO_INCREMENT,
      date DATE NOT NULL,
      recipe_id int DEFAULT NULL,
      ordered_food_id int DEFAULT NULL,
      sort_order int DEFAULT NULL,
      PRIMARY KEY (id),
      KEY calendar_recipe_id_fk_idx (recipe_id),
      KEY calendar_ordered_food_id_fk_idx (ordered_food_id),
      CONSTRAINT calendar_recipe_id_fk_idx FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT calendar_ordered_food_id_fk_idx FOREIGN KEY (ordered_food_id) REFERENCES ordered_food (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

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

export default calendarItemQueries;
