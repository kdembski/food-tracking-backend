import recipeModel from "../models/recipe.js";
import getListWithPagination from "../utils/get-list-with-pagination.js";
import Database from "../config/database.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import getListTags from "../utils/get-list-tags.js";

class RecipeController {
  static setRoutes(router) {
    router.get("/recipes", this.#getRecipesListWithPagination);
    router.get("/recipes/tags", this.#getRecipesListTags);
    router.get("/recipes/:id", this.#getRecipeById);
    router.post("/recipes", this.#addRecipe);
    router.put("/recipes/:id", this.#updateRecipe);
    router.delete("/recipes/:id", this.#deleteRecipe);
  }

  static #getRecipesListWithPagination(request, response) {
    getListWithPagination(
      recipeModel.selectRecipesList,
      recipeModel.selectRecipesCount,
      request
    )
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #getRecipesListTags(request, response) {
    getListTags(request, recipeModel.selectRecipesTags)
      .then((results) => response.json({ recipesTags: results }))
      .catch((error) => response.send(error));
  }

  static #getRecipeById(request, response) {
    const id = request.params.id;

    Database.sendQuery(recipeModel.selectRecipeById, [id])
      .then((results) => response.json(convertKeysToCamelCase(results[0])))
      .catch((error) => response.send(error));
  }

  static #addRecipe(request, response) {
    const data = request.body;

    Database.sendQuery(recipeModel.insertRecipe, [
      data.recipeName,
      data.preparationTime,
      data.tags,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #updateRecipe(request, response) {
    const id = request.params.id;
    const data = request.body;

    Database.sendQuery(recipeModel.updateRecipe, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      id,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #deleteRecipe(request, response) {
    const id = request.params.id;

    Database.sendQuery(recipeModel.deleteRecipe, [id])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }
}

export default RecipeController;
