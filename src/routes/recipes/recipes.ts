import { ApiError } from "@/base/errors/models/apiError";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { Router } from "express";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipeIngredientsController } from "@/main/recipes/controllers/recipeIngredients";
import { RecipesController } from "@/main/recipes/controllers/recipes";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { TagsMapper } from "@/base/tags/mappers/tags";
import { RecipeIngredientMapper } from "@/main/recipes/mappers/recipeIngredient";
import { RecipeMapper } from "@/main/recipes/mappers/recipe";

const recipesRouter = Router();
const recipesController = new RecipesController();
const recipeIngredientsController = new RecipeIngredientsController();

recipesRouter.get("/", async (request, response) => {
  try {
    const list = await recipesController.getList(request.query);
    response.json(list.toDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/tags", async (request, response) => {
  try {
    const tags = await recipesController.getTags(request.query);
    response.json(new TagsMapper().toDTO(tags));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/suggestions", async (request, response) => {
  try {
    const requestQuery = new RequestQueryHelper(request.query);
    const searchPhrase = requestQuery.searchPhrase;
    const tags = requestQuery.tags;

    const results = await recipesController.getNames(searchPhrase, tags);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/count", async (request, response) => {
  try {
    const requestQuery = new RequestQueryHelper(request.query);
    const searchPhrase = requestQuery.searchPhrase;

    const results = await recipesController.getCount(searchPhrase);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/:id/ingredients", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredients = await recipeIngredientsController.getByRecipeId(id);
    response.json(
      ingredients.map((ingredient) =>
        response.json(new RecipeIngredientMapper().toDTO(ingredient))
      )
    );
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const recipe = await recipesController.getById(id);
    response.json(new RecipeMapper().toDTO(recipe));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.post("/", async (request, response) => {
  try {
    const data: RecipeDTO = request.body;

    const results = await recipesController.create(data);
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

    const results = await recipesController.update(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await recipesController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default recipesRouter;
