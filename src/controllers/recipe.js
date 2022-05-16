import { getRecipesListQuery } from "../queries/recipe.js";

export const getRecipesList = (request, response) => {
  getRecipesListQuery((err, results) => {
    if (err) {
      response.send(err);
    } else {
      response.json(results);
    }
  });
};
