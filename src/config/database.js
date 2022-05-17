import mysql from "mysql2";

let pool_config = {
  connectionLimit: 10,
  host: "sql11.freesqldatabase.com",
  user: "sql11492636",
  password: "kDc2mfjxJv",
  database: "sql11492636",
};

let pool = mysql.createPool(pool_config);

export const sendQuery = (query, callback) =>
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(query, (error, results) => {
      callback(error, results);
      connection.release();

      if (error) throw error;
    });
  });

export default pool;
