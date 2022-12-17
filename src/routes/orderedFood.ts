import { OrderedFoodDTO } from "@/interfaces/orderedFood";
import { Router } from "express";
import { OrderedFoodController } from "../controllers/orderedFood";
import { ApiError } from "@/models/errors/apiError";
import { RequestParamsHelper } from "@/helpers/requestParams";

const orderedFoodRouter = Router();
const orderedFoodController = new OrderedFoodController();

orderedFoodRouter.get("/", async (request, response) => {
  try {
    const list = await orderedFoodController.getOrderedFoodList(request.query);
    response.json(list.getListDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

orderedFoodRouter.get("/tags", async (request, response) => {
  try {
    const tags = await orderedFoodController.getOrderedFoodTags(request.query);
    response.json(tags);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

orderedFoodRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const orderedFood = await orderedFoodController.getOrderedFoodById(id);
    response.json(orderedFood.getDTO());
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

orderedFoodRouter.post("/", async (request, response) => {
  try {
    const data: OrderedFoodDTO = request.body;

    const results = await orderedFoodController.createOrderedFood(data);
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

    const results = await orderedFoodController.updateOrderedFood(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default orderedFoodRouter;
