import { Router } from "express";
import RecipeStepController from "../controllers/recipe-step.js";

const recipeStepRouter = Router();

recipeStepRouter.get("/:id/steps", (request, response) => {
  const id = request.params.id;

  RecipeStepController.getRecipeSteps(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeStepRouter.post("/steps", (request, response) => {
  const data = request.body;

  RecipeStepController.addRecipeStep(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeStepRouter.put("/steps/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;

  RecipeStepController.updateRecipeStep(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

recipeStepRouter.delete("/steps/:id", (request, response) => {
  const id = request.params.id;

  RecipeStepController.deleteRecipeStep(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default recipeStepRouter;
