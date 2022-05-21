import express from "express";
import recipeController from "./controllers/recipe.js";
import ingredientController from "./controllers/ingredient.js";

const router = express.Router();

recipeController.setRoutes(router);
ingredientController.setRoutes(router);

export default router;
