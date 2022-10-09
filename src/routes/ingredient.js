import { Router } from "express";
import IngredientController from "../controllers/ingredient.js";

const ingredientRouter = Router();

ingredientRouter.get("/", (request, response) => {
  IngredientController.getIngredientsListWithPagination(request)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

ingredientRouter.post("/", (request, response) => {
  const data = request.body;

  IngredientController.addIngredient(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

ingredientRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;

  IngredientController.updateIngredient(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

ingredientRouter.delete("/:id", (request, response) => {
  const id = request.params.id;

  IngredientController.deleteIngredient(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default ingredientRouter;
