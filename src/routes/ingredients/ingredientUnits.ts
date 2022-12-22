import { IngredientUnitsController } from "@/controllers/ingredients/ingredientUnits";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { IngredientUnitDTO } from "@/interfaces/ingredients/ingredientUnits";
import { ApiError } from "@/models/errors/apiError";
import { Router } from "express";

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
