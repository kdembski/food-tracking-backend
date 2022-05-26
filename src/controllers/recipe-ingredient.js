import recipeIngredientModel from "../models/recipe-ingredient.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import Database from "../config/database.js";

class RecipeIngredientController {
  static setRoutes(router) {
    router.get("/recipes/:id/ingredients", this.#getRecipeIngredients);
    router.post("/recipes/ingredients", this.#addRecipeIngredient);
    router.put("/recipes/ingredients/:id", this.#updateRecipeIngredient);
    router.delete("/recipes/ingredients/:id", this.#deleteRecipeIngredient);
  }

  static #getRecipeIngredients(request, response) {
    const id = request.params.id;

    Database.sendQuery(
      recipeIngredientModel.selectRecipeIngredientsByRecipeId,
      [id]
    )
      .then((results) => response.json(convertKeysToCamelCase(results)))
      .catch((error) => response.send(error));
  }

  static #addRecipeIngredient(request, response) {
    const data = request.body;

    Database.sendQuery(recipeIngredientModel.insertRecipeIngredient, [
      data.recipeId,
      data.ingredientWithUnitId,
      data.amount,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #updateRecipeIngredient(request, response) {
    const id = request.params.id;
    const data = request.body;

    Database.sendQuery(recipeIngredientModel.updateRecipeIngredient, [
      data.recipeId,
      data.ingredientWithUnitId,
      data.amount,
      id,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #deleteRecipeIngredient(request, response) {
    const id = request.params.id;

    Database.sendQuery(recipeIngredientModel.deleteRecipeIngredient, [id])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }
}

export default RecipeIngredientController;
