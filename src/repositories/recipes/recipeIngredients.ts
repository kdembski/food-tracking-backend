import { RecipeIngredientsQueries } from "@/queries/recipes/recipeIngredients";
import { IRecipeIngredientsRepository } from "@/interfaces/recipes/recipeIngredients";
import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { CustomError } from "@/base/errors/models/customError";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { ExtendedRecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";

export class RecipeIngredientsRepository
  implements IRecipeIngredientsRepository
{
  async selectById(id: number) {
    const query = new RecipeIngredientsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as ExtendedRecipeIngredientDTO;

    if (!dto) {
      throw new CustomError({
        message: "Recipe ingredient with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectByRecipeId(recipeId: number) {
    const query = new RecipeIngredientsQueries().getSelectByRecipeId();
    const results = await Database.sendQuery(query, [recipeId]);

    return results as ExtendedRecipeIngredientDTO[];
  }

  async insert(data: RecipeIngredient) {
    const query = new RecipeIngredientsQueries().getInsert();
    const results = await Database.sendQuery(query, [
      data.recipeId,
      data.ingredientUnitId,
      data.amount,
    ]);

    return results as OkPacket;
  }

  async update(data: RecipeIngredient) {
    const query = new RecipeIngredientsQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      data.recipeId,
      data.ingredientUnitId,
      data.amount,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new RecipeIngredientsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);
    return results as OkPacket;
  }
}
