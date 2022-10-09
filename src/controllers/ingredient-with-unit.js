import ingredientWithUnitQueries from "../queries/ingredient-with-unit.js";
import Database from "../config/database.js";

class IngredientWithUnitController {
  static getIngredientsWithUnitsByIngredientId(id) {
    return Database.sendQuery(ingredientWithUnitQueries.selectByIngredientId, [
      id,
    ]);
  }

  static addIngredientWithUnit(data) {
    return Database.sendQuery(ingredientWithUnitQueries.insert, [
      data.ingredientId,
      data.unitId,
      data.kcalPerUnit,
      data.isPrimary,
      data.converterToPrimary,
    ]);
  }

  static updateIngredientWithUnit(id, data) {
    return Database.sendQuery(ingredientWithUnitQueries.update, [
      data.ingredientId,
      data.unitId,
      data.kcalPerUnit,
      data.isPrimary,
      data.converterToPrimary,
      id,
    ]);
  }

  static deleteIngredientWithUnit(id) {
    return Database.sendQuery(ingredientWithUnitQueries.delete, [id]);
  }
}

export default IngredientWithUnitController;
