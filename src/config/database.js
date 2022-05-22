import { createPool } from "mysql2";

class Database {
  static pool;

  static initializeConnectionPool() {
    if (this.pool) {
      return console.log("Database pool should only be initialized once.");
    }

    const poolConfig = {
      connectionLimit: 20,
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: "food_tracking",
    };

    this.pool = createPool(poolConfig);
  }

  static sendQuery(query, params) {
    return new Promise((resolve, reject) =>
      this.pool.getConnection((connectionError, connection) => {
        if (connectionError) return reject(connectionError);

        connection.query(query, params, (error, results) => {
          error ? reject(error) : resolve(results);
          connection.release();
        });
      })
    );
  }
}

export default Database;
