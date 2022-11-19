import { Router } from "express";
import OrderedFoodController from "../controllers/ordered-food.js";

const orderedFoodRouter = Router();

orderedFoodRouter.get("/", (request, response) => {
  OrderedFoodController.getOrderedFoodListWithPagination(request)
    .then((list) => response.json(list))
    .catch((error) => response.status(400).send(error));
});

orderedFoodRouter.get("/tags", (request, response) => {
  OrderedFoodController.getOrderedFoodTags(request)
    .then((tags) => response.json({ orderedFoodTags: tags }))
    .catch((error) => response.status(400).send(error));
});

orderedFoodRouter.get("/:id", (request, response) => {
  const id = request.params.id;

  OrderedFoodController.getOrderedFoodById(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

orderedFoodRouter.post("/", (request, response) => {
  const data = request.body;

  OrderedFoodController.addOrderedFood(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

orderedFoodRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;

  OrderedFoodController.updateOrderedFood(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default orderedFoodRouter;
