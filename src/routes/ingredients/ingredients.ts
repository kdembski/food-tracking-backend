import { RequestParamsHelper } from "@/helpers/requestParams";
import { ApiError } from "@/base/errors/models/apiError";
import { Router } from "express";
import { IngredientsService } from "@/main/ingredients/services/ingredients";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IngredientMapper } from "@/mappers/ingredients/ingredient";
import { IngredientValidator } from "@/main/ingredients/validators/ingredient";

const ingredientsRouter = Router();
const ingredientsService = new IngredientsService();

ingredientsRouter.get("/", async (request, response) => {
  try {
    const list = await ingredientsService.getList(request.query);
    response.json(list.toDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.get("/options", async (request, response) => {
  try {
    const options = await ingredientsService.getOptions();
    response.json(options);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredient = await ingredientsService.getById(id);
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
    new IngredientValidator().validate(ingredient).throwErrors();

    const results = await ingredientsService.create(ingredient);
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
    new IngredientValidator().validate(ingredient).throwErrors();

    const results = await ingredientsService.update(ingredient);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await ingredientsService.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default ingredientsRouter;
