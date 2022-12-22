export const ingredientsQueries = {
  select: `
    SELECT ingredients.*, ingredient_categories.name AS category_name 
    FROM ingredients
    JOIN ingredient_categories ON ingredients.category_id = ingredient_categories.id
    WHERE ingredients.name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectCount: `
    SELECT COUNT(*) FROM ingredients
    WHERE name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectById: `
    SELECT ingredients.*, ingredient_categories.name AS category_name 
    FROM ingredients
    JOIN ingredient_categories ON ingredients.category_id = ingredient_categories.id 
    WHERE ingredients.id = ?`,

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
