import { IngredientUnitsController } from "./../../ingredients/controllers/ingredientUnits";
import { IRecipeIngredientsController } from "@/interfaces/recipes/recipeIngredients";
import { RecipeIngredientsRepository } from "@/repositories/recipes/recipeIngredients";
import { RecipeIngredient } from "../models/recipeIngredient";
import { RecipeIngredientQueryResultMapper } from "@/mappers/recipes/recipeIngredientQueryResult";

export class RecipeIngredientsController
  implements IRecipeIngredientsController
{
  async getById(id: number) {
    const dto = await new RecipeIngredientsRepository().selectById(id);
    return new RecipeIngredientQueryResultMapper().toDomain(dto);
  }

  async create(ingredient: RecipeIngredient) {
    const ingredientUnit =
      await new IngredientUnitsController().getByIngredientIdAndUnitId(
        ingredient.ingredientId as number,
        ingredient.unitId as number
      );
    ingredient.ingredientUnitId = ingredientUnit.id;

    return new RecipeIngredientsRepository().insert(ingredient);
  }

  async update(ingredient: RecipeIngredient) {
    const ingredientUnit =
      await new IngredientUnitsController().getByIngredientIdAndUnitId(
        ingredient.ingredientId as number,
        ingredient.unitId as number
      );
    ingredient.ingredientUnitId = ingredientUnit.id;

    return new RecipeIngredientsRepository().update(ingredient);
  }

  delete(id: number) {
    return new RecipeIngredientsRepository().delete(id);
  }
}
