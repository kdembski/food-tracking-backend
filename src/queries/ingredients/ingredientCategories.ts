export const ingredientCategoriesQueries = {
  select: `SELECT * FROM ingredient_categories`,

  selectOptions: `SELECT id, name FROM ingredient_categories`,

  selectById: `
    SELECT * 
    FROM ingredient_categories
    WHERE id = ?`,

  insert: `
    INSERT INTO ingredient_categories SET
    name = ?`,

  update: `
    UPDATE ingredient_categories SET
    name = ?
    WHERE id = ?`,

  delete: `DELETE FROM ingredient_categories WHERE id = ?`,
};
