import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategory } from "./ingredientCategory";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { List } from "@/main/_shared/list/models/list";

export class IngredientCategoriesList extends List<
  IngredientCategory,
  IngredientCategoryDTO,
  IngredientCategoriesListFilters
> {
  async createListItem(data: IngredientCategoryDTO) {
    return new IngredientCategory(data);
  }

  createFilters(query: RequestQueryHelper) {
    const { searchPhrase } = query;
    return { searchPhrase };
  }
}
