import { Router } from "express";
import calendarRouter from "./calendar.js";
import ingredientWithUnitRouter from "./ingredient-with-unit.js";
import ingredientRouter from "./ingredient.js";
import orderedFoodRouter from "./ordered-food.js";
import recipeIngredientRouter from "./recipe-ingredient.js";
import recipeStepRouter from "./recipe-step.js";
import recipeRouter from "./recipe.js";
import userRouter from "./user.js";
import authentication from "../middlewares/authentication.js";

const router = Router();
router.all("*", authentication);

router.use("/calendar", calendarRouter);
router.use("/ingredients/units", ingredientWithUnitRouter);
router.use("/ingredients", ingredientRouter);
router.use("/ordered", orderedFoodRouter);
router.use("/recipes", recipeIngredientRouter);
router.use("/recipes", recipeStepRouter);
router.use("/recipes", recipeRouter);
router.use("/users", userRouter);

export default router;
