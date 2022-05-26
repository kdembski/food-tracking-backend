import ingredientWithUnitModel from "../models/ingredient-with-unit.js";
import Database from "../config/database.js";

class IngredientWithUnitController {
  static setRoutes(router) {
    router.post("/ingredients/units", this.#addIngredientWithUnit);
    router.put("/ingredients/units/:id", this.#updateIngredientWithUnit);
    router.delete("/ingredients/units/:id", this.#deleteIngredientWithUnit);
  }

  static #addIngredientWithUnit(request, response) {
    const data = request.body;

    Database.sendQuery(ingredientWithUnitModel.insertIngredientWithUnit, [
      data.ingredientId,
      data.unitId,
      data.kcalPerUnit,
      data.isPrimary,
      data.converterToPrimary,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #updateIngredientWithUnit(request, response) {
    const id = request.params.id;
    const data = request.body;

    Database.sendQuery(ingredientWithUnitModel.updateIngredientWithUnit, [
      data.ingredientId,
      data.unitId,
      data.kcalPerUnit,
      data.isPrimary,
      data.converterToPrimary,
      id,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #deleteIngredientWithUnit(request, response) {
    const id = request.params.id;

    Database.sendQuery(ingredientWithUnitModel.deleteIngredientWithUnit, [id])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }
}

export default IngredientWithUnitController;
