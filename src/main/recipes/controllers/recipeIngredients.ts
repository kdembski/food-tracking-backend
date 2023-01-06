import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { IRecipeIngredientsController } from "@/interfaces/recipes/recipeIngredients";
import { RecipeIngredientsRepository } from "@/repositories/recipes/recipeIngredients";
import { RecipeIngredient } from "../models/recipesIngredients";

export class RecipeIngredientsController
  implements IRecipeIngredientsController
{
  async getById(id: number) {
    const dto = await new RecipeIngredientsRepository().selectById(id);
    return new RecipeIngredient(dto);
  }

  async getByRecipeId(recipeId: number) {
    const dtos = await new RecipeIngredientsRepository().selectByRecipeId(
      recipeId
    );
    return dtos.map((dto) => new RecipeIngredient(dto));
  }

  create(data: RecipeIngredientDTO) {
    const ingredient = new RecipeIngredient(data);
    return new RecipeIngredientsRepository().insert(ingredient);
  }

  update(data: RecipeIngredientDTO) {
    const ingredient = new RecipeIngredient(data);
    return new RecipeIngredientsRepository().update(ingredient);
  }

  delete(id: number) {
    return new RecipeIngredientsRepository().delete(id);
  }
}
