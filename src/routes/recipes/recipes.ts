import { ExtendedRecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredientCollectionMapper } from "@/mappers/recipes/recipeIngredientsCollection";
import { ApiError } from "@/base/errors/models/apiError";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { Router } from "express";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipesController } from "@/main/recipes/controllers/recipes";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { TagsMapper } from "@/mappers/base/tags/tags";
import { ExtendedRecipeMapper } from "@/mappers/recipes/extendedRecipe";
import { Recipe } from "@/main/recipes/models/recipe";
import { RecipeIngredientsCollectionController } from "@/main/recipes/controllers/recipeIngredientsCollection";

const recipesRouter = Router();
const recipesController = new RecipesController();
const recipeIngredientsCollectionController =
  new RecipeIngredientsCollectionController();

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
    const { searchPhrase, tags } = new RequestQueryHelper(request.query);

    const results = await recipesController.getNames(searchPhrase, tags);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.get("/count", async (request, response) => {
  try {
    const { searchPhrase, tags } = new RequestQueryHelper(request.query);

    const results = await recipesController.getCount(searchPhrase, tags);
    response.json(results);
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

recipesRouter.get("/:id/ingredients", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const collection =
      await recipeIngredientsCollectionController.getByRecipeId(id);
    response.json(new RecipeIngredientCollectionMapper().toDTO(collection));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipesRouter.post("/:id/ingredients", async (request, response) => {
  try {
    const recipeId = new RequestParamsHelper(request.params).id;
    const data: ExtendedRecipeIngredientDTO[] = request.body;
    const collection = new RecipeIngredientCollectionMapper().toDomain(data);

    const results = await recipeIngredientsCollectionController.create(
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
    const data: ExtendedRecipeIngredientDTO[] = request.body;
    const collection = new RecipeIngredientCollectionMapper().toDomain(data);

    const results = await recipeIngredientsCollectionController.update(
      collection,
      recipeId
    );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default recipesRouter;
