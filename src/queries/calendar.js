const calendarQueries = {
  createTable: `
    CREATE TABLE calendar (
      id int NOT NULL AUTO_INCREMENT,
      date DATE NOT NULL,
      recipe_id int DEFAULT NULL,
      ordered_food_id int DEFAULT NULL,
      portions int DEFAULT NULL,
      PRIMARY KEY (id),
      KEY calendar_recipe_id_fk_idx (recipe_id),
      KEY calendar_ordered_food_id_fk_idx (ordered_food_id),
      CONSTRAINT calendar_recipe_id_fk_idx FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT calendar_ordered_food_id_fk_idx FOREIGN KEY (ordered_food_id) REFERENCES ordered_food (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  insert: `
    INSERT INTO calendar SET
    date = ?,
    recipe_id = ?,
    ordered_food_id = ?,
    portions = ?`,

  delete: `DELETE FROM ingredients_with_units WHERE id = ?`,
};

export default calendarQueries;
