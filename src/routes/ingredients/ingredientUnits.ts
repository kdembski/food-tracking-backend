import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { IngredientUnitsController } from "@/main/ingredients/controllers/ingredientUnits";
import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";

const ingredientUnitsRouter = Router();
const ingredientUnitsController = new IngredientUnitsController();

ingredientUnitsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredient = await ingredientUnitsController.getById(id);
    response.json(ingredient.getDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientUnitsRouter.post("/", async (request, response) => {
  try {
    const data: IngredientUnitDTO = request.body;

    const results = await ingredientUnitsController.create(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientUnitsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: IngredientUnitDTO = request.body;
    data.id = id;

    const results = await ingredientUnitsController.update(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientUnitsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await ingredientUnitsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default ingredientUnitsRouter;
