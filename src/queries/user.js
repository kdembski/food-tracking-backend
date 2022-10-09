const userQueries = {
  createTable: `
    CREATE TABLE users (
      id int NOT NULL AUTO_INCREMENT,
      password varchar(63) COLLATE utf8mb4_polish_ci NOT NULL,
      access_token varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  select: `
    SELECT * FROM users
    WHERE id = 1`,
};

export default userQueries;
