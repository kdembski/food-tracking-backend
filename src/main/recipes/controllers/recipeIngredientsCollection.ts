import { RecipesController } from "@/main/recipes/controllers/recipes";
import { RecipeIngredientsController } from "./recipeIngredients";
import { DBEntityCollectionController } from "@/base/db-entity/controllers/collection";
import { RecipeIngredientCollectionMapper } from "@/mappers/recipes/recipeIngredientsCollection";
import { RecipeIngredientsRepository } from "@/repositories/recipes/recipeIngredients";
import { RecipeIngredientsCollection } from "../collections/recipeIngredients";
import { RecipeIngredient } from "../models/recipeIngredient";
import { RecipeIngredientsCollectionBuilder } from "../builders/recipeIngredientsCollection";

export class RecipeIngredientsCollectionController extends DBEntityCollectionController<
  RecipeIngredient,
  RecipeIngredientsCollection
> {
  constructor() {
    super(new RecipeIngredientsController());
  }

  async getByRecipeId(recipeId: number) {
    const dtos = await new RecipeIngredientsRepository().selectByRecipeId(
      recipeId
    );
    return new RecipeIngredientCollectionMapper().toDomain(dtos);
  }

  getCollection(selectorId: number) {
    return this.getByRecipeId(selectorId);
  }

  setSelectorId(item: RecipeIngredient, selectorId: number) {
    item.recipeId = selectorId;
  }

  override async callback(recipeId: number) {
    const builder = new RecipeIngredientsCollectionBuilder(
      await this.getByRecipeId(recipeId)
    );
    builder.calculateKcal();
    new RecipesController().updateKcal(
      builder.collection.kcal as number,
      recipeId
    );
  }
}
