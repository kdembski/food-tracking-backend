import { Router } from "express";
import IngredientWithUnitController from "../controllers/ingredient-with-unit.js";

const ingredientWithUnitRouter = Router();

ingredientWithUnitRouter.post("/", (request, response) => {
  const data = request.body;

  IngredientWithUnitController.addIngredientWithUnit(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

ingredientWithUnitRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;

  IngredientWithUnitController.updateIngredientWithUnit(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

ingredientWithUnitRouter.delete("/:id", (request, response) => {
  const id = request.params.id;

  IngredientWithUnitController.deleteIngredientWithUnit(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default ingredientWithUnitRouter;
