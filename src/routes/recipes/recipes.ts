import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredientCollectionMapper } from "@/mappers/recipes/recipeIngredientsCollection";
import { ApiError } from "@/base/errors/models/apiError";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { Router } from "express";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipesService } from "@/main/recipes/services/recipes";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { TagsMapper } from "@/mappers/base/tags/tags";
import { ExtendedRecipeMapper } from "@/mappers/recipes/extendedRecipe";
import { Recipe } from "@/main/recipes/models/recipe";
import { RecipeIngredientsCollectionService } from "@/main/recipes/services/recipeIngredientsCollection";
import { RecipeValidator } from "@/main/recipes/validators/recipe";
import { RecipeIngredientsCollectionValidator } from "@/main/recipes/validators/recipeIngredientsCollection";

const recipesRouter = Router();
const recipesService = new RecipesService();
const recipeIngredientsCollectionService =
  new RecipeIngredientsCollectionService();

recipesRouter.get("/", async (request, response) => {
  try {
    const list = await recipesService.getList(request.query);
    response.json(list.toDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/tags", async (request, response) => {
  try {
    const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(
      request.query
    );

    const results = await recipesService.getTags({
      searchPhrase,
      tags,
      ingredientIds,
    });
    response.json(new TagsMapper().toDTO(results));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/suggestions", async (request, response) => {
  try {
    const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(
      request.query
    );

    const results = await recipesService.getNames({
      searchPhrase,
      tags,
      ingredientIds,
    });
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/options", async (request, response) => {
  try {
    const recipeOptions = await recipesService.getOptions();
    response.json(recipeOptions);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/count", async (request, response) => {
  try {
    const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(
      request.query
    );

    const results = await recipesService.getCount({
      searchPhrase,
      tags,
      ingredientIds,
    });
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const recipe = await recipesService.getById(id);
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
    new RecipeValidator().validate(recipe).throwErrors();

    const results = await recipesService.create(recipe);
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
    new RecipeValidator().validate(recipe).throwErrors();

    const results = await recipesService.update(recipe);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await recipesService.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/:id/ingredients", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const collection = await recipeIngredientsCollectionService.getByRecipeId(
      id
    );
    response.json(new RecipeIngredientCollectionMapper().toDTO(collection));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.post("/:id/ingredients", async (request, response) => {
  try {
    const recipeId = new RequestParamsHelper(request.params).id;
    const data: RecipeIngredientDTO[] = request.body;
    const collection = new RecipeIngredientCollectionMapper().toDomain(data);
    new RecipeIngredientsCollectionValidator()
      .validate(collection)
      .throwErrors();

    const results = await recipeIngredientsCollectionService.create(
      collection,
      recipeId
    );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.put("/:id/ingredients", async (request, response) => {
  try {
    const recipeId = new RequestParamsHelper(request.params).id;
    const data: RecipeIngredientDTO[] = request.body;
    const collection = new RecipeIngredientCollectionMapper().toDomain(data);
    new RecipeIngredientsCollectionValidator()
      .validate(collection)
      .throwErrors();

    const results = await recipeIngredientsCollectionService.update(
      collection,
      recipeId
    );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default recipesRouter;
