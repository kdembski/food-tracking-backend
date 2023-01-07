import { IngredientCategoriesController } from "@/main/ingredients/controllers/ingredientCategories";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoryMapper } from "@/main/ingredients/mappers/ingredientCategory";

const ingredientCategoriesRouter = Router();
const ingredientCategoriesController = new IngredientCategoriesController();

ingredientCategoriesRouter.get("/", async (request, response) => {
  try {
    const ingredientCategories = await ingredientCategoriesController.getAll();
    response.json(
      ingredientCategories.map((category) =>
        new IngredientCategoryMapper().toDTO(category)
      )
    );
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientCategoriesRouter.get("/options", async (request, response) => {
  try {
    const ingredientOptions = await ingredientCategoriesController.getOptions();
    response.json(ingredientOptions);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientCategoriesRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredientCategory = await ingredientCategoriesController.getById(id);
    response.json(new IngredientCategoryMapper().toDTO(ingredientCategory));
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
