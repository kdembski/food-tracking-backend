import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipeIngredientsController } from "@/main/recipes/controllers/recipeIngredients";
import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";

const recipeIngredientsRouter = Router();
const recipeIngredientsController = new RecipeIngredientsController();

recipeIngredientsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const recipeIngredient = await recipeIngredientsController.getById(id);
    response.json(recipeIngredient.getDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

recipeIngredientsRouter.post("/", async (request, response) => {
  try {
    const data: RecipeIngredientDTO = request.body;

    const results = await recipeIngredientsController.create(data);
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

    const results = await recipeIngredientsController.update(data);
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
