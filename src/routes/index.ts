import { Router } from "express";
import calendarItemsRouter from "./calendarItems";
import orderedFoodRouter from "./orderedFood";
import recipesRouter from "./recipes/recipes";
import recipeIngredientsRouter from "./recipes/recipeIngredients";
import usersRouter from "./users";
import membersRouter from "./members";
import ingredientsRouter from "./ingredients/ingredients";
import ingredientCategoriesRouter from "./ingredients/ingredientCategories";
import unitsRouter from "./ingredients/units";
import shoppingItemsRouter from "./shopping/shoppingItems";
import shoppingListsRouter from "./shopping/shoppingLists";
import shoppingCustomItemsRouter from "./shopping/shoppingCustomItem";
import { verifyToken } from "@/middlewares/authentication";

const router = Router();
router.all("*", verifyToken);

router.use("/calendar", calendarItemsRouter);
router.use("/ordered", orderedFoodRouter);
router.use("/users", usersRouter);
router.use("/members", membersRouter);

router.use("/ingredients/categories", ingredientCategoriesRouter);
router.use("/ingredients/units", unitsRouter);
router.use("/ingredients", ingredientsRouter);

router.use("/recipes/ingredients", recipeIngredientsRouter);
//router.use("/recipes", recipeStepRouter);
router.use("/recipes", recipesRouter);

router.use("/shopping/lists", shoppingListsRouter);
router.use("/shopping/items", shoppingItemsRouter);
router.use("/shopping/custom-items", shoppingCustomItemsRouter);

export default router;
