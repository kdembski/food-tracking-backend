const orderedFoodModel = {
  createOrderedFoodTable: `
    CREATE TABLE ordered_food (
      id int NOT NULL AUTO_INCREMENT,
      food_name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      place_name varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
      tags varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
      link varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  selectOrderedFoodList: `
    SELECT * FROM ordered_food
    WHERE food_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectOrderedFoodCount: `
    SELECT COUNT(*) FROM ordered_food
    WHERE food_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,

  selectOrderedFoodTags: `
    SELECT tags FROM ordered_food
    WHERE food_name
    COLLATE utf8mb4_general_ci
    LIKE ?`,
};

export default orderedFoodModel;
