import ingredientModel from "../models/ingredient.js";
import getListWithPagination from "../utils/get-list-with-pagination.js";

class IngredientController {
  setRoutes(router) {
    router.get("/ingredients", this.#getIngredientsListWithPagination);
  }

  #getIngredientsListWithPagination(request, response) {
    getListWithPagination(
      ingredientModel.selectIngredientsList,
      ingredientModel.selectIngredientsCount,
      request,
      response
    );
  }
}

export default new IngredientController();
