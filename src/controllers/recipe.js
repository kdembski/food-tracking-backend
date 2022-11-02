import recipeQueries from "../queries/recipe.js";
import Database from "../config/database.js";
import { getQueryToFiltersByTags } from "../utils/query-helpers.js";
import { getListWithPagination } from "../utils/list.js";
import { getTagsWithCount } from "../utils/tags.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import { isEqual, startOfMonth, endOfMonth } from "date-fns";
import CalendarController from "./calendar/index.js";

class RecipeController {
  static getRecipesListWithPagination(request) {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await getListWithPagination(
          recipeQueries.select,
          recipeQueries.selectCount,
          request
        );

        for (let i = 0; i < list.data.length; i++) {
          const recipe = list.data[i];
          recipe.cookedDatesInCurrentMonth =
            await this.getRecipeCookedDateInCurrentMonth(recipe.id);
        }

        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getRecipeCookedDateInCurrentMonth(recipeId) {
    const today = new Date();
    return CalendarController.getRecipeCookedDates(
      recipeId,
      startOfMonth(today),
      endOfMonth(today)
    );
  }

  static getRecipesTags(request) {
    return getTagsWithCount(request, recipeQueries.selectTags);
  }

  static getRecipesNames(searchPhrase, tags) {
    const queryToSelectRecipesNames =
      recipeQueries.selectNames + "\n" + getQueryToFiltersByTags(tags);

    return new Promise((resolve, reject) => {
      Database.sendQuery(queryToSelectRecipesNames, [searchPhrase])
        .then((results) => resolve(results.map((item) => item["recipe_name"])))
        .catch((error) => reject(error));
    });
  }

  static getRecipesCount(searchPhrase) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(recipeQueries.selectCount, [searchPhrase])
        .then((results) => resolve(parseInt(results[0]["COUNT(*)"])))
        .catch((error) => reject(error));
    });
  }

  static getRecipeById(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(recipeQueries.selectById, [id])
        .then((results) => resolve(convertKeysToCamelCase(results[0])))
        .catch((error) => reject(error));
    });
  }

  static addRecipe(data) {
    return Database.sendQuery(recipeQueries.insert, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      data.cookidooLink,
    ]);
  }

  static updateRecipe(id, data) {
    return Database.sendQuery(recipeQueries.update, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      data.cookedDate,
      data.cookidooLink,
      id,
    ]);
  }

  static deleteRecipe(id) {
    return Database.sendQuery(recipeQueries.delete, [id]);
  }

  static updateRecipeCookedDate(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const recipe = await this.getRecipeById(id);
        const lastDate = await CalendarController.getRecipeLastCookedDate(id);

        if (isEqual(lastDate, recipe.cookedDate)) {
          return resolve();
        }

        recipe.cookedDate = null;
        if (lastDate) {
          recipe.cookedDate = lastDate;
        }

        await this.updateRecipe(id, recipe);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default RecipeController;
