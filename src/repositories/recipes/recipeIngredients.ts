import { RecipeIngredient } from "@/models/recipes/recipesIngredients";
import { RecipeIngredientDTO } from "@/interfaces/recipes/recipesIngredients";
import { IRecipeIngredientsRepository } from "@/interfaces/recipes/recipesIngredients";
import Database from "@/config/database";
import { CustomError } from "@/models/errors/customError";
import { OkPacket } from "mysql2";
import { recipeIngredientsQueries } from "@/queries/recipes/recipeIngredients";

export class RecipeIngredientsRepository
  implements IRecipeIngredientsRepository
{
  async selectById(id: number) {
    const results = await Database.sendQuery(
      recipeIngredientsQueries.selectById,
      [id]
    );
    const dto = results[0] as RecipeIngredientDTO;

    if (!dto) {
      throw new CustomError({
        message: "Recipe ingredient with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectByRecipeId(recipeId: number) {
    const results = await Database.sendQuery(
      recipeIngredientsQueries.selectByRecipeId,
      [recipeId]
    );

    return results as RecipeIngredientDTO[];
  }

  async insert(data: RecipeIngredient) {
    const results = await Database.sendQuery(recipeIngredientsQueries.insert, [
      data.recipeId,
      data.ingredientUnitId,
      data.amount,
    ]);

    return results as OkPacket;
  }

  async update(data: RecipeIngredient) {
    const results = await Database.sendQuery(recipeIngredientsQueries.update, [
      data.recipeId,
      data.ingredientUnitId,
      data.amount,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(recipeIngredientsQueries.delete, [
      id,
    ]);
    return results as OkPacket;
  }
}
