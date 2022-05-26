const recipeStepModel = {
  createRecipeStepsTable: `
    CREATE TABLE recipe_steps (
      id int NOT NULL AUTO_INCREMENT,
      recipe_id int NOT NULL,
      step_number int NOT NULL,
      step_instructions varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      PRIMARY KEY (id),
      KEY steps_recipe_id_fk_idx (recipe_id),
      CONSTRAINT steps_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  selectRecipeStepsByRecipeId: `SELECT * FROM recipe_steps WHERE recipe_id = ?`,

  insertRecipeStep: `
    INSERT INTO recipe_steps SET
    recipe_id = ?,
    step_number = ?,
    step_instructions = ?`,

  updateRecipeStep: `
    UPDATE recipe_steps SET
    recipe_id = ?,
    step_number = ?,
    step_instructions = ?
    WHERE id = ?`,

  deleteRecipeStep: `DELETE FROM recipe_steps WHERE id = ?`,
};

export default recipeStepModel;
