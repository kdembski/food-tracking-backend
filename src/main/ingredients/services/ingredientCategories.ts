import { ListBuilder } from "@/base/list/builders/list";
import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { IngredientCategoriesList } from "../models/ingredientCategoriesList";
import { IngredientCategory } from "../models/ingredientCategory";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { IDbEntityService } from "@/interfaces/base/db-entity/dbEntityService";

export class IngredientCategoriesService
  implements IDbEntityService<IngredientCategory>
{
  async getList(query: RequestQueryData) {
    const { searchPhrase } = new RequestQueryHelper(query);
    const ingredientsList = new IngredientCategoriesList();
    const listBuilder = new ListBuilder(ingredientsList);
    await listBuilder.build(query, { searchPhrase });

    return ingredientsList;
  }

  getOptions() {
    return new IngredientCategoriesRepository().selectOptions();
  }

  async getById(id: number) {
    const dto = await new IngredientCategoriesRepository().selectById(id);
    return new IngredientCategory(dto);
  }

  create(category: IngredientCategory) {
    return new IngredientCategoriesRepository().insert(category);
  }

  update(category: IngredientCategory) {
    return new IngredientCategoriesRepository().update(category);
  }

  delete(id: number) {
    return new IngredientCategoriesRepository().delete(id);
  }
}
