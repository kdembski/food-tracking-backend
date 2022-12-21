import { IngredientsController } from "@/controllers/ingredients/ingredients";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { IngredientDTO } from "@/interfaces/ingredients/ingredients";
import { ApiError } from "@/models/errors/apiError";
import { Router } from "express";

const ingredientsRouter = Router();
const ingredientsController = new IngredientsController();

ingredientsRouter.get("/", async (request, response) => {
  try {
    const list = await ingredientsController.getList(request.query);
    response.json(list.getListDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

ingredientsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const ingredient = await ingredientsController.getById(id);
    response.json(ingredient.getDTO());
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
