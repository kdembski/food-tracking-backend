import { Router } from "express";
import RecipeController from "../controllers/recipe.js";
import { getRequestQueryParameters } from "../utils/request-helpers.js";

const recipeRouter = Router();

recipeRouter.get("/", (request, response) => {
  RecipeController.getRecipesListWithPagination(request)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeRouter.get("/tags", (request, response) => {
  RecipeController.getRecipesListTags(request)
    .then((results) => response.json({ recipesTags: results }))
    .catch((error) => response.status(400).send(error));
});

recipeRouter.get("/suggestions", (request, response) => {
  const { searchPhrase, tags } = getRequestQueryParameters(request);

  RecipeController.getRecipesListNames(searchPhrase, tags)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeRouter.get("/count", (request, response) => {
  const { searchPhrase } = getRequestQueryParameters(request);

  RecipeController.getRecipesListCount(searchPhrase)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeRouter.get("/:id", (request, response) => {
  const id = request.params.id;

  RecipeController.getRecipeById(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeRouter.post("/", (request, response) => {
  const data = request.body;

  RecipeController.addRecipe(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;

  RecipeController.updateRecipe(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeRouter.delete("/:id", (request, response) => {
  const id = request.params.id;

  RecipeController.deleteRecipe(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default recipeRouter;
