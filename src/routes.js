import express from "express";

import { getRecipesList } from "./controllers/recipe.js";
import { getIngredientsList } from "./controllers/ingredient.js";

const router = express.Router();

router.get("/recipes", getRecipesList);

router.get("/ingredients", getIngredientsList);

export default router;
