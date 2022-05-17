import mysql from "mysql2";

let db_config = {
  host: "sql11.freesqldatabase.com",
  user: "sql11492636",
  password: "kDc2mfjxJv",
  database: "sql11492636",
};

let connection;

const handleDatabaseConnection = () => {
  if (connection) {
    connection.end();
  }
  connection = mysql.createConnection(db_config);

  connection.connect((err) => {
    if (err) {
      console.log("Connecting to database error: " + err.code + "\n");
      setTimeout(handleDatabaseConnection, 2000);
      return;
    }
    console.log("Connected to database!");
  });

  connection.on("error", (err) => {
    console.log("Error from database: " + err.code + "\n");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDatabaseConnection();
      return;
    }
    throw err;
  });
};

handleDatabaseConnection();

export default connection;
