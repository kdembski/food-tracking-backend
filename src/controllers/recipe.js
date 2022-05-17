import { sendQuery } from "../config/database.js";
import recipeModel from "../models/recipe.js";

export const getRecipesList = (request, response) => {
  sendQuery(recipeModel.recipesListQuery, (error, results) => {
    if (error) {
      response.send(error);
      return;
    }
    response.json(results);
  });
};
