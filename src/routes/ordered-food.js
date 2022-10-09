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

export default orderedFoodRouter;
