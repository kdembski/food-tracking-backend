import recipeStepModel from "../models/recipe-step.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import Database from "../config/database.js";

class RecipeStepController {
  static setRoutes(router) {
    router.get("/recipes/:id/steps", this.#getRecipeSteps);
    router.post("/recipes/steps", this.#addRecipeStep);
    router.put("/recipes/steps/:id", this.#updateRecipeStep);
    router.delete("/recipes/steps/:id", this.#deleteRecipeStep);
  }

  static #getRecipeSteps(request, response) {
    const id = request.params.id;

    Database.sendQuery(recipeStepModel.selectRecipeStepsByRecipeId, [id])
      .then((results) => response.json(convertKeysToCamelCase(results)))
      .catch((error) => response.send(error));
  }

  static #addRecipeStep(request, response) {
    const data = request.body;

    Database.sendQuery(recipeStepModel.insertRecipeStep, [
      data.recipeId,
      data.stepNumber,
      data.stepInstruction,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #updateRecipeStep(request, response) {
    const id = request.params.id;
    const data = request.body;

    Database.sendQuery(recipeStepModel.updateRecipeStep, [
      data.recipeId,
      data.stepNumber,
      data.stepInstruction,
      id,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #deleteRecipeStep(request, response) {
    const id = request.params.id;

    Database.sendQuery(recipeStepModel.deleteRecipeStep, [id])
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }
}

export default RecipeStepController;
