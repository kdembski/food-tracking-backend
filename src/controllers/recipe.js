import recipeModel from "../models/recipe.js";
import getListWithPagination from "../helpers/get-list-with-pagination.js";

export const getRecipesList = (request, response) => {
  getListWithPagination(
    recipeModel.recipesListQuery,
    recipeModel.recipeListCountQuery,
    request,
    response
  );
};
