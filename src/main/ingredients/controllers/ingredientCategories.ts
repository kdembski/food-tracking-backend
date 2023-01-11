import { IIngredientCategoriesController } from "@/interfaces/ingredients/ingredientCategories";
import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";
import { IngredientCategory } from "../models/ingredientCategory";

export class IngredientCategoriesController
  implements IIngredientCategoriesController
{
  async getAll() {
    const dtos = await new IngredientCategoriesRepository().selectAll();
    return dtos.map((dto) => new IngredientCategory(dto));
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
