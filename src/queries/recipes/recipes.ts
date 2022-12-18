export const recipesQueries = {
  select: `
    SELECT * FROM recipes
    WHERE recipe_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectCount: `
    SELECT COUNT(*) FROM recipes
    WHERE recipe_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectTags: `
    SELECT tags FROM recipes
    WHERE recipe_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectNames: `
    SELECT recipe_name FROM recipes
    WHERE recipe_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectById: `SELECT * FROM recipes WHERE id = ?`,

  insert: `
    INSERT INTO recipes SET
    recipe_name = ?,
    preparation_time = ?,
    tags = ?,
    cookidoo_link = ?`,

  update: `
    UPDATE recipes SET
    recipe_name = ?,
    preparation_time = ?,
    tags = ?,
    cooked_date = ?,
    cookidoo_link = ?
    WHERE id = ?`,

  delete: `DELETE FROM recipes WHERE id = ?`,
};
