import express from "express";
import RecipeController from "./controllers/recipe.js";
import IngredientController from "./controllers/ingredient.js";

const router = express.Router();

RecipeController.setRoutes(router);
IngredientController.setRoutes(router);

export default router;
