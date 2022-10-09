import recipeQueries from "../queries/recipe.js";
import Database from "../config/database.js";
import { getQueryToFiltersByTags } from "../utils/query-helpers.js";
import { getListWithPagination } from "../utils/list.js";
import { getTagsWithCount } from "../utils/tags.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class RecipeController {
  static getRecipesListWithPagination(request) {
    return getListWithPagination(
      recipeQueries.select,
      recipeQueries.selectCount,
      request
    );
  }

  static getRecipesTags(request) {
    return getTagsWithCount(request, recipeQueries.selectTags);
  }

  static getRecipesNames = (searchPhrase, tags) => {
    const queryToSelectRecipesNames =
      recipeQueries.selectNames + "\n" + getQueryToFiltersByTags(tags);

    return new Promise((resolve, reject) => {
      Database.sendQuery(queryToSelectRecipesNames, [searchPhrase])
        .then((results) => resolve(results.map((item) => item["recipe_name"])))
        .catch((error) => reject(error));
    });
  };

  static getRecipesCount = (searchPhrase) => {
    return new Promise((resolve, reject) => {
      Database.sendQuery(recipeQueries.selectCount, [searchPhrase])
        .then((results) => resolve(parseInt(results[0]["COUNT(*)"])))
        .catch((error) => reject(error));
    });
  };

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
    ]);
  }

  static updateRecipe(id, data) {
    return Database.sendQuery(recipeQueries.update, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      id,
    ]);
  }

  static deleteRecipe(id) {
    return Database.sendQuery(recipeQueries.delete, [id]);
  }
}

export default RecipeController;
