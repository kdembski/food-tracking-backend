import { IngredientUnitsController } from "./../../ingredients/controllers/ingredientUnits";
import { RecipeIngredientsRepository } from "@/repositories/recipes/recipeIngredients";
import { RecipeIngredient } from "../models/recipeIngredient";
import { RecipeIngredientQueryResultMapper } from "@/mappers/recipes/recipeIngredientQueryResult";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { recipeIngredientsFilterOptionBuilder } from "../builders/recipeIngredientsFilterOptions";
import { IDbEntityController } from "@/interfaces/base/db-entity/dbEntityController";

export class RecipeIngredientsController
  implements IDbEntityController<RecipeIngredient>
{
  async getById(id: number) {
    const dto = await new RecipeIngredientsRepository().selectById(id);
    return new RecipeIngredientQueryResultMapper().toDomain(dto);
  }

  async getFilterOptions(filters: RecipesListFilters) {
    const ids = await new RecipesRepository().selectIngredientIds(filters);
    return new recipeIngredientsFilterOptionBuilder().build(ids).options;
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
