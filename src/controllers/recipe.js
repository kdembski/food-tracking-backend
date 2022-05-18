import { sendQuery } from "../config/database.js";
import recipeModel from "../models/recipe.js";

export const getRecipesList = (request, response) => {
  const size = request.query.size || 10;
  const page = request.query.page || 1;
  const offset = (page - 1) * size;
  let search = request.query.search;
  search = search ? "%" + search + "%" : "%";

  sendQuery(
    recipeModel.recipesListQuery,
    (error, results) => {
      if (error) {
        response.send(error);
        return;
      }
      response.json(results);
    },
    [search, parseInt(size), parseInt(offset)]
  );
};
