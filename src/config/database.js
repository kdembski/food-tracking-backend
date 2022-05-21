import dotenv from "dotenv";
import { createPool } from "mysql2";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env.local" });
}

const pool_config = {
  connectionLimit: 20,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "food_tracking",
};

const pool = createPool(pool_config);

const sendQuery = (query, callback, params) =>
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(query, params, (error, results) => {
      callback(error, results);
      connection.release();

      if (error) throw error;
    });
  });

export default { pool, sendQuery };
