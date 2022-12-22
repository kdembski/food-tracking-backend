import {
  IIngredientCategoriesRepository,
  IngredientCategoryDTO,
} from "@/interfaces/ingredients/ingredientCategories";
import Database from "@/config/database";
import { CustomError } from "@/models/errors/customError";
import { OkPacket } from "mysql2";
import { ingredientCategoriesQueries } from "@/queries/ingredients/ingredientCategories";
import { IngredientCategory } from "@/models/ingredients/ingredientCategory";

export class IngredientCategoriesRepository
  implements IIngredientCategoriesRepository
{
  async selectById(id: number) {
    const results = await Database.sendQuery(
      ingredientCategoriesQueries.selectById,
      [id]
    );
    const dto = results[0] as IngredientCategoryDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient category with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectAll() {
    const results = await Database.sendQuery(
      ingredientCategoriesQueries.select
    );

    return results as IngredientCategoryDTO[];
  }

  async insert(data: IngredientCategory) {
    const results = await Database.sendQuery(
      ingredientCategoriesQueries.insert,
      [data.name]
    );

    return results as OkPacket;
  }

  async update(data: IngredientCategory) {
    const results = await Database.sendQuery(
      ingredientCategoriesQueries.update,
      [data.name, data.id]
    );

    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(
      ingredientCategoriesQueries.delete,
      [id]
    );
    return results as OkPacket;
  }
}
