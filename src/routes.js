import express from "express";

import { getRecipesList } from "./controllers/recipe.js";

const router = express.Router();

router.get("/recipes", getRecipesList);

export default router;
