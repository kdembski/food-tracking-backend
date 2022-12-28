import { IngredientCategoriesController } from "@/main/ingredients/controllers/ingredientCategories";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { IngredientCategoryDTO } from "@/interfaces/ingredients/ingredientCategories";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";

const ingredientCategoriesRouter = Router();
const ingredientCategoriesController = new IngredientCategoriesController();

ingredientCategoriesRouter.get("/", async (request, response) => {
  try {
    const ingredients = await ingredientCategoriesController.getAll();
    response.json(ingredients.map((ingredient) => ingredient.getDTO()));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientCategoriesRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredient = await ingredientCategoriesController.getById(id);
    response.json(ingredient.getDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientCategoriesRouter.post("/", async (request, response) => {
  try {
    const data: IngredientCategoryDTO = request.body;

    const results = await ingredientCategoriesController.create(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientCategoriesRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: IngredientCategoryDTO = request.body;
    data.id = id;

    const results = await ingredientCategoriesController.update(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientCategoriesRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await ingredientCategoriesController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default ingredientCategoriesRouter;
