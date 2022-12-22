import { Router } from "express";
import calendarItemsRouter from "./calendarItems";
import orderedFoodRouter from "./orderedFood";
import recipesRouter from "./recipes/recipes";
import recipeIngredientsRouter from "./recipes/recipeIngredients";
import usersRouter from "./users";
import membersRouter from "./members";
import ingredientsRouter from "./ingredients/ingredients";
import ingredientUnitsRouter from "./ingredients/ingredientUnits";
import ingredientCategoriesRouter from "./ingredients/ingredientCategories";
import { verifyToken } from "@/middlewares/authentication";

const router = Router();
router.all("*", verifyToken);

router.use("/calendar", calendarItemsRouter);
router.use("/ordered", orderedFoodRouter);
router.use("/users", usersRouter);
router.use("/members", membersRouter);

router.use("/ingredients/categories", ingredientCategoriesRouter);
router.use("/ingredients/units", ingredientUnitsRouter);
router.use("/ingredients", ingredientsRouter);

router.use("/recipes/ingredients", recipeIngredientsRouter);
//router.use("/recipes", recipeStepRouter);
router.use("/recipes", recipesRouter);

export default router;
