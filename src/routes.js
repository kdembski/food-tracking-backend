import express from "express";
import authentication from "./middleware/authentication.js";
import RecipeController from "./controllers/recipe.js";
import IngredientController from "./controllers/ingredient.js";
import IngredientWithUnitController from "./controllers/ingredient-with-unit.js";
import RecipeIngredientController from "./controllers/recipe-ingredient.js";
import RecipeStepController from "./controllers/recipe-step.js";
import UserController from "./controllers/user.js";

const router = express.Router();
router.all("*", authentication);

RecipeController.setRoutes(router);
IngredientController.setRoutes(router);
IngredientWithUnitController.setRoutes(router);
RecipeIngredientController.setRoutes(router);
RecipeStepController.setRoutes(router);
UserController.setRoutes(router);

export default router;
