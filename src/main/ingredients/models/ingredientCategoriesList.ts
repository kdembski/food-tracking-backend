import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoryMapper } from "@/mappers/ingredients/ingredientCategory";
import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";
import { IngredientCategory } from "./ingredientCategory";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { List } from "@/main/_shared/list/models/list";

export class IngredientCategoriesList extends List<
  IngredientCategory,
  IngredientCategoryDTO,
  IngredientCategoryDTO,
  IngredientCategoriesListFilters
> {
  constructor(
    repository = new IngredientCategoriesRepository(),
    mapper = new IngredientCategoryMapper()
  ) {
    super(repository.list, mapper);
  }

  async createListItem(data: IngredientCategoryDTO) {
    return new IngredientCategory(data);
  }

  createFilters(query: RequestQueryHelper) {
    const { searchPhrase } = query;
    return { searchPhrase };
  }
}
