import { IngredientUnitsRepository } from "@/repositories/ingredients/ingredientUnits";
import { IngredientUnitQueryResultMapper } from "@/mappers/ingredients/ingredientUnitQueryResult";
import { IngredientUnit } from "../models/ingredientUnit";
import { RecipeIngredientsCollectionService } from "@/main/recipes/services/recipeIngredientsCollection";
import { RecipeIngredientsCollectionBuilder } from "@/main/recipes/builders/recipeIngredientsCollection";
import { RecipesService } from "@/main/recipes/services/recipes";
import { IDbEntityService } from "@/interfaces/base/db-entity/dbEntityService";

export class IngredientUnitsService
  implements IDbEntityService<IngredientUnit>
{
  async getById(id: number) {
    const dto = await new IngredientUnitsRepository().selectById(id);
    return new IngredientUnitQueryResultMapper().toDomain(dto);
  }

  async getByIngredientIdAndUnitId(ingredientId: number, unitId: number) {
    const dto =
      await new IngredientUnitsRepository().selectByIngredientIdAndUnitId(
        ingredientId,
        unitId
      );
    return new IngredientUnitQueryResultMapper().toDomain(dto);
  }

  create(unit: IngredientUnit) {
    return new IngredientUnitsRepository().insert(unit);
  }

  update(unit: IngredientUnit) {
    this.updateLinkedRecipesKcal(unit);
    return new IngredientUnitsRepository().update(unit);
  }

  delete(id: number) {
    return new IngredientUnitsRepository().delete(id);
  }

  async updateLinkedRecipesKcal(unit: IngredientUnit) {
    if (!unit.id) {
      return;
    }

    const recipeIngredients =
      await new RecipeIngredientsCollectionService().getByIngredientUnitId(
        unit.id
      );
    let recipeIds = recipeIngredients.items.map(
      (ingredient) => ingredient.recipeId
    );
    recipeIds = [...new Set(recipeIds)];

    recipeIds.forEach(async (recipeId) => {
      if (!recipeId) {
        return;
      }

      const recipeIngredients =
        await new RecipeIngredientsCollectionService().getByRecipeId(recipeId);
      new RecipeIngredientsCollectionBuilder(recipeIngredients).calculateKcal();
      await new RecipesService().updateKcal(
        recipeIngredients.kcal as number,
        recipeId
      );
    });
  }
}
