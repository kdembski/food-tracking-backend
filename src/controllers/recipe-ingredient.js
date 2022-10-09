import recipeIngredientQueries from "../queries/recipe-ingredient.js";
import Database from "../config/database.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class RecipeIngredientController {
  static getRecipeIngredients(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(recipeIngredientQueries.selectByRecipeId, [id])
        .then((results) => resolve(convertKeysToCamelCase(results)))
        .catch((error) => reject(error));
    });
  }

  static addRecipeIngredient(data) {
    return Database.sendQuery(recipeIngredientQueries.insert, [
      data.recipeId,
      data.ingredientWithUnitId,
      data.amount,
    ]);
  }

  static updateRecipeIngredient(id, data) {
    return Database.sendQuery(recipeIngredientQueries.update, [
      data.recipeId,
      data.ingredientWithUnitId,
      data.amount,
      id,
    ]);
  }

  static deleteRecipeIngredient(id) {
    return Database.sendQuery(recipeIngredientQueries.delete, [id]);
  }
}

export default RecipeIngredientController;
