import mysql from "mysql2";

const db = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11492636",
  password: "kDc2mfjxJv",
  database: "sql11492636",
});

export default db;
