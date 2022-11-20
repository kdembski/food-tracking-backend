import { Router } from "express";
import calendarItemRouter from "./calendar-item.js";
import ingredientWithUnitRouter from "./ingredient-with-unit.js";
import ingredientRouter from "./ingredient.js";
import orderedFoodRouter from "./ordered-food.js";
import recipeIngredientRouter from "./recipe-ingredient.js";
import recipeStepRouter from "./recipe-step.js";
import recipeRouter from "./recipe.js";
import userRouter from "./user.js";
import memberRouter from "./member.js";
import authentication from "../middlewares/authentication.js";

const router = Router();
router.all("*", authentication);

router.use("/calendar", calendarItemRouter);
router.use("/ingredients/units", ingredientWithUnitRouter);
router.use("/ingredients", ingredientRouter);
router.use("/ordered", orderedFoodRouter);
router.use("/recipes", recipeIngredientRouter);
router.use("/recipes", recipeStepRouter);
router.use("/recipes", recipeRouter);
router.use("/users", userRouter);
router.use("/members", memberRouter);

export default router;
