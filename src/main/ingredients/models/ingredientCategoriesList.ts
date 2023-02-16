import { List } from "@/base/list/models/list";
import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoryMapper } from "@/mappers/ingredients/ingredientCategory";
import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";
import { IngredientCategory } from "./ingredientCategory";

export class IngredientCategoriesList extends List<
  IngredientCategory,
  IngredientCategoryDTO,
  IngredientCategoryDTO
> {
  constructor() {
    super(new IngredientCategoriesRepository(), new IngredientCategoryMapper());
  }

  async createListItem(data: IngredientCategoryDTO) {
    return new IngredientCategory(data);
  }
}
