import db from "../config/database.js";

export const getRecipesListQuery = (result) => {
    db.query(
      "SELECT * FROM recipes",
      (err, response) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, response);
        }
      }
    );
  };
  