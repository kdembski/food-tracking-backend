import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { UnitsService } from "@/main/ingredients/services/units";
import { UnitDTO } from "@/dtos/ingredients/unit";
import { UnitMapper } from "@/mappers/ingredients/unit";
import { Unit } from "@/main/ingredients/models/unit";
import { UnitValidator } from "@/main/ingredients/validators/unit";

const unitsRouter = Router();
const unitsService = new UnitsService();

unitsRouter.get("/", async (request, response) => {
  try {
    const list = await unitsService.getList(request.query);
    response.json(list.toDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.get("/options", async (request, response) => {
  try {
    const unitOptions = await unitsService.getOptions();
    response.json(unitOptions);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const unit = await unitsService.getById(id);
    const dto = new UnitMapper().toDTO(unit);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.post("/", async (request, response) => {
  try {
    const data: UnitDTO = request.body;
    const unit = new Unit(data);
    new UnitValidator().validate(unit).throwErrors();

    const results = await unitsService.create(unit);
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
    const unit = new Unit(data);
    new UnitValidator().validate(unit).throwErrors();

    const results = await unitsService.update(unit);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

unitsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await unitsService.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default unitsRouter;
