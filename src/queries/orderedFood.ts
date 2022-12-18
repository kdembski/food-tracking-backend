export const orderedFoodQueries = {
  createTable: `
    CREATE TABLE ordered_food (
      id int NOT NULL AUTO_INCREMENT,
      food_name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      place_name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      tags varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
      place_link varchar(255) DEFAULT NULL,
      order_date DATE DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

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
