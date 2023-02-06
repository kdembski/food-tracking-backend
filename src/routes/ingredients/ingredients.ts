import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { IngredientsController } from "@/main/ingredients/controllers/ingredients";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IngredientMapper } from "@/mappers/ingredients/ingredient";

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
    const dto = new IngredientMapper().toDTO(ingredient);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.post("/", async (request, response) => {
  try {
    const data: IngredientDTO = request.body;
    const ingredient = new IngredientMapper().toDomain(data);

    const results = await ingredientsController.create(ingredient);
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
    const ingredient = new IngredientMapper().toDomain(data);

    const results = await ingredientsController.update(ingredient);
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
