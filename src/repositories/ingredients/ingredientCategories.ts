import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { IngredientCategoriesQueries } from "@/queries/ingredients/ingredientCategories";
import { IIngredientCategoriesRepository } from "@/interfaces/ingredients/ingredientCategories";
import { CustomError } from "@/base/errors/models/customError";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import {
  IngredientCategoryDTO,
  IngredientCategoryOptionDTO,
} from "@/dtos/ingredients/ingredientCategory";
import { ListConfig } from "@/types/base/list";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";

export class IngredientCategoriesRepository
  implements IIngredientCategoriesRepository
{
  async selectList(config: ListConfig<IngredientCategoriesListFilters>) {
    const query = new IngredientCategoriesQueries().getSelectList(config);
    const data = await Database.sendQuery(query);

    return data as IngredientCategoryDTO[];
  }

  async selectCount(filters: IngredientCategoriesListFilters) {
    const query = new IngredientCategoriesQueries().getSelectCount(filters);
    const results = await Database.sendQuery(query);

    return parseInt(results[0].count);
  }

  async selectById(id: number) {
    const query = new IngredientCategoriesQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as IngredientCategoryDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient category with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectOptions() {
    const query = new IngredientCategoriesQueries().getSelectOptions("name");
    const results = await Database.sendQuery(query);

    return results as IngredientCategoryOptionDTO[];
  }

  async insert(data: IngredientCategory) {
    const query = new IngredientCategoriesQueries().getInsert();
    const results = await Database.sendQuery(query, [data.name]);

    return results as OkPacket;
  }

  async update(data: IngredientCategory) {
    const query = new IngredientCategoriesQueries().getUpdate();
    const results = await Database.sendQuery(query, [data.name, data.id]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new IngredientCategoriesQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
