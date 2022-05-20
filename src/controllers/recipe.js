import recipeModel from "../models/recipe.js";
import getListWithPagination from "../helpers/get-list-with-pagination.js";
import { sendQuery } from "../config/database.js";
import { convertKeysToCamelCase } from "../helpers/convert-keys-to-camel-case.js";

export const getRecipesListWithPagination = (request, response) => {
  getListWithPagination(
    recipeModel.selectRecipesList,
    recipeModel.selectRecipesCount,
    request,
    response
  );
};

export const getRecipeById = (request, response) => {
  const id = request.params.id;

  sendQuery(
    recipeModel.selectRecipeById,
    (error, results) => {
      if (error) {
        response.send(error);
        return;
      }
      response.json(convertKeysToCamelCase(results[0]));
    },
    [id]
  );
};

export const addRecipe = (request, response) => {
  const data = request.body;

  sendQuery(
    recipeModel.insertRecipe,
    (error, results) => {
      if (error) {
        response.send(error);
        return;
      }
      response.json(results);
    },
    [data.recipeName, data.preparationTime, data.tags]
  );
};

export const updateRecipe = (request, response) => {
  const id = request.params.id;
  const data = request.body;

  sendQuery(
    recipeModel.updateRecipe,
    (error, results) => {
      if (error) {
        response.send(error);
        return;
      }
      response.json(results);
    },
    [data.recipeName, data.preparationTime, data.tags, id]
  );
};

export const deleteRecipe = (request, response) => {
  const id = request.params.id;

  sendQuery(
    recipeModel.deleteRecipe,
    (error, results) => {
      if (error) {
        response.send(error);
        return;
      }
      response.json(results);
    },
    [id]
  );
};
