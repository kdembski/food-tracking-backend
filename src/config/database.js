import mysql from "mysql2";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env.local" });
}

let pool_config = {
  connectionLimit: 20,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "food_tracking",
};

let pool = mysql.createPool(pool_config);

export const sendQuery = (query, callback, params) =>
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(query, params, (error, results) => {
      callback(error, results);
      connection.release();

      if (error) throw error;
    });
  });

export default pool;
