import { ApiError } from "@/models/errors/apiError";
import { RecipeDTO } from "@/interfaces/recipes/recipes";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { Router } from "express";
import { RecipesController } from "@/controllers/recipes/recipes";
import { RequestParamsHelper } from "@/helpers/requestParams";

const recipesRouter = Router();
const recipesController = new RecipesController();

recipesRouter.get("/", async (request, response) => {
  try {
    const list = await recipesController.getRecipesList(request.query);
    response.json(list.getListDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/tags", async (request, response) => {
  try {
    const tags = await recipesController.getRecipesTags(request.query);
    response.json(tags);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/suggestions", async (request, response) => {
  try {
    const requestQuery = new RequestQueryHelper(request.query);
    const searchPhrase = requestQuery.searchPhrase;
    const tags = requestQuery.tags;

    const results = await recipesController.getRecipesNames(searchPhrase, tags);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/count", async (request, response) => {
  try {
    const requestQuery = new RequestQueryHelper(request.query);
    const searchPhrase = requestQuery.searchPhrase;

    const results = await recipesController.getRecipesCount(searchPhrase);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const recipe = await recipesController.getRecipeById(id);
    response.json(recipe.getDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.post("/", async (request, response) => {
  try {
    const data: RecipeDTO = request.body;

    const results = await recipesController.createRecipe(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: RecipeDTO = request.body;
    data.id = id;

    const results = await recipesController.updateRecipe(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await recipesController.deleteRecipe(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default recipesRouter;