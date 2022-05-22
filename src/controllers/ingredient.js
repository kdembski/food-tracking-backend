import ingredientModel from "../models/ingredient.js";
import getListWithPagination from "../utils/get-list-with-pagination.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import Database from "../config/database.js";

class IngredientController {
  static setRoutes(router) {
    router.get("/ingredients", this.#getIngredientsListWithPagination);
  }

  static #getIngredientsListWithPagination(request, response) {
    getListWithPagination(
      ingredientModel.selectIngredientsList,
      ingredientModel.selectIngredientsCount,
      request
    )
      .then((results) => {
        IngredientController.#getIngredientsUnits(results.data)
          .then(() => {
            response.json(results);
          })
          .catch((error) => response.send(error));
      })
      .catch((error) => response.send(error));
  }

  static #getIngredientsUnits(ingredients) {
    return Promise.all(
      ingredients.map(async (ingredient) => {
        const units = await Database.sendQuery(
          ingredientModel.selectIngredientUnits,
          [ingredient.id]
        );
        ingredient.units = convertKeysToCamelCase(units);
      })
    );
  }
}

export default IngredientController;
