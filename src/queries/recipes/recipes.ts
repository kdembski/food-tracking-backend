export const recipesQueries = {
  createsTable: `
    CREATE TABLE recipes (
      id int NOT NULL AUTO_INCREMENT,
      recipe_name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      preparation_time int DEFAULT NULL,
      tags varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
      kcal int DEFAULT NULL,
      cooked_date DATE DEFAULT NULL,
      cookidoo_link varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

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
