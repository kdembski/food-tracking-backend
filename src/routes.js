import express from "express";
import authentication from "./middlewares/authentication.js";
import RecipeController from "./controllers/recipe.js";
import IngredientController from "./controllers/ingredient.js";
import IngredientWithUnitController from "./controllers/ingredient-with-unit.js";
import RecipeIngredientController from "./controllers/recipe-ingredient.js";
import RecipeStepController from "./controllers/recipe-step.js";
import UserController from "./controllers/user.js";
import OrderedFoodController from "./controllers/ordered-food.js";
import CalendarController from "./controllers/calendar.js";

const router = express.Router();
router.all("*", authentication);

RecipeController.setRoutes(router);
IngredientController.setRoutes(router);
IngredientWithUnitController.setRoutes(router);
RecipeIngredientController.setRoutes(router);
RecipeStepController.setRoutes(router);
UserController.setRoutes(router);
OrderedFoodController.setRoutes(router);
CalendarController.setRoutes(router);

export default router;
