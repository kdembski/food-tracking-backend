export const ingredientsQueries = {
  createTable: `
    CREATE TABLE ingredients (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  select: `
    SELECT * FROM ingredients
    WHERE name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectCount: `
    SELECT COUNT(*) FROM ingredients
    WHERE name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  insert: `
    INSERT INTO ingredients SET
    name = ?`,

  update: `
    UPDATE ingredients SET
    name = ?
    WHERE id = ?`,

  delete: `DELETE FROM ingredients WHERE id = ?`,
};
