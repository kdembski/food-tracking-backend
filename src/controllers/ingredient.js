import ingredientQueries from "../queries/ingredient.js";
import IngredientWithUnitController from "./ingredient-with-unit.js";
import Database from "../config/database.js";
import { getListWithPagination } from "../utils/list.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class IngredientController {
  static getIngredientsListWithPagination(request) {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await getListWithPagination(
          ingredientQueries.select,
          ingredientQueries.selectCount,
          request
        );
        await IngredientController.setUnitsForIngredients(list.data);
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  }

  static setUnitsForIngredients(ingredients) {
    return Promise.all(
      ingredients.map(async (ingredient) => {
        const units =
          await IngredientWithUnitController.getIngredientsWithUnitsByIngredientId(
            ingredient.id
          );
        ingredient.units = convertKeysToCamelCase(units);
      })
    );
  }

  static addIngredient(data) {
    return Database.sendQuery(ingredientModel.insert, [data.ingredientName]);
  }

  static updateIngredient(id, data) {
    return Database.sendQuery(ingredientModel.updateIngredient, [
      data.ingredientName,
      id,
    ]);
  }

  static deleteIngredient(id) {
    return Database.sendQuery(ingredientModel.deleteIngredient, [id]);
  }
}

export default IngredientController;
