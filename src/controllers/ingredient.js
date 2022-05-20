import ingredientModel from "../models/ingredient.js";
import getListWithPagination from "../helpers/get-list-with-pagination.js";

export const getIngredientsListWithPagination = (request, response) => {
  getListWithPagination(
    ingredientModel.selectIngredientsList,
    ingredientModel.selectIngredientsCount,
    request,
    response
  );
};
