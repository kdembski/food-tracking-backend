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

  insert: `
    INSERT INTO ingredients SET
    name = ?`,

  update: `
    UPDATE ingredients SET
    name = ?
    WHERE id = ?`,

  delete: `DELETE FROM ingredients WHERE id = ?`,
};
