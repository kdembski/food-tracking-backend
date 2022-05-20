import ingredientModel from "../models/ingredient.js";
import getListWithPagination from "../helpers/get-list-with-pagination.js";

export const getIngredientsList = (request, response) => {
  getListWithPagination(
    ingredientModel.ingredientsListQuery,
    ingredientModel.ingredientsListCountQuery,
    request,
    response
  );
};
