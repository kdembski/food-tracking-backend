import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { IngredientUnitsController } from "@/main/ingredients/controllers/ingredientUnits";
import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnitMapper } from "@/main/ingredients/mappers/ingredientUnit";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";

const ingredientUnitsRouter = Router();
const ingredientUnitsController = new IngredientUnitsController();

ingredientUnitsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredientUnit = await ingredientUnitsController.getById(id);
    const dto = new IngredientUnitMapper().toDTO(ingredientUnit);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientUnitsRouter.post("/", async (request, response) => {
  try {
    const data: IngredientUnitDTO = request.body;
    const unit = new IngredientUnit(data);

    const results = await ingredientUnitsController.create(unit);
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
    const unit = new IngredientUnit(data);

    const results = await ingredientUnitsController.update(unit);
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
