import { Router } from "express";
import calendarItemsRouter from "./calendarItems";
import orderedFoodRouter from "./orderedFood";
import recipesRouter from "./recipes/recipes";
import usersRouter from "./users";
import membersRouter from "./members";
import ingredientsRouter from "./ingredients/ingredients";
import { verifyToken } from "@/middlewares/authentication";

const router = Router();
router.all("*", verifyToken);

router.use("/calendar", calendarItemsRouter);
//router.use("/ingredients/units", ingredientWithUnitRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/ordered", orderedFoodRouter);
//router.use("/recipes", recipeIngredientRouter);
//router.use("/recipes", recipeStepRouter);
router.use("/recipes", recipesRouter);
router.use("/users", usersRouter);
router.use("/members", membersRouter);

export default router;
