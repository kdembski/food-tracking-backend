import express from "express";

import {
  getRecipesListWithPagination,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "./controllers/recipe.js";

import { getIngredientsListWithPagination } from "./controllers/ingredient.js";

const router = express.Router();

router.get("/recipes", getRecipesListWithPagination);
router.get("/recipes/:id", getRecipeById);
router.post("/recipes", addRecipe);
router.put("/recipes/:id", updateRecipe);
router.delete("/recipes/:id", deleteRecipe);

router.get("/ingredients", getIngredientsListWithPagination);

export default router;
