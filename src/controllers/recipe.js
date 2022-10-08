import recipeModel from "../models/recipe.js";
import Database from "../config/database.js";
import { getFliterByTagsQuery } from "../utils/query-helpers.js";
import { getRequestQueryParameters } from "../utils/request-helpers.js";
import { getListWithPagination } from "../utils/list.js";
import { getTagsWithCount } from "../utils/tags.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class RecipeController {
  static setRoutes(router) {
    router.get("/recipes", this.#getRecipesListWithPagination);
    router.get("/recipes/tags", this.#getRecipesListTags);
    router.get("/recipes/suggestions", this.#getRecipesListNames);
    router.get("/recipes/count", this.#getRecipesListCount);
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
      .catch((error) => {
        response.send(error);
        console.log(error);
      });
  }

  static #getRecipesListTags(request, response) {
    getTagsWithCount(request, recipeModel.selectRecipesTags)
      .then((results) => response.json({ recipesTags: results }))
      .catch((error) => {
        response.send(error);
        console.log(error);
      });
  }

  static #getRecipesListNames = (request, response) => {
    const { searchPhrase, tags } = getRequestQueryParameters(request);

    const selectRecipesNames =
      recipeModel.selectRecipesNames + "\n" + getFliterByTagsQuery(tags);

    Database.sendQuery(selectRecipesNames, [searchPhrase])
      .then((results) =>
        response.json(results.map((item) => item["recipe_name"]))
      )
      .catch((error) => response.send(error));
  };

  static #getRecipesListCount = (request, response) => {
    const { searchPhrase } = getRequestQueryParameters(request);

    Database.sendQuery(recipeModel.selectRecipesCount, [searchPhrase])
      .then((results) => response.json(parseInt(results[0]["COUNT(*)"])))
      .catch((error) => response.send(error));
  };

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
