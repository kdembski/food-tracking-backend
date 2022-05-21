import recipeModel from "../models/recipe.js";
import getListWithPagination from "../utils/get-list-with-pagination.js";
import db from "../config/database.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class RecipeController {
  setRoutes(router) {
    router.get("/recipes", this.#getRecipesListWithPagination);
    router.get("/recipes/:id", this.#getRecipeById);
    router.post("/recipes", this.#addRecipe);
    router.put("/recipes/:id", this.#updateRecipe);
    router.delete("/recipes/:id", this.#deleteRecipe);
  }

  #getRecipesListWithPagination(request, response) {
    getListWithPagination(
      recipeModel.selectRecipesList,
      recipeModel.selectRecipesCount,
      request,
      response
    );
  }

  #getRecipeById(request, response) {
    const id = request.params.id;

    db.sendQuery(
      recipeModel.selectRecipeById,
      (error, results) => {
        error
          ? response.send(error)
          : response.json(convertKeysToCamelCase(results[0]));
      },
      [id]
    );
  }

  #addRecipe(request, response) {
    const data = request.body;

    db.sendQuery(
      recipeModel.insertRecipe,
      (error, results) => {
        error ? response.send(error) : response.json(results);
      },
      [data.recipeName, data.preparationTime, data.tags]
    );
  }

  #updateRecipe(request, response) {
    const id = request.params.id;
    const data = request.body;

    db.sendQuery(
      recipeModel.updateRecipe,
      (error, results) => {
        error ? response.send(error) : response.json(results);
      },
      [data.recipeName, data.preparationTime, data.tags, id]
    );
  }

  #deleteRecipe(request, response) {
    const id = request.params.id;

    db.sendQuery(
      recipeModel.deleteRecipe,
      (error, results) => {
        error ? response.send(error) : response.json(results);
      },
      [id]
    );
  }
}

export default new RecipeController();
