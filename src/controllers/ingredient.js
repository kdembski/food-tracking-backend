import ingredientModel from "../models/ingredient.js";
import Database from "../config/database.js";
import { getListWithPagination } from "../utils/list.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class IngredientController {
  static setRoutes(router) {
    router.get("/ingredients", this.#getIngredientsListWithPagination);
    router.post("/ingredients", this.#addIngredient);
    router.put("/ingredients/:id", this.#updateIngredient);
    router.delete("/ingredients/:id", this.#deleteIngredient);
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

  static #addIngredient(request, response) {
    const data = request.body;

    Database.sendQuery(ingredientModel.insertIngredient, [data.ingredientName])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #updateIngredient(request, response) {
    const id = request.params.id;
    const data = request.body;

    Database.sendQuery(ingredientModel.updateIngredient, [
      data.ingredientName,
      id,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #deleteIngredient(request, response) {
    const id = request.params.id;

    Database.sendQuery(ingredientModel.deleteIngredient, [id])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }
}

export default IngredientController;
