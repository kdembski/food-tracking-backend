import { Database } from "@/config/database";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import {
  IngredientCategoryDTO,
  IngredientCategoryOptionDTO,
} from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoriesQueries } from "@/queries/ingredients/ingredientCategories";
import { ListRepository } from "../_shared/list";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { CRUDRepository } from "../_shared/crud";

export class IngredientCategoriesRepository extends CRUDRepository<
  IngredientCategory,
  IngredientCategoryDTO
> {
  protected queries: IngredientCategoriesQueries;
  list: ListRepository<IngredientCategoryDTO, IngredientCategoriesListFilters>;

  constructor(
    database = Database.getInstance(),
    queries = new IngredientCategoriesQueries(),
    list = new ListRepository<
      IngredientCategoryDTO,
      IngredientCategoriesListFilters
    >(database, queries)
  ) {
    super(database, queries);
    this.list = list;
    this.queries = queries;
  }

  async selectOptions() {
    const query = this.queries.getSelectOptions("name");
    const results = await this.database.sendQuery(query);

    return results as IngredientCategoryOptionDTO[];
  }

  getFieldsToInsert(model: IngredientCategory) {
    return [model.name];
  }

  getFieldsToUpdate(model: IngredientCategory) {
    return [model.name, model.id];
  }
}
