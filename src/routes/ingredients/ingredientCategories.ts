import { IngredientCategoriesController } from "@/main/ingredients/controllers/ingredientCategories";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoryMapper } from "@/mappers/ingredients/ingredientCategory";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";

const ingredientCategoriesRouter = Router();
const ingredientCategoriesController = new IngredientCategoriesController();

ingredientCategoriesRouter.get("/", async (request, response) => {
  try {
    const list = await ingredientCategoriesController.getList(request.query);
    response.json(list.toDTO());
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
    const dto = new IngredientCategoryMapper().toDTO(ingredientCategory);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientCategoriesRouter.post("/", async (request, response) => {
  try {
    const data: IngredientCategoryDTO = request.body;
    const category = new IngredientCategory(data);

    const results = await ingredientCategoriesController.create(category);
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
    const category = new IngredientCategory(data);

    const results = await ingredientCategoriesController.update(category);
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
