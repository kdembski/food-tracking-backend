import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { UnitsController } from "@/main/ingredients/controllers/units";
import { UnitDTO } from "@/interfaces/ingredients/units";

const unitsRouter = Router();
const unitsController = new UnitsController();

unitsRouter.get("/", async (request, response) => {
  try {
    const units = await unitsController.getAll();
    response.json(units.map((unit) => unit.getDTO()));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.get("/options", async (request, response) => {
  try {
    const unitOptions = await unitsController.getOptions();
    response.json(unitOptions);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const unit = await unitsController.getById(id);
    response.json(unit.getDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.post("/", async (request, response) => {
  try {
    const data: UnitDTO = request.body;

    const results = await unitsController.create(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: UnitDTO = request.body;
    data.id = id;

    const results = await unitsController.update(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await unitsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default unitsRouter;