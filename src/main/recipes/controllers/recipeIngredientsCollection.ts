import { RecipeIngredientsController } from "./recipeIngredients";
import { DBEntityCollectionController } from "@/base/db-entity/controllers/collection";
import { RecipeIngredientCollectionMapper } from "@/mappers/recipes/recipeIngredientsCollection";
import { RecipeIngredientsRepository } from "@/repositories/recipes/recipeIngredients";
import { RecipeIngredientsCollection } from "../collections/recipeIngredients";
import { RecipeIngredient } from "../models/recipeIngredient";

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
}