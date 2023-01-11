import { ApiError } from "@/base/errors/models/apiError";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { Router } from "express";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipeIngredientsController } from "@/main/recipes/controllers/recipeIngredients";
import { RecipesController } from "@/main/recipes/controllers/recipes";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { TagsMapper } from "@/base/tags/mappers/tags";
import { ExtendedRecipeIngredientMapper } from "@/main/recipes/mappers/extendedRecipeIngredient";
import { ExtendedRecipeMapper } from "@/main/recipes/mappers/extendedRecipe";
import { Recipe } from "@/main/recipes/models/recipe";

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
    const dtos = ingredients.map((ingredient) =>
      response.json(new ExtendedRecipeIngredientMapper().toDTO(ingredient))
    );
    response.json(dtos);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const recipe = await recipesController.getById(id);
    const dto = new ExtendedRecipeMapper().toDTO(recipe);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.post("/", async (request, response) => {
  try {
    const data: RecipeDTO = request.body;
    const recipe = new Recipe(data);

    const results = await recipesController.create(recipe);
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
    const recipe = new Recipe(data);

    const results = await recipesController.update(recipe);
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
