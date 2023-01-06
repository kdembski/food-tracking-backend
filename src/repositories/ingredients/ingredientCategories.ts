import {
  IIngredientCategoriesRepository,
  IngredientCategoryDTO,
  IngredientCategoryOptionDTO,
} from "@/interfaces/ingredients/ingredientCategories";
import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { ingredientCategoriesQueries } from "@/queries/ingredients/ingredientCategories";
import { CustomError } from "@/base/errors/models/customError";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";

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

  async selectOptions() {
    const results = await Database.sendQuery(
      ingredientCategoriesQueries.selectOptions
    );

    return results as IngredientCategoryOptionDTO[];
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
