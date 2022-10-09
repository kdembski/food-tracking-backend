import { Router } from "express";
import RecipeIngredientController from "../controllers/recipe-ingredient.js";

const recipeIngredientRouter = Router();

recipeIngredientRouter.get("/:id/ingredients", (request, response) => {
  const id = request.params.id;

  RecipeIngredientController.getRecipeIngredients(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeIngredientRouter.post("/ingredients", (request, response) => {
  const data = request.body;

  RecipeIngredientController.addRecipeIngredient(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeIngredientRouter.put("/ingredients/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;

  RecipeIngredientController.updateRecipeIngredient(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeIngredientRouter.delete("/ingredients/:id", (request, response) => {
  const id = request.params.id;

  RecipeIngredientController.deleteRecipeIngredient(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default recipeIngredientRouter;
