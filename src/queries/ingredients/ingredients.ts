export const ingredientsQueries = {
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

  selectById: `SELECT * FROM ingredients WHERE id = ?`,

  insert: `
    INSERT INTO ingredients SET
    name = ?,
    category_id = ?`,

  update: `
    UPDATE ingredients SET
    name = ?,
    category_id = ?
    WHERE id = ?`,

  delete: `DELETE FROM ingredients WHERE id = ?`,
};
