const ingredientWithUnitQueries = {
  createTable: `
    CREATE TABLE ingredients_with_units (
      id int NOT NULL AUTO_INCREMENT,
      ingredient_id int NOT NULL,
      unit_id int NOT NULL,
      kcal_per_unit decimal(10,2) NOT NULL,
      is_primary tinyint(1) NOT NULL DEFAULT '1',
      converter_to_primary decimal(10,3) DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY unique_ids_pair (ingredient_id,unit_id),
      KEY ingredient_id_fk_idx (ingredient_id),
      KEY unit_id_fk_idx (unit_id),
      CONSTRAINT ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT unit_id_fk FOREIGN KEY (unit_id) REFERENCES units (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  selectByIngredientId: `
    SELECT * FROM ingredients_with_units
    WHERE ingredient_id = ?`,

  insert: `
    INSERT INTO ingredients_with_units SET
    ingredient_id = ?,
    unit_id = ?,
    kcal_per_unit = ?,
    is_primary = ?,
    converter_to_primary = ?`,

  update: `
    UPDATE ingredients_with_units SET
    ingredient_id = ?,
    unit_id = ?,
    kcal_per_unit = ?,
    is_primary = ?,
    converter_to_primary = ?
    WHERE id = ?`,

  delete: `DELETE FROM ingredients_with_units WHERE id = ?`,
};

export default ingredientWithUnitQueries;
