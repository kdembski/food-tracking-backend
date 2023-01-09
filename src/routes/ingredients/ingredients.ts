import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { IngredientsController } from "@/main/ingredients/controllers/ingredients";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IngredientMapper } from "@/main/ingredients/mappers/ingredient";

const ingredientsRouter = Router();
const ingredientsController = new IngredientsController();

ingredientsRouter.get("/", async (request, response) => {
  try {
    const list = await ingredientsController.getList(request.query);
    response.json(list.toDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.get("/options", async (request, response) => {
  try {
    const options = await ingredientsController.getOptions();
    response.json(options);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredient = await ingredientsController.getById(id);
    response.json(new IngredientMapper().toDTO(ingredient));
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.post("/", async (request, response) => {
  try {
    const data: IngredientDTO = request.body;

    const results = await ingredientsController.create(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: IngredientDTO = request.body;
    data.id = id;

    const results = await ingredientsController.update(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await ingredientsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default ingredientsRouter;
