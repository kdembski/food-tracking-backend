import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { RecipeIngredientsCollectionBuilder } from "@/main/recipes/builders/recipeIngredientsCollection";
import { RecipeIngredientsCollectionService } from "@/main/recipes/services/recipe-ingredients-collection/recipeIngredientsCollection";
import { RecipesService } from "@/main/recipes/services/recipes";

export class UpdateKcalForRecipeContainingIngredientUnit {
  private recipeIngredientsCollectionService: RecipeIngredientsCollectionService;
  private recipeIngredientsCollectionBuilder: RecipeIngredientsCollectionBuilder;
  private recipesService: RecipesService;

  constructor(
    recipeIngredientsCollectionService = new RecipeIngredientsCollectionService(),
    recipeIngredientsCollectionBuilder = new RecipeIngredientsCollectionBuilder(),
    recipesService = new RecipesService()
  ) {
    this.recipeIngredientsCollectionBuilder =
      recipeIngredientsCollectionBuilder;
    this.recipeIngredientsCollectionService =
      recipeIngredientsCollectionService;
    this.recipesService = recipesService;
  }

  async execute(ingredientUnit: IngredientUnit) {
    const recipeIds = await this.getRecipeIdsHavingIngredientUnit(
      ingredientUnit.id
    );

    recipeIds.forEach(async (recipeId) => {
      if (!recipeId) {
        return;
      }

      const recipeIngredients =
        await this.recipeIngredientsCollectionService.getByRecipeId(recipeId);

      this.recipeIngredientsCollectionBuilder.collection = recipeIngredients;
      this.recipeIngredientsCollectionBuilder.calculateKcal();

      if (!recipeIngredients.kcal) {
        return;
      }

      await this.recipesService.updateKcal(recipeIngredients.kcal, recipeId);
    });
  }

  private async getRecipeIdsHavingIngredientUnit(
    ingredientUnitId: number | undefined
  ) {
    if (!ingredientUnitId) {
      return [];
    }

    const recipeIngredients =
      await this.recipeIngredientsCollectionService.getByIngredientUnitId(
        ingredientUnitId
      );

    const recipeIds = recipeIngredients.items.map(
      (ingredient) => ingredient.recipeId
    );

    return [...new Set(recipeIds)];
  }
}
