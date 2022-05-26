import express from "express";
import RecipeController from "./controllers/recipe.js";
import IngredientController from "./controllers/ingredient.js";
import IngredientWithUnitController from "./controllers/ingredient-with-unit.js";

const router = express.Router();

RecipeController.setRoutes(router);
IngredientController.setRoutes(router);
IngredientWithUnitController.setRoutes(router);

export default router;
