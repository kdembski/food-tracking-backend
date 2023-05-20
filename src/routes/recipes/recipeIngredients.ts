import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipeIngredientsService } from "@/main/recipes/services/recipeIngredients";
import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { RecipeIngredientMapper } from "@/mappers/recipes/recipeIngredient";
import { RequestQueryHelper } from "@/helpers/requestQuery";

const recipeIngredientsRouter = Router();
const recipeIngredientsService = new RecipeIngredientsService();

recipeIngredientsRouter.get("/options", async (request, response) => {
  try {
    const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(
      request.query
    );

    const options = await recipeIngredientsService.getFilterOptions({
      searchPhrase,
      tags,
      ingredientIds,
    });
    response.json(options);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipeIngredientsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const recipeIngredient = await recipeIngredientsService.getById(id);
    const dto = new RecipeIngredientMapper().toDTO(recipeIngredient);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipeIngredientsRouter.post("/", async (request, response) => {
  try {
    const data: RecipeIngredientDTO = request.body;
    const ingredient = new RecipeIngredient(data);

    const results = await recipeIngredientsService.create(ingredient);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipeIngredientsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: RecipeIngredientDTO = request.body;
    data.id = id;
    const ingredient = new RecipeIngredient(data);

    const results = await recipeIngredientsService.update(ingredient);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipeIngredientsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await recipeIngredientsService.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default recipeIngredientsRouter;
