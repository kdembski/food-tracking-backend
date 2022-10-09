import recipeStepQueries from "../queries/recipe-step.js";
import Database from "../config/database.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class RecipeStepController {
  static getRecipeSteps(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(recipeStepQueries.selectByRecipeId, [id])
        .then((results) => resolve(convertKeysToCamelCase(results)))
        .catch((error) => reject(error));
    });
  }

  static addRecipeStep(data) {
    return Database.sendQuery(recipeStepQueries.insert, [
      data.recipeId,
      data.stepNumber,
      data.stepInstruction,
    ]);
  }

  static updateRecipeStep(id, data) {
    return Database.sendQuery(recipeStepQueries.update, [
      data.recipeId,
      data.stepNumber,
      data.stepInstruction,
      id,
    ]);
  }

  static deleteRecipeStep(id) {
    return Database.sendQuery(recipeStepQueries.delete, [id]);
  }
}

export default RecipeStepController;
