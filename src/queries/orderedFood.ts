export const orderedFoodQueries = {
  select: `
    SELECT * FROM ordered_food
    WHERE food_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectCount: `
    SELECT COUNT(*) FROM ordered_food
    WHERE food_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectTags: `
    SELECT tags FROM ordered_food
    WHERE food_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectById: `SELECT * FROM ordered_food WHERE id = ?`,

  insert: `
  INSERT INTO ordered_food SET
  food_name = ?,
  place_name = ?,
  tags = ?,
  place_link = ?`,

  update: `
  UPDATE ordered_food SET
  food_name = ?,
  place_name = ?,
  tags = ?,
  place_link = ?,
  order_date = ?
  WHERE id = ?`,

  delete: `DELETE FROM ordered_food WHERE id = ?`,
};
