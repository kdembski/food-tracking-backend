import { Router } from "express";
import { OrderedFoodController } from "../main/ordered-food/controllers/orderedFood";
import { ApiError } from "@/base/errors/models/apiError";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";

const orderedFoodRouter = Router();
const orderedFoodController = new OrderedFoodController();

orderedFoodRouter.get("/", async (request, response) => {
  try {
    const list = await orderedFoodController.getList(request.query);
    response.json(list.getListDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

orderedFoodRouter.get("/tags", async (request, response) => {
  try {
    const tags = await orderedFoodController.getTags(request.query);
    response.json(tags);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

orderedFoodRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const orderedFood = await orderedFoodController.getById(id);
    response.json(orderedFood.getDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

orderedFoodRouter.post("/", async (request, response) => {
  try {
    const data: OrderedFoodDTO = request.body;

    const results = await orderedFoodController.create(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

orderedFoodRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: OrderedFoodDTO = request.body;
    data.id = id;

    const results = await orderedFoodController.update(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default orderedFoodRouter;
