export const membersQueries = {
  createTable: `
    CREATE TABLE members (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(63) COLLATE utf8mb4_polish_ci NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`,

  select: `SELECT * FROM members`,
};
