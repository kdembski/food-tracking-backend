export const orderedFoodQueries = {
  select: `SELECT * FROM ordered_food`,

  selectCount: `SELECT COUNT(*) FROM ordered_food`,

  selectTags: `SELECT tags FROM ordered_food`,

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
