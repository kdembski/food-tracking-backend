import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { RecipeIngredientsQueries } from "@/queries/recipes/recipeIngredients";
import { CustomError } from "@/base/errors/models/customError";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { IRepository } from "@/interfaces/base/db-entity/repository";

export class RecipeIngredientsRepository
  implements IRepository<RecipeIngredient, RecipeIngredientQueryResult>
{
  async selectById(id: number) {
    const query = new RecipeIngredientsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as RecipeIngredientQueryResult;

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

    return results as RecipeIngredientQueryResult[];
  }

  async selectByIngredientUnitId(recipeId: number) {
    const query = new RecipeIngredientsQueries().getSelectByIngredientUnitId();
    const results = await Database.sendQuery(query, [recipeId]);

    return results as RecipeIngredientQueryResult[];
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
