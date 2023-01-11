import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipeIngredientsController } from "@/main/recipes/controllers/recipeIngredients";
import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { ExtendedRecipeIngredientMapper } from "@/main/recipes/mappers/extendedRecipeIngredient";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";

const recipeIngredientsRouter = Router();
const recipeIngredientsController = new RecipeIngredientsController();

recipeIngredientsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const recipeIngredient = await recipeIngredientsController.getById(id);
    const dto = new ExtendedRecipeIngredientMapper().toDTO(recipeIngredient);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipeIngredientsRouter.post("/", async (request, response) => {
  try {
    const data: RecipeIngredientDTO = request.body;
    const ingredient = new RecipeIngredient(data);

    const results = await recipeIngredientsController.create(ingredient);
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

    const results = await recipeIngredientsController.update(ingredient);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipeIngredientsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await recipeIngredientsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default recipeIngredientsRouter;
